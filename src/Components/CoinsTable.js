import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { CryptoState } from "../CryptoContext";
import {CoinList} from "././../Config/api";
import axios from 'axios';
import { Container, ThemeProvider,Typography,createTheme,TextField, TableContainer, LinearProgress, Table,TableCell,TableHead,TableRow,TableBody} from '@material-ui/core';


const CoinsTable = () => {

const [coins,setCoins]=useState([]);
const [loading,setLoading]=useState(false);
const { currency } = CryptoState();
const [search,setSearch]=useState("");

useEffect(()=>{
  setLoading(true)
  const fetchCoins= async()=>{
    //destructing data from API call
   const {data }= await axios.get(CoinList(currency));
   setCoins(data);
   setLoading(false);
  }
  fetchCoins();

},[currency])

console.log(coins);

 const darkTheme = createTheme({
   palette: {
     type: "dark",
     primary: {
       main: "#fff",
     },
   },
 });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          variant="outlined"
          label="Search for a Cryptocurrency"
          style={{ width: "100%", marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Coin</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>24h Change</TableCell>
                  <TableCell>Market Cap</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {coins.map(coin=>{
                <TableRow>
                  <TableCell>
                    <img />
                    <span></span>
                  </TableCell>
                  <TableCell>
                    <img />
                    <span></span>
                  </TableCell> 
                </TableRow>;
              })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable