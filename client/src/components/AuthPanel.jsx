import { useState } from 'react';

export default function AuthPanel({ initialMode = 'login', loading, error, onLogin, onRegister }) {
  const [mode, setMode] = useState(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const isRegistering = mode === 'register';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegistering) {
      onRegister({ fullName, email, password, role });
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <span className="eyebrow">Access the platform</span>
        <h3>{isRegistering ? 'Create your account' : 'Welcome back'}</h3>
      </div>

      <p className="auth-card-copy">
        {isRegistering
          ? 'Create an AGUNITY account to open a workspace for your role.'
          : 'Sign in to continue to your AGUNITY workspace.'}
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegistering ? (
          <label className="auth-field">
            Full name
            <input
              autoComplete="name"
              name="fullName"
              onChange={(event) => setFullName(event.target.value)}
              required
              value={fullName}
            />
          </label>
        ) : null}

        <label className="auth-field">
          Email address
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label className="auth-field">
          Password
          <input
            autoComplete={isRegistering ? 'new-password' : 'current-password'}
            minLength={isRegistering ? 8 : undefined}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        {isRegistering ? (
          <label className="auth-field">
            Workspace role
            <select name="role" onChange={(event) => setRole(event.target.value)} value={role}>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
              <option value="transporter">Transporter</option>
              <option value="warehouse">Warehouse</option>
              <option value="retailer">Retailer</option>
              <option value="consumer">Consumer</option>
            </select>
          </label>
        ) : null}

        {error ? <p className="error auth-error" role="alert">{error}</p> : null}

        <button type="submit" className="primary-btn auth-btn" disabled={loading}>
          {loading ? 'Please wait...' : isRegistering ? 'Create account' : 'Sign In'}
        </button>
      </form>

      <p className="auth-mode-toggle">
        {isRegistering ? 'Already have an account?' : 'New to AGUNITY?'}{' '}
        <button
          type="button"
          disabled={loading}
          onClick={() => setMode(isRegistering ? 'login' : 'register')}
        >
          {isRegistering ? 'Sign in' : 'Create account'}
        </button>
      </p>
    </div>
  );
}
