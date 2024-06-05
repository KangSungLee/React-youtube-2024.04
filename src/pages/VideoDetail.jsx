import React from "react";
import { useLocation } from 'react-router-dom';
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideo from "../components/RelatedVideo";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function VideoDetail() {
  const { state : {video} } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;

  function decodeHTMLEntities(text) {
    const element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9} >
        <iframe id='player' type='text/html' width='100%' height='600'
          src={`https://www.youtube.com/embed/${videoId}`} title={title} />
        <div>
          <h3>{decodeHTMLEntities(title)}</h3>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre>{description}</pre>
        </div>
      </Grid>
      <Grid item xs={12} md={3}>
        <RelatedVideo id={channelId} name={channelTitle} />
      </Grid>
    </Grid>

    
  )
}