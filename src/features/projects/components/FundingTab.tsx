'use client';

interface TabFundingProps {
  data: any;
}

export function TabFunding({ data }: TabFundingProps) {
  if (!data) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-2 animate-fadeIn">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Entidad Financiadora</h4>
      <p className="text-sm font-semibold text-slate-800">{data.fondo}</p>
      <p className="text-xs text-slate-500">
        Presupuesto Asignado: <span className="font-bold text-green-600">{data.monto}</span>
      </p>
    </div>
  );
}