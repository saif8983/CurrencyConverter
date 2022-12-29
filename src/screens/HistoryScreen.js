import React,{useState,useEffect} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import HistAndFav from '../Components/HistAndFav';
const HistoryScreen = ({navigation}) => {
  
    const [history,setHistory]=useState([])
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
      const HISTORY_TTL_MILLISECONDS = 1000 
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
        const interval = setInterval(removeExpiredHistory, HISTORY_TTL_MILLISECONDS);
        
        return () => clearInterval(interval);
      }, [history]);
      
    return (
      <HistAndFav state={history} 
      removeFunc={removeFromhistory} 
      handleCurrency={handleCurrency} 
        headingTitle={'History'}
      />
    )
}

const styles = StyleSheet.create({
    list:{
        height:60,
        borderTopWidth:1,
        backgroundColor:'#E5E5E5'
    },
    textIconStyle:{
    marginTop:20
    }
})


export default HistoryScreen;
