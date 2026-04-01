import { ArrowLeft, Heart, Share2, Clock, Users, ChefHat, CheckCircle, Play } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { getRecipeBySlug } from "@/data/recipes";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { requireAuth } = useAuth();
  const recipe = slug ? getRecipeBySlug(slug) : null;
  const favorited = slug ? isFavorite(slug) : false;

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-body">Receita não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-lg text-foreground">Receitinhas</h1>
          <div className="flex items-center gap-1">
            <button
              onClick={() => slug && requireAuth(() => toggleFavorite(slug))}
              className="p-2 text-foreground"
            >
              <Heart className={`w-5 h-5 transition-colors ${favorited ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button className="p-2 -mr-2 text-foreground"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      <div className="relative">
        <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover" width={640} height={640} />
      </div>

      <div className="flex justify-center gap-3 -mt-5 relative z-10 px-4">
        <div className="flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-2 shadow-sm">
          <Clock className="w-4 h-4 text-primary" />
          <div className="text-center">
            <p className="text-xs font-heading font-bold text-foreground leading-tight">{recipe.time}</p>
            <p className="text-[10px] text-muted-foreground">Preparo</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-2 shadow-sm">
          <ChefHat className="w-4 h-4 text-primary" />
          <div className="text-center">
            <p className="text-xs font-heading font-bold text-foreground leading-tight">{recipe.difficulty}</p>
            <p className="text-[10px] text-muted-foreground">Dificuldade</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-2 shadow-sm">
          <Users className="w-4 h-4 text-primary" />
          <div className="text-center">
            <p className="text-xs font-heading font-bold text-foreground leading-tight">{recipe.servings}</p>
            <p className="text-[10px] text-muted-foreground">Porções</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5">
        <span className="text-[10px] font-heading font-bold text-primary tracking-widest uppercase">{recipe.tagLabel}</span>
        <h2 className="font-heading font-bold text-xl text-foreground mt-1">{recipe.title}</h2>
        <p className="text-sm text-muted-foreground font-body mt-2 leading-relaxed">{recipe.description}</p>
      </div>

      <div className="px-4 mt-6">
        <h3 className="font-heading font-bold text-base text-foreground flex items-center gap-2">🛒 Ingredientes</h3>
        <ul className="mt-3 space-y-2.5">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground font-body">{ing}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 bg-primary/10 rounded-xl px-4 py-3 text-center">
          <p className="text-[10px] text-primary font-heading font-bold uppercase tracking-wider">KCAL TOTAIS</p>
          <p className="text-lg font-heading font-bold text-primary">{recipe.calories}</p>
        </div>
      </div>

      <div className="px-4 mt-6">
        <h3 className="font-heading font-bold text-base text-foreground flex items-center gap-2">👨‍🍳 Modo de Preparo</h3>
        <div className="mt-4 space-y-4">
          {recipe.steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm">
                {i + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-bold text-sm text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-8 mb-4">
        <Button className="w-full rounded-full h-12 text-base font-heading font-bold gap-2">
          <Play className="w-5 h-5" />
          Começar agora
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default RecipeDetail;
