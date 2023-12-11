import React, { useEffect, useState } from "react";
import classes from "./Orders.module.css";

import CartItem from "../Cart/CartItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

function Cart(props) {
  const [cartItems, setCartItems] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState("");

  const enteredEmail = localStorage.getItem("email");
  const updatedEmail = enteredEmail
    ? enteredEmail.replace("@", "").replace(".", "")
    : "";

  async function fetchCartItems() {
    const response = await axios.get(
      `https://crudcrud.com/api/f0d377027a9e45868b7438e80c6417c2/${updatedEmail}`
    );
    console.log(response.data);
    const cartItems = response.data.map((item) => {
      return {
        id: item._id,
        name: item.title,
        price: item.price,
        image: item.imageUrl,
        amount: item.amount,
      };
    });
    setCartItems(cartItems);
    console.log(cartItems);
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  //totalAmount is calculated depend upon cartItems

  async function cartItemRemoveHandler(id) {
    console.log(id, updatedEmail);

    await axios.delete(
      `https://crudcrud.com/api/f0d377027a9e45868b7438e80c6417c2/${updatedEmail}/${id}`
    );
    toast.error("Item is deleted successfully!");
    // cartCtx.removeItem(id)
    fetchCartItems();
  }

  const cartItemList = cartItems.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      image={item.image}
      onRemove={() => cartItemRemoveHandler(item.id)}
    />
  ));

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
        // Assuming you have an API endpoint for searching books by author
        const response = await axios.get(
          `https://your-api-endpoint/search?author=${searchAuthor}`
        );
    
        // Process the response data, update state, or perform any other actions
        const searchResults = response.data;
    
        // For example, update the state with the search results
        setCartItems(searchResults);
    
        // You can also reset the searchAuthor state to clear the input field
        setSearchAuthor("");
      } catch (error) {
        // Handle errors, show a message, or perform other error-handling logic
        console.error("Error occurred during search:", error.message);
      }
  };

  return (
    <>
      <div className="input">
        <input type="text"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}></input>
        <button type="submit" onClick={submitHandler}>
          Show
        </button>
      </div>
      {cartItems.length > 0 ? (
        <ul className={classes["cart-items"]}>{cartItemList}</ul>
      ) : (
        <p className={classes["empty-text"]}>Your cart is empty.</p>
      )}

      <ToastContainer theme="colored" />
    </>
  );
}

export default Cart;