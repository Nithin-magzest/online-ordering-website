import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const pcStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

  /* ── Profile corner ─────────────────────────── */
  .pc-wrap {
    position: fixed;
    top: 18px;
    right: 22px;
    z-index: 9999;
    font-family: 'Outfit', sans-serif;
  }

  /* Avatar trigger button */
  .pc-avatar-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 2.5px solid rgba(200,68,10,0.55);
    background: linear-gradient(135deg, #c8440a, #e8680a);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(200,68,10,0.35);
    transition: transform 0.18s, box-shadow 0.18s;
    outline: none;
    position: relative;
  }

  .pc-avatar-btn:hover {
    transform: scale(1.07);
    box-shadow: 0 8px 24px rgba(200,68,10,0.45);
  }

  /* Online dot */
  .pc-online-dot {
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 11px;
    height: 11px;
    background: #2d7a4f;
    border-radius: 50%;
    border: 2px solid #fffdf8;
  }

  /* Dropdown panel */
  .pc-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 288px;
    background: #fffdf8;
    border: 1.5px solid #e2d9c8;
    border-radius: 16px;
    box-shadow: 0 16px 50px rgba(26,18,8,0.13), 0 4px 16px rgba(26,18,8,0.07);
    overflow: hidden;
    animation: pcSlideDown 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
    transform-origin: top right;
  }

  /* Header band */
  .pc-header {
    background: linear-gradient(135deg, #1a1208 0%, #2c1e0a 100%);
    padding: 20px 18px 16px;
    position: relative;
    overflow: hidden;
  }

  .pc-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 0% 40%, rgba(200,68,10,0.25) 0%, transparent 65%);
    pointer-events: none;
  }

  .pc-header-row {
    display: flex;
    align-items: center;
    gap: 13px;
    position: relative;
  }

  .pc-big-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c8440a, #e8680a);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.35rem;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(200,68,10,0.4);
    border: 2px solid rgba(255,255,255,0.15);
  }

  .pc-name-block strong {
    display: block;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.02rem;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .pc-name-block span {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.45);
    display: block;
    margin-top: 2px;
  }

  /* Info rows */
  .pc-info {
    padding: 14px 18px 4px;
  }

  .pc-info-row {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 9px 0;
    border-bottom: 1px solid #f0ebe0;
  }

  .pc-info-row:last-child { border-bottom: none; }

  .pc-info-icon {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: #f5f0e8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  .pc-info-text label {
    display: block;
    font-size: 0.68rem;
    font-weight: 600;
    color: #8a7e6e;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  .pc-info-text span {
    display: block;
    font-size: 0.845rem;
    font-weight: 500;
    color: #1a1208;
    margin-top: 1px;
    max-width: 190px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Location row */
  .pc-loc-row {
    margin: 2px 18px 4px;
    background: rgba(200,68,10,0.05);
    border: 1px dashed rgba(200,68,10,0.25);
    border-radius: 10px;
    padding: 9px 12px;
    display: flex;
    align-items: flex-start;
    gap: 9px;
  }

  .pc-loc-row .pc-info-icon {
    background: rgba(200,68,10,0.08);
    margin-top: 2px;
  }

  .pc-loc-row .pc-info-text span {
    white-space: normal;
    font-size: 0.78rem;
    color: #5a4e3e;
    line-height: 1.4;
    max-width: 185px;
  }

  /* Actions */
  .pc-actions {
    padding: 10px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .pc-action-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    background: none;
    border: none;
    border-radius: 9px;
    padding: 9px 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1208;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    text-align: left;
  }

  .pc-action-btn:hover { background: #f5f0e8; }

  .pc-action-btn.danger { color: #c0392b; }
  .pc-action-btn.danger:hover { background: rgba(192,57,43,0.07); }

  .pc-action-icon {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: #f5f0e8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .pc-action-btn.danger .pc-action-icon {
    background: rgba(192,57,43,0.08);
  }

  .pc-divider-line {
    height: 1px;
    background: #f0ebe0;
    margin: 2px 0;
  }

  /* Animate */
  @keyframes pcSlideDown {
    from { opacity: 0; transform: scale(0.88) translateY(-6px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
  }
`;

function getInitials(name = "") {
  return (
    name
      .split(/[\s_\-]+/)
      .map((w) => w[0]?.toUpperCase() || "")
      .slice(0, 2)
      .join("") || "U"
  );
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function ProfileCorner() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef();

  // Load user from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
  }, []);

  // Inject styles
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = pcStyles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Re-read user when storage changes (e.g. login in another tab)
  useEffect(() => {
    const handler = () => {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  if (!user) return null; // not logged in → render nothing

  const initials = getInitials(user.userId || user.username || user.name);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  const loc = user.location;
  const hasLocation = loc && loc.locationGranted !== false;

  return (
    <div className="pc-wrap" ref={wrapRef}>
      {/* ── Avatar button ── */}
      <button
        className="pc-avatar-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open profile menu"
        title={user.userId || user.username || "Profile"}
      >
        {initials}
        <span className="pc-online-dot" />
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="pc-dropdown" role="dialog" aria-label="Profile details">
          {/* Header */}
          <div className="pc-header">
            <div className="pc-header-row">
              <div className="pc-big-avatar">{initials}</div>
              <div className="pc-name-block">
                <strong>
                  {user.userId || user.username || user.name || "User"}
                </strong>
                <span>{user.email || "No email on record"}</span>
              </div>
            </div>
          </div>

          {/* Info rows */}
          <div className="pc-info">
            <div className="pc-info-row">
              <div className="pc-info-icon">👤</div>
              <div className="pc-info-text">
                <label>User ID</label>
                <span>{user.userId || user.username || user._id || "—"}</span>
              </div>
            </div>

            <div className="pc-info-row">
              <div className="pc-info-icon">✉️</div>
              <div className="pc-info-text">
                <label>Email</label>
                <span>{user.email || "—"}</span>
              </div>
            </div>

            {user.phone && (
              <div className="pc-info-row">
                <div className="pc-info-icon">📞</div>
                <div className="pc-info-text">
                  <label>Phone</label>
                  <span>{user.phone}</span>
                </div>
              </div>
            )}

            {(user.createdAt || user.joinedAt) && (
              <div className="pc-info-row">
                <div className="pc-info-icon">🗓️</div>
                <div className="pc-info-text">
                  <label>Member Since</label>
                  <span>{formatDate(user.createdAt || user.joinedAt)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Location */}
          {hasLocation && (
            <div className="pc-loc-row">
              <div className="pc-info-icon">📍</div>
              <div className="pc-info-text">
                <label>Delivery Location</label>
                <span>
                  {loc.address ||
                    (loc.latitude && loc.longitude
                      ? `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`
                      : "Location on file")}
                </span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pc-actions">
            <button
              className="pc-action-btn"
              onClick={() => {
                setOpen(false);
                navigate("/orders");
              }}
            >
              <span className="pc-action-icon">🛍️</span>
              My Orders
            </button>

            <button
              className="pc-action-btn"
              onClick={() => {
                setOpen(false);
                navigate("/profile/edit");
              }}
            >
              <span className="pc-action-icon">✏️</span>
              Edit Profile
            </button>

            <div className="pc-divider-line" />

            <button className="pc-action-btn danger" onClick={handleLogout}>
              <span className="pc-action-icon">🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
