import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    fontStyle: "italic",
    marginLeft: "12px",
  },
}));

const data = [
  { name: "Technology" },
  { name: "Fashion" },
  { name: "Experience" },
  { name: "Funny" },
  { name: "Photography" },
];
const CatergoryCard = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" gutterBottom className={classes.header}>
        Categories
      </Typography>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {data.map((item) => (
          <ListItem button divider>
            <ListItemText>{item.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CatergoryCard;
