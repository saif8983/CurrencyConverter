import React,{useEffect,useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HISTORY_TTL_MILLISECONDS } from "../../utils/expireTime";
export default (navigation)=>{
  const [history,setHistory]=useState([])
  const [favorites,setFavorites]=useState([])
  async function addToHistory(fromCurrency, toCurrency) {
    try {
      const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
      const expirationTime = Date.now() + HISTORY_TTL_MILLISECONDS
      history.unshift({ fromCurrency, toCurrency, expirationTime });
      if (fromCurrency !== "" && toCurrency !== "") {
      await AsyncStorage.setItem('history', JSON.stringify(history));
      }else{
        console.log('not add emty')
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleFavorite = async (fromCurrency, toCurrency, callbackForNotAddEmpty,callbackForDoubleAdd) => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      if (!favorites.find((favorite) => favorite.fromCurrency === fromCurrency && favorite.toCurrency === toCurrency)) {
        favorites.push({ fromCurrency, toCurrency });
        if (fromCurrency !== "" && toCurrency !== "") {
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        } else {
          callbackForNotAddEmpty()
        }
      } else {
        callbackForDoubleAdd()
      }
    } catch (error) {
      console.error(error);
    }
  }
  
    useEffect(() => {
        async function gethistory() {
          try {
            const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
           
            setHistory(history);
            
          } catch (error) {
            console.error(error);
          }
        }
        gethistory();
      }, []);
      async function removeFromhistory(index ,callback) {
        try {
          const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
          history.splice(index, 1);
          await AsyncStorage.setItem('history', JSON.stringify(history));
          setHistory(history);
          callback()
        } catch (error) {
          console.error(error);
        }
      }
      const handleCurrency=(fromCurrency,toCurrency)=>{
           navigation.navigate('Component',{id:{fromCurrency,toCurrency}})
      }
     
      async function removeExpiredHistory() {
        try {
          const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
          const currentTime = Date.now();
          const filteredHistory = history.filter((item) => item.expirationTime > currentTime);
          if (filteredHistory.length !== history.length) {
            // Only update the history list if at least one item has expired
            await AsyncStorage.setItem('history', JSON.stringify(filteredHistory));
            setHistory(filteredHistory);
          }
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(() => {
        const interval = setInterval(removeExpiredHistory, 1000);
        
        return () => clearInterval(interval);
      }, [history]);

      useEffect(() => {
        async function getFavorites() {
          try {
            const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setFavorites(favorites);
          } catch (error) {
            console.error(error);
          }
        }
        getFavorites();
      }, []);
      async function removeFromFavorites(index,callback) {
        try {
          const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
          favorites.splice(index, 1);
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
          setFavorites(favorites);
          callback()
        } catch (error) {
          console.error(error);
        }
      }
  return {addToHistory,handleFavorite,removeFromhistory,handleCurrency,removeFromFavorites,history,favorites}
}
