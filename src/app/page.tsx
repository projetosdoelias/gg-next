"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/transparent_logo.png" // <- renomeie seu arquivo enviado para public/logo.png
            alt="Logo Gaia Garden"
            width={160}
            height={160}
            priority
          />
        </div>

        <h1 className="text-3xl font-semibold text-[#2c4631] mb-4">
          Bem-vindo ao Gaia Garden
        </h1>

        <p className="text-[#2c4631] mb-6">
          Gerencie e acompanhe seu grow indoor de forma natural e intuitiva.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-2 bg-[#2c4631] text-white rounded hover:bg-[#1e3524] transition"
          >
            Entrar
          </a>
          <a
            href="/register"
            className="px-6 py-2 border-2 border-[#2c4631] text-[#2c4631] rounded hover:bg-[#e8e4de] transition"
          >
            Cadastrar
          </a>
        </div>
      </div>
    </main>
  );
}
