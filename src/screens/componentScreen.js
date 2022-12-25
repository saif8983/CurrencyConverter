import React ,{useEffect}from "react";
import { NativeBaseProvider ,Select,VStack,HStack,Button,Text,Input,ScrollView} from "native-base";
import ChartDetail from "../Components/chartDetail";
import currencyApi from "../api/currencyApi";
const componentScreen=()=>{
    const [serviceFirst, setServiceFirst] = React.useState("");
    const [serviceSecond, setServiceSecond] = React.useState("");
    const [inputAmountValue,setInputAmountValue]=React.useState(0)
    const [amount,setAmount]=React.useState(0)
const [currencyFirst,setCurrencyFirst]=React.useState([])
    const currency_name=async()=>{
      try{
         const response=await currencyApi.get('/latest')
         const obj=response.data.rates
         const objKeys=Object.keys(obj)
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
console.log(error)
      }
    }
    return (
        <NativeBaseProvider>
      <ScrollView>
      <VStack alignItems="center" space={4}>

      <Select shadow={2} selectedValue={serviceFirst} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service"  onValueChange={itemValue => setServiceFirst(itemValue)}>
        {currencyFirst.map((item,index)=>{
            return <Select.Item key={index} shadow={2} label={item} value={item} />
        })}
      </Select>
      <Select shadow={2} selectedValue={serviceSecond} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service"  onValueChange={itemValue => setServiceSecond(itemValue)}>
        {currencyFirst.map((item,index)=>{
            return <Select.Item key={index} shadow={2} label={item} value={item} />
        })}
      </Select>
      <Input size="md" minWidth="200" placeholder="Amount" type="number" value={inputAmountValue} onChangeText={(Input)=>handleChangeValue(Input)} />
      <HStack space={3} justifyContent="center">
      <Button onPress={() => console.log("hello world")}>+Add Watchlist</Button>
      <Button onPress={() => convertCurrency()}>Convert</Button>
      </HStack>
      <Text bold>Amount:{amount}</Text>
      <ChartDetail/>
      </VStack>
      </ScrollView>
    </NativeBaseProvider>
    
    )
}


export default componentScreen