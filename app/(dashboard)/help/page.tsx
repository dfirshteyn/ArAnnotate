import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"


export default function HelpPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="font-inter text-[40px] font-medium mb-6">Help & FAQs</h1>

      <Accordion className="mx-5" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">
            How do I upload a dataset?
          </AccordionTrigger>
          <AccordionContent>
            Detailed instructions on how to upload a dataset, including
            supported formats, size limits, and metadata requirements.  Mention
            any specific steps related to Arweave integration.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold">
            How do I download a model?
          </AccordionTrigger>
          <AccordionContent>
            Explain the process of downloading models, including any
            authentication or access restrictions.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold">
            How does the data annotation process work?
          </AccordionTrigger>
          <AccordionContent>
            Describe the data annotation workflow, tools provided, and how
            users can contribute. Explain the future payment system for
            labeling data.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold">
            What are the ranking criteria?
          </AccordionTrigger>
          <AccordionContent>
            Explain how models and datasets are ranked, including factors like
            usage, downloads, and community ratings. Reference the
            transparency of blockchain data.
          </AccordionContent>
        </AccordionItem>

        {/* Add more AccordionItems for additional questions */}
      </Accordion>
    </div>
  )
}
