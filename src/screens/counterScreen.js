import React,{useReducer} from "react";
import { Text,StyleSheet,View,Button } from "react-native";
const reducer=(state,action)=>{
switch (action.type) {
    case 'INCREAMENT':
        return {...state,counter:state.counter+action.payload}
        case'DECREAMENT':
        return {...state,counter:state.counter-action.payload}
        
}
}
const CounterScreen=()=>{
    const [state,dispatch]=useReducer(reducer,{counter:0})
    const {counter}=state
return(
    <View>
        <Button title="increament" onPress={()=>dispatch({type:'INCREAMENT',payload:1})}/>
        <Button title="decreament" onPress={()=>dispatch({type:'DECREAMENT',payload:1})} />
        <Text>Count:{counter}</Text>
    </View>
)
}
const styles=StyleSheet.create({})
export default CounterScreen