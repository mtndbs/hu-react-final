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
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Bcard } from "../../services/Interfaces";
interface Props extends Bcard {
  onDelete: Function;
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
}: Props) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        minWidth: 300,
        margin: "10px",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        boxShadow: " 0px 8px 16px 0px rgba(0,0,0,0.5)",
        "@media (max-width: 600px)": {
          // width: "70vw",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {title ? title[0] : "U"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subTitle}
      />
      <CardMedia component="img" height="194" image={image!} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            onDelete(_id);
          }}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default BuisnessCard;
