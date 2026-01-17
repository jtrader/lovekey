const WhySection = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Love Key™ Exists</h2>
        <p className="text-lg text-muted-foreground mb-4">
          We created Love Key™ from a simple idea:
        </p>
        <p className="text-xl font-medium text-foreground mb-6">
          What if help could be closer, easier, and more human?
        </p>
        <p className="text-base text-muted-foreground mb-8">
          In moments of panic, confusion, or emotional pain, it's hard to remember numbers, steps, or what to do next. Love Key™ removes that burden. It gently guides you to the right place, right when you need it.
        </p>
        <div className="bg-background rounded-xl p-6 border border-border">
          <p className="text-lg font-medium italic">
            It's not just a keyring.
          </p>
          <p className="text-lg font-medium italic text-primary">
            It's reassurance in your pocket.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
