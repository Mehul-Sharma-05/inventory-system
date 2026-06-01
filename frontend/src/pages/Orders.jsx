import { useEffect, useState } from 'react';
import api from '../api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders').then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page">
      <h1>Orders</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Total</th>
              <th>Items</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer_id}</td>
                <td>${o.total.toFixed(2)}</td>
                <td>{o.items.length} item(s)</td>
                <td>{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;