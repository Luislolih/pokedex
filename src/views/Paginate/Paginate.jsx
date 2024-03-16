import styles from "./Paginate.module.css";
import { usePokemonContext } from "../../context/PokemonContext";

const Paginate = () => {
    const { currentPage, handlePage, pokemonData } = usePokemonContext();

    return (
        <main className={styles.mainPaginate}>
            <div className={styles.containerButtons}>
                <p
                    onClick={() => handlePage(currentPage - 1)}
                    className={
                        currentPage > 1
                            ? styles.navigatePaginate
                            : styles.prevButton
                    }
                >
                    PREV
                </p>
            </div>
            <p className={styles.currentPage}>{currentPage}</p>
            <div className={styles.containerButtons}>
                <p
                    onClick={() => handlePage(currentPage + 1)}
                    className={
                        pokemonData.length === 20
                            ? styles.navigatePaginate
                            : styles.nextButton
                    }
                >
                    NEXT
                </p>
            </div>
        </main>
    );
};

export default Paginate;
