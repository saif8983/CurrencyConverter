import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
export const OfflineModeData = (
  serviceFirst,
  serviceSecond,
  setServiceFirst,
  setServiceSecond,
  setInputAmountValue,
  inputAmountValue,
  setAmount,
  amount,
  setSpiner,
  spiner
) => {
  const netInfo = useNetInfo();
  const storeData = async () => {
    try {
      const value = {
        serviceFirst: serviceFirst,
        serviceSecond: serviceSecond,
        inputAmountValue: inputAmountValue,
        amount: amount,
      };
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      const jsonValueParse = await JSON.parse(jsonValue);
      const { serviceFirst, serviceSecond, inputAmountValue, amount } =
        jsonValueParse;
      setServiceFirst(serviceFirst);
      setServiceSecond(serviceSecond);
      setInputAmountValue(inputAmountValue);
      setAmount(amount);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (netInfo.isConnected || netInfo.isConnected == null) {
      console.log("connected");
    } else if (netInfo.isConnected == false) {
      getData();
    }
  }, [netInfo.isConnected]);
  useEffect(() => {
    if (netInfo.isConnected == false) {
      if (inputAmountValue !== 0) {
        setSpiner(false);
      } else {
        setSpiner(true);
      }
    }
  }, [inputAmountValue, netInfo.isConnected, spiner]);
  return { storeData };
};
