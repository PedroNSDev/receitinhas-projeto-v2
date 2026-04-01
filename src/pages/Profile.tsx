import { Settings, Plus, Pencil, Trash2, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import RecipeCard from "@/components/RecipeCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCollections } from "@/contexts/CollectionsContext";
import { useAuth } from "@/contexts/AuthContext";
import { allRecipes } from "@/data/recipes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import carbonara from "@/assets/carbonara.jpg";
import donuts from "@/assets/donuts.jpg";
import tortaFrutas from "@/assets/torta-frutas.jpg";
import pizza from "@/assets/pizza.jpg";

const myRecipes = [
  { image: carbonara, title: "Carbonara Autêntica", rating: 4.9, time: "25 min", tag: "Fácil", slug: "carbonara-autentica" },
  { image: donuts, title: "Donuts de Baunilha", rating: 5.0, time: "45 min", tag: "Média", slug: "donuts-baunilha" },
  { image: tortaFrutas, title: "Torta de Frutas Vermelhas", rating: 4.7, time: "60 min", tag: "Média", slug: "torta-frutas-vermelhas" },
  { image: pizza, title: "Pizza Margherita Caseira", rating: 4.8, time: "30 min", tag: "Fácil", slug: "pizza-margherita" },
];

const Profile = () => {
  const { collections, createCollection, renameCollection, deleteCollection, addRecipeToCollection, removeRecipeFromCollection } = useCollections();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState<string | null>(null);
  const [showAddRecipeDialog, setShowAddRecipeDialog] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const handleCreate = () => {
    if (newName.trim()) {
      createCollection(newName.trim());
      setNewName("");
      setShowCreateDialog(false);
      toast.success("Coleção criada!");
    }
  };

  const handleRename = () => {
    if (newName.trim() && showRenameDialog) {
      renameCollection(showRenameDialog, newName.trim());
      setNewName("");
      setShowRenameDialog(null);
      toast.success("Coleção renomeada!");
    }
  };

  const handleAddRecipe = (collectionId: string, slug: string) => {
    const added = addRecipeToCollection(collectionId, slug);
    if (!added) {
      toast.error("Essa receita já está nessa coleção!");
    } else {
      toast.success("Receita adicionada!");
      setShowAddRecipeDialog(null);
    }
  };

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="w-5" />
            <h1 className="font-heading font-bold text-lg text-foreground">Receitinhas</h1>
            <div className="w-5" />
          </div>
        </header>
        <div className="flex flex-col items-center justify-center px-6 pt-20">
          <Avatar className="w-20 h-20 mb-4">
            <AvatarFallback className="text-2xl font-heading font-bold text-muted-foreground">?</AvatarFallback>
          </Avatar>
          <h2 className="font-heading font-bold text-xl text-foreground">Entre na sua conta</h2>
          <p className="text-sm text-muted-foreground text-center mt-2 font-body">
            Faça login para ver seu perfil, criar coleções e salvar receitas favoritas.
          </p>
          <Button onClick={() => navigate("/login")} className="mt-6 rounded-full gap-2 font-heading font-bold">
            <LogIn className="w-4 h-4" /> Entrar ou Cadastrar
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="w-5" />
          <h1 className="font-heading font-bold text-lg text-foreground">Receitinhas</h1>
          <button onClick={logout} className="p-2 -mr-2 text-foreground" title="Sair">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="flex flex-col items-center px-4 pt-6 pb-4">
        <Avatar className="w-20 h-20 mb-3">
          <AvatarFallback className="text-lg font-heading font-bold">{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="font-heading font-bold text-xl text-foreground">{user?.username}</h2>
        <p className="text-sm text-muted-foreground mt-2 text-center font-body">
          Bem-vindo ao seu perfil! 🍝🍰
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 px-4 pb-5">
        {[
          { value: String(myRecipes.length), label: "Receitas" },
          { value: String(collections.length), label: "Coleções" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="font-heading font-bold text-lg text-foreground">{stat.value}</span>
            <span className="text-xs text-muted-foreground font-body">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="minhas" className="px-4">
        <TabsList className="w-full bg-muted">
          <TabsTrigger value="minhas" className="flex-1 font-heading text-sm">Minhas Receitas</TabsTrigger>
          <TabsTrigger value="colecoes" className="flex-1 font-heading text-sm">Coleções</TabsTrigger>
        </TabsList>

        <TabsContent value="minhas">
          <div className="grid grid-cols-2 gap-3 mt-3">
            {myRecipes.map((r) => (
              <RecipeCard key={r.title} {...r} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="colecoes">
          <div className="mt-3 space-y-3">
            <Button
              variant="outline"
              className="w-full border-dashed border-border text-muted-foreground font-body"
              onClick={() => { setNewName(""); setShowCreateDialog(true); }}
            >
              <Plus className="w-4 h-4 mr-2" /> Nova Coleção
            </Button>

            {collections.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8 font-body">Nenhuma coleção criada.</p>
            ) : (
              collections.map((col) => (
                <div key={col.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-semibold text-foreground text-sm">{col.name}</h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => { setNewName(col.name); setShowRenameDialog(col.id); }}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => { deleteCollection(col.id); toast.success("Coleção excluída!"); }}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-body mb-2">
                    {col.recipes.length} receita{col.recipes.length !== 1 ? "s" : ""}
                  </p>
                  {col.recipes.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                      {col.recipes.map((slug) => {
                        const recipe = allRecipes.find((r) => r.slug === slug);
                        if (!recipe) return null;
                        return (
                          <div
                            key={slug}
                            onClick={() => navigate(`/receita/${slug}`)}
                            className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer group"
                          >
                            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                            <button
                              onClick={(e) => { e.stopPropagation(); removeRecipeFromCollection(col.id, slug); }}
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            >
                              <Trash2 className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-xs text-primary font-body"
                    onClick={() => setShowAddRecipeDialog(col.id)}
                  >
                    <Plus className="w-3 h-3 mr-1" /> Adicionar receita
                  </Button>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Collection Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading">Nova Coleção</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Nome da coleção"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            className="font-body"
          />
          <DialogFooter>
            <Button onClick={handleCreate} className="font-body">Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Collection Dialog */}
      <Dialog open={!!showRenameDialog} onOpenChange={() => setShowRenameDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading">Renomear Coleção</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Novo nome"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            className="font-body"
          />
          <DialogFooter>
            <Button onClick={handleRename} className="font-body">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Recipe to Collection Dialog */}
      <Dialog open={!!showAddRecipeDialog} onOpenChange={() => setShowAddRecipeDialog(null)}>
        <DialogContent className="max-w-sm max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Adicionar Receita</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {allRecipes.map((r) => {
              const alreadyIn = showAddRecipeDialog ? collections.find((c) => c.id === showAddRecipeDialog)?.recipes.includes(r.slug) : false;
              return (
                <button
                  key={r.slug}
                  disabled={alreadyIn}
                  onClick={() => showAddRecipeDialog && handleAddRecipe(showAddRecipeDialog, r.slug)}
                  className={`flex items-center gap-3 w-full p-2 rounded-lg text-left transition-colors ${
                    alreadyIn ? "opacity-40 cursor-not-allowed" : "hover:bg-muted cursor-pointer"
                  }`}
                >
                  <img src={r.image} alt={r.title} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-heading font-semibold text-foreground truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground font-body">{alreadyIn ? "Já adicionada" : r.time}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Profile;
