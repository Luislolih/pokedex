import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Filters from "../../components/Filters/Filters";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import NavBar from "../../components/NavBar/NavBar";
import Paginate from "../Paginate/Paginate";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main>
      <NavBar />
      <div className={styles.containerTitle}>
        <h1 className={styles.title}>Select your Pokémon!</h1>
      </div>
      <Filters />
      <CardsContainer />
      <Paginate />
      <Footer />
    </main>
  );
};

export default Home;
