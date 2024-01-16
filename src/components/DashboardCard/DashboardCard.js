// DashboardCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const DashboardCard = ({ color, icon, title, data }) => {
  return (
    <Card sx={{ height: '100%' , backgroundColor:color, borderRadius:"10px"}}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap="4px">
          <Box display="flex" alignItems="center">
            <Box sx={{ fontSize: '2rem', marginRight: '10px', color: "#00000" }}>{icon}</Box>
            <Typography variant="h6" sx={{ fontSize: '0.97rem', fontWeight:"200" }}>{title}</Typography>
          </Box>
          <Typography variant="h5" sx={{ fontSize: '1.4rem', fontWeight:"550" }}>{data}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
