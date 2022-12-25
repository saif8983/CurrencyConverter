import React from "react";
import { Text,StyleSheet,View,FlatList ,Button} from "react-native";
import { removeObject } from "../../redux/slice";
import { editObject } from "../../redux/objSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const ListScreen=()=>{
     const listData=useSelector(state=>state.form)
     const dispatch=useDispatch()
    const handleDelete=(name)=>{ 
        dispatch(removeObject(name))
    }
    const handleEdit=(obj)=>{
        dispatch(editObject(obj))
    }
    return(
        <FlatList  showsHorizontalScrollIndicator={false} keyExtractor={(item)=> item.name} data={listData} renderItem={({item})=>{
            return (
                <View key={item.name}>
            <Text style={Styles.textStyle}>{item.name}</Text>
            <Text style={Styles.textStyle}>{item.email}</Text>
            <Text style={Styles.textStyle}>{item.password}</Text>
            <Text style={Styles.textStyle}>{item.confirmPassword}</Text>
            <Button title="Edite" onPress={()=>handleEdit(item)}/>
            <Button title="Delete" onPress={()=>handleDelete(item.name)}/>
            </View>
            )
        }} />
    )
}
const Styles=StyleSheet.create({
    textStyle:{
        marginVertical:50
    }
})
export default ListScreen