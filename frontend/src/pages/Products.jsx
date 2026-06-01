import { useEffect, useState } from 'react';
import api from '../api';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page">
      <h1>Products</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>${p.price}</td>
                <td>{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;