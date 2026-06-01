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

  const badgeClass = (status) => {
    if (status === 'complete') return 'badge badge-complete';
    if (status === 'cancelled') return 'badge badge-cancelled';
    return 'badge badge-pending';
  };

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
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.product}</td>
                <td>{o.quantity}</td>
                <td><span className={badgeClass(o.status)}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;