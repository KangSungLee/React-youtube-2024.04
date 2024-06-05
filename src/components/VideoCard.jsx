import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
  // if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel')
  //   return;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;

  function decodeHTMLEntities(text) {
    const element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent;
  }

  return (
    <Card 
      onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} }) }}
    >
      <CardContent style={{height: 320}}>
        <img src={thumbnails.medium.url} alt={title} style={{height: 200}}/>
        <div>
          <Typography sx={{ fontSize: 16,
            fontWeight: 'bold',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'}}>{decodeHTMLEntities(title)}</Typography>
          <Typography>{channelTitle}</Typography>
          <Typography>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}