import styles from "./Footer.module.css";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <main className={styles.mainFooter}>
      <div className={styles.leftContainer}>
        <Link to="/home">
          <h2 className={styles.titleApp}>Pokédex App</h2>
        </Link>
        <p className={styles.contentLeft}>
          This project has been created using React, JSX & CSS Modules.
        </p>
      </div>
      <div className={styles.socialMediaContainer}>
        <a href="https://www.linkedin.com/in/luislolih/" target="_blank">
          {" "}
          <FaLinkedin className={styles.iconsSocialMedia} />
        </a>

        <a href="https://github.com/Luislolih" target="_blank">
          <FaSquareGithub className={styles.iconsSocialMedia} />
        </a>
        <a href="https://www.instagram.com/luisloli_/" target="_blank">
          <FaSquareInstagram className={styles.iconsSocialMedia} />
        </a>
      </div>
      <div className={styles.rightContainer}>
        <p className={styles.titleName}>By: Luis Loli Huamanchumo</p>
      </div>
    </main>
  );
};

export default Footer;
