import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { CryptoState } from '../CryptoContext';
import {SingleCoin} from '../Config/api'
import { useEffect } from 'react';
import axios from 'axios';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';
import ReactHtmlParser from 'react-html-parser';
import {numberWithCommas} from '../Components/CoinsTable'

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
      width:"100%",
      fontFamily: "Montserrat",
      PaddingBottom: 15,
      padding:25,
      paddingTop:0,
      textAlign:"justify"
    },
    marketData:{
      alignSelf:"start",
      padding:25,
      paddingTop:10,
      width:"100%",
      [theme.breakpoints.down("md")]:{
        display:"flex",
        justifyContent:"space-around",
      },
      [theme.breakpoints.down("sm")]:{
        flexDirection:"column",
        alignItems:"center",
      },
      [theme.breakpoints.down("xs")]:{
        alignItems:"start",
      }
    }
  }));

  const classes=useStyles();

  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>

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
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0,-6)
              )} M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage