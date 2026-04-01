import { Star, Clock, UtensilsCrossed, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";

interface RecipeListCardProps {
  image: string;
  title: string;
  rating: number;
  time: string;
  difficulty: string;
  slug?: string;
}

const RecipeListCard = ({ image, title, rating, time, difficulty, slug }: RecipeListCardProps) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { requireAuth } = useAuth();
  const favorited = slug ? isFavorite(slug) : false;

  return (
    <div
      onClick={() => slug && navigate(`/receita/${slug}`)}
      className="flex gap-3 bg-card rounded-xl border border-border p-3 cursor-pointer hover:shadow-sm transition-shadow"
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" width={512} height={512} />
        <div className="absolute top-1 right-1 bg-foreground/70 text-primary-foreground rounded-full px-1.5 py-0.5 flex items-center gap-0.5 text-[10px] font-heading font-semibold">
          <Star className="w-2.5 h-2.5 fill-current text-amber-400" />
          {rating}
        </div>
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <h3 className="font-heading font-semibold text-sm text-card-foreground leading-snug line-clamp-2">{title}</h3>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {time}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <UtensilsCrossed className="w-3 h-3" />
            {difficulty}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); slug && requireAuth(() => toggleFavorite(slug)); }}
        className="self-center p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Heart className={`w-4 h-4 transition-colors ${favorited ? "fill-red-500 text-red-500" : ""}`} />
      </button>
    </div>
  );
};

export default RecipeListCard;
