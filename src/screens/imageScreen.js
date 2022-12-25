import React from "react";
import { Text,StyleSheet ,View} from "react-native";
import ImageDetails from '../Components/imageDetails'

const ImageScreen =()=>{
    return (
        <View>
<ImageDetails title="forest" imageSource={require('../../assets/forest.jpg')} score="9"/>
<ImageDetails title="beach" imageSource={require('../../assets/beach.jpg')} score="10"/>
<ImageDetails title="mountain" imageSource={require('../../assets/mountain.jpg')} score="12"/>
</View>
)
}
const styles = StyleSheet.create({
   
  });
export default ImageScreen