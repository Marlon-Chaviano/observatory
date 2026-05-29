'use client';

import { Project } from '../types';
import { Folder, Globe } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  // Lógica para asignar colores según el estado
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'En Construcción': return 'bg-green-100 text-green-700 border-green-200';
      case 'Factibilidad': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'En Operación': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Evaluación': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-blue-500/30 transition-all flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <Folder className="w-5 h-5 text-slate-400 stroke-[1.5]" />
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyle(project.estado)}`}>
            {project.estado}
          </span>
        </div>

        {/* Si el acrónimo viene null, usamos el fallback de texto */}
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {project.acronimo || "Proyecto sin Acrónimo"}
        </h3>
        <p className="text-[11px] font-mono text-slate-400 mb-3">{project.codigo}</p>

        <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs mb-4">
          <div className="flex justify-between">
            <span className="text-slate-400">Categoría</span>
            <span className="font-medium text-slate-700">{project.categoria}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Mandato</span>
            <span className="font-bold text-slate-600">{project.mandato ? 'SÍ' : 'NO'}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        {/* EVALUACIÓN SEGURA: Si pagina_web es null, este botón simplemente no se renderiza */}
        {project.pagina_web && (
          <a 
            href={project.pagina_web} 
            target="_blank" 
            rel="noreferrer"
            className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            title="Visitar sitio web"
          >
            <Globe className="w-4 h-4 stroke-[1.8]" />
          </a>
        )}
        <button 
          onClick={() => onSelect(project)}
          className="flex-1 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all"
        >
          Ver Ficha de Detalle
        </button>
      </div>
    </div>
  );
}