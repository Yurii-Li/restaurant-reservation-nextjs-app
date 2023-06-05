import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import { RestaurantCardType } from "@/interfaces/restaurant.interface";
import { Header, RestaurantCard, SearchSideBar } from "@/app/search/components";

export const metadata = {
  title: "Search | OpenTable",
};

const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const fetchRestaurantsByCity = (
  searchParams: SearchParams
): Promise<RestaurantCardType[]> => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  if (!searchParams.city) return prisma.restaurant.findMany({ select });

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: searchParams.city?.toLowerCase(),
        },
      },
      cuisine: {
        name: {
          equals: searchParams.cuisine,
        },
      },
      price: {
        equals: searchParams.price,
      },
    },
    select,
  });
};

const fetchLocations = (): Promise<Location[]> => {
  return prisma.location.findMany();
};

const fetchCuisines = (): Promise<Cuisine[]> => {
  return prisma.cuisine.findMany();
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams);

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />

        <div className="w-5/6 ">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p className="text-center text-2xl">
              Sorry, we found no restaurants in this area
            </p>
          )}
        </div>
      </div>
    </>
  );
}
