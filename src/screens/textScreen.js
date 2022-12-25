import React,{useState,useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import { TextInput,View ,StyleSheet,Text, Button} from "react-native";
import {addObject,updateObject} from '../../redux/slice'
import { emtyToObject } from "../../redux/objSlice";


const TextSreen=()=>{ 
    const editObject=useSelector(state=>state.obj)
    useEffect(()=>{
setData(editObject)

Object.keys(editObject).length===0 ? setCondition(false):setCondition(true)
    },[])
    const dispatch= useDispatch()
    const [data,setData]=useState({name:'',email:'',password:'',confirmPassword:''})
    const [condition,setCondition]=useState(false)
    
    const handleSumit=()=>{
        dispatch(addObject(data))
        setData('') 
    }
    const handleChange=(value,name)=>{  
setData({...data,[name]:value})
    }
    const handleUpdate=()=>{
        dispatch(updateObject(data))
        dispatch(emtyToObject({}))
          setCondition(false)
    }
return(
    <View style={styles.parent}>
    <Text>name:</Text>
        <TextInput style={styles.input}
         autoCapitalize="none"
         autoCorrect={false}
         value={data.name}
         onChangeText={(Name)=>handleChange(Name,'name')}
        />
        <Text>Email Id:</Text>
        <TextInput style={styles.input}
         autoCapitalize="none"
         autoCorrect={false}
         value={data.email}
         onChangeText={(email)=>handleChange(email,'email')}
        />
        <Text>password:</Text>
        <TextInput style={styles.input}
         autoCapitalize="none"
         autoCorrect={false}
        secureTextEntry={true}
         value={data.password}
         onChangeText={(password)=>handleChange(password,'password')}
        />
        
        <Text> confirmPassword</Text>
        <TextInput style={styles.input}
         autoCapitalize="none"
         autoCorrect={false}
        secureTextEntry={true}
         value={data.confirmPassword}
         onChangeText={(confirmPassword)=>handleChange(confirmPassword,'confirmPassword')}
        />
        
        
       {condition ?<Button title="Update" onPress={()=>handleUpdate()}/>:<Button title="Sign Up" onPress={()=>handleSumit()}/>}
    </View>
)
}

const styles=StyleSheet.create({
    input:{
        margin:15,
        borderColour:"black",
        borderWidth:1,
        width:200
    },
    parent:{
      display:"flex",
      flexDirection:'column',
      justifyContent:"space-around",
      alignItems:'center'

    }
})
export default TextSreen