import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LitCharacter from "./components/LitCharacter";
import Works from "./components/Works";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Hero />
      <About />
      <Works />
      <LitCharacter />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
