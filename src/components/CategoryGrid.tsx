import { Coffee, Leaf, Cake, Drumstick, Soup, Fish } from "lucide-react";

const categories = [
  { icon: Coffee, label: "Café da Manhã" },
  { icon: Leaf, label: "Veggie" },
  { icon: Cake, label: "Doces" },
  { icon: Drumstick, label: "Carnes" },
  { icon: Soup, label: "Sopas" },
  { icon: Fish, label: "Frutos do Mar" },
];

const CategoryGrid = () => {
  return (
    <section className="mt-6 px-4">
      <h2 className="font-heading font-bold text-lg text-foreground">Explore Novas Receitas</h2>
      <p className="text-sm text-muted-foreground mb-3">Inspirações de todos os cantos do mundo</p>
      <div className="grid grid-cols-3 gap-3">
        {categories.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 py-5 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <Icon className="w-6 h-6 text-primary" />
            <span className="text-xs font-body font-medium text-foreground">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
