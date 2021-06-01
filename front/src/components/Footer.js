import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";

export const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="form-group d-flex justify-content-between">
          <a
            href="https://github.com/daviduribe0007"
            target="_blank"
            rel="noopener noreferrer"
            className="git p-2"
          >
            <GitHubIcon />
          </a>
          <p className="p-1">© David Uribe</p>
        </div>
        <div className="form-group d-flex justify-content-between">
          <a
            href="https://github.com/AngelOro"
            target="_blank"
            rel="noopener noreferrer"
            className="git p-2"
          >
            <GitHubIcon />
          </a>
          <p className="p-1">© Angélica Orozco</p>
        </div>
      </footer>
    </div>
  );
};
