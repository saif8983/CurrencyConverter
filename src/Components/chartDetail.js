import { Dimensions,View,Text ,StyleSheet} from "react-native";
import { NativeBaseProvider ,Modal,Select,VStack,HStack,Button,Input} from "native-base";
import React, { useState ,useMemo,useEffect} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { LineChart, } from "react-native-chart-kit";
import currencyApi from "../api/currencyApi";
const screenWidth = Dimensions.get("window").width;

const ChartDetail=({serviceFirst,serviceSecond})=>{
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
  const response= await currencyApi.get('/timeseries',{
    params:{
      base:serviceFirst,
      start_date:start_string,
      end_date:end_string
    }
  })
  const data=response.data.rates
  const dateArray=Object.keys(data)
  const dayNameForDates=dateArray.map(date => {
    const day = new Date(date).getDay();
    return dayNames[day];
  });
  setLableOfChart(dayNameForDates)
  const inrValues = Object.values(data).map(rates => rates.INR);
setDataOfChart(inrValues)
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
        <Button size="xs" style={styles.button} onPress={()=>handleOpenCalenderEndDate()}>End date</Button>
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