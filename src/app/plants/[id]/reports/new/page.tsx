"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ggBackendApi } from "@/lib/gg-backend-api";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function NewReportPage() {
  const { id: plantId } = useParams<{ id: string }>();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    week: 0,
    title: "",
    description: "",
    diagnostic: "",
    main_action: "",
    fertilization: "",
    phase: "vegetativo",
    hours_light: 0,
    hours_dark: 0,
    ph_water: "",
    ph_soil: "",
    ph_drain: "",
    temperature: 0,
    humidity: 0,
    date: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: [
        "week",
        "hours_light",
        "hours_dark",
        "temperature",
        "humidity",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhoto = e.target.files[0];
      setPhotos((prev) => [...prev, newPhoto]);
      e.target.value = ""; // Reset input para permitir a mesma foto novamente se desejado
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append("plant_id", String(plantId));

    photos.forEach((photo) => {
      formData.append("photos[]", photo);
    });

    try {
      await ggBackendApi.post(`/plants/${plantId}/reports`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Acompanhamento criado com sucesso!");
      router.push(`/plants/${plantId}`);
    } catch (error) {
      console.error("Erro ao criar acompanhamento:", error);
      alert("Erro ao criar acompanhamento");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl space-y-4"
        >
          <h1 className="text-2xl font-bold text-[#2c4631] mb-4">
            Novo Acompanhamento
          </h1>

          {/* Campos em Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Semana */}
            <div>
              <label className="block text-[#2c4631] mb-1">Semana</label>
              <select
                name="week"
                value={form.week}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {Array.from({ length: 25 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            {/* Título */}
            <div>
              <label className="block text-[#2c4631] mb-1">Título</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Ação Principal */}
            <div>
              <label className="block text-[#2c4631] mb-1">
                Ação Principal
              </label>
              <input
                type="text"
                name="main_action"
                value={form.main_action}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Phase */}
            <div>
              <label className="block text-[#2c4631] mb-1">Fase</label>
              <select
                name="phase"
                value={form.phase}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="vegetativo">Vegetativo</option>
                <option value="flowering">Floração</option>
              </select>
            </div>

            {/* Horas de Luz */}
            <div>
              <label className="block text-[#2c4631] mb-1">Horas de Luz</label>
              <input
                type="number"
                name="hours_light"
                value={form.hours_light}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Horas de Escuridão */}
            <div>
              <label className="block text-[#2c4631] mb-1">
                Horas de Escuridão
              </label>
              <input
                type="number"
                name="hours_dark"
                value={form.hours_dark}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* pH Água */}
            <div>
              <label className="block text-[#2c4631] mb-1">pH Água</label>
              <input
                type="text"
                name="ph_water"
                value={form.ph_water}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* pH Solo */}
            <div>
              <label className="block text-[#2c4631] mb-1">pH Solo</label>
              <input
                type="text"
                name="ph_soil"
                value={form.ph_soil}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* pH Drenagem */}
            <div>
              <label className="block text-[#2c4631] mb-1">pH Drenagem</label>
              <input
                type="text"
                name="ph_drain"
                value={form.ph_drain}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Temperatura */}
            <div>
              <label className="block text-[#2c4631] mb-1">Temperatura</label>
              <input
                type="number"
                name="temperature"
                value={form.temperature}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Umidade */}
            <div>
              <label className="block text-[#2c4631] mb-1">Umidade</label>
              <input
                type="number"
                name="humidity"
                value={form.humidity}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Data */}
            <div>
              <label className="block text-[#2c4631] mb-1">Data</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Description */}
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

          {/* Diagnostic */}
          <div>
            <label className="block text-[#2c4631] mb-1">Diagnóstico</label>
            <textarea
              name="diagnostic"
              value={form.diagnostic}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>

          {/* Fertilization */}
          <div>
            <label className="block text-[#2c4631] mb-1">Fertilização</label>
            <textarea
              name="fertilization"
              value={form.fertilization}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>
          {/* Upload de Fotos */}
          <div>
            <label className="block text-[#2c4631] mb-1">
              Fotos do Acompanhamento
            </label>

            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#5b845f] text-white px-4 py-2 rounded hover:bg-[#3b5a41] transition"
              >
                Selecionar Fotos
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotosChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Pré-visualização */}
          {photos.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-[#2c4631] mb-2">Pré-visualização:</p>
              <div className="flex flex-wrap gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded overflow-hidden border border-gray-300"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Prévia ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      title="Remover foto"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#5b845f] text-white px-4 py-2 rounded hover:bg-[#3b5a41] transition"
          >
            Criar Acompanhamento
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
