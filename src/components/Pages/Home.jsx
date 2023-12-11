import React, { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image1 from "../../assests/book-composition.avif";
import image2 from "../../assests/books-white.avif";
import image3 from "../../assests/front-view.avif";
import image4 from "../../assests/holy-bible.avif";
import image5 from "../../assests/images (1).jpeg";
import image6 from "../../assests/images.jpeg";
import image7 from "../../assests/istockphoto-.webp";
import image8 from "../../assests/photo-.avif";

import CartContext from "../../store/cart-context";
import classes from "./Home.module.css";

import axios from "axios";
const productsArr = [
  { id: 1, title: "Irrfan Khan: A Life in Movies", price: 999, imageUrl: image1,author:"Shubhra Gupta" },
  { id: 2, title: "Ambedkar: A Life", price: 2999, imageUrl: image2,author:"Shashi Tharoor" },
  { id: 3, title: "Spare", price: 470, imageUrl: image3 ,author:"J. R. Moehringer"},
  { id: 4, title: "Jadunama", price: 1999, imageUrl: image4 ,author:"Javed Akhtar"},
  { id: 5, title: "Come! Let's Run", price: 999, imageUrl: image5,author:"	Ma. Subramanian" },
  { id: 6, title: "The Last Heroes", price: 1199, imageUrl: image6,author:"Palagummi Sainath" },
  { id: 7, title: "The Best of Satyajit Ray", price: 1499, imageUrl: image7,author:"Satyajit Ray" },
  { id: 8, title: "Victory City", price: 599, imageUrl: image8 ,author:"Salman Rushdie"},
];

const Home = () => {
  const CartCtx = useContext(CartContext);

  const navigate = useNavigate();

  //if we login then the email is in localStorage for doing the post request the getting that email id neccessary
  const enteredEmail = localStorage.getItem("email");
  const updatedEmail = enteredEmail
    ? enteredEmail.replace("@", "").replace(".", "")
    : "";

  async function addToCartClickHandler(item) {
    CartCtx.addItem({
      // id:item.id,
      name: item.title,
      price: Number(item.price),
      image: item.imageUrl,
      amount: item.amount,
      author:item.author
    });
    toast.success("Item is added successfully!");
    // storing cart item do post request from API
    try {
      // ... existing code ...
      const response = await axios.post(
        `https://crudcrud.com/api/f0d377027a9e45868b7438e80c6417c2/${updatedEmail}`,
        item
      );
      console.log(response.data);
    } catch (error) {
      console.log("AxiosError:", error);
    }
  }

  
  return (
    <>
      <Container className={`${classes.container} ${classes.cardContainer}`}>
        <Row>
          {productsArr.map((item) => (
            <Col key={item.title} md={6} lg={6} xl={3} className="mt-2">
              <h5>{item.title}</h5>

              <Card style={{ width: "15rem", height: "15rem" }}>
                <Link to={`/product/${encodeURIComponent(item.imageUrl)}`}>
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "15rem", height: "15rem" }}
                  />
                </Link>
                <Card.Body></Card.Body>
              </Card>
              <span>{item.author}</span>

              <div className={classes.cardBody}>
               
                <div className={classes.price}>₹{item.price}</div>

                <Button
                  variant="success"
                  onClick={() => addToCartClickHandler(item)}
                  className={classes.button}
                >
                  ADD TO CART
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
     
      <ToastContainer theme="colored" />
    </>
  );
};

export default Home;