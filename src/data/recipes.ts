import salmonBowl from "@/assets/salmon-bowl.jpg";
import carbonara from "@/assets/carbonara.jpg";
import linguine from "@/assets/linguine.jpg";
import pizza from "@/assets/pizza.jpg";
import pokeBowl from "@/assets/poke-bowl.jpg";
import pesto from "@/assets/pesto.jpg";
import bolonhesa from "@/assets/bolonhesa.jpg";
import fusilli from "@/assets/fusilli.jpg";
import donuts from "@/assets/donuts.jpg";
import tortaFrutas from "@/assets/torta-frutas.jpg";
import lasanha from "@/assets/lasanha-vegetais.jpg";

export interface Recipe {
  slug: string;
  image: string;
  title: string;
  tagLabel: string;
  description: string;
  time: string;
  difficulty: string;
  servings: string;
  calories: string;
  rating: number;
  category: string[];
  ingredients: string[];
  steps: { title: string; description: string }[];
}

export const allRecipes: Recipe[] = [
  {
    slug: "bowl-de-salmao",
    image: salmonBowl,
    title: "Bowl de Salmão ao Mel e Gergelim",
    tagLabel: "ALMOÇO SAUDÁVEL",
    description: "Uma explosão de texturas e sabores cítricos que transformam sua refeição em uma experiência de restaurante no conforto de casa.",
    time: "25 min", difficulty: "Médio", servings: "2 Pessoas", calories: "420 Cal", rating: 4.8,
    category: ["Saudável", "Almoço"],
    ingredients: ["250g de filé de salmão fresco", "1 colher de sopa de mel orgânico", "1/2 abacate maduro fatiado", "Mix de folhas verdes (rúcula e alface)", "Gergelim tostado para finalizar"],
    steps: [
      { title: "Marinar o Salmão", description: "Misture o mel, shoyu e gergelim em um bowl pequeno. Pincele generosamente sobre o filé de salmão e deixe descansar por 10 minutos." },
      { title: "Selagem em Fogo Alto", description: "Aqueça uma frigideira antiaderente com um fio de azeite. Grelhe o salmão por 3 minutos de cada lado." },
      { title: "Montagem Editorial", description: "Crie uma base com as folhas verdes, posicione o salmão ao centro e rodeie com fatias de abacate." },
    ],
  },
  {
    slug: "carbonara-autentica",
    image: carbonara,
    title: "Carbonara Autêntica",
    tagLabel: "MASSA CLÁSSICA",
    description: "A verdadeira carbonara italiana com guanciale, pecorino e ovos — cremosa sem usar creme de leite.",
    time: "20 min", difficulty: "Médio", servings: "2 Pessoas", calories: "520 Cal", rating: 4.7,
    category: ["Italiana", "Jantar", "Salgado"],
    ingredients: ["400g de espaguete", "150g de guanciale", "4 gemas de ovo", "100g de pecorino romano", "Pimenta-do-reino a gosto"],
    steps: [
      { title: "Cozinhar a Massa", description: "Cozinhe o espaguete em água abundante com sal até ficar al dente. Reserve 1 xícara da água do cozimento." },
      { title: "Preparar o Guanciale", description: "Corte o guanciale em cubos e frite em fogo médio até ficar crocante e dourado." },
      { title: "Montar a Carbonara", description: "Misture as gemas com pecorino ralado. Junte a massa ao guanciale fora do fogo e adicione a mistura de ovos." },
    ],
  },
  {
    slug: "linguine-ao-limone",
    image: linguine,
    title: "Linguine ao Limone e Parmesão",
    tagLabel: "RÁPIDO & FÁCIL",
    description: "Uma massa leve e perfumada com limão siciliano e parmesão — pronta em 20 minutos.",
    time: "20 min", difficulty: "Fácil", servings: "2 Pessoas", calories: "380 Cal", rating: 4.9,
    category: ["Italiana", "Rápido", "Salgado"],
    ingredients: ["400g de linguine", "2 limões sicilianos", "80g de parmesão", "Manteiga sem sal", "Manjericão fresco"],
    steps: [
      { title: "Cozinhar a Massa", description: "Cozinhe o linguine al dente e reserve a água do cozimento." },
      { title: "Preparar o Molho", description: "Derreta manteiga, adicione suco e raspas de limão. Junte a massa e o parmesão." },
      { title: "Finalizar", description: "Ajuste a cremosidade com a água do cozimento e finalize com manjericão fresco." },
    ],
  },
  {
    slug: "poke-bowl-salmao",
    image: pokeBowl,
    title: "Poke Bowl de Salmão Fresco",
    tagLabel: "SAUDÁVEL",
    description: "Bowl havaiano com salmão fresco, arroz, edamame e molho ponzu.",
    time: "15 min", difficulty: "Fácil", servings: "1 Pessoa", calories: "350 Cal", rating: 4.7,
    category: ["Saudável", "Almoço", "Rápido"],
    ingredients: ["200g de salmão para sashimi", "1 xícara de arroz japonês", "Edamame", "Pepino fatiado", "Molho ponzu"],
    steps: [
      { title: "Preparar o Arroz", description: "Cozinhe o arroz japonês e tempere com vinagre de arroz." },
      { title: "Cortar o Salmão", description: "Corte o salmão em cubos e marine no molho ponzu por 5 minutos." },
      { title: "Montar o Bowl", description: "Monte o bowl com arroz na base, salmão, edamame e pepino." },
    ],
  },
  {
    slug: "pizza-margherita",
    image: pizza,
    title: "Pizza Margherita Artesanal",
    tagLabel: "CLÁSSICA",
    description: "A pizza margherita perfeita com massa fina, molho de tomate San Marzano e mozzarella de búfala.",
    time: "45 min", difficulty: "Chef", servings: "2 Pessoas", calories: "680 Cal", rating: 5.0,
    category: ["Italiana", "Jantar", "Salgado"],
    ingredients: ["300g de farinha tipo 00", "Molho de tomate San Marzano", "Mozzarella de búfala", "Manjericão fresco", "Azeite extra virgem"],
    steps: [
      { title: "Preparar a Massa", description: "Misture farinha, água, fermento e sal. Sove por 10 minutos e deixe descansar por 1 hora." },
      { title: "Montar a Pizza", description: "Abra a massa, espalhe o molho e distribua a mozzarella." },
      { title: "Assar", description: "Asse em forno pré-aquecido a 250°C por 10-12 minutos até dourar." },
    ],
  },
  {
    slug: "macarrao-pesto",
    image: pesto,
    title: "Macarrão com Pesto de Manjericão",
    tagLabel: "RÁPIDO",
    description: "Pesto fresco e aromático com manjericão, pinhões e parmesão.",
    time: "15 min", difficulty: "Fácil", servings: "2 Pessoas", calories: "450 Cal", rating: 4.8,
    category: ["Italiana", "Rápido", "Salgado"],
    ingredients: ["400g de penne", "2 xícaras de manjericão", "50g de pinhões", "80g de parmesão", "Azeite extra virgem"],
    steps: [
      { title: "Fazer o Pesto", description: "Bata manjericão, pinhões, parmesão e azeite no processador." },
      { title: "Cozinhar e Misturar", description: "Cozinhe a massa al dente e misture com o pesto." },
    ],
  },
  {
    slug: "espaguete-bolonhesa",
    image: bolonhesa,
    title: "Espaguete à Bolonhesa Clássico",
    tagLabel: "CLÁSSICA",
    description: "O ragù alla bolognese tradicional, cozido lentamente com carne, tomate e ervas.",
    time: "45 min", difficulty: "Médio", servings: "4 Pessoas", calories: "580 Cal", rating: 4.9,
    category: ["Italiana", "Jantar", "Salgado"],
    ingredients: ["500g de espaguete", "300g de carne moída", "Molho de tomate", "Cebola, cenoura e salsão", "Vinho tinto"],
    steps: [
      { title: "Refogar os Vegetais", description: "Pique e refogue cebola, cenoura e salsão em azeite." },
      { title: "Cozinhar a Carne", description: "Adicione a carne e doure. Junte vinho tinto e molho de tomate." },
      { title: "Finalizar", description: "Cozinhe em fogo baixo por 30 minutos e sirva sobre o espaguete al dente." },
    ],
  },
  {
    slug: "fusilli-tomate-seco",
    image: fusilli,
    title: "Fusilli com Tomate Seco",
    tagLabel: "RÁPIDO",
    description: "Massa rápida e saborosa com tomate seco, rúcula e parmesão.",
    time: "12 min", difficulty: "Muito Fácil", servings: "2 Pessoas", calories: "400 Cal", rating: 4.6,
    category: ["Italiana", "Rápido", "Salgado"],
    ingredients: ["400g de fusilli", "100g de tomate seco", "Rúcula fresca", "Parmesão ralado", "Azeite"],
    steps: [
      { title: "Cozinhar a Massa", description: "Cozinhe o fusilli al dente." },
      { title: "Montar", description: "Misture com tomate seco picado, rúcula, parmesão e um fio de azeite." },
    ],
  },
  {
    slug: "donuts-baunilha",
    image: donuts,
    title: "Donuts de Baunilha",
    tagLabel: "SOBREMESA",
    description: "Donuts fofos e irresistíveis com cobertura de baunilha.",
    time: "45 min", difficulty: "Média", servings: "8 Unidades", calories: "280 Cal", rating: 5.0,
    category: ["Sobremesa", "Doce"],
    ingredients: ["2 xícaras de farinha", "1/2 xícara de açúcar", "2 ovos", "1 colher de extrato de baunilha", "Cobertura de açúcar de confeiteiro"],
    steps: [
      { title: "Preparar a Massa", description: "Misture os ingredientes secos, adicione ovos e baunilha até formar massa homogênea." },
      { title: "Fritar", description: "Modele os donuts e frite em óleo quente até dourar." },
      { title: "Cobrir", description: "Mergulhe os donuts na cobertura de baunilha e deixe secar." },
    ],
  },
  {
    slug: "torta-frutas-vermelhas",
    image: tortaFrutas,
    title: "Torta de Frutas Vermelhas",
    tagLabel: "SOBREMESA",
    description: "Torta com massa amanteigada e recheio cremoso coberto com frutas vermelhas frescas.",
    time: "60 min", difficulty: "Média", servings: "8 Fatias", calories: "320 Cal", rating: 4.7,
    category: ["Sobremesa", "Doce"],
    ingredients: ["200g de farinha", "100g de manteiga", "Creme pâtissier", "Morangos e mirtilos", "Geleia para pincelar"],
    steps: [
      { title: "Preparar a Massa", description: "Misture farinha e manteiga até formar uma farofa. Adicione água gelada e modele na forma." },
      { title: "Assar a Base", description: "Asse a massa a 180°C por 15 minutos com peso." },
      { title: "Rechear e Decorar", description: "Preencha com creme pâtissier e decore com as frutas." },
    ],
  },
  {
    slug: "lasanha-vegetais",
    image: lasanha,
    title: "Lasanha de Vegetais ao Forno",
    tagLabel: "VEGGIE",
    description: "Uma versão leve e suculenta da clássica lasanha, recheada com abobrinha, berinjela e molho pomodoro caseiro.",
    time: "60 min", difficulty: "Médio", servings: "4 Pessoas", calories: "380 Cal", rating: 5.0,
    category: ["Veggie", "Jantar", "Salgado"],
    ingredients: ["Massa de lasanha", "1 abobrinha", "1 berinjela", "Molho pomodoro caseiro", "Queijo gratinado"],
    steps: [
      { title: "Preparar os Vegetais", description: "Fatie a abobrinha e berinjela e grelhe levemente." },
      { title: "Montar as Camadas", description: "Alterne camadas de massa, vegetais, molho e queijo." },
      { title: "Gratinar", description: "Asse a 200°C por 30 minutos até dourar e borbulhar." },
    ],
  },
];

export const getRecipeBySlug = (slug: string) => allRecipes.find((r) => r.slug === slug);
