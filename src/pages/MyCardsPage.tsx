import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BuisnessCard from "../components/general/BuisnessCard";
import CardSkeleton from "../components/general/CardSkeleton";
import { Alert, Container } from "@mui/material";
import Title from "../components/general/Title";
import { SearchContext } from "../hooks/SearchContext";
import { Bcard } from "../services/Interfaces";
import { deleteCard, getUserCards, toggleFavoriteCard } from "../services/ApiService";
import { toast } from "react-toastify";
import PageCircle from "../components/general/PageCircle";

function MyCardsPage() {
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState<Array<Bcard>>([]);
  const { searchValue } = React.useContext(SearchContext);
  const [filteredData, setFilteredData] = React.useState<Array<Bcard>>([]);

  // Skeleton use effect laoder
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      getUserCards()
        .then((json) => {
          setCards(json);
          setFilteredData(json);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    console.log(cards.length < 1);
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
    deleteCard(id).then(() => {
      const updated = filteredData.filter((card) => card._id !== id);
      setFilteredData([...updated]);
    });
  };
  const onToggleFavorit = async (id: string) => {
    toggleFavoriteCard(id).then((item) => {
      item.status
        ? toast.success(`${item.title} Card added to favorite!`)
        : toast.info(`${item.title} Card removed from favorite!`);
    });
  };

  return (
    <>
      <Title mainText="User cards" />
      {loading && filteredData.length < 1 ? <PageCircle /> : <span></span>}
      <Container className="mainPageWrap">
        <Box>
          <Grid container spacing={2}>
            {filteredData &&
              filteredData.map((card, index) => (
                <Grid item xs={11} sm={6} md={4} key={card._id}>
                  {loading ? (
                    <CardSkeleton />
                  ) : (
                    <BuisnessCard
                      key={card._id}
                      {...card}
                      onDelete={onDelete}
                      onToggleFavorit={onToggleFavorit}
                      favoritePage={false}
                      index={index}
                    />
                  )}
                </Grid>
              ))}
            {!loading && cards.length < 1 ? <Alert severity="warning">There are no avialble cards</Alert> : <div></div>}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default MyCardsPage;
