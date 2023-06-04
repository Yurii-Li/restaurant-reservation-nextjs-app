import fullStar from "../../../public/icons/full-star.png"
import halfStar from "../../../public/icons/half-star.png"
import emptyStar from "../../../public/icons/empty-star.png"
import Image, {StaticImageData} from "next/image";
import {Review} from "@prisma/client";
import {calculateReviewRatingAverage} from "@/utils/calculateReviewRatingAverage";

export default function Stars({reviews, rating}: { reviews: Review[], rating?: number }) {

  const reviewRating = rating || calculateReviewRatingAverage(reviews)


  const renderStars = () => {
    const stars: StaticImageData[]   = []

    for (let i = 0; i < 5; i++) {
      const difference = +(reviewRating - i).toFixed(1)

      if (difference >= 1) stars.push(fullStar)
      else if (difference > 0 && difference < 1) {
        if(difference <= 0.2) stars.push(emptyStar)
        else if(difference > 0.2 && difference < 0.6) stars.push(halfStar)
        else stars.push(fullStar)
      }
      else stars.push(emptyStar)
      }

      return stars.map((star, index) => (
        <Image src={star} key={index} alt={""} width={20}  />
      ))
    }



    return (
      <>
        {
          renderStars()
        }
      </>
    )
  }
