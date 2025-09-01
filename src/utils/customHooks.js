import { useState, useEffect } from "react";
import { SWIGGY_MENU_URL, SWIGGY_URL } from "./constant";

export const useFoodCategory = () => {
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  const fetchFoodCategories = async () => {
    const data = await fetchData();

    const categories = data?.filter(
      (card) => card?.card?.card?.id === "whats_on_your_mind"
    );

    setFoodCategories(categories?.[0]?.card?.card?.imageGridCards?.info);
  };
  return foodCategories;
};

export const useTopRestaurants = () => {
  const [topRestaurants, setTopRestaurants] = useState([]);

  useEffect(() => {
    fetchTopRestaurants();
  }, []);

  const fetchTopRestaurants = async () => {
    const data = await fetchData();
    const topRestaurants = data?.filter(
      (card) => card?.card?.card?.id === "restaurant_grid_listing_v2"
    );

    setTopRestaurants(
      topRestaurants?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return topRestaurants;
};

export const useAllRestaurants = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const data = await fetchData();
    const allRestaurants = data?.filter(
      (card) => card?.card?.card?.id === "top_brands_for_you"
    );

    setRestaurantList(
      allRestaurants?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  return restaurantList;
};

export const useFetchRestaurantInfo = (id) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(SWIGGY_MENU_URL + id);
    const json = await data.json();
    setRestaurantInfo(json.data);
  };
  return restaurantInfo;
};

const fetchData = async () => {
  const data = await fetch(SWIGGY_URL);
  const json = await data.json();
  const jsonData = json.data.cards;
  return jsonData;
};
