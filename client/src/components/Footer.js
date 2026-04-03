import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">
            🍽️ Bite<span>Rush</span>
          </div>
          <p>Fast food delivery from local restaurants.</p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">© 2026 BiteRush</div>
    </footer>
  );
}

export default Footer;
