import { useState, useEffect } from "react";
import { corsProxyURL, restaurantURL } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    let response = await fetch(corsProxyURL + restaurantURL + resId);
    const data = await response.json();
    console.log(data.data);
    setResInfo(data.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
