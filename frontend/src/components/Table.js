import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function DataTable({ data, actionType, actionLink}) {
    const navigate = useNavigate();

    const handleAction = (row) => {
        navigate(`${actionLink}?data=${encodeURIComponent(JSON.stringify(row))}`);
    }

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                {headers.map((header) => (
                <TableCell key={header} align="left">
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableCell>
                ))}
                <TableCell align="left">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row, index) => (
                <TableRow key={index}>
                {headers.map((header) => (
                    <TableCell key={header} align="left">
                    {row[header]}
                    </TableCell>
                ))}
                <TableCell align="left">
                    <Button 
                        variant="contained" 
                        onClick={() => handleAction(row)}>
                    {actionType}
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
