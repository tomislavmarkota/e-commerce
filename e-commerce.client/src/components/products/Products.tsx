import { useEffect, useState } from 'react';
import ProductStyles from './Products.module.scss'
import Card from '../Card/Card';

function Products() {
    const [products, setProducts] = useState<[]>([]);


    useEffect(() => {
        fetch("https://localhost:7045/api/product/products").then((res) => res.json()).then((data: []) => setProducts(data)).catch((err) => console.log(err))
    }, []);


    if (products.length === 0) return <h1>Loading...</h1>

    return (
        <div className={ProductStyles.ProductContainer}>
            {
                products.map((product) => {
                    return (
                        <Card key={product.id} name={product.name} />
                    );
                })
            }
        </div>
  );
}

export default Products;