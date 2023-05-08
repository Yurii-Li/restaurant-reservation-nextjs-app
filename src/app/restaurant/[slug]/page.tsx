import RestaurantNavBar from "@/app/restaurant/[slug]/components/RestaurantNavBar";
import Title from "@/app/restaurant/[slug]/components/Title";
import Rating from "@/app/restaurant/[slug]/components/Rating";
import Description from "@/app/restaurant/[slug]/components/Description";
import Images from "@/app/restaurant/[slug]/components/Images";
import Reviews from "@/app/restaurant/[slug]/components/Reviews";
import ReservationCard from "@/app/restaurant/[slug]/components/ReservationCard";

export const metadata = {
  title: 'Milestones Grill (Toronto) | OpenTable',
}

export default function RestaurantDetails() {
  return (
    <>
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNavBar/>

          <Title/>

          <Rating/>

          <Description/>

          <Images/>

          <Reviews/>
        </div>

        <div className="w-[27%] relative text-reg">
          <ReservationCard/>
        </div>
    </>
  )
}
