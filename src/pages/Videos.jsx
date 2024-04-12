import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VideoCard from "../components/VideoCard";
import { useVideo } from "../api/youtube"

export default function Videos() {
  const { keyword } = useParams();
  // const {isLoading, error, data: videos} = useQuery({
  //   queryKey: ['videos', keyword],
  //   queryFn: async () => {
  //     const uri = keyword ? keywordUri + keyword : popularUri;
  //     return axios
  //             // .get(`/data/${keyword ? 'search' : 'popular'}.json`)
  //             .get(uri)
  //             .then(res => res.data.items);
  //             // .then(res => keyword ? res.data.items.shift() : res.data.items);
  //   },
  //   staleTime: 1000 * 60 * 1,       // 1분, ms 단위로 지정할 수 있음
  // });
  const {isLoading, error, videos} = useVideo(keyword);


  return (
    <>
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
      {videos && (
        <Grid container spacing={1}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
              <VideoCard video={video} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}