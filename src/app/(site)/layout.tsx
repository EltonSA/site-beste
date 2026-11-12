import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Chatbot from "@/components/site/Chatbot";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
