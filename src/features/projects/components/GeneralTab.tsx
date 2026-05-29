'use client';

import { Project } from '../types';

interface TabGeneralProps {
  project: Project;
  // Dejamos la puerta abierta para cuando consumas los títulos/resúmenes del sub-endpoint
  translationData?: {
    titulo_es?: string;
    resumen_es?: string;
  };
}

export function TabGeneral({ project, translationData }: TabGeneralProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      
      {/* SECCIÓN MULTILINGÜE (titulos/ y resumenes/) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm lg:col-span-2 space-y-6">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Títulos y Resúmenes Multilingües
          </h3>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                [ES] Título Dinámico (`titulos/`)
              </span>
              <p className="text-sm font-semibold text-slate-800 mt-2 leading-snug">
                {translationData?.titulo_es || project.acronimo || "Título oficial pendiente de carga desde el sub-endpoint."}
              </p>
            </div>
            
            <hr className="border-slate-200/60" />

            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                [ES] Resumen Ejecutivo (`resumenes/`)
              </span>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">
                {translationData?.resumen_es || "El resumen detallado de este proyecto se consumirá dinámicamente según el idioma del Observatorio."}
              </p>
            </div>
          </div>
        </div>

        {/* Palabras Clave */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Palabras Clave (`palabras_clave/`)
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {['Transición Energética', 'Minería Sostenible', 'Sincronización API', 'Observatorio'].map((tag, i) => (
              <span key={i} className="bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Enlaces y Tiempos */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Cronograma de Ejecución
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
              <span className="text-slate-500">Fecha de Inicio</span>
              <span className="font-semibold text-slate-700">{project.fecha_de_inicio || 'No definida'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Finalización</span>
              <span className="font-semibold text-slate-700">{project.fecha_finalizacion || 'No definida'}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Recursos Digitales
          </h3>
          <div className="space-y-2">
            {project.pagina_web ? (
              <a 
                href={project.pagina_web} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all group"
              >
                <span className="flex items-center gap-2">🌐 Sitio Web Oficial</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            ) : (
              <div className="p-3 bg-slate-50/50 border border-slate-200 border-dashed rounded-xl text-xs text-slate-400 flex items-center gap-2 italic">
                🚫 No cuenta con Sitio Web Oficial
              </div>
            )}

            <a 
              href={project.uri} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all group"
            >
              <span className="truncate max-w-[180px]">URI: {project.uri}</span>
              <span>🔗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}