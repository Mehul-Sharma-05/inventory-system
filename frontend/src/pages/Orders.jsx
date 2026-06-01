import { useEffect, useState } from 'react';
import api from '../api';

function Orders() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/orders').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} — ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;