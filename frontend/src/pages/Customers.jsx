import { useEffect, useState } from 'react';
import api from '../api';

function Customers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/customers').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} — ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;