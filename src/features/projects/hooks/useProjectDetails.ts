import { useState, useEffect } from 'react';
import { projectService } from '@/features/projects/lib/projectService';

export function useProjectDetails(projectId: number, activeTab: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const usarMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

  useEffect(() => {
    // La pestaña general ya usa los datos nativos que pasaste por props, no necesita fetch
    if (activeTab === 'general') {
      setData(null);
      return;
    }

    async function fetchSubEndpointData() {
      // Mapeamos cada pestaña con su sub-endpoint real de Django
      const endpointMap: Record<string, string> = {
        team: 'miembro_proyecto_persona/',
        funding: 'financiamiento_proyecto/',
        outputs: 'originado_por_publicacion_proyecto/',
      };

      const targetEndpoint = endpointMap[activeTab];
      if (!targetEndpoint) return;

      try {
        setLoading(true);
        setError(null);

        if (usarMock) {
          await new Promise((resolve) => setTimeout(resolve, 250));
          // 🎭 SIMULACIÓN DE DATOS MOCK SEGÚN LA PESTAÑA
          if (activeTab === 'team') {
            setData({
              miembros: [{ nombre: 'Victor', rol: 'Desarrollador Backend' }],
              contacto: { nombre: 'Ana Rita García Chau', cargo: 'Coordinadora' }
            });
          } else if (activeTab === 'funding') {
            setData({ fondo: 'Fondo Nacional de Ciencia', monto: '$50,000 USD' });
          } else {
            setData([{ titulo_publicacion: 'Impacto de la Minería Sostenible 2026' }]);
          }
        } else {
          // 🔌 Conexión real con Django
          const response = await projectService.getProjectSubData(projectId, targetEndpoint);
          setData(response);
        }
      } catch (err: any) {
        setError(err.message || 'Error al cargar los datos de la pestaña');
      } finally {
        setLoading(false);
      }
    }

    void fetchSubEndpointData();
  }, [projectId, activeTab, usarMock]);

  return { data, loading, error };
}