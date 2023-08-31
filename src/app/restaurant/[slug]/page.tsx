import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";

import { IRestaurantDetails } from "@/interfaces/restaurant.interface";
import {
  Description,
  Images,
  Rating,
  ReservationCard,
  RestaurantNavBar,
  Reviews,
  Title,
} from "@/app/restaurant/[slug]/components";
import { renderMetaTitleBySlag } from "@/utils/renderMetaTitleBySlag";

interface IProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${renderMetaTitleBySlag(params.slug)} | OpenTable`,
  };
}

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (
  slug: string,
): Promise<IRestaurantDetails> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export default async function RestaurantDetails({ params }: IProps) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />

        <Title name={restaurant.name} />

        <Rating reviews={restaurant.reviews} />

        <Description description={restaurant.description} />

        <Images images={restaurant.images} />

        <Reviews reviews={restaurant.reviews} />
      </div>

      <div className="w-[27%] relative text-reg">
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
          slug={restaurant.slug}
        />
      </div>
    </>
  );
}
