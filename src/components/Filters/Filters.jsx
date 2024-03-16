import styles from "./Filters.module.css";
import { useState } from "react";
import { usePokemonContext } from "../../context/PokemonContext";
import { colorTextType, backgroundColorType } from "../../variables";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
const Filters = () => {
    const {
        pokemonTypes,
        handleTypeSelected,
        selectedType,
        filterActive,
        handleSortAlp,
    } = usePokemonContext();
    const [isSortVisible, setIsSortVisible] = useState(false);
    const [isTypesVisible, setIsTypesVisible] = useState(false);
    const handleTypesVisible = () => {
        setIsTypesVisible(!isTypesVisible);
    };
    const handleSortVisible = () => {
        setIsSortVisible(!isSortVisible);
    };

    return (
        <main className={styles.mainFilters}>
            <div className={styles.typesContainer}>
                <label
                    className={styles.typesTitle}
                    onClick={handleTypesVisible}
                >
                    Select Type
                </label>

                <div>
                    <ul
                        className={
                            isTypesVisible
                                ? styles.typesOptionsContainer
                                : styles.typesOptionsContainerNone
                        }
                    >
                        <IoMdClose
                            className={styles.closeIcon}
                            onClick={() => setIsTypesVisible(false)}
                        />
                        <li
                            className={styles.types}
                            style={{
                                backgroundColor: "#fff",
                            }}
                            onClick={() => {
                                handleTypeSelected("");
                                handleTypesVisible();
                            }}
                        >
                            all
                        </li>
                        {pokemonTypes.map((type, index) => (
                            <li
                                onClick={() => {
                                    handleTypeSelected(type.name);
                                    handleTypesVisible();
                                }}
                                key={index}
                                className={styles.types}
                                style={{
                                    backgroundColor: backgroundColorType(
                                        type.name
                                    ),
                                    color: colorTextType(type.name),
                                }}
                            >
                                {type.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <p
                    className={styles.showSelectedType}
                    style={{
                        backgroundColor: backgroundColorType(selectedType),
                        color: colorTextType(selectedType),
                    }}
                >
                    {selectedType ? selectedType : "all"}
                </p>
            </div>

            <div className={styles.sortByContainer}>
                <label className={styles.sortByTitle}>Sort by: </label>

                <div className={styles.sortByOptionSelectedContainer}>
                    <div
                        className={styles.optionSelectedContainer}
                        onClick={() => handleSortVisible()}
                    >
                        <p className={styles.sortByOptionSelected}>
                            {filterActive}
                        </p>
                        {!isSortVisible ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </div>
                    <ul className={styles.sortByOptionsContainer}>
                        {filterActive != "Default" && (
                            <li
                                className={
                                    isSortVisible
                                        ? styles.sortByOptions
                                        : styles.sortByOptionsNone
                                }
                                onClick={() => {
                                    handleSortAlp("Default");
                                    handleSortVisible();
                                }}
                            >
                                Default
                            </li>
                        )}
                        {filterActive != "A-Z" && (
                            <li
                                className={
                                    isSortVisible
                                        ? styles.sortByOptions
                                        : styles.sortByOptionsNone
                                }
                                onClick={() => {
                                    handleSortAlp("A-Z");
                                    handleSortVisible();
                                }}
                            >
                                A-Z
                            </li>
                        )}
                        {filterActive != "Z_A" && (
                            <li
                                className={
                                    isSortVisible
                                        ? styles.sortByOptions
                                        : styles.sortByOptionsNone
                                }
                                onClick={() => {
                                    handleSortAlp("Z-A");
                                    handleSortVisible();
                                }}
                            >
                                Z-A
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Filters;
