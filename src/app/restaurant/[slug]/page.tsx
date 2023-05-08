import Header from "@/app/restaurant/[slug]/components/Header";
import RestaurantNavBar from "@/app/restaurant/[slug]/components/RestaurantNavBar";
import Title from "@/app/restaurant/[slug]/components/Title";
import Rating from "@/app/restaurant/[slug]/components/Rating";
import Description from "@/app/restaurant/[slug]/components/Description";
import Images from "@/app/restaurant/[slug]/components/Images";
import Reviews from "@/app/restaurant/[slug]/components/Reviews";
import ReservationCard from "@/app/restaurant/[slug]/components/ReservationCard";


export default function RestaurantDetails() {
  return (
    <>
      <Header/>
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
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
      </div>
    </>
  )
}
