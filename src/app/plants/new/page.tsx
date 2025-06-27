"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ggBackendApi } from "@/lib/gg-backend-api";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function NewPlantPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    strain: "",
    seeds_bank: "",
    description: "",
    cycle_type: "auto",
    effects: "",
    germination_date: "",
    cycle_start_date: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("O arquivo deve ser uma imagem válida (jpg, png, etc)");
      setPhotoFile(null);
      return;
    }

    setError("");
    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("strain", form.strain);
      formData.append("seeds_bank", form.seeds_bank);
      formData.append("description", form.description);
      formData.append("cycle_type", form.cycle_type);
      formData.append("effects", form.effects);
      formData.append(
        "germination_date",
        new Date(form.germination_date).toISOString()
      );
      formData.append(
        "cycle_start_date",
        new Date(form.cycle_start_date).toISOString()
      );

      if (photoFile) {
        formData.append("profile_photo", photoFile);
      }

      await ggBackendApi.post("/plants", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Erro ao cadastrar planta";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl w-full max-w-2xl p-6 space-y-4"
          encType="multipart/form-data"
        >
          <h2 className="text-xl font-bold text-[#2c4631] text-center">
            Nova Planta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Strain</label>
              <input
                type="text"
                name="strain"
                value={form.strain}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Banco de Sementes
              </label>
              <input
                type="text"
                name="seeds_bank"
                value={form.seeds_bank}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Tipo de Ciclo</label>
              <select
                name="cycle_type"
                value={form.cycle_type}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="auto">Automática</option>
                <option value="regular">Regular</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Data de Germinação
              </label>
              <input
                type="date"
                name="germination_date"
                value={form.germination_date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Início do Ciclo
              </label>
              <input
                type="date"
                name="cycle_start_date"
                value={form.cycle_start_date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Imagem */}
          <div>
            <label className="block text-sm font-medium">Foto da Planta</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded px-3 py-2"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 w-full max-h-64 object-cover rounded"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Efeitos</label>
            <textarea
              name="effects"
              value={form.effects}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2c4631] hover:bg-[#1e3524] text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? "Salvando..." : "Cadastrar Planta"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
