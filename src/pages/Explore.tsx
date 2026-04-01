import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import FeaturedWeekCard from "@/components/FeaturedWeekCard";
import RecipeListCard from "@/components/RecipeListCard";
import { allRecipes } from "@/data/recipes";

const filters = ["Rápido", "Veggie", "Sobremesa", "Saudável", "Italiana", "Doce", "Salgado", "Jantar", "Almoço"];

const Explore = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const featured = allRecipes.find((r) => r.slug === "lasanha-vegetais")!;

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allRecipes.filter((r) => {
      // Search by name, difficulty, or category
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.difficulty.toLowerCase().includes(q) ||
        r.category.some((c) => c.toLowerCase().includes(q)) ||
        r.tagLabel.toLowerCase().includes(q);

      // Filter chips match categories
      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.some((f) => r.category.includes(f));

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, activeFilters]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      {/* Search */}
      <div className="flex items-center gap-2 mx-4 mt-4">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, dificuldade, categoria..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mt-3 overflow-x-auto px-4 pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-body font-medium border transition-colors ${
              activeFilters.includes(f)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Featured week */}
      {!searchQuery && activeFilters.length === 0 && (
        <div className="px-4 mt-5">
          <FeaturedWeekCard
            image={featured.image}
            title={featured.title}
            description={featured.description}
            time={featured.time}
            rating={featured.rating}
            slug={featured.slug}
          />
        </div>
      )}

      {/* Results */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="font-heading font-bold text-base text-foreground">
              {searchQuery || activeFilters.length > 0
                ? `Resultados${searchQuery ? ` para '${searchQuery}'` : ""}`
                : "Todas as Receitas"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {filtered.length === 0
                ? "Nenhuma receita encontrada"
                : `Encontramos ${filtered.length} receita${filtered.length > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          {filtered.map((r) => (
            <RecipeListCard key={r.slug} image={r.image} title={r.title} rating={r.rating} time={r.time} difficulty={r.difficulty} slug={r.slug} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Explore;
