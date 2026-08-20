import Hero from './components/Hero/Hero.';
import AboutMe from './components/AboutMe/AboutMe';
import Carrossel from './components/carrossel/Carrossel';
import Contact from './components/contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Carrossel />
      <Contact />
    </>
  );
}
