import { PRICE } from "@prisma/client";

interface IProps {
  price: PRICE;
}

export default function Price({ price }: IProps) {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span>$$</span>
          <span className={"text-gray-400"}>$$</span>
        </>
      );
    } else if (price === PRICE.REGULAR) {
      return (
        <>
          <span>$$$</span>
          <span className={"text-gray-400"}>$</span>
        </>
      );
    } else if (price === PRICE.EXPENSIVE) {
      return <span>$$$$</span>;
    }
  };

  return <>{renderPrice()}</>;
}
