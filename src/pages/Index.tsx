import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import CTASection from "@/components/CTASection";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <HeroBanner />
      <FeaturedRecipes />
      <SearchBar />
      <CategoryGrid />
      <CTASection />
      <BottomNav />
    </div>
  );
};

export default Index;
