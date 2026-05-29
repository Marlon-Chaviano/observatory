'use client';

interface TabOutputsProps {
  data: any;
}

export function TabOutputs({ data }: TabOutputsProps) {
  if (!data) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3 animate-fadeIn">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Publicaciones Derivadas</h4>
      {Array.isArray(data) && data.map((pub: any, i: number) => (
        <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-700">
          📄 {pub.titulo_publicacion}
        </div>
      ))}
    </div>
  );
}