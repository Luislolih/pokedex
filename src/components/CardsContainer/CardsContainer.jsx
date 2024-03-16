import styles from "./CardsContainer.module.css";
import { usePokemonContext } from "../../context/PokemonContext";
import { backgroundColorType, colorTextType } from "../../variables";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
const CardsContainer = () => {
    const { pokemonData, loading } = usePokemonContext();

    return (
        <main className={styles.mainCardsContainer}>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.cardsContainer}>
                    {pokemonData.map((pokemon, index) => (
                        <Link
                            to={`/pokemon/${pokemon.name}`}
                            className={styles.detailPokemon}
                            key={index}
                        >
                            <div className={styles.imageContainer}>
                                <img
                                    className={styles.pokemonImage}
                                    src={
                                        pokemon.sprites.other[
                                            "official-artwork"
                                        ].front_default
                                    }
                                ></img>
                                <div className={styles.nameContainer}>
                                    <h2
                                        key={pokemon.name}
                                        className={styles.pokemonName}
                                    >
                                        {pokemon.name}
                                    </h2>

                                    <ul className={styles.typesContainer}>
                                        {" "}
                                        {pokemon.types.map((type, index) => (
                                            <li
                                                key={index}
                                                className={styles.pokemonTypes}
                                                style={{
                                                    backgroundColor:
                                                        backgroundColorType(
                                                            type.type.name
                                                        ),
                                                    color: colorTextType(
                                                        type.type.name
                                                    ),
                                                }}
                                            >
                                                {type.type.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
};
export default CardsContainer;
