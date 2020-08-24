import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteBorder from "@material-ui/icons/FavoriteBorder";
import { likeScream, unlikeScream } from "../../store/actions/data";
import { connect } from "react-redux";

export class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  LikeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  UnlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavouriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="undo like" onClick={this.UnlikeScream}>
        <FavouriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.LikeScream}>
        <FavouriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
