const batches = [
  { batch: 'AF-1024', crop: 'Maize Meal', farm: 'Nkubu Cooperative', origin: 'Meru', verification: 'Verified', trust: '96%' },
  { batch: 'AF-1208', crop: 'Tomatoes', farm: 'Nakuru Fresh', origin: 'Nakuru', verification: 'Verified', trust: '94%' },
  { batch: 'AF-1316', crop: 'Beans', farm: 'Kisumu Growers', origin: 'Kisumu', verification: 'Verified', trust: '98%' }
];

export default function ConsumerDashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Trust & traceability</span>
          <h2>Product journey dashboard</h2>
        </div>
        <button className="primary-btn" type="button">Scan QR code</button>
      </header>

      <div className="metrics-grid">
        <article className="metric-card"><span>Verified products</span><strong>184</strong><small>+21 this month</small></article>
        <article className="metric-card"><span>Trust score</span><strong>96.4%</strong><small>Above benchmark</small></article>
        <article className="metric-card"><span>Active batches</span><strong>29</strong><small>7 newly added</small></article>
        <article className="metric-card"><span>Claims resolved</span><strong>92%</strong><small>Excellent</small></article>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h3>Traceability ledger</h3>
          <button className="link-btn" type="button">Search batches</button>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Batch</th>
                <th>Product</th>
                <th>Farm</th>
                <th>Origin</th>
                <th>Verification</th>
                <th>Trust</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.batch}>
                  <td>{batch.batch}</td>
                  <td>{batch.crop}</td>
                  <td>{batch.farm}</td>
                  <td>{batch.origin}</td>
                  <td><span className="badge success">{batch.verification}</span></td>
                  <td>{batch.trust}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
