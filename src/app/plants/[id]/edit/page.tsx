"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ggBackendApi } from "@/lib/gg-backend-api";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface PlantForm {
  name: string;
  strain: string;
  seeds_bank: string;
  description: string;
  cycle_type: string;
  effects: string;
  germination_date: string;
  cycle_start_date: string;
}

export default function EditPlantPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<PlantForm>({
    name: "",
    strain: "",
    seeds_bank: "",
    description: "",
    cycle_type: "auto",
    effects: "",
    germination_date: "",
    cycle_start_date: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await ggBackendApi.get(`/plants/${id}`);
        const plant = response.data;

        setForm({
          name: plant.name || "",
          strain: plant.strain || "",
          seeds_bank: plant.seeds_bank || "",
          description: plant.description || "",
          cycle_type: plant.cycle_type || "auto",
          effects: plant.effects || "",
          germination_date: plant.germination_date?.slice(0, 10) || "",
          cycle_start_date: plant.cycle_start_date?.slice(0, 10) || "",
        });
      } catch (error) {
        console.error("Erro ao buscar planta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await ggBackendApi.put(`/plants/${id}`, form);
      alert("Planta atualizada com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao atualizar planta:", error);
      alert("Erro ao atualizar planta");
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
          <p className="text-[#2c4631]">Carregando...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl font-bold text-[#2c4631] mb-4">
            Editar Planta
          </h1>

          <div>
            <label className="block text-[#2c4631] mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-[#2c4631] mb-1">Strain</label>
            <input
              type="text"
              name="strain"
              value={form.strain}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-[#2c4631] mb-1">
              Banco de Sementes
            </label>
            <input
              type="text"
              name="seeds_bank"
              value={form.seeds_bank}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-[#2c4631] mb-1">Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>

          <div>
            <label className="block text-[#2c4631] mb-1">Tipo de Ciclo</label>
            <select
              name="cycle_type"
              value={form.cycle_type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="auto">Automática</option>
              <option value="regular">Regular</option>
            </select>
          </div>

          <div>
            <label className="block text-[#2c4631] mb-1">Efeitos</label>
            <textarea
              name="effects"
              value={form.effects}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>

          <div>
            <label className="block text-[#2c4631] mb-1">
              Data de Germinação
            </label>
            <input
              type="date"
              name="germination_date"
              value={form.germination_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-[#2c4631] mb-1">Início do Ciclo</label>
            <input
              type="date"
              name="cycle_start_date"
              value={form.cycle_start_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#5b845f] text-white px-4 py-2 rounded hover:bg-[#3b5a41] transition"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
