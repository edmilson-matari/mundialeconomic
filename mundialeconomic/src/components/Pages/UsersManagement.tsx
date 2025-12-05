"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  ShieldCheck,
  Clock,
  Loader2,
  UserPlus,
} from "lucide-react";
import supabase from "../../supabase-client";

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  created_at: string;
  role: "admin" | "pending" | null;
}

type Status = "active" | "pending";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.user_metadata?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false)
  );

  const getStatusBadge = (status: Status) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
        <Clock className="w-3.5 h-3.5" />
        Pending
      </span>
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to revoke admin access?")) return;

    setDeletingId(id);
    try {
      // In a real app, you'd update a custom role or delete from admin_users table
      const { error } = await supabase.auth.admin.deleteUser(id);
      if (error) throw error;

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Users Management
                </h1>
                <p className="mt-2 text-gray-600">
                  Manage users with access to the admin dashboard
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <UserPlus className="w-5 h-5" />
                Add Admin User
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => {
                      const status =
                        user.role === "admin"
                          ? "active"
                          : ("pending" as Status);
                      const avatarUrl =
                        user.user_metadata?.avatar_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.user_metadata?.full_name || user.email
                        )}&background=6366f1&color=fff`;

                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                <img
                                  className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200"
                                  src={avatarUrl}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.user_metadata?.full_name || "No Name"}
                                </div>
                                <div className="text-sm text-gray-500 sm:hidden">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-sm text-gray-900">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {format(new Date(user.created_at), "MMM d, yyyy")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <Eye className="w-5 h-5" />
                              </button>
                              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                disabled={deletingId === user.id}
                                className="text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
                              >
                                {deletingId === user.id ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-500">No users found</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Invite Admin User</h2>
            <p className="text-gray-600 mb-6">
              Send an invitation email to grant admin access
            </p>

            <input
              type="email"
              placeholder="user@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none mb-4"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
