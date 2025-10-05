import { Lora, Maitree, Montserrat, Rancho } from "next/font/google";

export const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--font-lora",
});

export const maitree = Maitree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-maitree",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
});

export const rancho = Rancho({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rancho",
});
