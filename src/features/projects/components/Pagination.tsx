'use client';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // Si todo cabe en una página, no pintamos nada

  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-4">
      <p className="text-xs text-slate-500">
        Mostrando página <span className="font-bold text-slate-700">{currentPage}</span> de <span className="font-bold text-slate-700">{totalPages}</span> ({totalItems} proyectos en total)
      </p>
      <div className="flex gap-2">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          Anterior
        </button>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}