import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>FIORA</h3>
          <p>Curated fashion for everyday elegance.</p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/USERNAME"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={22} />
          </a>

          <a
            href="https://www.linkedin.com/in/nada-emad-1b68b041b/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BjSjdkZI1S5uTSrHvfDY8Lg%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={22} />
          </a>

          <a href="nadaemad14121@gmail.com">
            <FaEnvelope size={22} />
          </a>
        </div>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} FIORA. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
