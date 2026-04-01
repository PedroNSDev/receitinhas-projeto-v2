import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import RecipeListCard from "@/components/RecipeListCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { allRecipes } from "@/data/recipes";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites } = useFavorites();
  const favoriteRecipes = allRecipes.filter((r) => favorites.includes(r.slug));

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <div className="px-4 mt-5">
        <h2 className="font-heading font-bold text-lg text-foreground">Seus Favoritos</h2>
        <p className="text-sm text-muted-foreground mb-4">Receitas que você salvou com ❤️</p>
        {favoriteRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Heart className="w-12 h-12 mb-3" />
            <p className="font-body text-sm">Nenhum favorito ainda.</p>
            <p className="font-body text-xs mt-1">Toque no ❤️ nas receitas para salvar aqui.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {favoriteRecipes.map((r) => (
              <RecipeListCard key={r.slug} image={r.image} title={r.title} rating={r.rating} time={r.time} difficulty={r.difficulty} slug={r.slug} />
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Favorites;
