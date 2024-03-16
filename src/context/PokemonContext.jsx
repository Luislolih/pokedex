import React, { createContext, useContext, useState, useEffect } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [filterActive, setFilterACtive] = useState("Default");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    // FUNCTION SEARCH TERM:
    const handleSearchTerm = debounce((term) => {
        setSearchTerm(term);
    }, 100);

    //FETCH POKEMONS & TYPES:
    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                let apiPokemon;
                const offset = (currentPage - 1) * itemsPerPage;

                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;

                setLoading(true);
                if (searchTerm || selectedType || filterActive != "Default") {
                    apiPokemon = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9999`;
                    const response = await fetch(apiPokemon);

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }

                    const data = await response.json();
                    const filteredPokemon = data.results.filter((pokemon) =>
                        pokemon.name.includes(searchTerm.toLowerCase())
                    );
                    setLoading(true);
                    const pokemonPromise = filteredPokemon.map((pokemon) =>
                        fetch(pokemon.url).then((response) => response.json())
                    );
                    setLoading(false);
                    const detailedPokemon = await Promise.all(pokemonPromise);
                    setLoading(true);
                    const filteredByType = selectedType
                        ? detailedPokemon.filter((pokemon) =>
                              pokemon.types.some(
                                  (type) => type.type.name === selectedType
                              )
                          )
                        : detailedPokemon;
                    setLoading(false);
                    const currentItems = filteredByType.slice(
                        indexOfFirstItem,
                        indexOfLastItem
                    );
                    let sortAlp = currentItems;
                    setLoading(true);
                    if (filterActive === "A-Z") {
                        sortAlp.sort((a, b) => (a.name > b.name ? 1 : -1));
                    } else if (filterActive === "Z-A") {
                        sortAlp = currentItems
                            .slice()
                            .sort((a, b) => b.name.localeCompare(a.name));
                    }
                    setLoading(false);
                    setPokemonData(sortAlp);
                } else {
                    apiPokemon = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${itemsPerPage}`;
                    const response = await fetch(apiPokemon);

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }

                    const data = await response.json();
                    const pokemonPromise = data.results.map((pokemon) =>
                        fetch(pokemon.url).then((response) => response.json())
                    );

                    const detailedPokemon = await Promise.all(pokemonPromise);
                    setPokemonData(detailedPokemon);
                }
            } catch (error) {
                console.error("Error en la solicitud fetch:", error);
            } finally {
                setLoading(false);
            }
        };
        const fetchPokemonTypes = async () => {
            try {
                setLoading(true);
                const apiPokemonTypes = "https://pokeapi.co/api/v2/type/";
                const response = await fetch(apiPokemonTypes);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setPokemonTypes(data.results);
            } catch (error) {
                console.error("Error en la solicitud fetch para tipos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
        fetchPokemonTypes();
    }, [currentPage, searchTerm, selectedType, filterActive]);
    console.log(pokemonData);

    //HANDLE SORT ALPHABETIC:

    const handleSortAlp = (order) => {
        setFilterACtive(order);
    };

    // FUNCTION SELECTED TYPE:
    const handleTypeSelected = (newType) => {
        if (newType !== selectedType) {
            setSelectedType(newType);
            setCurrentPage(1);
        }
    };

    // FUNCTION CHANGE PAGE:
    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <PokemonContext.Provider
            value={{
                pokemonData,
                pokemonTypes,
                selectedType,
                handleTypeSelected,
                handleSearchTerm,
                searchTerm,
                currentPage,
                handlePage,
                loading,
                filterActive,
                handleSortAlp,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemonContext = () => {
    return useContext(PokemonContext);
};
