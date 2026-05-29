const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const projectService = {
  // 📄 1. Obtener todos los proyectos (El que ya usas)
  getAllProjects: async () => {
    const response = await fetch(`${API_URL}proyectos/detalles/`);
    if (!response.ok) {
      throw new Error('Error al obtener los proyectos desde el servidor');
    }
    return await response.json();
  },

  // 🔍 2. Obtener UN proyecto por su ID (La nueva función)
  getProjectById: async (id: number | string) => {
    const response = await fetch(`${API_URL}proyectos/detalles/${id}/`);
    if (!response.ok) {
      throw new Error(`No se pudo cargar el detalle del proyecto con ID: ${id}`);
    }
    return await response.json();
  },

  // 🔌 Funciones para el detalle dinámico de UN proyecto
  getProjectSubData: async (projectId: number, subEndpoint: string) => {
    // Esto pegará ej: /api/proyectos/detalles/1/miembro_proyecto_persona/
    const response = await fetch(`${API_URL}proyectos/detalles/${projectId}/${subEndpoint}`);
    if (!response.ok) throw new Error(`Error al cargar ${subEndpoint}`);
    return await response.json();
  }
};