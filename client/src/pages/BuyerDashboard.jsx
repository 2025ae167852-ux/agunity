const metrics = [
  { label: 'Open orders', value: '18', change: '+3 this week' },
  { label: 'On-time delivery', value: '96.4%', change: '+1.8%' },
  { label: 'Active suppliers', value: '42', change: '7 new' },
  { label: 'Avg. sourcing cost', value: 'KES 62/kg', change: '-4.3%' }
];

const listings = [
  { name: 'Nairobi Fresh Co-op', crop: 'Maize', quantity: '3,400 kg', price: 'KES 59/kg', traceability: 'Verified' },
  { name: 'Mwea Growers', crop: 'Beans', quantity: '1,800 kg', price: 'KES 82/kg', traceability: 'Verified' },
  { name: 'Nyeri Organic Hub', crop: 'Tomatoes', quantity: '2,200 kg', price: 'KES 95/kg', traceability: 'Verified' }
];

const pipeline = [
  { order: 'INV-2048', buyer: 'Kisumu Retail', item: 'Maize', status: 'In transit', eta: '2 days' },
  { order: 'INV-2043', buyer: 'Urban Basket', item: 'Beans', status: 'Packed', eta: '1 day' },
  { order: 'INV-2039', buyer: 'FreshCart', item: 'Tomatoes', status: 'Quality check', eta: 'Today' }
];

export default function BuyerDashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Procurement</span>
          <h2>Buying dashboard</h2>
        </div>
        <button className="primary-btn" type="button">Create purchase order</button>
      </header>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.change}</small>
          </article>
        ))}
      </div>

      <div className="panel-grid two-col">
        <section className="panel">
          <div className="panel-head">
            <h3>Recommended supply</h3>
            <button className="link-btn" type="button">Open market</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Crop</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Traceability</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={`${listing.name}-${listing.crop}`}>
                    <td>{listing.name}</td>
                    <td>{listing.crop}</td>
                    <td>{listing.quantity}</td>
                    <td>{listing.price}</td>
                    <td><span className="badge success">{listing.traceability}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel accent-panel">
          <div className="panel-head">
            <h3>Quality & compliance</h3>
            <button className="link-btn" type="button">Review checks</button>
          </div>
          <div className="advisory-box">
            <strong>Farm assurance score</strong>
            <p>91/100 average across all selected suppliers this week.</p>
            <ul>
              <li>Ethical sourcing score improved by 4.7%.</li>
              <li>Two vendors require follow-up on moisture testing.</li>
            </ul>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h3>Order pipeline</h3>
          <button className="link-btn" type="button">Track all</button>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Buyer</th>
                <th>Item</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {pipeline.map((row) => (
                <tr key={row.order}>
                  <td>{row.order}</td>
                  <td>{row.buyer}</td>
                  <td>{row.item}</td>
                  <td><span className="badge warning">{row.status}</span></td>
                  <td>{row.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
