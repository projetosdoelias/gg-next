"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ggBackendApi } from "@/lib/gg-backend-api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const validarCampos = () => {
    if (!name || !email || !password) {
      return "Todos os campos são obrigatórios.";
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      return "Email inválido.";
    }

    if (password.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const erroValidacao = validarCampos();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    try {
      setLoading(true);
      await ggBackendApi.post("/users", {
        email,
        password,
        name,
      });

      router.push("/login");
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Erro ao criar conta";
      setErro(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[#2c4631]">
          Criar Conta
        </h1>

        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
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
            name="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {erro && <p className="text-sm text-red-600 text-center">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2c4631] hover:bg-[#1e3524] text-white font-medium py-2 px-4 rounded disabled:opacity-60"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
