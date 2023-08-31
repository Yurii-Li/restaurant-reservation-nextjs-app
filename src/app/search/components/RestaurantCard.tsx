import Link from "next/link";

import { IRestaurantCard } from "@/interfaces/restaurant.interface";
import Price from "@/app/components/Price";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import { Stars } from "@/app/components/Stars";

interface IProps {
  restaurant: IRestaurantCard;
}

export function RestaurantCard({ restaurant }: IProps) {
  const renderRatingText = (): string => {
    const rating = calculateReviewRatingAverage(restaurant.reviews);

    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 2) return "Average";
    else if (rating <= 2 && rating > 0) return "Bad";
    else return "Not yet rated";
  };

  return (
    <div className="border-b flex pb-2 pt-2 first-of-type:pt-0 ml-4">
      <img
        src={restaurant.main_image}
        alt={restaurant.name}
        className="w-44 h-36 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-center mb-1">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-8">
          <div className="font-light flex text-reg">
            <p className="mr-4">
              <Price price={restaurant.price} />
            </p>
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
