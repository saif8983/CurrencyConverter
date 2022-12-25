import React from "react";
import { Text,StyleSheet ,View,Image} from "react-native";


const ImageDetails =({title,imageSource,score})=>{
    return (
        <View>
<Text>{title}</Text>
<Image source={imageSource} />
<Text>image score-{score}</Text>
</View>
)
}
const styles = StyleSheet.create({
    
  });
export default ImageDetails