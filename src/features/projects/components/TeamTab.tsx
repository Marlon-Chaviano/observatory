'use client';

interface TabTeamProps {
  data: any;
}

export function TabTeam({ data }: TabTeamProps) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
      {/* Contacto Oficial */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-md inline-block uppercase tracking-wider">
          📞 contacto_proyecto_persona/
        </h3>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {data.contacto?.nombre ? data.contacto.nombre.substring(0, 2).toUpperCase() : 'AR'}
          </div>
          <div>
            <h4 className="font-bold text-slate-950 text-base">
              {data.contacto?.nombre || 'Ana Rita García Chau'}
            </h4>
            <p className="text-xs text-slate-400">{data.contacto?.cargo || 'Coordinadora del Punto de Contacto Oficial'}</p>
          </div>
        </div>
      </div>

      {/* Miembros */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md inline-block uppercase tracking-wider">
          👥 Miembros del Equipo
        </h3>
        <ul className="space-y-2 text-xs text-slate-600">
          {data.miembros?.map((m: any, idx: number) => (
            <li key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-semibold text-slate-800">{m.nombre}</span>
              <span className="text-slate-400">{m.rol}</span>
            </li>
          )) || <li>No hay miembros registrados de forma dinámica.</li>}
        </ul>
      </div>
    </div>
  );
}