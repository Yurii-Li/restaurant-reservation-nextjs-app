import RestaurantNavBar from "@/app/restaurant/[slug]/components/RestaurantNavBar";
import Menu from "@/app/restaurant/[slug]/components/Menu";
import {Item, PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) : Promise<Item[]>  => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      items : true
    }
  })

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant.items;
}

export const metadata = {
  title: 'Menu of Milestones Grill (Toronto) | OpenTable',
}

export default async function RestaurantMenu({params}: {params: {slug: string}}) {

  const menu = await fetchRestaurantMenu(params.slug);


  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug}/>
      <Menu menu={menu}/>
    </div>
  )
}
