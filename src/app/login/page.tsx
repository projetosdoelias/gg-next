"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ggBackendApi } from "@/lib/gg-backend-api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await ggBackendApi.post("/auth/login", {
        email,
        password,
      });

      if (!res.data || !res.data.access_token) {
        const data = await res.data;
        throw new Error(data.message || "Erro ao fazer login");
      }

      const { access_token } = await res.data;
      login(access_token);
    } catch (err: any) {
      setErro(err.message || "Erro inesperado");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {erro && <p className="text-sm text-red-600 text-center">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
