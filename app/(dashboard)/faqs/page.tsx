import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FaqSection() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6 text-center font-mono">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I get started as a contributor?</AccordionTrigger>
            <AccordionContent>
              <p>
                To become a contributor, simply sign up using your Arweave Wallet. Once registered, you can start uploading labeled data to support AI model training. Each time you upload data, you’ll earn tokens as rewards, and you’ll be able to track how your contributions are used.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What kind of data can I contribute?</AccordionTrigger>
            <AccordionContent>
              <p>
                We currently accept labeled data in various formats, including text, images, and audio.  The specific requirements for each data type can be found on our data submission guidelines page.  We are continuously expanding the supported formats, so stay tuned for updates!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How are contributions rewarded?</AccordionTrigger>
            <AccordionContent>
              <p>
                Contributors earn tokens for each valid data upload. The amount of tokens earned depends on the type and quality of the data provided. Your token balance and contribution history are accessible through your dashboard.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How can developers use this platform?</AccordionTrigger>
            <AccordionContent>
              <p>
                Developers can browse our marketplace of AI models and datasets. They can easily deploy these models into their applications using our provided APIs and SDKs.  We also offer monitoring tools to track model performance.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>What is Arweave and why is it used?</AccordionTrigger>
            <AccordionContent>
              <p>
                Arweave is a permanent data storage protocol. By leveraging Arweave, we ensure that contributed datasets and trained models are permanently available and accessible to the community. This fosters transparency and trust in the AI development process.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}