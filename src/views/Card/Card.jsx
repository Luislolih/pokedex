import styles from "./Card.module.css";
import { usePokemonContext } from "../../context/PokemonContext";
import { useParams } from "react-router-dom";
import { backgroundColorType, colorTextType } from "../../variables";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
const Card = () => {
    const { pokemonData, loading, setLoading } = usePokemonContext();
    const { name } = useParams();
    const pokemon = pokemonData.find((pokemon) => pokemon.name === name);

    if (!pokemon) {
        return <Loader />;
    }

    return (
        <main className={styles.mainCard}>
            <NavBar />
            <div className={styles.subContainerCard}>
                <h1 className={styles.pokemonName}>{pokemon.name}</h1>
                <div className={styles.containerCrt}>
                    <div className={styles.containerImgPokemon}>
                        <img
                            src={
                                pokemon.sprites.other["official-artwork"]
                                    .front_default
                            }
                            className={styles.imgPokemon}
                        ></img>
                        <div
                            className={styles.backgroundImg}
                            style={{
                                backgroundColor: backgroundColorType(
                                    pokemon.types[0].type.name
                                ),
                                color: colorTextType(
                                    pokemon.types[0].type.name
                                ),
                            }}
                        ></div>
                    </div>
                    <div className={styles.containerCharacteristicsAndTypes}>
                        <ul
                            className={styles.characteristicsList}
                            style={{
                                backgroundColor: backgroundColorType(
                                    pokemon.types[1]?.type.name
                                ),
                                color: colorTextType(
                                    pokemon.types[1]?.type.name
                                ),
                            }}
                        >
                            <li className={styles.characteristics}>
                                <span className={styles.characteristicsTitle}>
                                    HP:
                                </span>
                                <p className={styles.characteristicsValue}>
                                    {pokemon.stats[0].base_stat}
                                </p>
                            </li>
                            <li className={styles.characteristics}>
                                <span className={styles.characteristicsTitle}>
                                    Attack:
                                </span>
                                <p className={styles.characteristicsValue}>
                                    {pokemon.stats[1].base_stat}
                                </p>
                            </li>
                            <li className={styles.characteristics}>
                                <span className={styles.characteristicsTitle}>
                                    Defense:
                                </span>
                                <p className={styles.characteristicsValue}>
                                    {pokemon.stats[2].base_stat}
                                </p>
                            </li>
                            <li className={styles.characteristics}>
                                <span className={styles.characteristicsTitle}>
                                    Weight:
                                </span>
                                <p className={styles.characteristicsValue}>
                                    {pokemon.weight}
                                </p>
                            </li>
                            <li className={styles.characteristics}>
                                <span className={styles.characteristicsTitle}>
                                    Height:
                                </span>
                                <p className={styles.characteristicsValue}>
                                    {pokemon.height}
                                </p>
                            </li>
                        </ul>
                        <label className={styles.typesTitle}>Type:</label>
                        <ul className={styles.typesContainer}>
                            {pokemon.types.map((type, index) => (
                                <li
                                    key={index}
                                    style={{
                                        backgroundColor: backgroundColorType(
                                            type.type.name
                                        ),
                                        color: colorTextType(type.type.name),
                                    }}
                                    className={styles.types}
                                >
                                    {type.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};
export default Card;
