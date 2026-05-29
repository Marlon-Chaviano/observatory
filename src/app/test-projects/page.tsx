// src/app/test-proyectos/page.tsx
import { ProjectList } from "@/features/projects/components/ProjectList";

export default function TestProyectosPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] py-12 px-4 lg:px-10 max-w-[1200px] mx-auto">
      <ProjectList />
    </main>
  );
}