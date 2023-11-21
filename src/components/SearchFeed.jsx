import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import Videos from './Videos';
import { fetchFromApi } from '../utils/fetchFromApi';
import { useParams } from 'react-router-dom';

const SeachFeed = () => {

  const { searchTerm } = useParams();


  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromApi(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        setVideos(data.items || []);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
      });
  }, [searchTerm]);


  return (
    
    <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}} >
        <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: 'white'}} >
          Seach Results for: <span style={{ color: '#F31503' }} >
            {searchTerm}
          </span> videos
        </Typography>

        <Videos videos={videos} />
    </Box>
    
  )
}

export default SeachFeed;
