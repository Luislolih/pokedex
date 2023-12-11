import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
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
        const offset = (currentPage - 1) * itemsPerPage;

        setLoading(true);
        if (searchTerm || selectedType) {
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
  }, [currentPage, itemsPerPage, searchTerm, selectedType]);

  // FUNCTION SELECTED TYPE:
  const handleTypeSelected = (newType) => {
    if (newType !== selectedType) {
      setSelectedType(newType);
      setCurrentPage(1);
    }
  };
  // PAGINATED:
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // FILTER POKEMONS BY TYPE:
  const filterPokemons = useMemo(() => {
    return selectedType
      ? pokemonData.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === selectedType)
        )
      : pokemonData;
  }, [selectedType, pokemonData, startIndex, endIndex]);
  useEffect(() => {
    console.log("currentPage:", currentPage);
    console.log("filterPokemons:", filterPokemons);

    // Resto del código...
  }, [currentPage, filterPokemons]);

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
  // FUNCTION PREVIOUS PAGE:
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
        loading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};
