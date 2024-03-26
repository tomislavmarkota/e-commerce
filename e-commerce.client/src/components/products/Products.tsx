import { useEffect, useState } from 'react';
import ProductStyles from './Products.module.scss'
import Card from '../Card/Card';


type ProductPaginationDTO = {
    products: Product[];
    totalItems: number;
    totalPages: number;
}

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number
}
function Products() {
    const [data, setData] = useState<ProductPaginationDTO | undefined>();


    useEffect(() => {
        fetch("https://localhost:7045/api/Product?categoryId=1&page=1&pageSize=10").then((res) => res.json()).then((data: ProductPaginationDTO) => setData(data)).catch((err) => console.log(err))
    }, []);


    if (!data) return <h1>Loading...</h1>

    return (
        <div className={ProductStyles.ProductContainer}>
            {
                data.products.map((product) => {
                    return (
                        <Card key={product.id} name={product.name} />
                    );
                })
            }
        </div>
  );
}

export default Products;