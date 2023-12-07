import styles from "./Landing.module.css";
import { Link } from "react-router-dom";
import background from "./pokemon-landing-background.jpg";
const Landing = () => {
  return (
    <main className={styles.mainLanding}>
      <div className={styles.imgContainer}>
        <img src={background} className={styles.background}></img>
      </div>
      <div className={styles.containerTitle}>
        <h1 className={styles.title}>Pokédex App</h1>
        <p className={styles.subtitle}>
          Look for your favorite pokemon and learn more about it!
        </p>
        <Link to="/home" className={styles.containerButton}>
          <button className={styles.buttonGo}>Go!</button>
        </Link>
      </div>
    </main>
  );
};

export default Landing;
