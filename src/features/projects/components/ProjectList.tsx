'use client';

import { useState } from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { Pagination } from './Pagination';
import { ProjectDetail } from './ProjectDetail';
// 🧠 1. IMPORTA TU HOOK (Quita el projectService que tenías aquí)
import { useProjects } from '@/features/projects/hooks/useProjects'; 

export function ProjectList() {
  // 🧠 2. USA TU HOOK (Esto reemplaza todos los useState de projects, loading, error y el useEffect)
  const { projects, loading, error, currentPage, 
    totalItems, 
    itemsPerPage, 
    setPage } = useProjects();
  
  // Este estado sí se queda aquí porque es propio de la navegación de la vista
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-3">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-xs font-medium text-slate-400">Cargando proyectos del Observatorio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-100 rounded-xl max-w-2xl mx-auto mt-8">
        <h4 className="text-sm font-bold text-red-800 mb-1">❌ Hubo un problema de conexión</h4>
        <p className="text-xs text-red-600 font-mono">{error}</p>
        <p className="text-xs text-slate-400 mt-3 font-sans">
          Tip: Asegúrate de que tu backend de Django esté encendido en <code className="bg-slate-100 px-1 rounded text-red-500">http://127.0.0.1:8000</code>.
        </p>
      </div>
    );
  }

  if (selectedProject) {
    return (
      <ProjectDetail 
        project={selectedProject} 
        onBack={() => setSelectedProject(null)} 
      />
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Proyectos de Investigación</h2>
        <p className="text-xs text-slate-500 mt-0.5">Explora las actividades y desarrollos del Observatorio.</p>
      </div>

      {projects.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-xl p-12 text-center text-sm text-slate-400">
          No hay proyectos registrados en la base de datos local.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <ProjectCard 
              key={proj.proyecto_id || proj.codigo} 
              project={proj}
              onSelect={(selected) => setSelectedProject(selected)}
            />
          ))}
        </div>   
      )}

       <Pagination 
        currentPage={currentPage} 
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}