import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

import { ReserveForm, ReserveHeader } from "@/app/reserve/[slug]/components";
import { Metadata } from "next";
import { renderMetaTitleBySlag } from "@/utils/renderMetaTitleBySlag";

interface IProps {
  params: {
    slug: string;
  };
  searchParams: {
    date: string;
    partySize: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Reserve at ${renderMetaTitleBySlag(params.slug)} | OpenTable`,
  };
}

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export default async function Reserve({ params, searchParams }: IProps) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  const [day, time] = searchParams.date.split("T");

  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto ">
        <ReserveHeader
          image={restaurant.main_image}
          name={restaurant.name}
          date={day}
          time={time}
          partySize={searchParams.partySize}
        />
        <ReserveForm
          partySize={searchParams.partySize}
          slug={params.slug}
          day={day}
          time={time}
        />
      </div>
    </div>
  );
}
