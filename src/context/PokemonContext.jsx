import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
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

        if (searchTerm) {
          console.log("Buscando:", searchTerm);

          apiPokemon = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9999`;

          const response = await fetch(apiPokemon);

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const data = await response.json();

          const filteredPokemon = data.results.filter((pokemon) =>
            pokemon.name.includes(searchTerm.toLowerCase())
          );

          const pokemonPromise = filteredPokemon.map((pokemon) =>
            fetch(pokemon.url).then((response) => response.json())
          );

          const detailedPokemon = await Promise.all(pokemonPromise);
          setPokemonData(detailedPokemon);
        } else {
          const offset = (currentPage - 1) * itemsPerPage;
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
      }
    };
    const fetchPokemonTypes = async () => {
      try {
        const apiPokemonTypes = "https://pokeapi.co/api/v2/type/";
        const response = await fetch(apiPokemonTypes);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setPokemonTypes(data.results);
      } catch (error) {
        console.error("Error en la solicitud fetch para tipos:", error);
      }
    };

    fetchPokemonData();
    fetchPokemonTypes();
  }, [currentPage, itemsPerPage, searchTerm]);

  // FUNCTION SELECTED TYPE:
  const handleTypeSelected = (newType) => {
    if (newType !== selectedType) {
      setSelectedType(newType);
    }
  };

  // FILTER POKEMONS BY TYPE:
  const filterPokemons = useMemo(() => {
    return selectedType
      ? pokemonData.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === selectedType)
        )
      : pokemonData;
  }, [selectedType, pokemonData]);

  // SORT POKEMONS ALPHABETIC:
  const [sortAlphabetic, setSortAlphabetic] = useState(filterPokemons);
  useEffect(() => {
    setSortAlphabetic(filterPokemons);
  }, [filterPokemons]);
  const sortAToZ = () => {
    const sortList = [...sortAlphabetic].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortAlphabetic(sortList);
  };
  const sortZToA = () => {
    const sortList = [...sortAlphabetic].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setSortAlphabetic(sortList);
  };
  const sortDefault = () => {
    setSortAlphabetic(filterPokemons);
  };

  // FUNCTION NEXT PAGE:
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  // FUNCTION NEXT PAGE:
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <PokemonContext.Provider
      value={{
        pokemonData,
        pokemonTypes,
        selectedType,
        handleTypeSelected,
        filterPokemons,
        handleSearchTerm,
        searchTerm,
        sortAToZ,
        sortZToA,
        sortAlphabetic,
        sortDefault,
        currentPage,
        handleNextPage,
        handlePreviousPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};
