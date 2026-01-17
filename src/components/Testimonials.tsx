import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I bought this for my daughter. It helps me breathe easier.",
  },
  {
    quote: "It's comforting knowing help is literally on my keys.",
  },
  {
    quote: "This is one of the most meaningful gifts I've ever given.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          What People Feel When They Hold It
        </h2>
        
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-secondary/50 rounded-xl border border-border relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 left-4" />
              <p className="text-base italic pt-6 text-center">"{item.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
