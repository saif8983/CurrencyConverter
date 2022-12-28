import { Dimensions,View,Text ,StyleSheet} from "react-native";
import { NativeBaseProvider ,Modal,Select,VStack,HStack,Button,Input} from "native-base";
import React, { useState ,useMemo,useEffect} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { LineChart, } from "react-native-chart-kit";
import currencyApi from "../api/currencyApi"; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from "@react-native-community/netinfo";
const screenWidth = Dimensions.get("window").width;

const ChartDetail=({serviceFirst,serviceSecond,inputAmountValue,amount,setServiceFirst,setServiceSecond,setInputAmountValue,setAmount})=>{
  const netInfo=useNetInfo()
  const [startDate, setStartDate] = useState(null);
const [endDate,setEndDate]=useState(null)
  const [modalStartDate, setModalStartDate] = useState(false);
  const [modalEndDate,setModalEndDate]=useState(false)
  const [lablsOfChart,setLableOfChart]=useState(['jan','feb','mar','apr'])
  const [dataOfChart,setDataOfChart]=useState(['0','1','3','4'])
  const [selectedDate, setSelectedDate] = useState(new Date());
   
  
  const startOfPreviousWeek = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - selectedDate.getDay() - 6);
  const start_date = new Date(startDate);
const start_string = start_date.toISOString().split('T')[0];
const end_date=new Date(endDate)
const end_string=end_date.toISOString().split('T')[0];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const timeSeries=async()=>{
  try{
  const response= await currencyApi.get('/timeseries',{
    
    params:{
      base:serviceFirst,
      start_date:start_string,
      end_date:end_string
    }
  })
  const data= await response.data.rates
  const dateArray=Object.keys(data)
  const dayNameForDates=dateArray.map(date => {
    const day = new Date(date).getDay();
    return dayNames[day];
  });
  setLableOfChart(dayNameForDates)
  const inrValues = Object.values(data).map(rates => rates.INR);
  console.log(inrValues)
setDataOfChart(inrValues)
} catch(error){
  console.log(error)
}
}
useEffect(()=>{
 timeSeries()
},[startDate,endDate])
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
const data = {
    labels: lablsOfChart,
    datasets: [
      {
        data: dataOfChart,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: [`${serviceFirst}/${serviceSecond}`] // optional
  };
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    setModalStartDate(false)
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
    setModalEndDate(false)
  };
  const handleOpenCalenderStartDate = useMemo(() => {
    return () => {
      setModalStartDate(true);
      
    };
  }, [modalStartDate]);
  
  const handleOpenCalenderEndDate = useMemo(() => {
    return () => {
      setModalEndDate(true);
      
    };
  }, [modalEndDate]);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log(jsonValue)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  
  const handleStorage=()=>{
    storeData({
      serviceFirst:serviceFirst,
      serviceSecond:serviceSecond,
      lablsOfChart:lablsOfChart,
      dataOfChart:dataOfChart,
      inputAmountValue:inputAmountValue,
      amount:amount
    })
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      const jsonValueParse = await JSON.parse(jsonValue)
      const {serviceFirst,serviceSecond,lablsOfChart,dataOfChart,inputAmountValue,amount}=jsonValueParse
      setServiceFirst(serviceFirst)
      setServiceSecond(serviceSecond)
      setLableOfChart(lablsOfChart)
      setDataOfChart(dataOfChart)
    setInputAmountValue(inputAmountValue)
      setAmount(amount)
    } catch(e) {
      // error reading value
    }
  }
  
useEffect(()=>{
  console.log(netInfo.isConnected,'netInfo')
  if (netInfo.isConnected||netInfo.isConnected==null){
    console.log('not')
  }else if(netInfo.isConnected==false){
    getData()
  }
},[netInfo.isConnected])

return(
  <NativeBaseProvider>
  <VStack alignItems="center" space={4}>
    <LineChart
  data={data}
  width={screenWidth}
  height={220} 
  chartConfig={chartConfig}
/>
<HStack space={6} justifyContent="center" >
        <Button size="xs" style={styles.button} onPress={()=>handleOpenCalenderStartDate()}>Start date</Button>
        <Button size="xs" style={styles.button} onPress={()=>{handleOpenCalenderEndDate(),handleStorage()}}>End date</Button>
      </HStack>
<HStack space={3} justifyContent="center" style={{height:300}}>
<Modal style={styles.modal} isOpen={modalStartDate} >
<CalendarPicker

        selected={startDate}
        onDateChange={(newDate)=>handleStartDateChange(newDate)}
        todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          minDate={startOfPreviousWeek}
        maxDate={selectedDate}
      />
</Modal>
<Modal  isOpen={modalEndDate} style={styles.modal}>
      <CalendarPicker
        selected={endDate}
        onDateChange={(newDate)=>handleEndDateChange(newDate)}
        todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          minDate={startOfPreviousWeek}
        maxDate={selectedDate}
        
      />
      </Modal>
</HStack>
</VStack>
</NativeBaseProvider>

)
}
const styles=StyleSheet.create({
  modal:{
    backgroundColor:'grey',
  maxHeight:300,
  marginTop:300
},
button:{
  borderRadius:20
}
})
export default ChartDetail;