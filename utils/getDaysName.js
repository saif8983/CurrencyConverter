const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
export const getDaysName=(data)=>{
    const dateArray=Object.keys(data)
    const dayNameForDates=dateArray.map(date => {
      const day = new Date(date).getDay();
      return dayNames[day];
    });
    return {dayNameForDates}
}