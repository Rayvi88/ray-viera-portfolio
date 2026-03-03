import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundClient from "@/components/BackgroundClient";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="h-screen overflow-hidden flex flex-col">
        <BackgroundClient />
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Hero />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}