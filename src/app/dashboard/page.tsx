"use client";

import { useEffect, useState } from "react";
import { ggBackendApi } from "@/lib/gg-backend-api";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import PlantCard from "@/components/PlantCard";
import Link from "next/link";

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

  const handleEdit = (id: number) => {
    console.log("Editar planta:", id);
    // router.push(`/plants/${id}/edit`);
  };

  const handleView = (id: number) => {
    console.log("Ver acompanhamentos da planta:", id);
    // router.push(`/plants/${id}/trackings`);
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
          </div>
        </div>

        {/* Grid */}
        <div className="w-full max-w-7xl">
          {loading ? (
            <p className="text-[#2c4631]">Carregando...</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
