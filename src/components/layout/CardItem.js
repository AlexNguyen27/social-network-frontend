import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { truncateMultilineString } from '../../utils/formatString';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CardItem = ({ course }) => {
  const history = useHistory();
  const classes = useStyles();

  const { id, name, description, image } = course;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://cdn01.alison-static.net/courses/183/alison_courseware_intro_183.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {truncateMultilineString(name, 16)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {truncateMultilineString(description, 140)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`${window.location.pathname}/${id}`)}
        >
          Detail
        </Button>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default CardItem;
