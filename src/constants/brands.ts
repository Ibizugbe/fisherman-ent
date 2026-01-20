import chefG from "../assets/brands/ChefG.png";
import simplex from "../assets/brands/simplex_exchange.png";
import bamawo from "../assets/brands//bamawo.jpeg";

export type BrandItem = { name: string; logo: string };

export const BRANDS: BrandItem[] = [
  { name: "Chef Giwa", logo: chefG },
  { name: "Simplex Exchange", logo: simplex },
  { name: "E Bamawo", logo: bamawo },
];
