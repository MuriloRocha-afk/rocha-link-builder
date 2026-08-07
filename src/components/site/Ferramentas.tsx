import { SimuladorVisual } from "./SimuladorVisual";

export function Ferramentas() {
  return (
    <section id="ferramentas" className="scroll-mt-24 bg-secondary py-24">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-primary md:text-4xl">
          Simule sua cobertura em tempo real
        </h2>
        <SimuladorVisual />
      </div>
    </section>
  );
}
