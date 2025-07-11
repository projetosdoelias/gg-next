"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ggBackendApi } from "@/lib/gg-backend-api";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";

const formatDateBR = (dateString: string | null | undefined) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

interface Report {
  id: number;
  week: number;
  title: string;
}

interface Plant {
  id: number;
  name: string;
  strain: string;
  seeds_bank: string;
  description: string;
  cycle_type: string;
  effects: string;
  germination_date: string;
  cycle_start_date: string;
  media_profile_photo?: {
    fileUrl: string;
  } | null;
  reports: Report[];
}

export default function PlantDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await ggBackendApi.get(`/plants/${id}`);
        setPlant(response.data);
      } catch (error) {
        console.error("Erro ao buscar planta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
          <p className="text-[#2c4631]">Carregando...</p>
        </div>
      </ProtectedRoute>
    );
  }

  if (!plant) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
          <p className="text-red-600">Planta não encontrada.</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8f5f0] p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#2c4631] mb-6">
          Detalhes da Planta
        </h1>

        {/* Imagem */}
        {plant.media_profile_photo?.fileUrl && (
          <div className="mb-6">
            <Image
              src={plant.media_profile_photo.fileUrl}
              alt={plant.name}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Dados principais */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <p>
            <span className="font-semibold">Nome:</span> {plant.name}
          </p>
          <p>
            <span className="font-semibold">Strain:</span> {plant.strain}
          </p>
          <p>
            <span className="font-semibold">Banco de Sementes:</span>{" "}
            {plant.seeds_bank}
          </p>
          <p>
            <span className="font-semibold">Tipo de Ciclo:</span>{" "}
            {plant.cycle_type === "auto" ? "Automática" : "Regular"}
          </p>
          <p>
            <span className="font-semibold">Efeitos:</span> {plant.effects}
          </p>
          <p>
            <span className="font-semibold">Descrição:</span>{" "}
            {plant.description}
          </p>
          <p>
            <span className="font-semibold">Data Germinação:</span>{" "}
            {formatDateBR(plant.germination_date)}
          </p>
          <p>
            <span className="font-semibold">Início do Ciclo:</span>{" "}
            {formatDateBR(plant.cycle_start_date)}
          </p>
        </div>

        {/* Tabela de Acompanhamentos */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#2c4631]">
              Acompanhamentos
            </h2>

            <Link
              href={`/plants/${plant.id}/reports/new`}
              className="mt-2 md:mt-0 inline-block bg-[#5b845f] hover:bg-[#3b5a41] text-white px-4 py-2 rounded text-sm transition"
            >
              + Novo Acompanhamento
            </Link>
          </div>

          {plant.reports.length === 0 ? (
            <p className="text-gray-600">Nenhum acompanhamento registrado.</p>
          ) : (
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-[#e0ddd6]">
                  <th className="py-2 px-4 border">Semana</th>
                  <th className="py-2 px-4 border">Título</th>
                  <th className="py-2 px-4 border">Ações</th>
                </tr>
              </thead>
              <tbody>
                {plant.reports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#f5f3ef]">
                    <td className="py-2 px-4 border">{report.week}</td>
                    <td className="py-2 px-4 border">{report.title}</td>
                    <td className="py-2 px-4 border">
                      <Link
                        href={`/plants/${plant.id}/reports/${report.id}`}
                        className="text-[#2c4631] hover:underline text-sm"
                      >
                        Ver
                      </Link>
                      {/* futuramente editar/excluir report aqui */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
