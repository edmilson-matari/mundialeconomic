// components/UserManagementTable.tsx
"use client";

import { useState, useMemo } from "react";
import {
  X,
  Upload,
  AlertCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Download,
  Filter,
  UserPlus,
} from "lucide-react";

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Seller" | "Customer";
  joinedDate: string;
  status: "Active" | "Suspended" | "Pending";
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    avatar: "",
    name: "Ana Silva",
    email: "ana@exemplo.com",
    role: "Admin",
    joinedDate: "12 Mar 2024",
    status: "Active",
    lastActive: "Há 5 min",
  },
  {
    id: "2",
    avatar: "",
    name: "Carlos Mendes",
    email: "carlos@shop.com",
    role: "Seller",
    joinedDate: "03 Jun 2025",
    status: "Active",
    lastActive: "Há 2h",
  },
  {
    id: "3",
    avatar: "",
    name: "Maria Oliveira",
    email: "maria@exemplo.com",
    role: "Manager",
    joinedDate: "19 Jul 2025",
    status: "Suspended",
    lastActive: "Há 3 dias",
  },
  {
    id: "4",
    avatar: "",
    name: "João Pedro",
    email: "joao@gmail.com",
    role: "Customer",
    joinedDate: "25 Jul 2025",
    status: "Active",
    lastActive: "Há 1 dia",
  },
  {
    id: "5",
    avatar: "",
    name: "Beatriz Costa",
    email: "bea@shop.com",
    role: "Seller",
    joinedDate: "18 Jul 2025",
    status: "Pending",
    lastActive: "Nunca",
  },
];

// components/AddUserModal.tsx
("use client");

import supabase from "../../supabase-client";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void; // para atualizar a tabela
}

function AddUserModal({ isOpen, onClose, onUserAdded }: AddUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    "/default-avatar.png"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setMessage({
        type: "error",
        text: "Preencha todos os campos obrigatórios",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // 1. Cadastrar no Auth do Supabase
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .single();

      if (error) throw error;
      if (!data) throw new Error("Usuário não criado");

      // 2. Upload da foto (opcional)
      let avatarUrl = "/default-avatar.png";
      if (avatar) {
        const fileExt = avatar.name.split(".").pop();
        const fileName = `${data.name}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("users")
          .upload(`img_users/${fileName}`, avatar, { upsert: true });
        if (uploadError) throw uploadError;
      }

      // 3. Salvar perfil na tabela profiles (ou users)
      const { error: profileError } = await supabase.from("admins").upsert({
        name: form.name,
        email: form.email,
        avatar_url: avatarUrl,
        status: "Active",
        created_at: new Date().toISOString(),
      });

      if (profileError) throw profileError;

      setMessage({ type: "success", text: "Usuário criado com sucesso!" });
      setTimeout(() => {
        onUserAdded();
        onClose();
        // Reset form
        setForm({ name: "", email: "", password: "" });
        setAvatar(null);
        setAvatarPreview("/default-avatar.png");
      }, 1500);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Erro ao criar usuário",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <UserPlus className="w-8 h-8" />
              Adicionar Novo Usuário
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-dashed border-gray-300"
              />
              <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition">
                <Upload className="w-10 h-10 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 gap-5">
            <input
              type="text"
              placeholder="Nome completo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-5 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-5 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="password"
              placeholder="Senha (mín. 6 caracteres)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              minLength={6}
              className="px-5 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Mensagem */}
          {message && (
            <div
              className={`flex items-center gap-3 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:shadow-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                "Criando..."
              ) : (
                <>
                  <UserPlus className="w-5 h-5" /> Criar Usuário
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || user.role === filterRole;
      const matchesStatus =
        filterStatus === "all" || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getRoleBadge = (role: User["role"]) => {
    const colors = {
      Admin: "bg-purple-100 text-purple-700 border-purple-200",
      Manager: "bg-blue-100 text-blue-700 border-blue-200",
      Seller: "bg-orange-100 text-orange-700 border-orange-200",
      Customer: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[role]}`}
      >
        {role}
      </span>
    );
  };

  const getStatusBadge = (status: User["status"]) => {
    const colors = {
      Active: "bg-green-100 text-green-700",
      Suspended: "bg-red-100 text-red-700",
      Pending: "bg-yellow-100 text-yellow-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {selectedUsers.length > 0 && (
              <span className="text-sm font-medium text-gray-600">
                {selectedUsers.length} selecionado(s)
              </span>
            )}
            <button className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" /> Mais Filtros
            </button>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Todos os Cargos</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Seller">Seller</option>
              <option value="Customer">Customer</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Todos os Status</option>
              <option value="Active">Ativo</option>
              <option value="Suspended">Suspenso</option>
              <option value="Pending">Pendente</option>
            </select>
            <button className="px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" /> Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.length === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data de Cadastro
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Atividade
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.joinedDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.lastActive}
                </td>
                <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="Ver perfil"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    {user.status === "Active" ? (
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                        title="Suspender"
                      >
                        <Ban className="w-4 h-4 text-red-600" />
                      </button>
                    ) : (
                      <button
                        className="p-2 hover:bg-green-50 rounded-lg transition"
                        title="Ativar"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </button>
                    )}
                    <button
                      className="p-2 hover:bg-red-50 rounded-lg transition"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-medium">{filteredUsers.length}</span>{" "}
          de <span className="font-medium">{users.length}</span> usuários
        </p>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm font-medium"
        >
          <UserPlus className="w-4 h-4" /> Adicionar Usuário
        </button>
      </div>
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onUserAdded={() => {
          // Recarregar usuários
          console.log("user created");
        }}
      />
    </div>
  );
}
