import React, { useState, useEffect } from 'react';
import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1bcXpGUzJUyUwITOqEn8QPj8ZOgUbTGQD/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places


type ProductData = {
  id: number;
  name: string;
  availableCount: number;
  price: number;
  orderedQuantity: number;
  total: number;
  onAdd: () => void;
  onRemove: () => void;
};

const Product = ({ id, name, availableCount, price, orderedQuantity, total, onAdd, onRemove, }: ProductData) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>   
      <td>${total}</td>
      <td>
        <button className={styles.actionButton} onClick={onAdd} disabled={orderedQuantity >= availableCount}>+</button>
        <button className={styles.actionButton} onClick={onRemove} disabled={orderedQuantity <= 0}>-</button>  
      </td>
    </tr>    
  );
}


const Checkout = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await getProducts();
      const initialProducts = productsData.map((product) => ({
        ...product,
        orderedQuantity: 0,
        total: 0,
        onAdd: () => add(product.id),
        onRemove: () => remove(product.id),
      }));
      setProducts(initialProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const add = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id? {...product, orderedQuantity: product.orderedQuantity + 1,
              total: (product.orderedQuantity + 1) * product.price,
            }
          : product
      )
    );
  };

  const remove = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.orderedQuantity > 0 ? {...product,orderedQuantity: product.orderedQuantity - 1,
              total: (product.orderedQuantity - 1) * product.price,
            }
          : product
      )
    );
  };

  const calculateTotal = () => {
    const total = products.reduce((sum, product) => sum + product.total,0);
    return total >= 1000 ? total * 0.9 : total;
  };
  return (
    <div>
      <header className={styles.header}>        
        <h1>Electro World</h1>        
      </header>
      <main>
        <LoadingIcon />        
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {products.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                availableCount={product.availableCount}
                price={product.price}
                orderedQuantity={product.orderedQuantity}
                total={product.total}
                onAdd={product.onAdd}
                onRemove={product.onRemove}
              />
            ))}
          </tbody>
        </table>
        <h2>Order summary</h2>
        <p>Discount: {(calculateTotal()/100)*10}$ </p>
        <p>Total: {calculateTotal()}$ </p>       
      </main>
    </div>
  );
};

export default Checkout;