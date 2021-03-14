import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import bgHero from './bg-hero.jpeg';

const useStyles = makeStyles(theme => ({
  hero: {
    padding: '10rem 20rem', 
    backgroundSize: 'cover', 
    backgroundImage: `url(${bgHero})`,
  },
  title: {
    color: '#fff',
    fontWeight: '500'
  },
    textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Intro() {
  const classes = useStyles();
  return(
    <Box className={classes.hero}>
      <Typography variant="h3" component="h2" className={classes.title}>
      The best free stock photos & videos shared by talented creators.
      </Typography>
    </Box>
  );
}