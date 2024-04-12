import React from "react";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Stack from '@mui/material/Stack';
import SmailVideoCard from "./SmailVideoCard";
import { useRelatedVideo } from "../api/youtube"

export default function RelatedVideo({ id, name }) {
  // const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${id}`;
  // const {isLoading, error, data: videos} = useQuery({
  //   queryKey: ['RelatedVideo', id],
  //   queryFn: async () => {
  //     return axios
  //             // .get('/data/searchChannel.json')
  //             .get(uri)
  //             .then(res => res.data.items)
  //   },
  //   staleTime: 1000 * 60 * 1, // 1분
  // });
  const {isLoading, error, videos} = useRelatedVideo(id);
  return (
    <>
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}  {/*로딩중*/}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}  {/*에러*/}
      {videos && (
        <Stack direction={'column'} spacing={1} sx={{textAlign: 'center'}} >
          <h4>이 채널의 다른 영상들</h4>
          {videos.map((video, index) => (<SmailVideoCard video={video} key={index} /> ))}
        </Stack>
      )}
       {/* {videos && videos.map(video => (
        <Stack>
          <ul>
            <VideoCard video={video} />
          </ul>
        </Stack> 
      ))} */}
    </>
  )
}