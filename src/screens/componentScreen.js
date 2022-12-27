import React ,{useEffect}from "react";
import { NativeBaseProvider ,Select,VStack,HStack,Button,Text,Input,ScrollView,Alert,Center,IconButton,CloseIcon,Box} from "native-base";
import ChartDetail from "../Components/chartDetail";
import { useNetInfo } from "@react-native-community/netinfo";
import currencyApi from "../api/currencyApi";
const componentScreen=()=>{
  
  const netInfo=useNetInfo()
  netInfo.isConnected
  
  console.log(netInfo.isConnected)
  useEffect(() => {
    if (netInfo.isConnected) {
      setAlert(false)
    }else{
      setAlert(true)
    }
  }, [netInfo.isConnected]);
    const [serviceFirst, setServiceFirst] = React.useState("");
    const [serviceSecond, setServiceSecond] = React.useState("");
    const [inputAmountValue,setInputAmountValue]=React.useState(0)
    const [amount,setAmount]=React.useState(0)
    const [alert,setAlert]=React.useState(false)
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
        {alert ? (<Center>
      <Alert maxW="400" status="info" colorScheme="info">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                Internet is not connected
              </Text>
            </HStack>
            <IconButton variant="unstyled" _focus={{
            borderWidth: 0
          }}  />
          </HStack>
          <Box pl="6" _text={{
          color: "coolGray.600"
        }}>
            Please check your connection
          </Box>
        </VStack>
      </Alert>
    </Center>):
      <ScrollView style={{backgroundColor:'black'}}>
      <Button onPress={() => console.log("hello world")} variant="ghost" >+</Button>
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
      <Text>Amount</Text>
      <Input size="md" color="white" minWidth="200" placeholder="Amount" type="number" value={inputAmountValue} onChangeText={(Input)=>handleChangeValue(Input)} />
      <HStack space={3} justifyContent="center">
      <Button onPress={() => convertCurrency()}  >Convert</Button>
      </HStack>
      <Text bold>Amount:{amount}</Text>
      <ChartDetail serviceFirst={serviceFirst} serviceSecond={serviceSecond}/>
      </VStack>
      </ScrollView>
        }
    </NativeBaseProvider>
    
    )
}


export default componentScreen