/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './RestaurantPage.css'
import CartContext from './CartContext'

class DishesComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      activeCategory: '',
      dishQuantities: {},
      cartCounts: {},
      selectedDishId: null,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {data} = this.state

    if (!data) {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
        )
        const jsonData = await response.json()

        this.setState({data: jsonData})

        if (
          jsonData &&
          jsonData.length > 0 &&
          jsonData[0].table_menu_list.length > 0
        ) {
          const firstCategory = jsonData[0].table_menu_list[0].menu_category
          this.setState({activeCategory: firstCategory})
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }

  handleCategoryClick = category => {
    const {activeCategory, cartCounts} = this.state

    this.setState({
      cartCounts: {
        ...cartCounts,
        [activeCategory]: cartCounts[activeCategory] || 0,
      },
      activeCategory: category,
    })
  }

  handleIncrement = dishId => {
    const {dishQuantities, activeCategory, cartCounts} = this.state

    this.setState({
      dishQuantities: {
        ...dishQuantities,
        [dishId]: (dishQuantities[dishId] || 0) + 1,
      },
      cartCounts: {
        ...cartCounts,
        [activeCategory]: (cartCounts[activeCategory] || 0) + 1,
      },
      selectedDishId: dishId,
    })
  }

  handleDecrement = dishId => {
    const {dishQuantities, activeCategory, cartCounts} = this.state

    const newQuantity = (dishQuantities[dishId] || 0) - 1

    this.setState({
      dishQuantities: {
        ...dishQuantities,
        [dishId]: newQuantity >= 0 ? newQuantity : 0,
      },
      cartCounts: {
        ...cartCounts,
        [activeCategory]: Math.max((cartCounts[activeCategory] || 0) - 1, 0),
      },
    })
  }

  handleAddToCart = () => {
    const {selectedDishId, dishQuantities} = this.state

    if (selectedDishId !== null) {
      const quantity = dishQuantities[selectedDishId] || 0

      // Get additional details of the selected dish
      const selectedDish = this.getSelectedDishDetails(selectedDishId)

      if (selectedDish) {
        const {dish_name, dish_image} = selectedDish

        this.props.onAddToCart(selectedDishId, quantity, dish_name, dish_image)

        this.setState({selectedDishId: null})
      }
    }
  }

  getSelectedDishDetails = dishId => {
    const {data, activeCategory} = this.state

    if (data) {
      const selectedCategory = data[0].table_menu_list.find(
        category => category.menu_category === activeCategory,
      )

      if (selectedCategory) {
        const selectedDish = selectedCategory.category_dishes.find(
          dish => dish.dish_id === dishId,
        )

        return selectedDish
      }
    }

    return null
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {data, activeCategory, dishQuantities, selectedDishId} = this.state

    if (!data) {
      return <p>Loading...</p>
    }

    const {restaurant_name, table_menu_list} = data[0]

    return (
      <CartContext.Consumer>
        {cartContext => (
          <div>
            <h1>{restaurant_name}</h1>
            <header>
              <p>My Orders</p>
              <span>
                Cart Count: <p>{this.state.cartCounts[activeCategory] || 0}</p>
              </span>
            </header>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <Link to="/cart" className="nav-link">
              <button type="button" data-testid="cart">
                cart
              </button>
            </Link>
            <div>
              {table_menu_list.map(category => (
                <button
                  type="button"
                  key={category.menu_category_id}
                  onClick={() =>
                    this.handleCategoryClick(category.menu_category)
                  }
                  className={
                    category.menu_category === activeCategory ? 'active' : ''
                  }
                >
                  {category.menu_category}
                </button>
              ))}
            </div>
            {activeCategory && (
              <div>
                <h2>{activeCategory}</h2>
                {table_menu_list
                  .find(category => category.menu_category === activeCategory)
                  .category_dishes.map(dish => (
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
                            onClick={() => this.handleDecrement(dish.dish_id)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => this.handleIncrement(dish.dish_id)}
                          >
                            +
                          </button>
                          <p>{dishQuantities[dish.dish_id] || 0}</p>
                          {selectedDishId === dish.dish_id && (
                            <button
                              type="button"
                              onClick={this.handleAddToCart}
                            >
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
        )}
      </CartContext.Consumer>
    )
  }
}

export default DishesComponent
