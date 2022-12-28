import React ,{useEffect}from "react";
import { NativeBaseProvider ,Select,VStack,HStack,Button,Text,Input,ScrollView,Alert,Center,IconButton,CloseIcon,Box} from "native-base";
import {StyleSheet,TouchableOpacity} from 'react-native'
import ChartDetail from "../Components/chartDetail";
import {Fontisto} from "@expo/vector-icons"
import currencyApi from "../api/currencyApi";
const componentScreen=({navigation})=>{ 
  
    const [serviceFirst, setServiceFirst] = React.useState("");
    const [serviceSecond, setServiceSecond] = React.useState("");
    const [inputAmountValue,setInputAmountValue]=React.useState(0)
    const [amount,setAmount]=React.useState(0)
const [currencyFirst,setCurrencyFirst]=React.useState([])
    const currency_name=async()=>{
      try{
         const response=await currencyApi.get('/latest')
         const obj= await response.data.rates
         const objKeys=  Object.keys(obj)
         setCurrencyFirst(objKeys)
        
      }catch(error){
console.log(error)
      }
    }
    const handleChangeValue=(value)=>{
setInputAmountValue(value)
    }
    useEffect(()=>{
currency_name()
    },[])
    const convertCurrency=async()=>{
      try{
        const response=await currencyApi.get('/convert',{
          params:{
            from:serviceFirst,
            to:serviceSecond,
            value:inputAmountValue
          }
        })
        setAmount(response.data.info.rate)
      }catch(error){
console.log(error,"something issue")
      }
    }
    return (

        <NativeBaseProvider>
        
      <ScrollView style={{backgroundColor:'black'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('WatchList')}>
      <Fontisto name="favorite" style={{marginLeft:200,color:'white'}} size={30}  />
     </TouchableOpacity>
      <VStack alignItems="center" space={4}>
<Text>From</Text>
      <Select shadow={2} color="white" selectedValue={serviceFirst} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service"  onValueChange={itemValue => setServiceFirst(itemValue)}>
        {currencyFirst.map((item,index)=>{
            return <Select.Item key={index} shadow={2} label={item} value={item} />
        })}
      </Select>
      <Text>To</Text>
      <Select shadow={2} color="white" selectedValue={serviceSecond} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service"  onValueChange={itemValue => setServiceSecond(itemValue)}>
        {currencyFirst.map((item,index)=>{
            return <Select.Item key={index} shadow={2} label={item} value={item} />
        })}
      </Select>
      <Button onPress={()=>console.log('add favorite')}>Add Favorite</Button>
      <Text>Amount</Text>
      <Input size="md" color="white" minWidth="200" placeholder="Amount" type="number" value={inputAmountValue} onChangeText={(Input)=>handleChangeValue(Input)} />
      <VStack space={3} justifyContent="center">
      <Button onPress={() => convertCurrency()}  >Convert</Button>
      </VStack>
      <Text bold>Amount:{amount}</Text>
      <ChartDetail serviceFirst={serviceFirst} 
      serviceSecond={serviceSecond} 
      inputAmountValue={inputAmountValue} 
      amount={amount}
        setServiceFirst={setServiceFirst}
        setServiceSecond={setServiceSecond}
        setInputAmountValue={setInputAmountValue}
        setAmount={setAmount}
      />
      </VStack>
      </ScrollView>
    </NativeBaseProvider>
    
    )
}


export default componentScreen