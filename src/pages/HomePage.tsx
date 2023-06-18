import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import BuisnessCard from "../components/general/BuisnessCard";
import CardSkeleton from "../components/general/CardSkeleton";
import { Container } from "@mui/material";
import Title from "../components/general/Title";
import "./../PageStyles/homePage.css";
function HomePage() {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <Title mainText="Our Top Biz Cards" />
      <Container className="mainPageWrap">
        <Box>
          <Grid container spacing={3}>
            <Grid xs={11} sm={6} md={4}>
              {loading ? <CardSkeleton /> : <BuisnessCard />}
            </Grid>
            <Grid xs={11} sm={6} md={4}>
              {loading ? <CardSkeleton /> : <BuisnessCard />}
            </Grid>
            <Grid xs={11} sm={6} md={4}>
              {loading ? <CardSkeleton /> : <BuisnessCard />}
            </Grid>
            <Grid xs={11} sm={6} md={4}>
              {loading ? <CardSkeleton /> : <BuisnessCard />}
            </Grid>
            <Grid xs={11} sm={6} md={4}>
              {loading ? <CardSkeleton /> : <BuisnessCard />}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
