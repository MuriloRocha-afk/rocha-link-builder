import { Calculator, Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculadoraTelhas } from "./Calculadora";
import { SimuladorVisual } from "./SimuladorVisual";

export function Ferramentas() {
  return (
    <section id="ferramentas" className="scroll-mt-24 bg-secondary py-24">
      <div className="mx-auto max-w-4xl px-5">
        <Tabs defaultValue="calculadora">
          <TabsList className="mx-auto grid w-full max-w-xl grid-cols-2">
            <TabsTrigger value="calculadora" className="gap-2">
              <Calculator className="h-4 w-4" />
              Calculadora
            </TabsTrigger>
            <TabsTrigger value="simulador" className="gap-2">
              <Home className="h-4 w-4" />
              Simulador Visual
            </TabsTrigger>
          </TabsList>
          <TabsContent value="calculadora" className="mt-8">
            <CalculadoraTelhas />
          </TabsContent>
          <TabsContent value="simulador" className="mt-8">
            <SimuladorVisual />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
