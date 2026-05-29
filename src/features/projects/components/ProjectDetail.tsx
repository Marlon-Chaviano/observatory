'use client';

import { useState } from 'react';
import { Project } from '../types';
import { useProjectDetails } from '@/features/projects/hooks/useProjectDetails';
import { FileText, Users, Coins, BookOpen } from 'lucide-react';

// Importamos las pestañas modulares
import { TabGeneral } from './GeneralTab';
import { TabTeam } from './TeamTab';
import { TabFunding } from './FundingTab';
import { TabOutputs } from './OutputsTab';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'team' | 'funding' | 'outputs'>('general');
  const { data, loading, error } = useProjectDetails(project.proyecto_id, activeTab);

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      {/* BOTÓN REGRESAR Y MIGA DE PAN */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 
          Volver al Listado
        </button>
        <span className="text-xs font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
          ID: {project.proyecto_id}
        </span>
      </div>

      {/* CABECERA PRINCIPAL DE LA FICHA */}
      <header className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col md:flex-row justify-between gap-6 items-start">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide">
              {project.tipo || 'Investigación'}
            </span>
            <span className="bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-md text-xs font-medium">
              {project.categoria}
            </span>
            {project.mandato && (
              <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-md text-xs font-bold">
                ⚠️ Requiere Mandato
              </span>
            )}
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            {project.acronimo || "Proyecto de Investigación"}
          </h1>
          <p className="text-sm font-mono text-blue-600 font-semibold tracking-wider">
            Código Oficial: {project.codigo}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Estado del Proyecto</span>
          <span className="text-sm font-bold px-4 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 shadow-sm whitespace-nowrap">
            ● {project.estado}
          </span>
        </div>
      </header>

      {/* NAVEGACIÓN POR SUB-ENDPOINTS (Tabs) - ✨ Endpoints removidos de la vista */}
      <nav className="border-b border-slate-200 flex gap-2 overflow-x-auto pb-px">
        {[
          { id: 'general', label: 'Información General', icon: FileText },
          { id: 'team', label: 'Equipo y Contacto', icon: Users },
          { id: 'funding', label: 'Financiamiento', icon: Coins },
          { id: 'outputs', label: 'Publicaciones y Resultados', icon: BookOpen },
        ].map((tab) => {
           const IconComponent = tab.icon; 
           return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50/40 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <IconComponent className={`w-4 h-4 stroke-[1.6] ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
              <div className="flex flex-col items-start">
                <span>{tab.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* CONTENIDO DINÁMICO CENTRALIZADO */}
      <div className="bg-slate-50/50 min-h-[350px] relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-white/50 rounded-xl">
            <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-[11px] text-slate-400 font-medium">Cargando detalles...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl font-mono">
            ⚠️ Error al sincronizar relación: {error}
          </div>
        ) : (
          <>
            {activeTab === 'general' && <TabGeneral project={project} />}
            {activeTab === 'team' && <TabTeam data={data} />}
            {activeTab === 'funding' && <TabFunding data={data} />}
            {activeTab === 'outputs' && <TabOutputs data={data} />}
          </>
        )}
      </div>
    </div>
  );
}