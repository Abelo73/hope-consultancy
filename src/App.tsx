import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import DocumentCenter from "./components/DocumentCenter";
import Process from "./components/Process";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-paper-100 dark:bg-abyss-900 text-ink-900 dark:text-paper-100 transition-colors duration-500">
        <div className="bg-grain-overlay" />
        <Navbar />
        <main>
          <Hero />
          <Services />
          <DocumentCenter />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
