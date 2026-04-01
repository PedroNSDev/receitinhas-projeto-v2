import heroBg from "@/assets/hero-bg.jpg";

const HeroBanner = () => {
  return (
    <section className="relative mx-4 mt-4 rounded-2xl overflow-hidden h-56">
      <img
        src={heroBg}
        alt="Ingredientes frescos em uma cozinha rústica"
        className="absolute inset-0 w-full h-full object-cover"
        width={1200}
        height={672}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10 flex flex-col justify-end h-full p-6">
        <span className="text-xs font-body font-medium uppercase tracking-widest text-primary-foreground/80 mb-1">
          Destaque do Dia
        </span>
        <h2 className="font-heading font-bold text-2xl text-primary-foreground leading-tight">
          Sabores que contam histórias.
        </h2>
        <p className="font-body text-sm text-primary-foreground/80 mt-1.5 max-w-xs">
          Descubra receitas autênticas que transformam ingredientes simples em momentos inesquecíveis à mesa.
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;
