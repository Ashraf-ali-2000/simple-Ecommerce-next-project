import { useRef, useState } from "react";
import classes from "../styles/NewProduct.module.css";
import { Button } from "antd";

function NewProduct() {
  const [isInvalid, setIsInvalid] = useState(false);
//   const [myimg, setImg] = useState([]);



  const titleRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const discountPercentagenRef = useRef();
  const ratingRef = useRef();
  const stockRef = useRef();
  const brandRef = useRef();
  const categoryRef = useRef();
  const imagesRef = useRef();

  function addProductHandler(event) {
    event.preventDefault();

    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    const discountPercentage = discountPercentagenRef.current.value;
    const rating = ratingRef.current.value;
    const stock = stockRef.current.value;
    const brand = brandRef.current.value;
    const category = categoryRef.current.value;
    const imagess = imagesRef.current.value;

   let images = [imagess];
    // arr.push = images;
    //   console.log(arr);
    // const myFunc = function() {
    //     setImg(prev => [...prev] )
    // }
    
    if (!title || title.trim() === "" || !price || price.trim() === "") {
      setIsInvalid(true);
      return;
    }
    const newProduct = JSON.stringify({title,description,price, discountPercentage, rating,stock,brand,category,images });
    fetch("/api/products/", {
      method: "POST",
      body: newProduct,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }


  return (
    <form className={classes.form} onSubmit={addProductHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" ref={priceRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="discountPercentage">discountPercentage</label>
          <input type="number" id="discountPercentage" ref={discountPercentagenRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="rating">rating</label>
          <input type="number" id="rating" ref={ratingRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="stock">stock</label>
          <input type="number" id="stock" ref={stockRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="brand">brand</label>
          <input type="text" id="brand" ref={brandRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="category">category</label>
          <input type="text" id="category" ref={categoryRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="images">images</label>
          <input type="text" id="images" ref={imagesRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <textarea id="description" rows="5" ref={descriptionRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid title and price</p>}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}

export default NewProduct;
