import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { removeToken, removeUser, verifyToken } from "./../../auth/TokenManager";
import { UserContext } from "../../hooks/UserContext";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { userData } = React.useContext(UserContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container
      sx={{
        display: "flex",
        px: 2,
        alignItems: "center",
        justifyContent: "space-between",
        height: { xs: 55, md: 75 },
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Tabs indicatorColor="secondary" textColor="secondary" value={value} onChange={handleChange}>
          <Tab label="Home" to="/" sx={{ color: "white" }} component={Link} {...a11yProps(0)} />
          <Tab label="About" to="/about" sx={{ color: "white" }} component={Link} {...a11yProps(1)} />
          {userData?.biz && <Tab label="My Cards" to="/my-cards" sx={{ color: "white" }} component={Link} {...a11yProps(2)} />}
          <Tab label="My Favorite" to="/favorite-card" sx={{ color: "white" }} component={Link} {...a11yProps(3)} />
        </Tabs>
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Tab label="Login" to="/login" sx={{ color: "white" }} component={Link} {...a11yProps(0)} />
        <Tab label="SignUp" to="/sign" sx={{ color: "white" }} component={Link} {...a11yProps(0)} />
        {verifyToken() && (
          <Tab
            label="LOG OUT"
            sx={{ color: "white" }}
            onClick={() => {
              removeToken();
              removeUser();
              setTimeout(() => {
                navigate("login");
              });
            }}
            {...a11yProps(0)}
          />
        )}
      </Box>
    </Container>
  );
}
