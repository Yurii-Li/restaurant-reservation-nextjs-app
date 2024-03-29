import Link from "next/link";

import { IRestaurantCard } from "@/interfaces/restaurant.interface";
import Price from "@/app/components/Price";
import { Stars } from "@/app/components/Stars";

interface IProps {
  restaurant: IRestaurantCard;
}

export function RestaurantCard({ restaurant }: IProps) {
  return (
    <div
      className={"w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"}
    >
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img
          src={restaurant.main_image}
          alt={restaurant.name}
          className={"w-full h-36"}
        />
        <div className={"p-1"}>
          <h3 className={"font-bold text-2xl mb-2"}>{restaurant.name}</h3>
          <div className={"flex items-center"}>
            <Stars reviews={restaurant.reviews} />
            <p className={"ml-2"}>
              {restaurant.reviews.length} review
              {restaurant.reviews.length === 1 ? "" : "s"}{" "}
            </p>
          </div>
          <div className={"flex text-reg font-light capitalize"}>
            <p className={"mr-3"}>{restaurant.cuisine.name}</p>
            <p className={"mr-3"}>
              <Price price={restaurant.price} />
            </p>
            <p>{restaurant.location.name}</p>
          </div>
          <p className={"text-sm mt-1 font-bold"}>Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}
