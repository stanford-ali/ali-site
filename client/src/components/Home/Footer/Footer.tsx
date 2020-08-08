import React from "react";
import "./Footer.scss";
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-groups">
        <div className="footer-group">
          <h2 className="footer-group-title"> Bookstack </h2>
          <div className="footer-group-links">
            <a href="http://bookstack.io"> Flashcards </a>
            <a href="http://bookstack.io/about"> About </a>
          </div>
        </div>
        <div className="footer-group">
          <h2 className="footer-group-title"> Resources </h2>
          <div className="footer-group-links">
            <a href="http://bookstack.io"> Contact </a>
            <a href="http://bookstack.io"> Terms & Conditions </a>
          </div>
        </div>
        <div className="footer-group">
          <h2 className="footer-group-title"> Supported by </h2>
          <div className="footer-group-links">
            <a href="https://www.presidentialscholars.org/2020-seed-grant">
              {" "}
              Presidential Scholars Association{" "}
            </a>
            <a href="https://www.studentcapitaldao.org/"> USC SCDAO </a>
          </div>
        </div>
        <div className="footer-group">
          <div className="footer-group-sm-links">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-instagram"></a>
            <a href="#" className="fa fa-linkedin"></a>
          </div>
        </div>
      </div>
    </div>
  );
}
