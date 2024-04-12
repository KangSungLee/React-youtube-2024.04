import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { formatAgo } from "../util/date";

export default function SmailVideoCard({ video }){
  const navigate = useNavigate();
  const videoId = video.id.videoId;
  const {title, publishedAt, thumbnails,} = video.snippet; 
  
  return (
    <Card onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} }) }}>
      <Stack direction={'row'} spacing={1}>
        <img src={thumbnails.medium.url} alt={title} width={130} height={100}/>
        <div style={{textAlign: 'left'}}>
          <Typography>{title}</Typography>
          <Typography>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </Stack>
    </Card>
  );
}