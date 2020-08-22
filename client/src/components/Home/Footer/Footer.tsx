import React from "react";
import "./Footer.scss";
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="pt-4 my-md-3 pt-md-5 border-top">
      <div className="FooterRow">
        <div className="col-6 col-md">
          <h5>Contact Us</h5>
          <p className="text-muted">
            If you have a question or suggestion, or want to work with us, we'd
            love to hear from you!
          </p>
          <small className="text-muted">&copy; {year}</small>
        </div>
        <div className="col-6">
          <h5>Partners</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="#">
                Partners
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Resource name
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Another resource
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Final resource
              </a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>People</h5>
          <ul className="list-unstyled text-small">
            <li className="text-muted">Alix Cui</li>
            <li className="text-muted">David Toomer</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
