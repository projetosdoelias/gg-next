"use client";

import Image from "next/image";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/solid";
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

interface PlantCardProps {
  plant: Plant;
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
}

export default function PlantCard({
  plant,
  onDelete,
  onEdit,
  onView,
}: PlantCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* Imagem */}
      {plant.media_profile_photo?.fileUrl ? (
        <Link href={`/plants/${plant.id}`}>
          <Image
            src={plant.media_profile_photo.fileUrl}
            alt={plant.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover cursor-pointer"
          />
        </Link>
      ) : (
        <Link href={`/plants/${plant.id}`}>
          <div className="w-full h-48 bg-[#d9d3c9] flex items-center justify-center text-[#2c4631] text-sm italic cursor-pointer">
            Sem imagem
          </div>
        </Link>
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
          <Link
            href={`/plants/${plant.id}`}
            title="Ver detalhes"
            className="text-[#2c4631] hover:text-[#1e3524] flex items-center gap-1 text-sm"
          >
            <EyeIcon className="w-5 h-5" />
            Ver
          </Link>

          <Link
            href={`/plants/${plant.id}/edit`}
            title="Editar"
            className="text-[#2c4631] hover:text-[#1e3524] flex items-center gap-1 text-sm"
          >
            <PencilIcon className="w-5 h-5" />
            Editar
          </Link>

          <button
            title="Excluir"
            onClick={() => onDelete(plant.id)}
            className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
          >
            <TrashIcon className="w-5 h-5" />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
