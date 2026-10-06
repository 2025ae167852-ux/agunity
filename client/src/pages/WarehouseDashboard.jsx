const batches = [
  { batch: 'LOT-0172', crop: 'Maize', qty: '2,400 kg', temp: '14°C', status: 'In storage' },
  { batch: 'LOT-0181', crop: 'Beans', qty: '1,100 kg', temp: '17°C', status: 'Quality check' },
  { batch: 'LOT-0185', crop: 'Tomatoes', qty: '980 kg', temp: '11°C', status: 'Dispatch ready' }
];

const inflow = [
  { truck: 'TRK-409', source: 'Nakuru', commodity: 'Maize', time: '09:10 AM' },
  { truck: 'TRK-412', source: 'Eldoret', commodity: 'Beans', time: '10:35 AM' },
  { truck: 'TRK-417', source: 'Nyeri', commodity: 'Tomatoes', time: '12:05 PM' }
];

export default function WarehouseDashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Inventory</span>
          <h2>Warehouse control room</h2>
        </div>
        <button className="primary-btn" type="button">New receiving note</button>
      </header>

      <div className="metrics-grid">
        <article className="metric-card"><span>Storage utilization</span><strong>78%</strong><small>+4% this week</small></article>
        <article className="metric-card"><span>Cold chain health</span><strong>96%</strong><small>Stable</small></article>
        <article className="metric-card"><span>Dispatches</span><strong>43</strong><small>7 due today</small></article>
        <article className="metric-card"><span>Inventory variance</span><strong>1.2%</strong><small>Within tolerance</small></article>
      </div>

      <div className="panel-grid two-col">
        <section className="panel">
          <div className="panel-head">
            <h3>Current lots</h3>
            <button className="link-btn" type="button">All batches</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Crop</th>
                  <th>Qty</th>
                  <th>Temp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.batch}>
                    <td>{batch.batch}</td>
                    <td>{batch.crop}</td>
                    <td>{batch.qty}</td>
                    <td>{batch.temp}</td>
                    <td><span className="badge success">{batch.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel accent-panel">
          <div className="panel-head">
            <h3>Receiving queue</h3>
            <button className="link-btn" type="button">See all</button>
          </div>
          <ul className="list-stack">
            {inflow.map((item) => (
              <li key={item.truck}>
                <strong>{item.truck}</strong>
                <span>{item.time}</span>
                <p>{item.source} → {item.commodity}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
