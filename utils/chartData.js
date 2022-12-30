

export default  chartData=(lablsOfChart,dataOfChart,serviceFirst,serviceSecond)=>{
   
     const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, 
        barPercentage: 0.5,
        useShadowColorFromDataset: false 
      };
     const data = {
        labels: lablsOfChart,
        datasets: [
          {
            data: dataOfChart,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
            strokeWidth: 2 // optional 
          }
        ],
        legend: [`${serviceFirst}/${serviceSecond}`] 
      };
      return {chartConfig,data}
}
