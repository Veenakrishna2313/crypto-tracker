import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { CryptoState } from '../CryptoContext';
import {SingleCoin} from '../Config/api'
import { useEffect } from 'react';
import axios from 'axios';
import { Typography, makeStyles } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';

const CoinPage = () => {

  const {id}=useParams();
  const [coin,setCoin]=useState();
  const {currency,symbol}=CryptoState();  

  console.log("coin", coin);

  useEffect(()=>{
     const fetchCoin = async () => {
       const { data } = await axios.get(SingleCoin(id));
       console.log("data",data)

       setCoin(data);
     };

     
     fetchCoin();
    
  },[])

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      fontFamily: "Montserrat",
      marginBottom: 20,
    },
    description: {
      width:"80%",
      fontFamily: "Montserrat",
      marginBottom: 20,
    },
  }));

  const classes=useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="h6" className={classes.description}>
          {coin?.description.en.split(". ")[0]}
        </Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage