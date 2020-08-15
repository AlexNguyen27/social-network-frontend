import React from "react";
import UserCard from "./UserCard";
import { Grid } from "@material-ui/core";

const Connection = () => {
  return (
    <div style={{ marginRight: "-24px", marginLeft: "-24px" }}>
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Grid item xs={4}>
            <UserCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Connection;
