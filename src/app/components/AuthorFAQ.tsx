import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AuthorFAQSection = () => {
  const faqs = [
    {
      question: "How do you manage writer's block and stay creative?",
      answer: "I maintain a consistent writing routine and keep an 'idea journal' for inspiration. When blocked, I try free writing exercises, take walks in nature, or read other authors' works. Sometimes, stepping away from writing for a short break helps refresh my creativity. The key is not to force it but to stay engaged with the creative process in different ways."
    },
    {
      question: "What's your editing and revision process like?",
      answer: "My editing process involves multiple rounds. First, I do a structural edit focusing on plot and character development. Then, I review for pacing and consistency. The third round focuses on line editing for language and style. Finally, I do a thorough proofread. I also work with beta readers and professional editors to get different perspectives."
    },
    {
      question: "How long does it typically take you to complete a book?",
      answer: "The timeline varies significantly depending on the project. Generally, the first draft takes 4-6 months of dedicated writing. Then, the editing and revision process can take another 3-4 months. Including research time and final polishing, a complete book usually takes about a year from concept to final manuscript."
    },
    {
      question: "Do you plan your stories in advance or write as you go?",
      answer: "I use a hybrid approach. I create a basic outline with major plot points and character arcs before starting, but I allow for flexibility and organic development as I write. This balance helps maintain structure while leaving room for creative discoveries and character evolution during the writing process."
    },
    {
      question: "What advice would you give to aspiring authors?",
      answer: "Read extensively in and outside your genre. Write regularly, even if it's just for 30 minutes a day. Join writing communities for support and feedback. Don't wait for perfect conditions to start writing - begin now and improve as you go. Remember that every published author started as a beginner, and persistence is often more important than natural talent."
    }
  ];

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default AuthorFAQSection;