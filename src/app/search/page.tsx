import Header from "@/app/search/components/Header";
import SearchSideBar from "@/app/search/components/SearchSideBar";
import RestaurantCard from "@/app/search/components/RestaurantCard";
import {Cuisine, Location, PRICE, PrismaClient} from "@prisma/client";
import {RestaurantCardType} from "@/interfaces/restaurant.interface";

interface SearchProps {
  searchParams: {
    city ?: string,
    cuisine ?: string,
    price ?: PRICE
  }
}

export const metadata = {
  title: 'Search | OpenTable',
}


const prisma = new PrismaClient();

const fetchRestaurantsByCity = (city: string | undefined ): Promise<RestaurantCardType[]> => {

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  }

  if (!city) return prisma.restaurant.findMany({select});


  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase()
        }
      }
    },
    select
  });

}

const fetchLocations = () : Promise<Location[]> => {
  return prisma.location.findMany()
}

const fetchCuisines = (): Promise<Cuisine[]> => {
  return prisma.cuisine.findMany()
}

export default async function Search({searchParams}:  SearchProps) {

  const restaurants = await fetchRestaurantsByCity(searchParams.city);

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header/>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams}  />

        <div className="w-5/6 ">
          {
            restaurants.length  ? restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
            )) : <p className="text-center text-2xl">Sorry, we found no restaurants in this area</p>
          }
        </div>
      </div>
    </>
  )
}

