import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";
import { swiggyURL, corsProxyURL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

//let filteredRes;

const Body = () => {
  //Local State variable - Super powerful variable
  let [listOfRestaurant, setListOfRestaurant] = useState([]);
  let [filteredListOfRestaurant, setfilteredListOfRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  console.log("body rendered again");

  useEffect(() => {
    console.log("use effect has been called");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(corsProxyURL + swiggyURL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Assuming the response is JSON
      console.log(data);
      const liveListOfRestaurants =
        data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
      setListOfRestaurant(liveListOfRestaurants);
      setfilteredListOfRestaurant(liveListOfRestaurants);
    } catch (error) {
      console.error("error while fetching live data");
    }
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return (
      <h1>
        Looks like you are offline ! Please check your internet connection
      </h1>
    );
  }

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              filteredListOfRestaurant = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilteredListOfRestaurant(filteredListOfRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounder-lg"
            onClick={() => {
              filteredListOfRestaurant = listOfRestaurant.filter(
                (res) => res.info.avgRating > 4
              );
              setfilteredListOfRestaurant(filteredListOfRestaurant);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredListOfRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
