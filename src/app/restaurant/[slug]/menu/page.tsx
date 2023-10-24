import { Item } from "@prisma/client";
import { Metadata } from "next";

import { Menu, RestaurantNavBar } from "@/app/restaurant/[slug]/components";
import { renderMetaTitleBySlag } from "@/utils/renderMetaTitleBySlag";
import prisma from "@/lib/prisma";

interface IProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Menu ${renderMetaTitleBySlag(params.slug)} | OpenTable`,
  };
}

const fetchRestaurantMenu = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant.items;
};

export default async function RestaurantMenu({ params }: IProps) {
  const menu = await fetchRestaurantMenu(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      <Menu menu={menu} />
    </div>
  );
}
