import Head from 'next/head';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography as MUI_Typography,
  } from '@mui/material';

  
  const EventTable = ({ formData }) => {
    return (
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Diameter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.userAddress}</TableCell>
                <TableCell>{row.userType}</TableCell>
                <TableCell>{row.coordinates1}</TableCell>
                <TableCell>{row.coordinates2}</TableCell>
                <TableCell>{row.diameter}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default EventTable;