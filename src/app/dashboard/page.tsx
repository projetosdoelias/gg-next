"use client";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ggBackendApi } from "@/lib/gg-backend-api";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link"; // adicione isso no topo

interface Plant {
  id: number;
  name: string;
  strain: string;
  seeds_bank: string;
  description: string;
  media_profile_photo?: {
    fileUrl: string;
  } | null;
}

export default function DashboardPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await ggBackendApi.get("/plants");
        setPlants(response.data);
      } catch (error) {
        console.error("Erro ao buscar plantas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta planta?"
    );
    if (!confirm) return;

    try {
      await ggBackendApi.delete(`/plants/${id}`);
      setPlants(plants.filter((plant) => plant.id !== id));
    } catch (error) {
      console.error("Erro ao excluir planta:", error);
      alert("Erro ao excluir planta");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="w-full max-w-7xl flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#2c4631]">Minhas Plantas</h1>
          <div className="flex gap-2">
            <Link
              href="/plants/new"
              className="bg-[#5b845f] hover:bg-[#3b5a41] text-white px-4 py-2 rounded text-sm"
            >
              Nova Planta
            </Link>
            <button
              onClick={logout}
              className="bg-[#2c4631] hover:bg-[#1e3524] text-white px-4 py-2 rounded text-sm"
            >
              Sair
            </button>
          </div>
        </div>
        {/* Grid */}
        <div className="w-full max-w-7xl">
          {loading ? (
            <p className="text-[#2c4631]">Carregando...</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
                >
                  {/* Imagem */}
                  {plant.media_profile_photo?.fileUrl ? (
                    <Image
                      src={plant.media_profile_photo.fileUrl}
                      alt={plant.name}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-[#d9d3c9] flex items-center justify-center text-[#2c4631] text-sm italic">
                      Sem imagem
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-[#2c4631] mb-1">
                        {plant.name}
                      </h2>
                      <p className="text-sm text-gray-700 mb-2">
                        {plant.description.length > 120
                          ? `${plant.description.slice(0, 120)}...`
                          : plant.description}
                      </p>
                    </div>

                    {/* Ações */}
                    <div className="flex justify-between items-center mt-4 border-t pt-2">
                      <button
                        title="Acompanhamentos"
                        className="text-[#2c4631] hover:text-[#1e3524] flex items-center gap-1 text-sm"
                        // onClick={() => navegar para acompanhamentos futuramente}
                      >
                        <EyeIcon className="w-5 h-5" />
                        Ver
                      </button>

                      <button
                        title="Editar"
                        className="text-[#2c4631] hover:text-[#1e3524] flex items-center gap-1 text-sm"
                        // onClick={() => navegar para edição futuramente}
                      >
                        <PencilIcon className="w-5 h-5" />
                        Editar
                      </button>

                      <button
                        title="Excluir"
                        onClick={() => handleDelete(plant.id)}
                        className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                      >
                        <TrashIcon className="w-5 h-5" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
