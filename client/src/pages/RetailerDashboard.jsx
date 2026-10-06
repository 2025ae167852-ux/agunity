const inventory = [
  { sku: 'MAIZE-01', item: 'Maize 5kg', stock: '145 packs', reorder: 'Low', sales: '23/day' },
  { sku: 'BEAN-04', item: 'Beans 2kg', stock: '240 packs', reorder: 'Healthy', sales: '18/day' },
  { sku: 'TOM-02', item: 'Tomatoes crate', stock: '62 crates', reorder: 'Critical', sales: '11/day' }
];

const orders = [
  { id: 'ORD-891', buyer: 'FreshMart', items: 'Beans 2kg', status: 'Ready to ship', eta: 'Today' },
  { id: 'ORD-892', buyer: 'Urban Basket', items: 'Maize 5kg', status: 'Packed', eta: 'Tomorrow' },
  { id: 'ORD-893', buyer: 'Kibra Grocer', items: 'Tomatoes crate', status: 'Awaiting stock', eta: '2 days' }
];

export default function RetailerDashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Retail operations</span>
          <h2>Retail inventory overview</h2>
        </div>
        <button className="primary-btn" type="button">Place replenishment order</button>
      </header>

      <div className="metrics-grid">
        <article className="metric-card"><span>Inventory health</span><strong>89%</strong><small>+6% this week</small></article>
        <article className="metric-card"><span>Sales velocity</span><strong>KES 284K</strong><small>+11.8%</small></article>
        <article className="metric-card"><span>Low-stock items</span><strong>3</strong><small>2 critical</small></article>
        <article className="metric-card"><span>Fulfillment rate</span><strong>97.3%</strong><small>Stable</small></article>
      </div>

      <div className="panel-grid two-col">
        <section className="panel">
          <div className="panel-head">
            <h3>Inventory snapshot</h3>
            <button className="link-btn" type="button">Refresh</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Item</th>
                  <th>Stock</th>
                  <th>Reorder</th>
                  <th>Sales</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.sku}>
                    <td>{item.sku}</td>
                    <td>{item.item}</td>
                    <td>{item.stock}</td>
                    <td><span className={`badge ${item.reorder === 'Critical' ? 'warning' : 'success'}`}>{item.reorder}</span></td>
                    <td>{item.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel accent-panel">
          <div className="panel-head">
            <h3>Action center</h3>
            <button className="link-btn" type="button">Review</button>
          </div>
          <div className="advisory-box">
            <strong>Restock priority</strong>
            <ul>
              <li>Tomatoes crate demand outpacing supply by 36%.</li>
              <li>Promote beans 2kg bundle to improve margin.</li>
            </ul>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h3>Order tracker</h3>
          <button className="link-btn" type="button">All orders</button>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Buyer</th>
                <th>Items</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.buyer}</td>
                  <td>{order.items}</td>
                  <td><span className="badge success">{order.status}</span></td>
                  <td>{order.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
