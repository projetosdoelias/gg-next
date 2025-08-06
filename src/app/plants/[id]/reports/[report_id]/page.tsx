"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ggBackendApi } from "@/lib/gg-backend-api";
import Link from "next/link"; // Adicione este import no topo

interface Media {
  id: number;
  fileName: string;
  fileUrl: string;
  key: string;
}

interface ReportMedia {
  id: number;
  media_id: number;
  report_id: number;
  media: Media;
}

interface Report {
  id: number;
  title: string;
  description: string;
  week: number;
  date: string;
  diagnostic: string;
  main_action: string;
  fertilization: string;
  phase: string;
  hours_light: number;
  hours_dark: number;
  ph_water: string;
  ph_soil: string;
  ph_drain: string;
  temperature: string;
  humidity: string;
  created_at: string;
  report_media: ReportMedia[];
}

export default function ReportPage() {
  const params = useParams();
  const { id, report_id } = params;
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await ggBackendApi.get(
          `/plants/${id}/reports/${report_id}`
        );
        setReport(response.data);
      } catch (error) {
        console.error("Erro ao buscar relatório", error);
      }
    }

    fetchReport();
  }, [id, report_id]);

  if (!report) return <div className="p-4">Carregando relatório...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Relatório: {report.title}
        </h1>

        <Link
          href={`/plants/${id}`}
          className="inline-flex items-center px-4 py-2 rounded-md bg-[#2c4631] text-white text-sm font-medium hover:bg-[#1e3524] transition"
        >
          ← Voltar
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p>
            <strong>Semana:</strong> {report.week}
          </p>
          <p>
            <strong>Fase:</strong> {report.phase}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {format(new Date(report.date), "dd/MM/yyyy", { locale: ptBR })}
          </p>
        </div>
        <div>
          <p>
            <strong>Luz:</strong> {report.hours_light}h
          </p>
          <p>
            <strong>Escuro:</strong> {report.hours_dark}h
          </p>
          <p>
            <strong>Temperatura:</strong> {report.temperature}°C
          </p>
          <p>
            <strong>Umidade:</strong> {report.humidity}%
          </p>
        </div>
        <div>
          <p>
            <strong>pH Água:</strong> {report.ph_water}
          </p>
          <p>
            <strong>pH Solo:</strong> {report.ph_soil}
          </p>
          <p>
            <strong>pH Dreno:</strong> {report.ph_drain}
          </p>
        </div>
        <div>
          <p>
            <strong>Ação Principal:</strong> {report.main_action}
          </p>
          <p>
            <strong>Fertilização:</strong> {report.fertilization}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Descrição</h2>
        <p className="bg-white p-4 rounded-md shadow-sm">
          {report.description}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Diagnóstico</h2>
        <p className="bg-white p-4 rounded-md shadow-sm">{report.diagnostic}</p>
      </div>

      {report.report_media.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Galeria de Imagens</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {report.report_media.map((rm, index) => (
              <Dialog key={rm.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer overflow-hidden">
                    <Image
                      src={rm.media.fileUrl}
                      alt={`Foto ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-5xl p-0 bg-transparent shadow-none">
                  <Image
                    src={rm.media.fileUrl}
                    alt={`Imagem ampliada ${index + 1}`}
                    width={1000}
                    height={700}
                    className="w-full h-auto object-contain rounded"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
