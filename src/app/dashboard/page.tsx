"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Painel de Controle</h1>
        <p className="mb-4">Você está logado com sucesso.</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </main>
    </ProtectedRoute>
  );
}
