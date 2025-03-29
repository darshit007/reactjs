import { useState, useEffect } from "react";
import { corsProxyURL, restaurantURL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState([]);
  let itemCards;
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    let response = await fetch(corsProxyURL + restaurantURL + resId);
    const data = await response.json();
    console.log(data.data);
    setResInfo(data.data);
  };

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
    console.log(itemCards);
  }

  return resInfo?.cards?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines.join(", ") + " " + costForTwoMessage}</p>
      <h2>Menu</h2>
      <ul>
        {(itemCards || []).map((itemCard) => (
          <li key={itemCard.card.info.id}>
            {itemCard.card.info.name} -{" Rs "}
            {itemCard.card.info.price || itemCard.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
