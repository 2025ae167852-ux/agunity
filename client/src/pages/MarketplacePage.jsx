const listings = [
  { id: 'MK-101', crop: 'Maize', quantity: '1600 kg', price: 'KES 58/kg', origin: 'Nakuru', seller: 'Green Valley Co-op' },
  { id: 'MK-104', crop: 'Beans', quantity: '900 kg', price: 'KES 86/kg', origin: 'Kiambu', seller: 'Mau Landscapes' },
  { id: 'MK-106', crop: 'Tomatoes', quantity: '600 kg', price: 'KES 97/kg', origin: 'Nyeri', seller: 'Agro Loop' },
  { id: 'MK-108', crop: 'Bananas', quantity: '1,250 bunches', price: 'KES 110/bunch', origin: 'Kisii', seller: 'Kisii Highlands' }
];

export default function MarketplacePage({ role }) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">Market access</span>
          <h2>Marketplace</h2>
        </div>
        <button className="primary-btn" type="button">Post listing</button>
      </header>

      <div className="market-toolbar">
        <span className="chip">All produce</span>
        <span className="chip">Fresh</span>
        <span className="chip">High demand</span>
        <span className="chip">Verified</span>
      </div>

      <div className="market-grid">
        {listings.map((listing) => (
          <article className="market-card" key={listing.id}>
            <div className="market-badge">{listing.crop}</div>
            <h3>{listing.seller}</h3>
            <p>{listing.quantity}</p>
            <div className="market-meta">
              <span>{listing.origin}</span>
              <span>{listing.price}</span>
            </div>
            <button className="primary-btn" type="button">{role === 'farmer' ? 'Sell' : 'Buy now'}</button>
          </article>
        ))}
      </div>
    </div>
  );
}
