import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 mx-4 mt-6">
      <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar receitas..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body"
        />
      </div>
      <button className="p-2.5 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground transition-colors">
        <SlidersHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBar;
