import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TransporterDashboard from "./pages/TransporterDashboard";
import WarehouseDashboard from "./pages/WarehouseDashboard";
import RetailerDashboard from "./pages/RetailerDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import MarketplacePage from "./pages/MarketplacePage";
import AuthPanel from "./components/AuthPanel";
import LandingPage from "./components/LandingPage";
import ClimateAdvisoryPanel from "./components/ClimateAdvisoryPanel";
import { useAuth } from "./hooks/useAuth";
import agunityLogo from "./assets/agunity-logo.svg";
import sunflowerField from "./assets/sunflower-field.jpg";

export default function App() {
  const { user, loading, isAuthenticated, signIn, signUp, signOut } = useAuth();
  const [authError, setAuthError] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const authDialogRef = useRef(null);
  const role = String(user?.role || "farmer").trim().toLowerCase();
  const isAdmin = role === "admin";

  const defaultRouteByRole = {
    farmer: "/",
    buyer: "/marketplace",
    transporter: "/transporter",
    warehouse: "/warehouse",
    retailer: "/retailer",
    consumer: "/consumer",
    admin: "/admin"
  };

  const roleHome = defaultRouteByRole[role] || "/";

  useEffect(() => {
    const dialog = authDialogRef.current;
    if (!dialog) return;
    if (showAuth && !dialog.open) dialog.showModal();
    if (!showAuth && dialog.open) dialog.close();
  }, [showAuth]);

  const navItems = [];
  if (role === "farmer" || isAdmin) navItems.push({ path: "/", label: "Farmer", end: true });
  if (role === "farmer" || role === "buyer" || isAdmin) navItems.push({ path: "/marketplace", label: "Marketplace" });
  if (role === "transporter" || isAdmin) navItems.push({ path: "/transporter", label: "Transporter" });
  if (role === "warehouse" || isAdmin) navItems.push({ path: "/warehouse", label: "Warehouse" });
  if (role === "retailer" || isAdmin) navItems.push({ path: "/retailer", label: "Retailer" });
  if (role === "consumer" || isAdmin) navItems.push({ path: "/consumer", label: "Consumer" });
  if (role === "buyer" || isAdmin) navItems.push({ path: "/buyer", label: "Buyer Dashboard" });
  if (isAdmin) navItems.push({ path: "/admin", label: "Admin" });

  const guard = (allowedRoles, element) => {
    const normalized = allowedRoles.map((item) => String(item).toLowerCase());
    return normalized.includes(role) || isAdmin ? element : <Navigate to={roleHome} replace />;
  };

  const openAuthSection = (mode = "login") => {
    setAuthError("");
    setAuthMode(mode);
    setShowAuth(true);
  };

  if (!isAuthenticated) {
    return (
      <main className="public-page">
        <LandingPage
          onGetStarted={() => openAuthSection("register")}
          onSignIn={() => openAuthSection("login")}
        />

        <dialog
          className="auth-modal"
          ref={authDialogRef}
          aria-labelledby="auth-modal-title"
          onCancel={() => setShowAuth(false)}
          onClose={() => setShowAuth(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setShowAuth(false);
            }
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowAuth(false);
          }}
        >
          <div className="auth-modal-layout">
            <aside className="auth-modal-story">
              <img src={sunflowerField} alt="" />
              <div className="auth-modal-story-content">
                <span>AGUNITY · OIL-CROP NETWORK</span>
                <h2 id="auth-modal-title">A clearer path from planting to purchase.</h2>
                <p>Connect your farm to buyer demand and build your season around terms you understand.</p>
              </div>
            </aside>
            <div className="auth-modal-form">
              <button className="auth-modal-close" type="button" onClick={() => setShowAuth(false)}>
                Close
              </button>
              <AuthPanel
                key={authMode}
                initialMode={authMode}
                loading={loading}
                error={authError}
                onLogin={async (email, password) => {
                  try {
                    setAuthError("");
                    await signIn(email, password);
                  } catch (error) {
                    setAuthError(error.message || "Invalid login. Check credentials.");
                  }
                }}
                onRegister={async (payload) => {
                  try {
                    setAuthError("");
                    await signUp(payload);
                  } catch (error) {
                    setAuthError(error.message || "Registration failed. Try another email.");
                  }
                }}
              />
            </div>
          </div>
        </dialog>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-bar-brand">
          <img src={agunityLogo} alt="AGUNITY" className="logo-icon" />
          <h1>AGUNITY</h1>
        </div>
        <span className="welcome">Hi, {user?.fullName || "Farmer"}</span>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.end}>{item.label}</NavLink>
          ))}
          <button className="logout-btn" onClick={signOut} type="button">Logout</button>
        </nav>
      </header>

      <main className="content">
        {(role === "farmer" || isAdmin) ? <ClimateAdvisoryPanel /> : null}
        <Routes>
          <Route
            path="/"
            element={
              role === "farmer" || isAdmin
                ? <FarmerDashboard user={user} />
                : <Navigate to={roleHome} replace />
            }
          />
          <Route
            path="/marketplace"
            element={
              role === "farmer" || role === "buyer" || isAdmin
                ? <MarketplacePage role={role} />
                : <Navigate to={roleHome} replace />
            }
          />
          <Route path="/transporter" element={guard(["transporter"], <TransporterDashboard />)} />
          <Route path="/warehouse" element={guard(["warehouse"], <WarehouseDashboard />)} />
          <Route path="/retailer" element={guard(["retailer"], <RetailerDashboard />)} />
          <Route path="/consumer" element={guard(["consumer"], <ConsumerDashboard />)} />
          <Route path="/buyer" element={(role === "buyer" || isAdmin) ? <BuyerDashboard /> : <Navigate to={roleHome} replace />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to={roleHome} replace />} />
          <Route path="*" element={<Navigate to={roleHome} replace />} />
        </Routes>
      </main>
    </div>
  );
}
