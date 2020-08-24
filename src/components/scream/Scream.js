import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import Mybutton from "../../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";
import DeleteScream from "../scream/DeleteScream";
import ScreamDialog from "../scream/ScreamDialog";
import LikeButton from "../scream/LikeButton";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
  content: {
    padding: 25,
  },
};

const Scream = (props) => {
  const user = useSelector((state) => state.user);
  const {
    classes,
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likesCount,
      commentsCount,
    },
  } = props;
  const authenticated = user.authenticated;
  const handle = user.credentials.handle;

  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="profile Image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likesCount} likes</span>
        <Mybutton tip="comments">
          <ChatIcon color="primary" />
        </Mybutton>
        <span>{commentsCount} comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Scream);
