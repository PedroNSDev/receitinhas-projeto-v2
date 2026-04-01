import { Star, Clock, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";

interface RecipeCardProps {
  image: string;
  title: string;
  rating: number;
  time: string;
  tag: string;
  tagColor?: "primary" | "accent";
  slug?: string;
}

const tagStyles = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
};

const RecipeCard = ({ image, title, rating, time, tag, tagColor = "primary", slug }: RecipeCardProps) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { requireAuth } = useAuth();
  const favorited = slug ? isFavorite(slug) : false;

  return (
    <div
      onClick={() => slug && navigate(`/receita/${slug}`)}
      className="min-w-[200px] max-w-[200px] rounded-xl overflow-hidden bg-card shadow-sm border border-border flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="relative h-36">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" width={640} height={640} />
        <div className="absolute top-2 right-2 bg-foreground/70 text-primary-foreground rounded-full px-2 py-0.5 flex items-center gap-1 text-xs font-heading font-semibold">
          <Star className="w-3 h-3 fill-current text-amber-400" />
          {rating}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); slug && requireAuth(() => toggleFavorite(slug)); }}
          className="absolute top-2 left-2 p-1.5 bg-foreground/40 rounded-full text-primary-foreground hover:bg-foreground/60 transition-colors"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${favorited ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-heading font-semibold text-sm text-card-foreground leading-snug line-clamp-2">{title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {time}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagStyles[tagColor]}`}>
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
