import styles from "./NavBar.module.css";
import logo from "./pokedex-icon.png";
import { usePokemonContext } from "../../context/PokemonContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const handleClick = () => {
    handleSearchTerm("");
    handleTypeSelected("");
  };
  const { handleSearchTerm } = usePokemonContext();
  return (
    <main className={styles.mainNavBar}>
      <div className={styles.imgContainer}>
        <Link to="/home" onClick={handleClick}>
          <img src={logo} className={styles.imgLogo}></img>
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search Pokémon..."
        className={styles.inputSearch}
        onChange={(e) => handleSearchTerm(e.target.value)}
      ></input>
    </main>
  );
};

export default NavBar;
