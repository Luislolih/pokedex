import styles from "./Paginate.module.css";
import { usePokemonContext } from "../../context/PokemonContext";

const Paginate = () => {
  const { currentPage, handleNextPage, handlePreviousPage, filterPokemons } =
    usePokemonContext();

  return (
    <main className={styles.mainPaginate}>
      <div className={styles.containerButtons}>
        <p
          onClick={() => handlePreviousPage()}
          className={
            currentPage > 1 ? styles.navigatePaginate : styles.prevButton
          }
        >
          PREV
        </p>
      </div>
      <p className={styles.currentPage}>{currentPage}</p>
      <div className={styles.containerButtons}>
        <p
          onClick={() => handleNextPage()}
          className={
            currentPage != 65 && filterPokemons.length == 20
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
