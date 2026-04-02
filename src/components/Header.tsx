import { Menu, Search, X, Home, Compass, Heart, User, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const menuItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: Compass, label: "Explorar", path: "/explorar" },
  { icon: Heart, label: "Favoritos", path: "/favoritos" },
  { icon: User, label: "Perfil", path: "/perfil" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => setMenuOpen(true)} className="p-2 -ml-2 text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src="src/assets/receitinhaicon..png" alt="Logo" className="w-6 h-6" />
            <h1 className="font-heading font-bold text-lg text-foreground">Receitinhas</h1>
          </div>
          <button
            onClick={() => { if (location.pathname !== "/explorar") navigate("/explorar"); }}
            className="p-2 -mr-2 text-foreground"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Overlay + Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100]" onClick={() => setMenuOpen(false)}>
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />

          {/* Sidebar */}
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border shadow-xl flex flex-col animate-in slide-in-from-left duration-200"
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-border">
              <h2 className="font-heading font-bold text-lg text-foreground">Menu</h2>
              <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2 text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {menuItems.map(({ icon: Icon, label, path }) => (
                <button
                  key={path}
                  onClick={() => { navigate(path); setMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-foreground hover:bg-muted transition-colors font-body text-sm font-medium"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </nav>

            {/* Dark mode toggle */}
            <div className="px-4 py-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDark ? <Moon className="w-5 h-5 text-foreground" /> : <Sun className="w-5 h-5 text-foreground" />}
                  <span className="text-sm font-body font-medium text-foreground">
                    {isDark ? "Modo Escuro" : "Modo Claro"}
                  </span>
                </div>
                <Switch checked={isDark} onCheckedChange={setIsDark} />
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
