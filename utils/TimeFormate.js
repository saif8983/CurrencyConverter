export const TimeFormate=(startDate,endDate)=>{
    const start_date = new Date(startDate);
const start_string = start_date.toISOString().split('T')[0];
const end_date=new Date(endDate)
const end_string=end_date.toISOString().split('T')[0];
return {start_string,end_string}
}