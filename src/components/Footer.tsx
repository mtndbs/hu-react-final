import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Fab, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "../hooks/UserContext";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");
  const navigate = useNavigate();
  const { userData } = React.useContext(UserContext);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
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
          <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />

          <BottomNavigationAction
            label="Favorites"
            value="favorites"
            onClick={() => {
              navigate("/favorite-card");
            }}
            icon={<FavoriteIcon />}
          />
          {userData?.biz && (
            <BottomNavigationAction
              label="Add new Card"
              onClick={() => {
                navigate("/my-cards");
              }}
              value="Add new Card"
              icon={<AddCardIcon />}
            />
          )}
          <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
