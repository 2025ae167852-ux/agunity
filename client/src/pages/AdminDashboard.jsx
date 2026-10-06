const metrics = [
  { label: 'Active users', value: '3,482', change: '+124 this month' },
  { label: 'On-time payouts', value: '98.8%', change: '+1.2%' },
  { label: 'Flagged cases', value: '17', change: '6 critical' },
  { label: 'System uptime', value: '99.95%', change: '0.15% downtime' }
];

const alerts = [
  { type: 'Risk', title: 'Warehouse temperature alarm', context: 'Mombasa cold storage below target by 2°C.' },
  { type: 'Finance', title: 'Settlement review', context: '3 pending payouts need review before midnight.' },
  { type: 'Security', title: 'Repeated login attempts', context: '2 accounts temporarily locked for review.' }
];

const roles = [
  { label: 'Farmers', count: '1,492' },
  { label: 'Buyers', count: '628' },
  { label: 'Transporters', count: '214' },
  { label: 'Warehouse', count: '96' },
  { label: 'Retailers', count: '430' },
  { label: 'Consumers', count: '622' }
];

export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Operations control</span>
          <h2>Platform command center</h2>
        </div>
        <button className="primary-btn" type="button">Export report</button>
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
            <h3>Active alerts</h3>
            <button className="link-btn" type="button">Open queue</button>
          </div>
          <ul className="list-stack">
            {alerts.map((alert) => (
              <li key={alert.title}>
                <strong>{alert.type}</strong>
                <span>{alert.title}</span>
                <p>{alert.context}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h3>Role distribution</h3>
            <button className="link-btn" type="button">View users</button>
          </div>
          <div className="role-grid">
            {roles.map((role) => (
              <div key={role.label} className="role-box">
                <span>{role.label}</span>
                <strong>{role.count}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h3>Operational summary</h3>
          <button className="link-btn" type="button">Download ledger</button>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Area</th>
                <th>Objective</th>
                <th>Current status</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Finance</td>
                <td>Payout reconciliation</td>
                <td><span className="badge warning">At risk</span></td>
                <td>Resolve 3 stale payouts</td>
              </tr>
              <tr>
                <td>Logistics</td>
                <td>Shipment SLA</td>
                <td><span className="badge success">On track</span></td>
                <td>Monitor route density</td>
              </tr>
              <tr>
                <td>Compliance</td>
                <td>Traceability checks</td>
                <td><span className="badge success">Stable</span></td>
                <td>Review regional audits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
