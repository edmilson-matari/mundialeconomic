import { Loader2 } from "lucide-react";

export default function Falback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
      <div className="text-center">
        <Loader2 className="w-12 h-12 mx-auto text-orange-600 animate-spin" />
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
