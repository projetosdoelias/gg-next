"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-[#e6e2d8] shadow border-b border-[#ccc7bb]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo + Links */}
          <div className="flex items-center gap-6">
            <Link
              href={isAuthenticated ? "/dashboard" : "/"}
              className="flex items-center"
            >
              <Image
                src="/logo.png" // ajuste conforme seu path real
                alt="Logo Gaia Garden"
                width={120}
                height={40}
                className="object-contain h-8 w-auto"
              />
            </Link>

            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-[#2c4631] hover:text-[#1e3524] font-medium text-sm"
              >
                Minhas Plantas
              </Link>
            )}
          </div>

          {/* Ações */}
          <div>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-[#2c4631] hover:bg-[#1e3524] text-white px-3 py-1.5 rounded text-sm"
              >
                Sair
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-[#2c4631] hover:bg-[#1e3524] text-white px-3 py-1.5 rounded text-sm"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
