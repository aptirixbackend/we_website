import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Shift from "./components/Shift";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Process from "./components/Process";
import Cta from "./components/Cta";

export default function Page() {
  return (
    <main>
      <Hero />
      <Problem />
      <Shift />
      <Services />
      <Stats />
      <Process />
      <Cta />
    </main>
  );
}
