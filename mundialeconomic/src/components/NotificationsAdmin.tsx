"use client";

import { useState } from "react";
import {
  X,
  Archive,
  Settings,
  RefreshCw,
  Package,
  Store,
  AlertCircle,
  MessageCircle,
  Bell,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { clsx } from "clsx";

interface Notification {
  id: number;
  type: "order" | "store" | "review" | "payout" | "system";
  title: string;
  message: string;
  store?: string;
  time: Date;
  read: boolean;
  avatar?: string;
}

export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archive">(
    "all"
  );

  const notifications: Notification[] = [
    {
      id: 1,
      type: "order",
      title: "Nova venda na Luxe Boutique",
      message: "3 produtos • R$ 487,90 • Ana Silva",
      store: "Luxe Boutique",
      time: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
    },
    {
      id: 2,
      type: "store",
      title: "Nova loja cadastrada",
      message: "TechTrend Store foi aprovada e está ativa",
      store: "TechTrend Store",
      time: new Date(Date.now() - 10 * 60 * 1000),
      read: false,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 3,
      type: "payout",
      title: "Saque solicitado",
      message: "Urban Sneakers solicitou R$ 8.230,00",
      store: "Urban Sneakers",
      time: new Date(Date.now() - 25 * 60 * 1000),
      read: false,
    },
    {
      id: 4,
      type: "review",
      title: "Nova avaliação 5 estrelas",
      message: "Cliente elogiou atendimento da Glow Beauty",
      store: "Glow Beauty",
      time: new Date(Date.now() - 60 * 60 * 1000),
      read: true,
    },
    {
      id: 5,
      type: "system",
      title: "Manutenção programada",
      message: "Sistema ficará off-line amanhã às 03:00",
      time: new Date(Date.now() - 120 * 60 * 1000),
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <Package className="w-5 h-5 text-green-600" />;
      case "store":
        return <Store className="w-5 h-5 text-blue-600" />;
      case "review":
        return <MessageCircle className="w-5 h-5 text-purple-600" />;
      case "payout":
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case "system":
        return <Settings className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <>
      {/* Trigger Button (in your navbar) */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2.5 hover:bg-gray-100 rounded-lg transition"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Right Aside Panel */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Notificações</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Archive className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          {[
            { key: "all", label: "Tudo" },
            { key: "unread", label: "Não lidas", badge: unreadCount },
            { key: "archive", label: "Arquivadas" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={clsx(
                "flex-1 px-4 py-3 text-sm font-medium relative transition",
                activeTab === tab.key
                  ? "text-green-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {tab.label}
              {tab.badge && tab.badge > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 bg-green-600 rounded-full" />
              )}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications
            .filter(
              (n) => activeTab === "all" || (activeTab === "unread" && !n.read)
            )
            .map((notif) => (
              <div
                key={notif.id}
                className={clsx(
                  "p-4 border-b hover:bg-gray-50 transition cursor-pointer",
                  !notif.read && "bg-blue-50"
                )}
              >
                <div className="flex gap-4">
                  {/* Avatar or Icon */}
                  <div className="flex-shrink-0">
                    {notif.avatar ? (
                      <img
                        src={notif.avatar}
                        alt={notif.store}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        {getIcon(notif.type)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{notif.title}</p>
                    {notif.store && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        {notif.store}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDistanceToNow(notif.time, { addSuffix: true })}
                    </div>
                  </div>

                  {!notif.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-center">
          <button className="text-sm font-medium text-green-600 hover:text-green-700">
            Ver todas as notificações
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
