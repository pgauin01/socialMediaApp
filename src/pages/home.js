import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { getScream } from "../store/actions/data";
import { getLikes } from "../store/actions/user";
import ScreamSkeleton from "../util/ScreamSkeleton";

const Home = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const user = useSelector((state) => state.user);
  console.log(user.likes);
  const { screams, loading } = data;
  useEffect(() => {
    dispatch(getScream());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getLikes());
  }, [dispatch]);
  let recentScreamMarkup = !loading ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <ScreamSkeleton />
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
