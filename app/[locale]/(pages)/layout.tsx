import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundClient from "@/components/BackgroundClient";
import PageTransition from "@/components/PageTransition";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <BackgroundClient />
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}