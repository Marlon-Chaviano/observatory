export interface Project {
  proyecto_id: number;
  codigo: string;          // Obligatorio (minLength: 1)
  acronimo: string | null; // Opcional según Swagger
  fecha_de_inicio: string; // Formato YYYY-MM-DD
  fecha_finalizacion: string;
  pagina_web: string | null;
  mandato: boolean;
  uri: string;
  tipo: string;
  categoria: string;
  estado: string;
}

// 2. Tipos para los atributos multivaluados (multi-idioma)
export interface ProyectoTextoMultiidioma {
  id: number;
  proyecto_id: number;
  idioma: 'es' | 'en'; // El código del idioma
  valor: string;       // Aquí va el título, resumen o palabra clave real
}

// 3. Tipos para las relaciones que vas a pintar en las pestañas de la ficha
export interface MiembroProyectoPersona {
  id: number;
  proyecto_id: number;
  persona_id: number;
  rol_en_proyecto?: string; // Ej: "Investigador Principal"
  // Aquí podrás cruzar los datos con el tipo 'Persona' que hizo tu compañero
}

export interface FinanciamientoProyecto {
  id: number;
  proyecto_id: number;
  financiamiento_id: number;
  monto_asignado?: number;
}