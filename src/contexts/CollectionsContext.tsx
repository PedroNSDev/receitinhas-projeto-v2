import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Collection {
  id: string;
  name: string;
  recipes: string[]; // slugs
}

interface CollectionsContextType {
  collections: Collection[];
  createCollection: (name: string) => void;
  renameCollection: (id: string, name: string) => void;
  deleteCollection: (id: string) => void;
  addRecipeToCollection: (collectionId: string, slug: string) => boolean;
  removeRecipeFromCollection: (collectionId: string, slug: string) => void;
  isRecipeInCollection: (collectionId: string, slug: string) => boolean;
}

const CollectionsContext = createContext<CollectionsContextType>({
  collections: [],
  createCollection: () => {},
  renameCollection: () => {},
  deleteCollection: () => {},
  addRecipeToCollection: () => false,
  removeRecipeFromCollection: () => {},
  isRecipeInCollection: () => false,
});

export const useCollections = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }: { children: ReactNode }) => {
  const [collections, setCollections] = useState<Collection[]>(() => {
    try {
      const stored = localStorage.getItem("collections");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  const createCollection = (name: string) => {
    setCollections((prev) => [...prev, { id: crypto.randomUUID(), name, recipes: [] }]);
  };

  const renameCollection = (id: string, name: string) => {
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  const addRecipeToCollection = (collectionId: string, slug: string): boolean => {
    const col = collections.find((c) => c.id === collectionId);
    if (col?.recipes.includes(slug)) return false;
    setCollections((prev) =>
      prev.map((c) => (c.id === collectionId ? { ...c, recipes: [...c.recipes, slug] } : c))
    );
    return true;
  };

  const removeRecipeFromCollection = (collectionId: string, slug: string) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === collectionId ? { ...c, recipes: c.recipes.filter((s) => s !== slug) } : c))
    );
  };

  const isRecipeInCollection = (collectionId: string, slug: string) => {
    return collections.find((c) => c.id === collectionId)?.recipes.includes(slug) ?? false;
  };

  return (
    <CollectionsContext.Provider
      value={{ collections, createCollection, renameCollection, deleteCollection, addRecipeToCollection, removeRecipeFromCollection, isRecipeInCollection }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
