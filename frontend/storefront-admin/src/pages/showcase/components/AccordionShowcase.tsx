import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function AccordionShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A basic accordion that shows one item at a time. The first item is open by default.
        </p>
        <div className="max-w-[600px]">
          <Accordion defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Multiple */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Multiple</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use the <code>multiple</code> prop to allow multiple items to be open at the same time.
        </p>
        <div className="max-w-[600px]">
          <Accordion multiple>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Disabled */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Disabled</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use the <code>disabled</code> prop on <code>AccordionItem</code> to disable individual items.
        </p>
        <div className="max-w-[600px]">
          <Accordion>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" disabled>
              <AccordionTrigger>Is it styled? (Disabled)</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Card */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Card</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Wrap the Accordion in a Card component.
        </p>
        <div className="max-w-[600px]">
          <Card>
            <CardContent className="p-0 sm:p-0">
              <Accordion className="border-none rounded-none w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6">Is it accessible?</AccordionTrigger>
                  <AccordionContent className="px-6">
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6">Is it styled?</AccordionTrigger>
                  <AccordionContent className="px-6">
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-0 border-none">
                  <AccordionTrigger className="px-6">Is it animated?</AccordionTrigger>
                  <AccordionContent className="px-6">
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
