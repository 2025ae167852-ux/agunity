import { useState } from 'react';

const metrics = [
  { label: 'Farm income', value: 'KES 1.28M', change: '+14.2%' },
  { label: 'Active plots', value: '12', change: '2 new' },
  { label: 'Carbon credits', value: '84', change: '+12 this month' }
];

const plots = [
  { name: 'North Rift Plot 1', crop: 'Maize', acreage: '3.4 ha', status: 'Healthy', yield: '6.2 t' },
  { name: 'Lower Valley Block', crop: 'Tomatoes', acreage: '1.8 ha', status: 'Monitoring', yield: '4.1 t' },
  { name: 'River Bend', crop: 'Beans', acreage: '2.1 ha', status: 'Irrigation', yield: '3.7 t' }
];

const activities = [
  { title: 'Soil test completed', time: 'Today, 08:30', detail: 'pH and nitrogen levels within target range.' },
  { title: 'Fertilizer delivery', time: 'Yesterday', detail: '3 bags received at the field store.' },
  { title: 'Harvest scheduled', time: 'Thu 12:00', detail: 'Beans harvest planned for the lower valley block.' }
];

const activityTypes = ['Field observation', 'Irrigation', 'Planting', 'Soil test', 'Input delivery'];

const sales = [
  { buyer: 'Nakuru Fresh', crop: 'Maize', quantity: '1,200 kg', value: 'KES 168,000', status: 'Paid' },
  { buyer: 'Kisumu Buyers Co', crop: 'Tomatoes', quantity: '820 kg', value: 'KES 114,000', status: 'Pending' },
  { buyer: 'Rift Valley Market', crop: 'Beans', quantity: '540 kg', value: 'KES 79,000', status: 'Packed' }
];

function readStoredList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    localStorage.removeItem(key);
    return [];
  }
}

function formatQuantity(quantityKg) {
  if (quantityKg >= 1000) return `${(quantityKg / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} t`;
  return `${quantityKg.toLocaleString()} kg`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium' }).format(new Date(`${value}T12:00:00`));
}

