import {StyleSheet} from 'react-native';
import useAsyStorage from '../Hooks/useAsyStorage';
import HistAndFav from '../Components/HistAndFav';
const HistoryScreen = ({navigation}) => {
const {removeFromhistory,handleCurrency,history}=useAsyStorage(navigation)
      
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
