import { Avatar, Box, Container, Typography } from "@mui/material";
import { palette } from "../plugins/mui";
import "./../PageStyles/viewCardPage.css";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";
import { getCardById } from "../services/ApiService";
import React from "react";
import MapboxMap from "../hooks/MapboxMap";
import { Bcard } from "../services/Interfaces";
// import { Bcard } from "../services/Interfaces";

function ViewCardPage() {
  const [Buisness, setBuisness] = React.useState<Bcard>({});
  const { id } = useParams();

  React.useEffect(() => {
    if (!id) return;
    const getData = async () => {
      getCardById(id)
        .then((card) => {
          console.log(card);
          setBuisness(card);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, [id]);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", marginTop: "100px" }}>
      <Container className="view-main-wrap">
        <Box
          className="left-box"
          sx={{
            backgroundColor: palette.secondary.main,
          }}
        >
          <Box className="avatar-wrap">
            <Avatar
              alt=""
              src={
                Buisness.image
                  ? Buisness.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              sx={{ width: 235, height: 220, margin: "-70px" }}
            />
          </Box>

          <Typography variant="h1" padding={2} gutterBottom sx={{ marginTop: "80px" }}>
            {Buisness.title}
          </Typography>
          <Typography variant="body2" padding={2} gutterBottom>
            {/* {Buisness.country}
            {Buisness.city}
            {Buisness.houseNumber}
            {Buisness.email} */}
            {Buisness.subTitle}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h1" gutterBottom>
            More information
          </Typography>
          <Typography variant="body1" gutterBottom>
            {Buisness.description}
          </Typography>
        </Box>
        <Box>
          <MapboxMap longitude={Buisness.longitude} latitude={Buisness.latitude} />
        </Box>
      </Container>
    </Container>
  );
}

export default ViewCardPage;
