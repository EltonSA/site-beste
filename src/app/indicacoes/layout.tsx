import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Chatbot from "@/components/site/Chatbot";

export default function IndicacoesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh relative">
      {/* Background gradiente sutil */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -z-20"></div>
      
      {/* Padrão de pontos decorativo */}
      <div className="fixed inset-0 -z-10 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}

