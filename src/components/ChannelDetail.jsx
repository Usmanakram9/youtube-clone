import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { fetchFromApi } from "../utils/fetchFromApi";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null); // Set initial value to null
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await fetchFromApi(`channels?part=snippet&id=${id}`);
        setChannelDetail(data?.items[0]);

        const videosData = await fetchFromApi(`search?channelId=${id}&part=snippet,id&order=date`);
        setVideos(videosData?.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            height: "300px",
            background:
              "radial-gradient(circle, rgba(83,18,18,1) 0%, rgba(0,0,0,1) 100%)",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
