import { Cuisine, Location, PRICE, Review } from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

export interface RestaurantDetailsType {
  id: number;
  name: string;
  slug: string;
  images: string[];
  description: string;
  reviews: Review[];
}
