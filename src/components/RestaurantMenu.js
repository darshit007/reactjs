import { useState, useEffect } from "react";
import { corsProxyURL, restaurantURL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  //const [resInfo, setResInfo] = useState([]);
  let itemCards;
  const { resId } = useParams();

  //   useEffect(() => {
  //     fetchMenu();
  //   }, []);

  //   const fetchMenu = async () => {
  //     let response = await fetch(corsProxyURL + restaurantURL + resId);
  //     const data = await response.json();
  //     console.log(data.data);
  //     setResInfo(data.data);
  //   };

  const resInfo = useRestaurantMenu(resId);
  let categories = [];

  const {
    name = "",
    cuisines = [],
    costForTwoMessage = "",
  } = resInfo?.cards?.[2]?.card?.card?.info || {};

  if (resInfo?.cards?.length ?? 0) {
    itemCards =
      resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
        .itemCards;
    console.log("setting item cards");
    //console.log(resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards);
    categories =
      resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    console.log(categories);
    console.log(itemCards);
  }

  return resInfo?.cards?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="text-center">
      <h1 className="font-bold my-6  text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ") + " " + costForTwoMessage}
      </p>
      {categories.map((category) => (
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
