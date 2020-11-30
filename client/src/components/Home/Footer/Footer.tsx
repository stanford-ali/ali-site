import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.scss";
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Container fluid className="pt-4 my-md-3 pt-md-5 border-top">
      <Row className="FooterRow">
        <Col md={3}>
          <h5>Contact Us</h5>
          <p className="text-muted">
            If you have a question or suggestion, or want to work with us, we'd
            love to hear from you!
          </p>
          <small className="text-muted">&copy; {year}</small>
        </Col>
        <Col md={6}>
          <h5>Partners</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="/#">
                Partners
              </a>
            </li>
            <li>
              <a className="text-muted" href="/#">
                Partners
              </a>
            </li>
            <li>
              <a className="text-muted" href="/#">
                Partners
              </a>
            </li>
            <li>
              <a className="text-muted" href="/#">
                Partners
              </a>
            </li>
          </ul>
        </Col>
        <Col md={3}>
          <h5>People</h5>
          <ul className="list-unstyled text-small">
            <li className="text-muted">Alix Cui</li>
            <li className="text-muted"></li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
