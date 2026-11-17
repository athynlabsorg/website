import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Lab } from "@/components/sections/Lab";
import { Nav } from "@/components/sections/Nav";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <Services />
        <SelectedWork />
        <Process />
        <About />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
