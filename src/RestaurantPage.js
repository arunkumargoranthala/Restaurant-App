/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './RestaurantPage.css';
import CartContext from './CartContext'; 

const DishesComponent = (props) => {
  const [data, setData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [dishQuantities, setDishQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]); 
  const [addToCartVisible, setAddToCartVisible] = useState(false);
  const [cartCounts, setCartCounts] = useState({});
  const [selectedDishId, setSelectedDishId] = useState(null); 

  const onClickLogout = () => {
    const { history } = props;
    Cookies.remove('jwt_token');
    history.replace('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!data) {
        try {
          const response = await fetch(
            'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
          );
          const jsonData = await response.json();
          setData(jsonData);

          if (
            jsonData &&
            jsonData.length > 0 &&
            jsonData[0].table_menu_list.length > 0
          ) {
            const firstCategory =
              jsonData[0].table_menu_list[0].menu_category;
            setActiveCategory(firstCategory);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [activeCategory]: prevCounts[activeCategory] || 0,
    }));
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [activeCategory]: prevCounts[activeCategory] || 0,
    }));

    // Set the new active category
    setActiveCategory(category);
  };

  const handleIncrement = (dishId) => {
    setDishQuantities((prevQuantities) => ({
      ...prevQuantities,
      [dishId]: (prevQuantities[dishId] || 0) + 1,
    }));
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [activeCategory]: (prevCounts[activeCategory] || 0) + 1,
    }));
    setSelectedDishId(dishId); // Set the selected dish when the "+" button is pressed
  };

  const handleDecrement = (dishId) => {
    setDishQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[dishId] || 0) - 1;
      return {
        ...prevQuantities,
        [dishId]: newQuantity >= 0 ? newQuantity : 0,
      };
    });
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [activeCategory]: Math.max((prevCounts[activeCategory] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = () => {
    if (selectedDishId !== null) {
      const quantity = dishQuantities[selectedDishId] || 0;

      // Reset selectedDishId after adding to cart
      setSelectedDishId(null);
      console.log(selectedDishId);
      console.log(quantity);
    }
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  const { restaurant_name, table_menu_list } = data[0];

  return (
    <CartContext.Provider
      value={{
        cartList: cartItems,
        removeAllCartItems: () => setCartItems([]),
        addCartItem: (item) => setCartItems((prevItems) => [...prevItems, item]),
      }}
    >
      <div>
        <h1>{restaurant_name}</h1>
        <header>
          <p>My Orders</p>
          <span>
            Cart Count: <p>{cartCounts[activeCategory] || 0}</p>
          </span>
        </header>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <div>
          {table_menu_list.map((category) => (
            <button
              type="button"
              key={category.menu_category_id}
              onClick={() => handleCategoryClick(category.menu_category)}
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
                      {selectedDishId === dish.dish_id && (
                        <button type="button" onClick={handleAddToCart}>
                          ADD TO CART
                        </button>
                      )}
                    </>
                  )}

                  {dish.addonCat && dish.addonCat.length > 0 ? (
                    <p>Customizations available</p>
                  ) : (
                    <p />
                  )}

                  {dish.dish_Availability === false && <p>Not available</p>}
                </div>
              ))}
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
};

export default DishesComponent;
