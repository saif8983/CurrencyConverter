import React, { useEffect } from "react";
import { NativeBaseProvider, Select, VStack, HStack, Button, Text, Input, ScrollView, Toast } from "native-base";
import { StyleSheet, TouchableOpacity} from 'react-native'
import ChartDetail from "../Components/chartDetail";
import { Fontisto, FontAwesome } from "@expo/vector-icons"
import currencyApi from "../api/currencyApi";
import AsyncStorage from '@react-native-async-storage/async-storage'
import ToastComponent from "../Components/Toast";

const componentScreen = ({ navigation }) => {
  const id = navigation.getParam('id')
  const [serviceFirst, setServiceFirst] = React.useState("");
  const [serviceSecond, setServiceSecond] = React.useState("");

  const [inputAmountValue, setInputAmountValue] = React.useState(0)
  const [amount, setAmount] = React.useState(0)
  const [currencyFirst, setCurrencyFirst] = React.useState([])
  useEffect(() => {
    if (id == undefined) {
      setServiceFirst("")
      setServiceSecond("")
    } else {
      setServiceFirst(id.fromCurrency)
      setServiceSecond(id.toCurrency)
    }
  }, [id])
  const currency_name = async () => {
    try {
      const response = await currencyApi.get('/latest')
      const obj = await response.data.rates
      const objKeys = Object.keys(obj)
      setCurrencyFirst(objKeys)

    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeValue = (value, callback) => {
    setInputAmountValue(value)
    callback()
  }
  useEffect(() => {
    currency_name()
  }, [])
  const convertCurrency = async () => {
    try {
      const response = await currencyApi.get('/convert', {
        params: {
          from: serviceFirst,
          to: serviceSecond,
          value: inputAmountValue
        }
      })
      setAmount(response.data.info.rate)
      addToHistory(serviceFirst, serviceSecond)

    } catch (error) {
      console.log(error, "something issue")
    }
  }
  const handleFavorite = async (fromCurrency, toCurrency, callback) => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      if (!favorites.find((favorite) => favorite.fromCurrency === fromCurrency && favorite.toCurrency === toCurrency)) {
        favorites.push({ fromCurrency, toCurrency });
        if (fromCurrency !== "" && toCurrency !== "") {
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        } else {
          callback()
        }
      } else {
        console.log('it also added')
      }
    } catch (error) {
      console.error(error);
    }
  }
  const HISTORY_TTL_MILLISECONDS = 1000 * 60 * 60 * 24 * 4

  async function addToHistory(fromCurrency, toCurrency) {
    try {
      const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
      const expirationTime = Date.now() + HISTORY_TTL_MILLISECONDS
      console.log(expirationTime)
      history.unshift({ fromCurrency, toCurrency, expirationTime });
      await AsyncStorage.setItem('history', JSON.stringify(history));

    } catch (error) {
      console.error(error);
    }
  }
  const handleExchange = (callback) => {
    setServiceFirst(serviceSecond)
    setServiceSecond(serviceFirst)
    callback()

  }
  return (

    <NativeBaseProvider>

      <ScrollView style={{ backgroundColor: 'black' }}>
        <HStack space={3} justifyContent="space-around">
          <TouchableOpacity onPress={() => navigation.navigate('WatchList')}>
            <Fontisto name="favorite" style={{ color: 'white' }} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <FontAwesome name="history" style={{ color: 'white' }} size={30} />
          </TouchableOpacity>
        </HStack>
        <VStack alignItems="center" space={4}>
          <Text style={styles.text}>From</Text>
          <Select shadow={2} color="white" selectedValue={serviceFirst} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" onValueChange={itemValue => setServiceFirst(itemValue)}>
            {currencyFirst.map((item, index) => {
              return <Select.Item key={index} shadow={2} label={item} value={item} />
            })}
          </Select>
          <HStack justifyContent="center" >
            <TouchableOpacity onPress={() => handleExchange(() => (
              convertCurrency()
            ))}>
              <FontAwesome name="exchange" style={{ marginRight: 80 }} size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.toText}>To</Text>
          </HStack>

          <Select shadow={2} color="white" selectedValue={serviceSecond} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" onValueChange={itemValue => setServiceSecond(itemValue)}>
            {currencyFirst.map((item, index) => {
              return <Select.Item key={index} shadow={2} label={item} value={item} />
            })}
          </Select>

          <Text style={styles.text}>Amount</Text>
          <Input size="md" 
          color="white" minWidth="200" 
          placeholder="Amount" type="number" 
          value={inputAmountValue} 
          onChangeText={(Input) => 
          handleChangeValue(Input, () => 
          (convertCurrency()))} />

          <Text style={styles.text} bold>{serviceFirst}/{serviceSecond}:{amount * inputAmountValue}</Text>
          <Button onPress={() => handleFavorite(serviceFirst, serviceSecond, () => {
            Toast.show({
              placement: "top",
              render: () => {
                return <ToastComponent text={"please select value"}
                  bg={'black'}
                  px={2}
                  py={1}
                  rounded={"sm"}
                  mb={5}
                  color={"red"}
                />
              }
            });
          })}>Add Favorite</Button>
          <ChartDetail serviceFirst={serviceFirst}
            serviceSecond={serviceSecond}
            inputAmountValue={inputAmountValue}
            amount={amount}
            setServiceFirst={setServiceFirst}
            setServiceSecond={setServiceSecond}
            setInputAmountValue={setInputAmountValue}
            setAmount={setAmount}
          />
        </VStack>
      </ScrollView>
    </NativeBaseProvider>

  )
}

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  toText: {
    color: 'white',
    marginRight: 120
  }
})
export default componentScreen