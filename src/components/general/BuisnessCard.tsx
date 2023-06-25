import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import CallIcon from "@mui/icons-material/Call";

import { Bcard } from "../../services/Interfaces";
// modal
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { getUser, verifyToken } from "../../auth/TokenManager";
import "./../../PageStyles/homePage.css";
import { palette } from "./../../plugins/mui";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

interface Props extends Bcard {
  onDelete: Function;
  onToggleFavorit: Function;
  favoritePage: boolean;
  index: number;
}

function BuisnessCard({
  _id,
  title,
  subTitle,
  description,
  phone,
  email,
  web,
  image,
  country,
  city,
  houseNumber,
  zip,
  onDelete,
  onToggleFavorit,
  favoritePage,
  index,
  favorites,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhoneCall = (phoneNumber: string | null | undefined) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const [isRedHeart, setIsRedHeart] = React.useState(false);

  const toggleHighlight = () => {
    setIsRedHeart(!isRedHeart);
  };
  React.useEffect(() => {
    const ifCardIsFavorite = (userId: string | null | undefined) => {
      favorites?.forEach((id) => {
        if (id === userId) {
          setIsRedHeart(true);
        }
      });
    };
    const userObject = getUser();
    if (userObject) {
      // console.log(userObject);
      ifCardIsFavorite(userObject._id);
    }
  }, [favorites]);

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 300,
          minHeight: 394,
          margin: "10px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          boxShadow: " 0px 8px 16px 0px rgba(0,0,0,0.5)",
        }}
        className="card-hover"
      >
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: palette.secondary.main }} aria-label="recipe">
              {title ? title[0] : "U"}
            </Avatar>
          }
          title={title}
          // subheader={subTitle}
        />
        <CardMedia
          component="img"
          height="194"
          image={image!}
          alt=""
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`view-card/${_id}`);
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {subTitle}
          </Typography>
        </CardContent>

        {!favoritePage && (
          <CardActions disableSpacing>
            {verifyToken() && (
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  onToggleFavorit(_id);
                  toggleHighlight();
                }}
              >
                <FavoriteIcon sx={{ color: isRedHeart ? "red" : "" }} />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                handleClickOpen();
              }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="call"
              onClick={() => {
                handlePhoneCall(phone);
              }}
            >
              <CallIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => {
                navigate(`edit-card/${_id}`);
              }}
            >
              <ModeEditIcon />
            </IconButton>

            <Box>
              <IconButton
                onClick={() => {
                  navigate(`view-card/${_id}`);
                }}
              >
                <PreviewIcon />
              </IconButton>
            </Box>
          </CardActions>
        )}
      </Card>

      {/* ================== Modal Dialog ======================= */}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"DELETE , deleting card from the database"}</DialogTitle>
          <DialogContent>
            <DialogContentText color={red[500]} id="alert-dialog-description">
              You're Should you want to Delete "{title}" card?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                onDelete(_id);
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default BuisnessCard;