export default function FarmerDashboard({ user }) {
  const userKey = user?.id || user?.email || 'current-user';
  const harvestStorageKey = `agunity:farmer:${userKey}:harvests`;
  const activityStorageKey = `agunity:farmer:${userKey}:activities`;
  const [harvests, setHarvests] = useState(() => readStoredList(harvestStorageKey));
  const [loggedActivities, setLoggedActivities] = useState(() => readStoredList(activityStorageKey));
  const [activeForm, setActiveForm] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(plots[0].name);
  const [harvestQuantity, setHarvestQuantity] = useState('');
  const [harvestDate, setHarvestDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [activityType, setActivityType] = useState(activityTypes[0]);
  const [activityDetails, setActivityDetails] = useState('');
  const [activityDate, setActivityDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [statusMessage, setStatusMessage] = useState('');

  const recordedQuantity = harvests.reduce((total, harvest) => total + harvest.quantityKg, 0);
  const recentActivities = [
    ...loggedActivities.map((activity) => ({
      title: activity.title,
      time: formatDate(activity.date),
      detail: activity.detail
    })),
    ...harvests.map((harvest) => ({
      title: `${harvest.crop} harvest recorded`,
      time: formatDate(harvest.date),
      detail: `${formatQuantity(harvest.quantityKg)} from ${harvest.plot}.`
    })),
    ...activities
  ].slice(0, 6);

  const saveHarvest = (event) => {
    event.preventDefault();
    const quantityKg = Number(harvestQuantity);
    if (!Number.isFinite(quantityKg) || quantityKg <= 0) return;

    const plot = plots.find((item) => item.name === selectedPlot);
    const nextHarvests = [{
      id: crypto.randomUUID(),
      plot: plot.name,
      crop: plot.crop,
      quantityKg,
      date: harvestDate
    }, ...harvests];

    localStorage.setItem(harvestStorageKey, JSON.stringify(nextHarvests));
    setHarvests(nextHarvests);
    setHarvestQuantity('');
    setActiveForm(null);
    setStatusMessage('Harvest recorded.');
  };

  const saveActivity = (event) => {
    event.preventDefault();
    const plot = plots.find((item) => item.name === selectedPlot);
    const nextActivities = [{
      id: crypto.randomUUID(),
      title: activityType,
      detail: `${activityDetails.trim()}${activityDetails.trim() ? ' · ' : ''}${plot.name}`,
      date: activityDate
    }, ...loggedActivities];

    localStorage.setItem(activityStorageKey, JSON.stringify(nextActivities));
    setLoggedActivities(nextActivities);
    setActivityDetails('');
    setActiveForm(null);
    setStatusMessage('Farm activity recorded.');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Farm overview</span>
          <h2>Good morning, {user?.fullName?.split(' ')[0] || 'Farmer'}</h2>
        </div>
        <div className="header-actions">
          <button className="secondary-btn" type="button" onClick={() => { setStatusMessage(''); setActiveForm(activeForm === 'harvest' ? null : 'harvest'); }}>Add harvest</button>
          <button className="primary-btn" type="button" onClick={() => { setStatusMessage(''); setActiveForm(activeForm === 'activity' ? null : 'activity'); }}>New activity</button>
        </div>
      </header>

      {statusMessage ? <p className="success-message" role="status">{statusMessage}</p> : null}

      {activeForm === 'harvest' ? (
        <section className="panel workflow-form" aria-label="Record a harvest">
          <div className="panel-head">
            <h3>Record a harvest</h3>
            <button className="link-btn" type="button" onClick={() => setActiveForm(null)}>Cancel</button>
          </div>
          <form className="workflow-fields" onSubmit={saveHarvest}>
            <label>Plot
              <select onChange={(event) => setSelectedPlot(event.target.value)} value={selectedPlot}>
                {plots.map((plot) => <option key={plot.name} value={plot.name}>{plot.name} · {plot.crop}</option>)}
              </select>
            </label>
            <label>Quantity harvested (kg)
              <input min="0.1" onChange={(event) => setHarvestQuantity(event.target.value)} required step="0.1" type="number" value={harvestQuantity} />
            </label>
            <label>Harvest date
              <input onChange={(event) => setHarvestDate(event.target.value)} required type="date" value={harvestDate} />
            </label>
            <button className="primary-btn" type="submit">Save harvest</button>
          </form>
        </section>
      ) : null}

      {activeForm === 'activity' ? (
        <section className="panel workflow-form" aria-label="Record farm activity">
          <div className="panel-head">
            <h3>Record farm activity</h3>
            <button className="link-btn" type="button" onClick={() => setActiveForm(null)}>Cancel</button>
          </div>
          <form className="workflow-fields" onSubmit={saveActivity}>
            <label>Activity
              <select onChange={(event) => setActivityType(event.target.value)} value={activityType}>
                {activityTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label>Plot
              <select onChange={(event) => setSelectedPlot(event.target.value)} value={selectedPlot}>
                {plots.map((plot) => <option key={plot.name} value={plot.name}>{plot.name} · {plot.crop}</option>)}
              </select>
            </label>
            <label>Activity date
              <input onChange={(event) => setActivityDate(event.target.value)} required type="date" value={activityDate} />
            </label>
            <label className="workflow-notes">Notes
              <input onChange={(event) => setActivityDetails(event.target.value)} placeholder="What happened in the field?" required value={activityDetails} />
            </label>
            <button className="primary-btn" type="submit">Save activity</button>
          </form>
        </section>
      ) : null}

      <div className="metrics-grid">
        <article className="metric-card">
          <span>Harvest recorded</span>
          <strong>{formatQuantity(recordedQuantity)}</strong>
          <small>{harvests.length} {harvests.length === 1 ? 'record' : 'records'}</small>
        </article>
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
            <h3>Plot performance</h3>
            <button className="link-btn" type="button">View all</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Plot</th>
                  <th>Crop</th>
                  <th>Acreage</th>
                  <th>Status</th>
                  <th>Yield</th>
                </tr>
              </thead>
              <tbody>
                {plots.map((plot) => (
                  <tr key={plot.name}>
                    <td>{plot.name}</td>
                    <td>{plot.crop}</td>
                    <td>{plot.acreage}</td>
                    <td><span className="badge success">{plot.status}</span></td>
                    <td>{plot.yield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h3>Recent activities</h3>
            <button className="link-btn" type="button">Timeline</button>
          </div>
          <ul className="list-stack">
            {recentActivities.map((item, index) => (
              <li key={`${item.title}-${item.time}-${index}`}>
                <strong>{item.title}</strong>
                <span>{item.time}</span>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h3>Harvest log</h3>
          <span className="badge info">{harvests.length} recorded</span>
        </div>
        {harvests.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Date</th><th>Plot</th><th>Crop</th><th>Quantity</th></tr>
              </thead>
              <tbody>
                {harvests.map((harvest) => (
                  <tr key={harvest.id}>
                    <td>{formatDate(harvest.date)}</td>
                    <td>{harvest.plot}</td>
                    <td>{harvest.crop}</td>
                    <td>{formatQuantity(harvest.quantityKg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="empty-state">No harvests recorded yet.</p>}
      </section>

      <div className="panel-grid two-col">
        <section className="panel">
          <div className="panel-head">
            <h3>Sales pipeline</h3>
            <button className="link-btn" type="button">Export</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Crop</th>
                  <th>Qty</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={`${sale.buyer}-${sale.crop}`}>
                    <td>{sale.buyer}</td>
                    <td>{sale.crop}</td>
                    <td>{sale.quantity}</td>
                    <td>{sale.value}</td>
                    <td><span className={`badge ${sale.status === 'Paid' ? 'success' : sale.status === 'Pending' ? 'warning' : 'info'}`}>{sale.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel accent-panel">
          <div className="panel-head">
            <h3>Climate advisory</h3>
            <button className="link-btn" type="button">View report</button>
          </div>
          <div className="advisory-box">
            <strong>Rainfall outlook</strong>
            <p>Moderate rainfall expected over the next 7 days, with strong afternoon showers in the western belt.</p>
            <ul>
              <li>Sow short-cycle beans in the lower field by Friday.</li>
              <li>Reduce irrigation by 12% in the river block.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
