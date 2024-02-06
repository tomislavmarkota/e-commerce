import { useEffect, useState } from "react";
function Dashboard() {
    const [products, setProducts] = useState<[]>([]);


    useEffect(() => {
        fetch("https://localhost:7045/api/product/products").then((res) => res.json()).then((data: []) => setProducts(data)).catch((err) => console.log(err))
    }, []);

    return (
        <div>
            <p>List of products</p>
      </div>
 
  );
}

export default Dashboard;