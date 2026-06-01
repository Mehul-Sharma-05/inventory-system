import { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
  const [counts, setCounts] = useState({ products: 0, customers: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/products'),
      api.get('/customers'),
      api.get('/orders'),
    ]).then(([p, c, o]) => {
      setCounts({
        products: p.data.length,
        customers: c.data.length,
        orders: o.data.length,
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className="page">
      <h1>Dashboard</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{counts.products}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Customers</div>
            <div className="stat-value">{counts.customers}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Orders</div>
            <div className="stat-value">{counts.orders}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;