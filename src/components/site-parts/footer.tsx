import React from "react";

import "./footer.css";

export function Footer() {
  return (
    <footer>
      <div className="footer-item">
        <a
          href="https://rs.school/react/"
          target="_blank"
          rel="noreferrer"
          className="git-link"
        >
          tihohohodka
        </a>
        <a
          href="https://rs.school/react/"
          target="_blank"
          rel="noreferrer"
          className="git-link"
        >
          AlekProgrammer
        </a>
      </div>
      <div className="footer-item">© 2022</div>
      <div className="footer-item">
        <a
          href="https://rs.school/react/"
          target="_blank"
          rel="noreferrer"
          className="course-logo"
        >
          Link
        </a>
      </div>
    </footer>
  );
}
