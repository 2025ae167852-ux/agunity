const routes = [
  { route: 'Nakuru → Nairobi', cargo: 'Maize', status: 'In transit', eta: '2h 15m', driver: 'James K.' },
  { route: 'Eldoret → Kisumu', cargo: 'Beans', status: 'Delayed', eta: '4h 40m', driver: 'Ben M.' },
  { route: 'Naivasha → Mombasa', cargo: 'Tomatoes', status: 'Loading', eta: '1h 05m', driver: 'Aisha N.' }
];

const jobs = [
  { trip: 'TR-118', pickup: 'Nakuru', dropoff: 'Nairobi', weight: '2,100 kg', fee: 'KES 76,000' },
  { trip: 'TR-119', pickup: 'Eldoret', dropoff: 'Kisumu', weight: '1,640 kg', fee: 'KES 58,000' },
  { trip: 'TR-120', pickup: 'Naivasha', dropoff: 'Mombasa', weight: '1,980 kg', fee: 'KES 92,000' }
];

export default function TransporterDashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Logistics</span>
          <h2>Transport operations</h2>
        </div>
        <button className="primary-btn" type="button">Accept new route</button>
      </header>

      <div className="metrics-grid">
        <article className="metric-card"><span>Trips today</span><strong>12</strong><small>+2 vs yesterday</small></article>
        <article className="metric-card"><span>On-time rate</span><strong>94%</strong><small>+2.2%</small></article>
        <article className="metric-card"><span>Distance covered</span><strong>1,280 km</strong><small>+126 km</small></article>
        <article className="metric-card"><span>Revenue</span><strong>KES 645K</strong><small>+8.1%</small></article>
      </div>

      <div className="panel-grid two-col">
        <section className="panel">
          <div className="panel-head">
            <h3>Route board</h3>
            <button className="link-btn" type="button">Map view</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Cargo</th>
                  <th>Status</th>
                  <th>ETA</th>
                  <th>Driver</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.route}>
                    <td>{route.route}</td>
                    <td>{route.cargo}</td>
                    <td><span className={`badge ${route.status === 'Delayed' ? 'warning' : route.status === 'Loading' ? 'info' : 'success'}`}>{route.status}</span></td>
                    <td>{route.eta}</td>
                    <td>{route.driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel accent-panel">
          <div className="panel-head">
            <h3>Dispatch notes</h3>
            <button className="link-btn" type="button">Checklist</button>
          </div>
          <div className="advisory-box">
            <strong>Live operations</strong>
            <ul>
              <li>One vehicle requires fuel top-up before final departure.</li>
              <li>Cold-chain route to Mombasa has priority loading approval.</li>
            </ul>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h3>Open jobs</h3>
          <button className="link-btn" type="button">All jobs</button>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Trip</th>
                <th>Pickup</th>
                <th>Dropoff</th>
                <th>Weight</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.trip}>
                  <td>{job.trip}</td>
                  <td>{job.pickup}</td>
                  <td>{job.dropoff}</td>
                  <td>{job.weight}</td>
                  <td>{job.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
