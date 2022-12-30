import React, { useEffect } from "react";
import {
  NativeBaseProvider,
  Select,
  VStack,
  HStack,
  Button,
  Text,
  Input,
  ScrollView,
  Toast,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import ChartDetail from "../Components/chartDetail";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import useConvert from "../Hooks/useConvert";
import ToastComponent from "../Components/Toast";
import useAsyStorage from "../Hooks/useAsyStorage";

const MainScreen = ({ navigation }) => {
  const {
    serviceFirst,
    serviceSecond,
    setServiceFirst,
    setServiceSecond,
    amount,
    setAmount,
    inputAmountValue,
    setInputAmountValue,
    currencyFirst,
    handleChangeValue,
    convertCurrency,
    handleExchange,
    setError,
    error,
  } = useConvert(navigation);
  const { handleFavorite } = useAsyStorage();
  const id = navigation.getParam("id");
  useEffect(() => {
    if (id == undefined) {
      setServiceFirst("");
      setServiceSecond("");
    } else {
      setServiceFirst(id.fromCurrency);
      setServiceSecond(id.toCurrency);
    }
  }, [id]);

  return (
    <NativeBaseProvider>
      {error ? (
        <Text style={{ color: "red" }}> Please check Your connection</Text>
      ) : null}
      <ScrollView style={{ backgroundColor: "black" }}>
        <HStack space={3} justifyContent="space-around">
          <TouchableOpacity onPress={() => navigation.navigate("WatchList")}>
            <Fontisto name="favorite" style={{ color: "white" }} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("History")}>
            <FontAwesome name="history" style={{ color: "white" }} size={30} />
          </TouchableOpacity>
        </HStack>
        <VStack alignItems="center" space={4}>
          <Text style={styles.text}>From</Text>
          <Select
            shadow={2}
            color="white"
            selectedValue={serviceFirst}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            onValueChange={(itemValue) => setServiceFirst(itemValue)}
          >
            {currencyFirst.map((item, index) => {
              return (
                <Select.Item key={index} shadow={2} label={item} value={item} />
              );
            })}
          </Select>
          <HStack justifyContent="center">
            <TouchableOpacity
              onPress={() =>
                handleExchange(
                  () => convertCurrency(),
                  () => {
                    Toast.show({
                      placement: "top",
                      render: () => {
                        return (
                          <ToastComponent
                            text={"Please select Two values"}
                            bg={"black"}
                            px={2}
                            py={1}
                            rounded={"sm"}
                            mb={5}
                            color={"red"}
                          />
                        );
                      },
                    });
                  }
                )
              }
            >
              <FontAwesome
                name="exchange"
                style={{ marginRight: 80 }}
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.toText}>To</Text>
          </HStack>

          <Select
            shadow={2}
            color="white"
            selectedValue={serviceSecond}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            onValueChange={(itemValue) => setServiceSecond(itemValue)}
          >
            {currencyFirst.map((item, index) => {
              return (
                <Select.Item key={index} shadow={2} label={item} value={item} />
              );
            })}
          </Select>

          <Text style={styles.text}>Amount</Text>
          <Input
            size="md"
            color="white"
            minWidth="200"
            placeholder="Amount"
            type="number"
            value={inputAmountValue}
            onChangeText={(Input) =>
              handleChangeValue(Input, () => convertCurrency())
            }
          />

          <Text style={styles.text} bold>
            {serviceFirst}/{serviceSecond}:{amount * inputAmountValue}
          </Text>
          <Button
            onPress={() =>
              handleFavorite(
                serviceFirst,
                serviceSecond,
                () => {
                  Toast.show({
                    placement: "top",
                    render: () => {
                      return (
                        <ToastComponent
                          text={"please select value"}
                          bg={"black"}
                          px={2}
                          py={1}
                          rounded={"sm"}
                          mb={5}
                          color={"red"}
                        />
                      );
                    },
                  });
                },
                () => {
                  Toast.show({
                    placement: "top",
                    render: () => {
                      return (
                        <ToastComponent
                          text={"It already added"}
                          bg={"black"}
                          px={2}
                          py={1}
                          rounded={"sm"}
                          mb={5}
                          color={"red"}
                        />
                      );
                    },
                  });
                },
                () => {
                  Toast.show({
                    placement: "top",
                    render: () => {
                      return (
                        <ToastComponent
                          text={"successfully added"}
                          bg={"black"}
                          px={2}
                          py={1}
                          rounded={"sm"}
                          mb={5}
                          color={"white"}
                        />
                      );
                    },
                  });
                }
              )
            }
          >
            Add Favorite
          </Button>
          <ChartDetail
            serviceFirst={serviceFirst}
            serviceSecond={serviceSecond}
            inputAmountValue={inputAmountValue}
            amount={amount}
            setServiceFirst={setServiceFirst}
            setServiceSecond={setServiceSecond}
            setInputAmountValue={setInputAmountValue}
            setAmount={setAmount}
            setError={setError}
            error={error}
          />
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  toText: {
    color: "white",
    marginRight: 120,
  },
});
export default MainScreen;
