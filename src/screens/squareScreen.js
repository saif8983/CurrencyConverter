import React ,{useReducer} from "react";
import { Text,StyleSheet,View } from "react-native";
import ColorCounter from "../Components/colorCounter";
const reducer=(state,action)=>{
switch(action.colorToChange){
    case 'red':
    return {...state,red:state.red+action.amount}
    case'green':
    return {...state,green:state.green+action.amount}
    case'blue':
    return {...state,blue:state.blue+action.amount}
    default:
        return state
}
}

const SquareScreen=()=>{
    const [state,dispatch]=useReducer(reducer,{red:0,green:0,blue:0})
    const {red,green,blue}=state
    const COLOR_INCREAMENT=15
return(
    <View>
        <ColorCounter 
        onIncrease={()=>dispatch({colorToChange:'red',amount:COLOR_INCREAMENT})} 
        onDecrease={()=>dispatch({colorToChange:'red',amount:-1*COLOR_INCREAMENT})}
        color="red"/>
        <ColorCounter 
        onIncrease={()=>dispatch({colorToChange:'green',amount:COLOR_INCREAMENT})} 
        onDecrease={()=>dispatch({colorToChange:'green',amount:-1*COLOR_INCREAMENT})}
        color="green"/>
        <ColorCounter
        onIncrease={()=>dispatch({colorToChange:'blue',amount:COLOR_INCREAMENT})} 
        onDecrease={()=>dispatch({colorToChange:'blue',amount:-1*COLOR_INCREAMENT})}
         color="blue"/>
         <View style={{height:100,width:150,backgroundColor:`rgb(${red},${green},${blue})`}} />
    </View>
)
}
const styles=StyleSheet.create({})
export default SquareScreen