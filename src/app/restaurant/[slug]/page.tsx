import RestaurantNavBar from "@/app/restaurant/[slug]/components/RestaurantNavBar";
import Title from "@/app/restaurant/[slug]/components/Title";
import Rating from "@/app/restaurant/[slug]/components/Rating";
import Description from "@/app/restaurant/[slug]/components/Description";
import Images from "@/app/restaurant/[slug]/components/Images";
import Reviews from "@/app/restaurant/[slug]/components/Reviews";
import ReservationCard from "@/app/restaurant/[slug]/components/ReservationCard";
import {PrismaClient} from "@prisma/client";
import {RestaurantDetailsType} from "@/interfaces/restaurant.interface";

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) : Promise<RestaurantDetailsType> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    }
  })

  if(!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
}


export const metadata = {
  title: 'Milestones Grill (Toronto) | OpenTable',
}

export default async function RestaurantDetails({params}: { params: { slug: string } }) {

  const restaurant = await fetchRestaurantBySlug(params.slug);


  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />

        <Title name={restaurant.name}/>

        <Rating reviews={restaurant.reviews} />

        <Description description={restaurant.description} />

        <Images images={restaurant.images}/>

        <Reviews reviews={restaurant.reviews}/>
      </div>

      <div className="w-[27%] relative text-reg">
        <ReservationCard/>
      </div>
    </>
  )
}
