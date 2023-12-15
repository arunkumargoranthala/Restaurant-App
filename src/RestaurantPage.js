/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import './RestaurantPage.css';

const DishesComponent = () => {
  const [data, setData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [dishQuantities, setDishQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0); // New state for cart count

  useEffect(() => {
    const fetchData = async () => {
      if (!data) {
        try {
          const response = await fetch(
            'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
          );
          const jsonData = await response.json();
          setData(jsonData);

          // Set the initial active category to the first category
          if (jsonData && jsonData.length > 0 && jsonData[0].table_menu_list.length > 0) {
            const firstCategory = jsonData[0].table_menu_list[0].menu_category;
            setActiveCategory(firstCategory);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [data]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleIncrement = (dishId) => {
    setDishQuantities((prevQuantities) => ({
      ...prevQuantities,
      [dishId]: (prevQuantities[dishId] || 0) + 1,
    }));
    setCartCount((prevCount) => prevCount + 1); // Increment cart count
  };

  const handleDecrement = (dishId) => {
    setDishQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[dishId] || 0) - 1;
      return {
        ...prevQuantities,
        [dishId]: newQuantity >= 0 ? newQuantity : 0,
      };
    });
    setCartCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrement cart count, ensuring it's not negative
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  const { restaurant_name, table_menu_list } = data[0];

  return (
    <div>
      {/* eslint-disable-next-line camelcase */}
      <h1>{restaurant_name}</h1>
      <header>
        <p>My Orders</p>
        <span>Cart Count: {cartCount}</span>
      </header>
      <div>
        {table_menu_list.map((category) => (
          <button
            type="button"
            key={category.menu_category_id}
            onClick={() => handleCategoryClick(category.menu_category)}
            // Set the className to highlight the active category
            className={category.menu_category === activeCategory ? 'active' : ''}
          >
            {category.menu_category}
          </button>
        ))}
      </div>
      {activeCategory && (
        <div>
          <h2>{activeCategory}</h2>
          {table_menu_list
            .find((category) => category.menu_category === activeCategory)
            .category_dishes.map((dish) => (
              <div key={dish.dish_id}>
                <h3>{dish.dish_name}</h3>
                <p>{`${dish.dish_currency} ${dish.dish_price}`}</p>
                <p>{dish.dish_description}</p>
                <p>{`${dish.dish_calories} calories`}</p>
                <img src={dish.dish_image} alt={dish.dish_name} />

                {/* Render buttons and quantity only if the dish is available */}
                {dish.dish_Availability !== false && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDecrement(dish.dish_id)}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => handleIncrement(dish.dish_id)}
                    >
                      +
                    </button>
                    <p>{dishQuantities[dish.dish_id] || 0}</p>
                  </>
                )}

                {/* Check if "addonCat" key exists and has non-empty value */}
                {dish.addonCat && dish.addonCat.length > 0 ? (
                  <p>Customizations available</p>
                ) : (
                  <p />
                )}
                {/* Check if "dish_Availability" key exists and has the value "false" */}
                {dish.dish_Availability === false && (
                  <p>Not available</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DishesComponent;
