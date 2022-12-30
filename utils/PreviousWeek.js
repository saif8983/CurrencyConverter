import useChart from "../src/Hooks/useChart";
export const PreviousWeek=()=>{
    const {selectedDate}=useChart()
    const startOfPreviousWeek = new Date(selectedDate);
    startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - startOfPreviousWeek.getDay() - 1);
    return {startOfPreviousWeek}
}