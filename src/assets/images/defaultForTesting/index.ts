import ellaOlsson from "./Ella Olsson Vegan Photo.jpg";
import hermesRivera from "./Hermes Rivera Vegan Photo.jpg";
import veganFood from "./Vegan Food Photo.jpg";
import unsplash2 from "./Vegan Photos from Unsplash (2).jpg";
import unsplash3 from "./Vegan Photos from Unsplash (3).jpg";
import unsplash4 from "./Vegan Photos from Unsplash (4).jpg";
import unsplash5 from "./Vegan Photos from Unsplash (5).jpg";
import unsplash1 from "./Vegan Photos from Unsplash.jpg";

import type { StaticImageData } from "next/image";

export interface DefaultTestingImage {
  src: StaticImageData;
  name: string;
}

export const defaultTestingImages: DefaultTestingImage[] = [
  { src: ellaOlsson, name: "Ella Olsson Vegan Photo.jpg" },
  { src: hermesRivera, name: "Hermes Rivera Vegan Photo.jpg" },
  { src: veganFood, name: "Vegan Food Photo.jpg" },
  { src: unsplash1, name: "Vegan Photos from Unsplash.jpg" },
  { src: unsplash2, name: "Vegan Photos from Unsplash (2).jpg" },
  { src: unsplash3, name: "Vegan Photos from Unsplash (3).jpg" },
  { src: unsplash4, name: "Vegan Photos from Unsplash (4).jpg" },
  { src: unsplash5, name: "Vegan Photos from Unsplash (5).jpg" },
];
