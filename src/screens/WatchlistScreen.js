import React,{useState,useEffect} from 'react';
import {StyleSheet} from 'react-native'
import HistAndFav from '../Components/HistAndFav';
import AsyncStorage from '@react-native-async-storage/async-storage'
const WatchlistScreen = ({navigation}) => {
    const [favorites,setFavorites]=useState([])
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
      const handleCurrency=(fromCurrency,toCurrency)=>{
           navigation.navigate('Component',{id:{fromCurrency,toCurrency}})
      }
      
    return (
      <HistAndFav state={favorites} 
      removeFunc={removeFromFavorites} 
      handleCurrency={handleCurrency} 
        headingTitle={'Favorite'}
      />
    )
}

const styles = StyleSheet.create({
   
})

export default WatchlistScreen;
