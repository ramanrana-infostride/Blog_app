import React from "react";
import Banner from "../Banner/Banner";
import Categories from "./Categories";
import { Grid} from '@mui/material';

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
        <Categories />  
        </Grid>
        <Grid container item lg={10} sm={10} xs={12}>
        Posts
        </Grid>

      </Grid>
     
    </>
  );
};

export default Home;
