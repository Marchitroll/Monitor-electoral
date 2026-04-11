import { CandidateDashboard } from "@/components/dashboard/CandidateDashboard";
import { Footer } from "@/components/layout/Footer";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { getAllCandidates } from "@/lib/candidates";

export default function Home() {
  const candidates = getAllCandidates();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-on-background">
      <TopAppBar />
      <main className="flex-1">
        <h1 className="sr-only">Monitor Electoral</h1>
        <CandidateDashboard candidates={candidates} />
      </main>

      <Footer />
    </div>
  );
}
