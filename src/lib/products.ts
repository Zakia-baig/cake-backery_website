import chocolateCake from "@/assets/p-chocolate-cake.jpg";
import redVelvet from "@/assets/p-redvelvet.jpg";
import donutBox from "@/assets/p-donut-box.jpg";
import chocoDonut from "@/assets/p-choco-donut.jpg";
import croissant from "@/assets/p-croissant.jpg";
import cupcakeBox from "@/assets/p-cupcake-box.jpg";
import strawberryTart from "@/assets/p-strawberry-tart.jpg";
import catCakes from "@/assets/cat-cakes.jpg";
import catCupcakes from "@/assets/cat-cupcakes.jpg";
import vanillaCake from "@/assets/p-vanilla-cake.jpg";
import strawberryDonut from "@/assets/p-strawberry-donut.jpg";
import chocoCupcake from "@/assets/p-choco-cupcake.jpg";
import painChocolat from "@/assets/p-pain-chocolat.jpg";
import blueberryCheesecake from "@/assets/p-blueberry-cheesecake.jpg";
import blackForest from "@/assets/p-black-forest.jpg";
import glazedDonuts from "@/assets/p-glazed-donuts.jpg";
import vanillaCupcake from "@/assets/p-vanilla-cupcake.jpg";
import lemonTart from "@/assets/p-lemon-tart.jpg";
import cinnamonRoll from "@/assets/p-cinnamon-roll.jpg";

export type Category = "cakes" | "donuts" | "pastries" | "cupcakes";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  // Cakes
  { id: "choco-rose-cake", name: "Chocolate Rose Cake", price: 2500, category: "cakes", image: chocolateCake, description: "Rich Belgian chocolate ganache cake topped with handcrafted pink sugar roses. Perfect for birthdays and celebrations.", featured: true },
  { id: "red-velvet", name: "Classic Red Velvet", price: 2200, category: "cakes", image: redVelvet, description: "Velvety smooth red sponge layered with our signature cream cheese frosting.", featured: true },
  { id: "strawberry-bliss", name: "Strawberry Bliss Slice", price: 650, category: "cakes", image: catCakes, description: "Light vanilla sponge with fresh strawberries and whipped cream — an everyday favourite." },
  { id: "vanilla-birthday", name: "Vanilla Birthday Cake", price: 2400, category: "cakes", image: vanillaCake, description: "Fluffy vanilla sponge with pink buttercream and rainbow sprinkles. The perfect birthday treat." },
  { id: "black-forest", name: "Black Forest Cake", price: 2800, category: "cakes", image: blackForest, description: "Decadent chocolate sponge with whipped cream, dark cherries and chocolate shavings.", featured: true },
  { id: "blueberry-cheesecake", name: "Blueberry Cheesecake", price: 1800, category: "cakes", image: blueberryCheesecake, description: "Creamy New York cheesecake swirled with fresh blueberry compote on a buttery biscuit base." },

  // Donuts
  { id: "donut-half-dozen", name: "Half Dozen Donut Box", price: 1200, category: "donuts", image: donutBox, description: "Six freshly glazed donuts in assorted flavours — chocolate, strawberry, vanilla and more.", featured: true },
  { id: "choco-sprinkle-donut", name: "Choco Sprinkle Donut", price: 250, category: "donuts", image: chocoDonut, description: "Soft brioche donut dipped in dark chocolate glaze with pink sprinkles." },
  { id: "strawberry-donut", name: "Strawberry Glaze Donut", price: 250, category: "donuts", image: strawberryDonut, description: "Pillowy donut topped with sweet strawberry glaze and crunchy sprinkles." },
  { id: "glazed-dozen", name: "Classic Glazed Dozen", price: 2000, category: "donuts", image: glazedDonuts, description: "A dozen warm, classic glazed donuts — straight from the oven to your door." },

  // Pastries
  { id: "butter-croissant", name: "Butter Croissant", price: 320, category: "pastries", image: croissant, description: "Flaky, buttery and baked fresh every morning. Best paired with a hot coffee." },
  { id: "strawberry-tart", name: "Strawberry Cream Tart", price: 850, category: "pastries", image: strawberryTart, description: "Buttery shortcrust filled with vanilla cream and topped with fresh strawberries." },
  { id: "pain-chocolat", name: "Pain au Chocolat", price: 380, category: "pastries", image: painChocolat, description: "Buttery laminated pastry wrapped around rich dark chocolate batons." },
  { id: "lemon-tart", name: "Lemon Meringue Tart", price: 950, category: "pastries", image: lemonTart, description: "Zesty lemon curd in a crisp shell, topped with toasted Italian meringue." },
  { id: "cinnamon-roll", name: "Cinnamon Roll", price: 350, category: "pastries", image: cinnamonRoll, description: "Soft cinnamon swirl bun finished with sweet cream cheese icing." },

  // Cupcakes
  { id: "cupcake-half-dozen", name: "Pink Cupcake Box", price: 1500, category: "cupcakes", image: cupcakeBox, description: "Six vanilla cupcakes topped with silky pink buttercream and edible pearls.", featured: true },
  { id: "choco-cupcake", name: "Chocolate Fudge Cupcake", price: 280, category: "cupcakes", image: chocoCupcake, description: "Rich chocolate cupcake topped with creamy chocolate fudge swirl and chips." },
  { id: "vanilla-cupcake", name: "Vanilla Sprinkle Cupcake", price: 260, category: "cupcakes", image: vanillaCupcake, description: "Classic vanilla cupcake with vanilla buttercream and rainbow sprinkles." },
];

export const categories: { id: Category; label: string; image: string }[] = [
  { id: "cakes", label: "Cakes", image: catCakes },
  { id: "donuts", label: "Donuts", image: glazedDonuts },
  { id: "pastries", label: "Pastries", image: croissant },
  { id: "cupcakes", label: "Cupcakes", image: catCupcakes },
];

export function formatPKR(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
