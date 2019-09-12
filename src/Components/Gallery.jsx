import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "../styles/gallery.css";
import { nominalTypeHack } from "prop-types";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 800,
    height: 800,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
}));
const imageURL = "https://picsum.photos/v2/list";
const textURL = "https://jsonplaceholder.typicode.com/posts";

export default function Gallery() {
  const classes = useStyles();

  const [images, getImages] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios(imageURL);
      getImages(response.data);
    }
    fetchData();
  }, []);
  

  const [text, getText] = useState([]);
  useEffect(() => {
    async function fetchText() {
      const response = await axios(textURL);
      console.log(response.data);
      getText(response.data);
    }
    fetchText();
  }, []);

  function showDetails() {
    let postTitle = document.getElementById("title");
    console.log("TITLE", postTitle);

    // let postContent = document.getElementById('description');
    postTitle.classList.add("displayHidden");
    // postContent.classList.toggle('showHidden');
    console.log("CLICK");
  }
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {images.map((tile, i) => (
          <GridListTile
            key={tile.id}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
            onClick={showDetails}
          >
            <img src={tile.download_url} alt={tile.title} />
            <GridListTileBar
              title={text[i].title}
              titlePosition="bottom"
              actionIcon={
                <IconButton
                  aria-label={`star ${tile.title}`}
                  className={classes.icon}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
              id="title"
            />

            <GridListTileBar
              id="description"
              title={text[i].body}
              titlePosition="bottom"
              actionPosition="left"
              className={classes.contentBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
// Collapse;
