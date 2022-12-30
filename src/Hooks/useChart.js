import React,{useMemo,useEffect,useState} from "react";
import currencyApi from "../api/currencyApi";
import { TimeFormate } from "../../utils/TimeFormate";
import { OfflineModeData } from "../../utils/OfflineModeData";
import { getDaysName } from "../../utils/getDaysName";
import { getInerValue } from "../../utils/getInerValue";

export default (serviceFirst,serviceSecond,setServiceFirst,setServiceSecond,setInputAmountValue,inputAmountValue,setAmount,amount,setError)=>{  
const [startDate, setStartDate] = useState(null);
const [endDate,setEndDate]=useState(null)
  const [modalStartDate, setModalStartDate] = useState(false);
  const [modalEndDate,setModalEndDate]=useState(false)
  const [lablsOfChart,setLableOfChart]=useState(['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'])
  const [dataOfChart,setDataOfChart]=useState(['0','1','3','4'])
  const [selectedDate] = useState(new Date());
  const [spiner,setSpiner]=useState(false)
   const {start_string,end_string}=TimeFormate(startDate,endDate)
 const {storeData}=OfflineModeData(serviceFirst,serviceSecond,setServiceFirst,setServiceSecond,setInputAmountValue,inputAmountValue,setAmount,amount,setSpiner,spiner)

const timeSeries=async(callback)=>{
  try{
  const response= await currencyApi.get('/timeseries',{
    
    params:{
      base:serviceFirst,
      start_date:start_string,
      end_date:end_string
    }
  })
const data= await response.data.rates
const {dayNameForDates}=getDaysName(data)
const {inrValues}=getInerValue(data)
setLableOfChart(dayNameForDates)
setDataOfChart(inrValues)
callback()
} catch(error){
  setError(true)
}
}
useEffect(()=>{
 timeSeries(()=>(
  storeData()
 ))
},[startDate,endDate])
  
  
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
  
return {startDate, endDate,modalStartDate,
    modalEndDate,
    lablsOfChart,
    
    dataOfChart,

    selectedDate,
    spiner,
    handleStartDateChange,
    handleEndDateChange,
    handleOpenCalenderStartDate,
    handleOpenCalenderEndDate ,

    
}
}