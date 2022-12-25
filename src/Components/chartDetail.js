import { Dimensions,View,Text ,StyleSheet} from "react-native";
import { NativeBaseProvider ,Select,VStack,HStack,Button,Input} from "native-base";
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { LineChart, } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const ChartDetail=()=>{
  const [startDate, setStartDate] = useState(null);
const string=startDate===null?null:startDate.join('')
console.log(string)
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

return(
  <NativeBaseProvider>
  <VStack alignItems="center" space={4}>
    <LineChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>
<HStack space={3} justifyContent="center" style={{height:300}}>
<CalendarPicker
        selected={startDate}
        onDateChange={handleStartDateChange}
        
        todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
      />
      {/* <CalendarPicker
        selected={endDate}
        onChange={handleEndDateChange}
        todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          
      /> */}
</HStack>
</VStack>
</NativeBaseProvider>

)
}
const styles=StyleSheet.create({

})
export default ChartDetail;