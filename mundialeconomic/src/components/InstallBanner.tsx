import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import thohambaLogo from "../default_img/tchohamba_logo.png";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "pwa-install-dismissed";

export default function InstallBanner() {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or already installed (standalone mode)
    if (
      localStorage.getItem(DISMISSED_KEY) ||
      window.matchMedia("(display-mode: standalone)").matches
    )
      return;

    const handler = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Hide banner if app is installed
    window.addEventListener("appinstalled", () => setVisible(false));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;
    setInstalling(true);
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    }
    setInstalling(false);
    setPromptEvent(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:bottom-6 sm:left-auto sm:right-6 sm:px-0 sm:max-w-sm">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-4 flex items-center gap-4 border border-gray-700">
        {/* Logo */}
        <img
          src={thohambaLogo}
          alt="Tchohamba"
          className="w-12 h-12 rounded-xl object-contain bg-white p-1 flex-shrink-0"
        />

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight">Grupo Tchohamba</p>
          <p className="text-gray-400 text-xs mt-0.5">
            Instala a app para uma melhor experiência
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleInstall}
            disabled={installing}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            {installing ? "..." : "Instalar"}
          </button>
          <button
            onClick={handleDismiss}
            className="p-1.5 text-gray-400 hover:text-white transition rounded-lg hover:bg-gray-700"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
