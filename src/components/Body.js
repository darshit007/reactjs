import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";
import { swiggyURL, corsProxyURL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

//let filteredRes;

const Body = () => {
  //Local State variable - Super powerful variable
  let [listOfRestaurant, setListOfRestaurant] = useState([]);
  let [filteredListOfRestaurant, setfilteredListOfRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

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
      //console.log(data);
      const liveListOfRestaurants =
        data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
      setListOfRestaurant(liveListOfRestaurants);
      setfilteredListOfRestaurant(liveListOfRestaurants);
    } catch (error) {
      console.error("error while fetching live data");
    }
  };

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
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
        <button
          className="filter-btn"
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
      <div className="res-container">
        {filteredListOfRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
