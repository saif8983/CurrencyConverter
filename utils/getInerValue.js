export const getInerValue=(data)=>{
    const inrValues = Object.values(data).map(rates => rates.INR);
    return {inrValues}
}