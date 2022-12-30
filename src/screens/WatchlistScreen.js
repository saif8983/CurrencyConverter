import React,{useState,useEffect} from 'react';
import {StyleSheet} from 'react-native'
import HistAndFav from '../Components/HistAndFav';
import useAsyStorage from '../Hooks/useAsyStorage';
const WatchlistScreen = ({navigation}) => {
const {removeFromFavorites,favorites,handleCurrency}=useAsyStorage(navigation)
     
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
