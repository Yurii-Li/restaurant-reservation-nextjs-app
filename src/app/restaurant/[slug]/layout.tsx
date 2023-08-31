import { Header } from "@/app/restaurant/[slug]/components";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  params: { slug: string };
}

export default function RestaurantLayout({ children, params }: IProps) {
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}
