"use client";

import { useState } from "react";
import { Bike, Users, Clock, Phone, User, ArrowRight } from "lucide-react";

type VehicleType = "two-wheels" | "three-wheels";

export default function MotoTaxiBooking() {
  const [vehicle, setVehicle] = useState<VehicleType>("two-wheels");
  const [passengers, setPassengers] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");

  // Preço por passageiro
  const pricePerSeat = vehicle === "two-wheels" ? 800 : 300;
  const totalPrice = pricePerSeat * passengers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const booking = {
      nome: name,
      telemovel: phone,
      tipo: vehicle === "two-wheels" ? "Mota (2 rodas)" : "Kupapata (3 rodas)",
      lugares: passengers,
      hora: time,
      precoTotal: totalPrice,
    };

    alert(
      `Reserva confirmada!\n\n${JSON.stringify(booking, null, 2)
        .replace(/[{},"]/g, "")
        .replace(/:/g, ": ")}`
    );
    // Aqui você pode enviar para WhatsApp, Supabase, etc.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <Bike className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">
            Reserva de Mototáxi
          </h1>
          <p className="text-gray-600 mt-2">
            Escolha o seu transporte agora mesmo
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Escolha do veículo */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Tipo de Veículo
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setVehicle("two-wheels");
                    setPassengers(1);
                  }}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    vehicle === "two-wheels"
                      ? "border-orange-600 bg-orange-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Bike className="w-10 h-10 mx-auto mb-2 text-orange-600" />
                  <p className="font-bold">Mota</p>
                  <p className="text-2xl font-black text-orange-600">800 Kz</p>
                  <p className="text-sm text-gray-500">1 lugar</p>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicle("three-wheels")}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    vehicle === "three-wheels"
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Users className="w-10 h-10 mx-auto mb-2 text-blue-600" />
                  <p className="font-bold">Kupapata</p>
                  <p className="text-2xl font-black text-blue-600">300 Kz</p>
                  <p className="text-sm text-gray-500">até 8 lugares</p>
                </button>
              </div>
            </div>

            {/* Quantidade de lugares (só aparece se for kupapata) */}
            {vehicle === "three-wheels" && (
              <div className="animate-fadeIn">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Quantos lugares?
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPassengers(num)}
                      className={`py-3 rounded-lg font-bold text-lg transition-all ${
                        passengers === num
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Formulário */}
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <User className="w-5 h-5" />
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="Ex: João Silva"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Phone className="w-5 h-5" />
                  Telemóvel
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="Ex: 923 456 789"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Clock className="w-5 h-5" />
                  Hora da reserva
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Resumo do preço */}
            <div className="bg-gradient-to-r from-orange-100 to-blue-100 rounded-xl p-5 text-center">
              <p className="text-gray-600">Preço total</p>
              <p className="text-4xl font-black text-gray-800 mt-2">
                {totalPrice.toLocaleString()} Kz
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {passengers} × {pricePerSeat} Kz por lugar
              </p>
            </div>

            {/* Botão de reserva */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-5 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              Confirmar Reserva
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Reserva instantânea • Pagamento ao motorista
        </p>
      </div>
    </div>
  );
}
