import { useEffect, useState } from "react";

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );

      const data = await response.json();
      console.log(data);
      if (data && data.products && data.products.length) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);
  useEffect(() => {
    if (products && products.length == 100) setDisableButton(true);
  }, [products]);

  if (loading) {
    return <div>Loading Data Please Wait</div>;
  }
  return (
    <div className="container">
      <div className="prodcut-container">
        {products && products.length
          ? products.map((item) => (
              <div className="product" key={item.index}>
                <img src={item.thumbnail} alt="img" />
                <p>{item.title}</p>
                <p>{`Price Rs: ${item.price}`}</p>
                <p>{`Rating :${item.rating}`}</p>
              </div>
            ))
          : null}
      </div>
      <div className="buttonContainer">
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          {disableButton ? (
            <p>you've reached the limit</p>
          ) : (
            "Load More Products"
          )}
        </button>
      </div>
    </div>
  );
}
