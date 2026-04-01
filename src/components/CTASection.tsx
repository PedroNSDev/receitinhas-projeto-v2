const CTASection = () => {
  return (
    <section className="mx-4 mt-8 mb-4 bg-primary rounded-2xl p-6 text-center">
      <h2 className="font-heading font-bold text-lg text-primary-foreground">
        Quer compartilhar sua receita?
      </h2>
      <p className="font-body text-sm text-primary-foreground/80 mt-1">
        Junte-se a milhares de cozinheiros e mostre seu talento para o mundo.
      </p>
      <button className="mt-4 bg-primary-foreground text-primary font-heading font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
        Começar agora
      </button>
    </section>
  );
};

export default CTASection;
