import { useState, useEffect } from 'react';
import { Project } from '../types';
import { projectService } from '@/features/projects/lib/projectService';
import { projectMock } from '@/features/projects/lib/projectMock';

export function useProjects() {
  // 📦 Almacena absolutamente todos los proyectos que vienen del servidor o mock
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  // ✂️ Almacena únicamente los proyectos de la página actual (la rebanada)
  const [paginatedProjects, setPaginatedProjects] = useState<Project[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // 📄 Control de página actual
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6; // 👈 Define cuántas tarjetas quieres por página

  const usarMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

  // 🔌 EFECTO 1: Carga inicial de datos (Trae TODO el bloque)
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        if (usarMock) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          setAllProjects(projectMock);
        } else {
          const data = await projectService.getAllProjects();
          // Aseguramos que sea un array por si Django devuelve el formato envuelto
          setAllProjects((data as any).results || data);
        }
        // Reseteamos a la página 1 si cambia el interruptor de mock/real
        setPage(1);
      } catch (err: unknown) {
        setError((err as Error).message || 'Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [usarMock]);

  // ✂️ EFECTO 2: Segmentar los proyectos cada vez que cambie la página o los datos
  useEffect(() => {
    const inicio = (page - 1) * itemsPerPage;
    const fin = inicio + itemsPerPage;
    
    // Cortamos el array original para sacar los 6 que corresponden a esta página
    setPaginatedProjects(allProjects.slice(inicio, fin));
  }, [page, allProjects]);

  return { 
    projects: paginatedProjects, // 👈 La vista solo recibe los proyectos ya recortados
    loading, 
    error,
    currentPage: page,            // 👈 Para tu componente Pagination
    totalItems: allProjects.length, // 👈 Para tu componente Pagination
    itemsPerPage,                // 👈 Para tu componente Pagination
    setPage                      // 👈 Función para cambiar de página
  };
}