import styles from "./Loader.module.css";
import { MdCatchingPokemon } from "react-icons/md";
const Loader = () => {
    return (
        <main className={styles.mainLoader}>
            <MdCatchingPokemon className={styles.pokeball} />
        </main>
    );
};

export default Loader;
