import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BuisnessCard from "../components/general/BuisnessCard";
import CardSkeleton from "../components/general/CardSkeleton";
import { Alert, Container, Fab } from "@mui/material";
import Title from "../components/general/Title";
import { SearchContext } from "../hooks/SearchContext";
import { Bcard } from "../services/Interfaces";
import { deleteCard, getCards, toggleFavoriteCard } from "../services/ApiService";
import "./../PageStyles/homePage.css";
import { toast } from "react-toastify";
import { UserContext } from "../hooks/UserContext";
function HomePage() {
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState<Array<Bcard>>([]);
  const { searchValue } = React.useContext(SearchContext);
  const [filteredData, setFilteredData] = React.useState<Array<Bcard>>([]);
  const [errMsg, setErrMsg] = React.useState("");

  const { userData } = React.useContext(UserContext);

  // Skeleton use effect laoder
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      getCards()
        .then((json) => {
          // if (json.status.toLowerCase() === "fail") {
          //   toast.error(json.message);
          //   return;
          // }
          setCards(json);
          setFilteredData(json);
        })
        .catch((err) => {
          setErrMsg(`  :${err.message}`);
        });
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
    deleteCard(id).then(() => {
      const updated = filteredData.filter((card) => {
        if (card._id === id) {
          toast.success(`${card.title} deleted succesfully!`);
        }
        if (card._id !== id) {
          return card;
        }
      });
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
      <Title mainText="Our Top Biz Cards" />
      {/* {userData ? userData.email : "blabla@gmail.com"} */}
      <Container>
        <Box>
          <Grid container spacing={2}>
            {cards.length < 1 && (
              <Alert variant="filled" severity="warning">
                There are no avialble cards {errMsg}
              </Alert>
            )}
            {filteredData.map((card, index) => (
              <Grid item xs={11} sm={6} md={4} key={card._id}>
                {loading ? (
                  <CardSkeleton />
                ) : (
                  <div
                    onClick={() => {
                      console.log("hello");
                    }}
                  >
                    <BuisnessCard
                      key={card._id}
                      {...card}
                      onDelete={onDelete}
                      onToggleFavorit={onToggleFavorit}
                      favoritePage={false}
                      index={index}
                    />
                  </div>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
