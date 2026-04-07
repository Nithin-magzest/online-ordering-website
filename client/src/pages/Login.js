import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── Google Fonts loaded via @import in the style block below ──────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

  .lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    --c-bg:       #f5f0e8;
    --c-surface:  #fffdf8;
    --c-card:     #ffffff;
    --c-accent:   #c8440a;
    --c-accent2:  #e8680a;
    --c-gold:     #d4a017;
    --c-text:     #1a1208;
    --c-muted:    #8a7e6e;
    --c-border:   #e2d9c8;
    --c-input:    #f9f5ee;
    --c-success:  #2d7a4f;
    --c-error:    #c0392b;
    --c-glow:     rgba(200,68,10,0.18);

    font-family: 'Outfit', sans-serif;
    background: var(--c-bg);
    min-height: 100vh;
    display: flex;
    align-items: stretch;
  }

  /* ── Split layout ── */
  .lp-left {
    flex: 1;
    background: var(--c-text);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 48px;
    position: relative;
    overflow: hidden;
  }

  .lp-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 0% 30%, rgba(200,68,10,0.22) 0%, transparent 65%),
      radial-gradient(ellipse 50% 60% at 100% 80%, rgba(212,160,23,0.12) 0%, transparent 55%);
    pointer-events: none;
  }

  .lp-left-logo {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .lp-left-logo-icon {
    width: 46px; height: 46px;
    background: linear-gradient(135deg, var(--c-accent), var(--c-gold));
    border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    box-shadow: 0 6px 20px rgba(200,68,10,0.4);
  }

  .lp-left-logo-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .lp-left-hero { position: relative; }

  .lp-left-hero h2 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 3.2vw, 3rem);
    color: #fff;
    line-height: 1.12;
    letter-spacing: -1px;
    margin-bottom: 20px;
  }

  .lp-left-hero h2 em {
    font-style: normal;
    background: linear-gradient(90deg, var(--c-accent2), var(--c-gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .lp-left-hero p {
    color: rgba(255,255,255,0.5);
    font-size: 0.95rem;
    line-height: 1.7;
    max-width: 340px;
  }

  .lp-left-tags {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .lp-tag {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    font-size: 0.78rem;
    padding: 5px 12px;
    border-radius: 20px;
    letter-spacing: 0.04em;
  }

  /* ── Right panel ── */
  .lp-right {
    width: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
    background: var(--c-surface);
    flex-shrink: 0;
  }

  .lp-form-wrap {
    width: 100%;
    max-width: 380px;
    animation: lpFadeUp 0.5s ease both;
  }

  .lp-form-head {
    margin-bottom: 32px;
  }

  .lp-form-head h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--c-text);
    letter-spacing: -0.5px;
  }

  .lp-form-head p {
    color: var(--c-muted);
    font-size: 0.88rem;
    margin-top: 5px;
  }

  /* ── Tabs ── */
  .lp-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--c-input);
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 28px;
    border: 1px solid var(--c-border);
  }

  .lp-tab {
    background: none;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--c-muted);
    padding: 9px 0;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.22s;
  }

  .lp-tab.active {
    background: var(--c-card);
    color: var(--c-accent);
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  /* ── Alert ── */
  .lp-alert {
    border-radius: 9px;
    padding: 10px 14px;
    font-size: 0.83rem;
    font-weight: 500;
    margin-bottom: 18px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    animation: lpFadeUp 0.25s ease both;
  }

  .lp-alert.success { background: rgba(45,122,79,0.1); border: 1px solid rgba(45,122,79,0.25); color: var(--c-success); }
  .lp-alert.error   { background: rgba(192,57,43,0.08); border: 1px solid rgba(192,57,43,0.22); color: var(--c-error); }

  /* ── Fields ── */
  .lp-field { margin-bottom: 16px; }

  .lp-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--c-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }

  .lp-input-wrap { position: relative; }

  .lp-input-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    pointer-events: none;
    opacity: 0.45;
  }

  .lp-input {
    width: 100%;
    background: var(--c-input);
    border: 1.5px solid var(--c-border);
    border-radius: 10px;
    padding: 11px 13px 11px 40px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.92rem;
    color: var(--c-text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }

  .lp-input:focus {
    border-color: var(--c-accent);
    background: #fff;
    box-shadow: 0 0 0 3px var(--c-glow);
  }

  .lp-input::placeholder { color: var(--c-muted); opacity: 0.55; }

  /* ── Password strength ── */
  .lp-strength { margin-top: 7px; }
  .lp-strength-bars { display: flex; gap: 4px; }
  .lp-strength-bar {
    flex: 1; height: 3px; border-radius: 2px;
    background: var(--c-border);
    transition: background 0.3s;
  }
  .lp-strength-label { font-size: 0.71rem; margin-top: 4px; color: var(--c-muted); }

  /* ── Location box ── */
  .lp-location {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--c-input);
    border: 1.5px dashed rgba(200,68,10,0.35);
    border-radius: 10px;
    padding: 12px 14px;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
  }

  .lp-location:hover { border-color: var(--c-accent); background: rgba(200,68,10,0.04); }
  .lp-location.granted { border-style: solid; border-color: var(--c-success); }

  .lp-loc-icon { font-size: 20px; flex-shrink: 0; }

  .lp-loc-body strong {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--c-text);
  }

  .lp-loc-body span {
    font-size: 0.76rem;
    color: var(--c-muted);
    display: block;
    margin-top: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
  }

  .lp-loc-badge {
    margin-left: auto;
    flex-shrink: 0;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 20px;
    background: rgba(200,68,10,0.1);
    color: var(--c-accent);
    letter-spacing: 0.04em;
  }

  .lp-loc-badge.granted { background: rgba(45,122,79,0.12); color: var(--c-success); }

  /* ── Submit button ── */
  .lp-btn {
    width: 100%;
    margin-top: 10px;
    background: linear-gradient(135deg, var(--c-accent), var(--c-accent2));
    color: #fff;
    border: none;
    border-radius: 11px;
    padding: 13px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 6px 20px rgba(200,68,10,0.28);
  }

  .lp-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(200,68,10,0.35); }
  .lp-btn:active:not(:disabled) { transform: translateY(0); }
  .lp-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Divider ── */
  .lp-divider {
    text-align: center;
    color: var(--c-muted);
    font-size: 0.78rem;
    margin-top: 20px;
  }

  .lp-divider a {
    color: var(--c-accent);
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }

  /* ── Spinner ── */
  .lp-spinner {
    display: inline-block;
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: lpSpin 0.65s linear infinite;
    vertical-align: middle;
    margin-right: 7px;
  }

  /* ── Responsive ── */
  @media (max-width: 800px) {
    .lp-left { display: none; }
    .lp-right { width: 100%; padding: 36px 24px; }
  }

  @keyframes lpFadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes lpSpin { to { transform: rotate(360deg); } }
