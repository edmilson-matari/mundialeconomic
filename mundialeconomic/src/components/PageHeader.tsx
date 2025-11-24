// components/admin/PageHeader.tsx
import { Plus, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";
import AddShopModal from "../components/AddShopModal"; // vamos criar agora
import type { StoreData } from "./Types/store";
import supabase from "../supabase-client.ts";

interface PageHeaderProps {
  title: string;
  breadcrumb?: string[];
  actionText?: string;
  onAction?: () => void;
  showAddShop?: boolean; // novo
}

export default function PageHeader({
  title,
  breadcrumb = [],
  actionText,
  onAction,
  showAddShop = false,
}: PageHeaderProps) {
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [store, setStore] = useState<StoreData[]>([]);

  const fetch = async () => {
    const { data, error } = await supabase.from("Admin").select("*");

    if (error) {
      console.log("error fetching the data: ", error);
    } else {
      console.log(data);
    }
  };

  const handleNewStore = (newStore: any) => {
    setStore((prev) => [newStore, ...prev]); // ← Atualiza em tempo real
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-gray-200">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          {breadcrumb.length > 0 && (
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <span
                    className={clsx(
                      "transition-colors",
                      index === breadcrumb.length - 1
                        ? "text-gray-700 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </nav>
          )}
        </div>

        {(actionText || showAddShop) && (
          <button
            onClick={() =>
              showAddShop ? setIsAddShopOpen(true) : onAction?.()
            }
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-lg shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            {actionText || "Adicionar Loja"}
          </button>
        )}
      </div>

      {/* Modal de Adicionar Loja */}
      {showAddShop && (
        <AddShopModal
          isOpen={isAddShopOpen}
          onClose={() => setIsAddShopOpen(false)}
          onStoreAdded={handleNewStore}
        />
      )}
    </>
  );
}
