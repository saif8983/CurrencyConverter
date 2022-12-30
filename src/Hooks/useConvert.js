import React, { useState, useEffect } from "react";
import currencyApi from "../api/currencyApi";
import useAsyStorage from "./useAsyStorage";

export default () => {
  const { addToHistory } = useAsyStorage();
  const [serviceFirst, setServiceFirst] = useState("");
  const [serviceSecond, setServiceSecond] = useState("");
  const [inputAmountValue, setInputAmountValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currencyFirst, setCurrencyFirst] = useState([]);
  const [error, setError] = useState(false);
  const currency_name = async () => {
    try {
      const response = await currencyApi.get("/latest");
      const currencyObj = await response.data.rates;
      const currencyObjKeys = Object.keys(currencyObj);
      setCurrencyFirst(currencyObjKeys);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };
  const handleChangeValue = (value, callback) => {
    setInputAmountValue(value);
    callback();
  };
  useEffect(() => {
    currency_name();
  }, []);
  const convertCurrency = async () => {
    try {
      const response = await currencyApi.get("/convert", {
        params: {
          from: serviceFirst,
          to: serviceSecond,
          value: inputAmountValue,
        },
      });
      setAmount(response.data.info.rate);
      addToHistory(serviceFirst, serviceSecond);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const handleExchange = (callback, Toast) => {
    if (serviceFirst !== "" && serviceSecond !== "") {
      setServiceFirst(serviceSecond);
      setServiceSecond(serviceFirst);
      callback();
    } else {
      Toast();
    }
  };

  return {
    serviceFirst,
    serviceSecond,
    setServiceFirst,
    setServiceSecond,
    amount,
    setAmount,
    inputAmountValue,
    setInputAmountValue,
    currencyFirst,
    setCurrencyFirst,
    handleChangeValue,
    convertCurrency,
    handleExchange,
    error,
    setError
  };
};
