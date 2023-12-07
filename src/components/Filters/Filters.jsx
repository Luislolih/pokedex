import styles from "./Filters.module.css";
import { useState } from "react";
import { usePokemonContext } from "../../context/PokemonContext";
import { colorTextType, backgroundColorType } from "../../variables";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Filters = () => {
  const {
    pokemonTypes,
    handleTypeSelected,
    selectedType,
    sortAToZ,
    sortZToA,
    sortDefault,
  } = usePokemonContext();
  const [sortBy, setSortBy] = useState("Default");
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [isTypesVisible, setIsTypesVisible] = useState(false);
  const handleTypesVisible = () => {
    setIsTypesVisible(!isTypesVisible);
  };
  const handleSortVisible = () => {
    setIsSortVisible(!isSortVisible);
  };
  const handleSortBy = (newSort) => {
    setSortBy(newSort);
  };

  return (
    <main className={styles.mainFilters}>
      <div className={styles.typesContainer}>
        <label className={styles.typesTitle} onClick={handleTypesVisible}>
          Select Type
        </label>
        <ul
          className={
            isTypesVisible
              ? styles.typesOptionsContainer
              : styles.typesOptionsContainerNone
          }
        >
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
                backgroundColor: backgroundColorType(type.name),
                color: colorTextType(type.name),
              }}
            >
              {type.name}
            </li>
          ))}
        </ul>
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
            <p className={styles.sortByOptionSelected}>{sortBy}</p>
            {!isSortVisible ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
          <ul className={styles.sortByOptionsContainer}>
            {sortBy != "Default" && (
              <li
                className={
                  isSortVisible
                    ? styles.sortByOptions
                    : styles.sortByOptionsNone
                }
                onClick={() => {
                  handleSortBy("Default");
                  handleSortVisible();
                  sortDefault();
                }}
              >
                Default
              </li>
            )}
            {sortBy != "A-Z" && (
              <li
                className={
                  isSortVisible
                    ? styles.sortByOptions
                    : styles.sortByOptionsNone
                }
                onClick={() => {
                  handleSortBy("A-Z");
                  handleSortVisible();
                  sortAToZ();
                }}
              >
                A-Z
              </li>
            )}
            {sortBy != "Z-A" && (
              <li
                className={
                  isSortVisible
                    ? styles.sortByOptions
                    : styles.sortByOptionsNone
                }
                onClick={() => {
                  handleSortBy("Z-A");
                  handleSortVisible();
                  sortZToA();
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
