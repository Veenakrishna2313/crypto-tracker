import React, { useState,useEffect } from 'react';
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import {HistoricalChart} from "../Config/api"

const CoinInfo = ({coin}) => {

  const [historicalData,setHistoricalData]=useState();
  const [days,setDays]=useState(1);

  const {currency}=CryptoState();

    useEffect(() => {
      const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days,currency));
        console.log("Historic data", data);

       setHistoricalData(data.prices);
      };

      fetchHistoricData(); 
    }, [currency, days]);

  return (
    <div>CoinInfo</div>
  )
}

export default CoinInfo