import React from "react";
import Intro from './Intro';
import GalleryImages from './GalleryImages';

import "./Gallery.css";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0e1525'
    },
    secondary: {
      main: '#c93838'
    },
  },
  status: {
    danger: 'orange',
  },
});

export default function Gallery() {
  return (
    <ThemeProvider theme={theme}>
        <Intro />
        <GalleryImages />
    </ThemeProvider>
  );
}
