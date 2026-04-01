import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeaturedWeekCardProps {
  image: string;
  title: string;
  description: string;
  time: string;
  rating: number;
  slug?: string;
}

const FeaturedWeekCard = ({ image, title, description, time, rating, slug }: FeaturedWeekCardProps) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => slug && navigate(`/receita/${slug}`)} className="relative rounded-2xl overflow-hidden h-48 cursor-pointer">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 flex flex-col justify-end h-full p-5">
        <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-primary mb-1">
          Favorito da Semana
        </span>
        <h3 className="font-heading font-bold text-lg text-primary-foreground leading-tight">{title}</h3>
        <p className="font-body text-xs text-primary-foreground/75 mt-1 line-clamp-2 max-w-xs">{description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs text-primary-foreground/80">
            <Clock className="w-3 h-3" />
            {time}
          </span>
          <span className="flex items-center gap-1 text-xs text-primary-foreground/80">
            <Star className="w-3 h-3 fill-current text-amber-400" />
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedWeekCard;
