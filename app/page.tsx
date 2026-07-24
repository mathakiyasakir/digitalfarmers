import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MandiRates from "@/components/MandiRates";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <MandiRates />
    </main>
  );
}
