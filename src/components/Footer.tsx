import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PortraitIcon from "@mui/icons-material/Portrait";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Fab, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "../hooks/UserContext";
import InfoIcon from "@mui/icons-material/Info";
import { verifyAdmin } from "../auth/TokenManager";
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");
  const navigate = useNavigate();
  const { userData } = React.useContext(UserContext);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      {userData?.bizChecked ||
        (verifyAdmin(userData!) && (
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: "10vh", left: "80%", width: "70px", height: "70px" }}
            size="large"
            aria-label="add"
            onClick={() => {
              navigate("/create-card");
            }}
          >
            <AddIcon />
          </Fab>
        ))}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
        elevation={3}
      >
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="About"
            value="About"
            onClick={() => {
              navigate("/about");
            }}
            icon={<InfoIcon />}
          />
          {userData?.bizChecked ||
            (verifyAdmin(userData!) && (
              <BottomNavigationAction
                label="Favorites"
                value="favorites"
                onClick={() => {
                  navigate("/favorite-card");
                }}
                icon={<FavoriteIcon />}
              />
            ))}
          {userData?.bizChecked ||
            (verifyAdmin(userData!) && (
              <BottomNavigationAction
                label="Add new Card"
                onClick={() => {
                  navigate("/my-cards");
                }}
                value="Add new Card"
                icon={<PortraitIcon />}
              />
            ))}
        </BottomNavigation>
      </Paper>
    </>
  );
}
