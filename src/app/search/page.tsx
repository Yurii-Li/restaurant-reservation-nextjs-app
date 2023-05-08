import Header from "@/app/search/components/Header";
import SearchSideBar from "@/app/search/components/SearchSideBar";
import RestaurantCard from "@/app/search/components/RestaurantCard";

export default function Search() {
  return (
    <>
      <Header/>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar/>
        <div className="w-5/6">
          < RestaurantCard/>
        </div>
      </div>
    </>
  )
}