`;

// ── Constants ──────────────────────────────────────────────────────────────────
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

const STRENGTH_META = [
  { color: "#c0392b", label: "Weak" },
  { color: "#e67e22", label: "Fair" },
  { color: "#f1c40f", label: "Good" },
  { color: "#2d7a4f", label: "Strong" },
];

function passwordStrength(val) {
  let s = 0;
  if (val.length >= 6) s++;
  if (val.length >= 10) s++;
  if (/[A-Z]/.test(val) && /\d/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  return s;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("login"); // "login" | "register"
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { msg, type }
  const [location, setLocation] = useState(null); // geo data
  const [locLabel, setLocLabel] = useState("Tap to share your location");
  const [locGranted, setLocGranted] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [strength, setStrength] = useState(0);

  // form refs  (uncontrolled for perf; read on submit)
  const loginUserId = useRef();
  const loginPwd = useRef();
  const regUserId = useRef();
  const regEmail = useRef();
  const regPwd = useRef();

  // Inject styles once
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = styles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  // ── Geolocation ──────────────────────────────────────────────────────────────
  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setAlert({
        msg: "Geolocation is not supported by your browser.",
        type: "error",
      });
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        let address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const d = await r.json();
          address = d.display_name || address;
        } catch (_) {}

        const locData = { latitude, longitude, address, locationGranted: true };
        setLocation(locData);
        setLocGranted(true);
        setLocLabel(address.split(",").slice(0, 3).join(","));
        setLocLoading(false);
      },
      () => {
        const locData = { locationGranted: false };
        setLocation(locData);
        setLocLabel("Location denied — you can still continue");
        setLocLoading(false);
      },
    );
  };

  // ── API call ─────────────────────────────────────────────────────────────────
  const callApi = async (endpoint, body) => {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  // ── Save user + location to localStorage ─────────────────────────────────────
  // ✅ FIX: we merge location into the user object so ProfileCorner can read it
  const saveSession = (token, user) => {
    localStorage.setItem("token", token);
    const userWithLocation = {
      ...user,
      location: location || { locationGranted: false },
    };
    localStorage.setItem("user", JSON.stringify(userWithLocation));
  };

  // ── Login submit ─────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    setAlert(null);
    const userId = loginUserId.current?.value.trim();
    const password = loginPwd.current?.value;

    if (!userId || !password) {
      setAlert({
        msg: "Please enter your User ID and password.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await callApi("login", { userId, password, location });
      if (data.success) {
        saveSession(data.token, data.user); // ← updated
        setAlert({ msg: data.message, type: "success" });
        setTimeout(() => navigate("/"), 1400);
      } else {
        setAlert({ msg: data.message, type: "error" });
      }
    } catch {
      setAlert({ msg: "Cannot reach server. Is it running?", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ── Register submit ───────────────────────────────────────────────────────────
  const handleRegister = async () => {
    setAlert(null);
    const userId = regUserId.current?.value.trim();
    const email = regEmail.current?.value.trim();
    const password = regPwd.current?.value;

    if (!userId || !email || !password) {
      setAlert({ msg: "All fields are required.", type: "error" });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setAlert({ msg: "Please enter a valid email address.", type: "error" });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: "Password must be at least 6 characters.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await callApi("register", {
        userId,
        email,
        password,
        location,
      });
      if (data.success) {
        saveSession(data.token, data.user); // ← updated
        setAlert({ msg: data.message, type: "success" });
        setTimeout(() => navigate("/"), 1400);
      } else {
        setAlert({ msg: data.message, type: "error" });
      }
    } catch {
      setAlert({ msg: "Cannot reach server. Is it running?", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key !== "Enter") return;
    tab === "login" ? handleLogin() : handleRegister();
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="lp-root" onKeyDown={handleKey}>
      {/* ── Left decorative panel ── */}
      <div className="lp-left">
        <div className="lp-left-logo">
          <div className="lp-left-logo-icon">🍽️</div>
          <span className="lp-left-logo-name">FeastFlow</span>
        </div>

        <div className="lp-left-hero">
          <h2>
            Great food,
            <br />
            <em>delivered fast</em>
            <br />
            to your door.
          </h2>
          <p>
            Sign in to track your orders, save your favourites, and get
            exclusive offers from restaurants near you.
          </p>
        </div>

        <div className="lp-left-tags">
          {[
            "🚀 Fast delivery",
            "🔒 Secure payments",
            "📍 Live tracking",
            "⭐ 50k+ reviews",
          ].map((t) => (
            <span className="lp-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="lp-right">
        <div className="lp-form-wrap">
          <div className="lp-form-head">
            <h3>{tab === "login" ? "Welcome back 👋" : "Create account"}</h3>
            <p>
              {tab === "login"
                ? "Sign in to continue ordering"
                : "Join thousands of happy foodies"}
            </p>
          </div>

          {/* Tabs */}
          <div className="lp-tabs">
            <button
              className={`lp-tab ${tab === "login" ? "active" : ""}`}
              onClick={() => {
                setTab("login");
                setAlert(null);
              }}
            >
              Sign In
            </button>
            <button
              className={`lp-tab ${tab === "register" ? "active" : ""}`}
              onClick={() => {
                setTab("register");
                setAlert(null);
              }}
            >
              Register
            </button>
          </div>

          {/* Alert */}
          {alert && (
            <div className={`lp-alert ${alert.type}`}>
              <span>{alert.type === "error" ? "⚠️" : "✅"}</span>
              <span>{alert.msg}</span>
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {tab === "login" && (
            <>
              <div className="lp-field">
                <label className="lp-label">User ID</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">👤</span>
                  <input
                    ref={loginUserId}
                    className="lp-input"
                    type="text"
                    placeholder="Enter your user ID"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="lp-field">
                <label className="lp-label">Password</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">🔒</span>
                  <input
                    ref={loginPwd}
                    className="lp-input"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="lp-field">
                <label className="lp-label">Delivery Location</label>
                <div
                  className={`lp-location ${locGranted ? "granted" : ""}`}
                  onClick={requestLocation}
                >
                  <span className="lp-loc-icon">
                    {locLoading ? "⏳" : "📍"}
                  </span>
                  <div className="lp-loc-body">
                    <strong>
                      {locGranted ? "Location shared" : "Allow location access"}
                    </strong>
                    <span>
                      {locLoading ? "Detecting your location…" : locLabel}
                    </span>
                  </div>
                  <span
                    className={`lp-loc-badge ${locGranted ? "granted" : ""}`}
                  >
                    {locGranted ? "✓ Granted" : "Optional"}
                  </span>
                </div>
              </div>

              <button
                className="lp-btn"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading && <span className="lp-spinner" />}
                {loading ? "Signing in…" : "Sign In →"}
              </button>

              <div className="lp-divider">
                Don't have an account?{" "}
                <a
                  onClick={() => {
                    setTab("register");
                    setAlert(null);
                  }}
                >
                  Register here
                </a>
              </div>
            </>
          )}

          {/* ── REGISTER FORM ── */}
          {tab === "register" && (
            <>
              <div className="lp-field">
                <label className="lp-label">User ID</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">👤</span>
                  <input
                    ref={regUserId}
                    className="lp-input"
                    type="text"
                    placeholder="Choose a unique username"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="lp-field">
                <label className="lp-label">Gmail / Email</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">✉️</span>
                  <input
                    ref={regEmail}
                    className="lp-input"
                    type="email"
                    placeholder="yourname@gmail.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="lp-field">
                <label className="lp-label">Password</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">🔒</span>
                  <input
                    ref={regPwd}
                    className="lp-input"
                    type="password"
                    placeholder="Min. 6 characters"
                    autoComplete="new-password"
                    onChange={(e) =>
                      setStrength(passwordStrength(e.target.value))
                    }
                  />
                </div>
                {regPwd.current?.value?.length > 0 && (
                  <div className="lp-strength">
                    <div className="lp-strength-bars">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="lp-strength-bar"
                          style={{
                            background:
                              i < strength
                                ? STRENGTH_META[strength - 1]?.color
                                : undefined,
                          }}
                        />
                      ))}
                    </div>
                    <div
                      className="lp-strength-label"
                      style={{ color: STRENGTH_META[strength - 1]?.color }}
                    >
                      {STRENGTH_META[strength - 1]?.label}
                    </div>
                  </div>
                )}
              </div>

              <div className="lp-field">
                <label className="lp-label">Delivery Location</label>
                <div
                  className={`lp-location ${locGranted ? "granted" : ""}`}
                  onClick={requestLocation}
                >
                  <span className="lp-loc-icon">
                    {locLoading ? "⏳" : "📍"}
                  </span>
                  <div className="lp-loc-body">
                    <strong>
                      {locGranted ? "Location shared" : "Allow location access"}
                    </strong>
                    <span>
                      {locLoading ? "Detecting your location…" : locLabel}
                    </span>
                  </div>
                  <span
                    className={`lp-loc-badge ${locGranted ? "granted" : ""}`}
                  >
                    {locGranted ? "✓ Granted" : "Required"}
                  </span>
                </div>
              </div>

              <button
                className="lp-btn"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading && <span className="lp-spinner" />}
                {loading ? "Creating account…" : "Create Account →"}
              </button>

              <div className="lp-divider">
                Already have an account?{" "}
                <a
                  onClick={() => {
                    setTab("login");
                    setAlert(null);
                  }}
                >
                  Sign in
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
