import {Header} from "@/app/search/components";

export default function Loading() {
  return (
    <main>
      <Header/>

      <div className={"flex py-4 m-auto w-2/3 justify-between items-start"}>
        <div className={"w-1/5 animate-pulse bg-slate-200 my-2 h-80  rounded overflow-hidden border cursor-pointer"}></div>

        <div className={"w-5/6"}>
          {[...Array(10)].map((_, index) => (
            <div key={index} className={"border-b flex py-2  first-of-type:pt-0 ml-4"}>
              <div className={"animate-pulse w-44 h-36 rounded bg-slate-200"}></div>
              <div className={"pl-5 pt-1"}>
                <div className={"animate-pulse bg-slate-200 h-20 w-56 mb-7 rounded"}></div>
                <div className={"animate-pulse bg-slate-200 h-8 w-56 rounded"}></div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </main>
  )
}
