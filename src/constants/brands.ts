import chefG from "../assets/brands/ChefG.png";
import simplex from "../assets/brands/simplex_exchange.png";
import bamawo from "../assets/brands//bamawo.jpeg";

export type BrandItem = { name: string; logo?: string };

export const BRANDS: BrandItem[] = [
  { name: "Traffik Lounge" },
  { name: "Simplex Exchange", logo: simplex },
  { name: "Chef Giwa", logo: chefG },
  { name: "E Bamawo Signature Hotel", logo: bamawo },
  { name: "HomeVibes Content Studio" },
  { name: "Shalompee Apparel" },
  { name: "Lahor Printing and Publishing" },
  { name: "Proton Real Estate Development" },
];
