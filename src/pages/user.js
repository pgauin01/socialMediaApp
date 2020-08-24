import React, { Component } from "react";
import PropTypes from "prop-types";
import axois from "axios";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/Scream";
import { getUserData } from "../store/actions/data";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    if (screamId) {
      this.setState({
        screamIdParam: screamId,
      });
    }
    this.props.getUserData(handle);
    axois
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;
    const screamMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No screams found </p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam) {
          return <Scream key={scream.screamId} scream={scream} />;
        } else {
          return <Scream key={scream.screamId} scream={scream} openDialog />;
        }
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {screamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
