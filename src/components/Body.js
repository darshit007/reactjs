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
      console.log(data);
      setListOfRestaurant(resList);
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
              const filteredListOfRestaurant = resList.filter((res) =>
                res.card.card.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setListOfRestaurant(filteredListOfRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredListOfRestaurant = listOfRestaurant.filter(
              (res) => res.card.card.info.avgRating > 4
            );
            setListOfRestaurant(filteredListOfRestaurant);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurant.map((restaurant) => (
          <Link
            key={restaurant.card.card.info.id}
            to={"/restaurant/" + restaurant.card.card.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
