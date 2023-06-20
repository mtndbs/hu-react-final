import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BuisnessCard from "../components/general/BuisnessCard";
import CardSkeleton from "../components/general/CardSkeleton";
import { Container } from "@mui/material";
import Title from "../components/general/Title";
import { SearchContext } from "../hooks/SearchContext";
import { Bcard } from "../services/Interfaces";
import { deleteCard, getCards } from "../services/ApiService";
import "./../PageStyles/homePage.css";
function HomePage() {
  const [loading, setLoading] = React.useState(true);
  // const serverUrl = "http://localhost:7800/api/";
  const [cards, setCards] = React.useState<Array<Bcard>>([]);
  const { searchValue } = React.useContext(SearchContext);
  const [filteredData, setFilteredData] = React.useState<Array<Bcard>>([]);

  // Skeleton use effect laoder
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      try {
        getCards().then((json) => {
          console.log(json);
          setCards(json);
          setFilteredData(json);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    const filtered = cards.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchValue, cards]);

  const onDelete = async (id: string) => {
    deleteCard(id).then((deleted) => {
      const updated = filteredData.filter((card) => card._id !== id);
      setFilteredData([...updated]);
    });
  };
  return (
    <>
      <Title mainText="Our Top Biz Cards" />
      <Container className="mainPageWrap">
        <Box>
          <Grid container>
            {filteredData.map((card) => (
              <Grid item xs={11} md={4} key={card._id}>
                {loading ? <CardSkeleton /> : <BuisnessCard key={card._id} {...card} onDelete={onDelete} />}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
