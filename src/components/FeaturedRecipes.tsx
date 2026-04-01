import { ArrowRight } from "lucide-react";
import RecipeCard from "./RecipeCard";
import linguine from "@/assets/linguine.jpg";
import pokeBowl from "@/assets/poke-bowl.jpg";
import pizza from "@/assets/pizza.jpg";

const recipes = [
  { image: linguine, title: "Linguine ao Limone e Parmesão", rating: 4.9, time: "20 min", tag: "Fácil", tagColor: "primary" as const, slug: "linguine-ao-limone" },
  { image: pokeBowl, title: "Poke Bowl de Salmão Fresco", rating: 4.7, time: "15 min", tag: "Saudável", tagColor: "accent" as const, slug: "poke-bowl-salmao" },
  { image: pizza, title: "Pizza Marguerita Artesanal", rating: 5, time: "45 min", tag: "Chef", tagColor: "primary" as const, slug: "pizza-margherita" },
];

const FeaturedRecipes = () => {
  return (
    <section className="mt-8 px-4">
      <div className="flex items-end justify-between mb-1">
        <div>
          <h2 className="font-heading font-bold text-lg text-foreground">Receitas em Destaque</h2>
          <p className="text-sm text-muted-foreground">As favoritas da nossa comunidade</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Ver tudo <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-3 mt-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {recipes.map((r) => (
          <RecipeCard key={r.title} {...r} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
