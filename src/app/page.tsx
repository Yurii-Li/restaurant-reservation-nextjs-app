import { PrismaClient } from "@prisma/client";
import { RestaurantCardType } from "@/interfaces/restaurant.interface";
import { Header, RestaurantCard } from "@/app/components";

const prisma = new PrismaClient();

const fetchRestaurants = (): Promise<RestaurantCardType[]> => {
  return prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    },
  });
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className={"py-3 px-36 mt-10 flex flex-wrap justify-center"}>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
