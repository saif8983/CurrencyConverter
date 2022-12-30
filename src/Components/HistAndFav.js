import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  HStack,
  Text,
  FlatList,
  NativeBaseProvider,
  Heading,
  Toast,
} from "native-base";
import ToastComponent from "./Toast";
import { AntDesign } from "@expo/vector-icons";
const HistAndFav = ({ state, removeFunc, handleCurrency, headingTitle }) => {
  return (
    <NativeBaseProvider>
      <Heading>{headingTitle}</Heading>
      <FlatList
        data={state}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleCurrency(item.fromCurrency, item.toCurrency)}
          >
            <HStack space={3} style={styles.list} justifyContent="space-around">
              <Text style={styles.textIconStyle}>
                {item.fromCurrency} - {item.toCurrency}
              </Text>

              <TouchableOpacity>
                <AntDesign
                  name="delete"
                  style={styles.textIconStyle}
                  onPress={() =>
                    removeFunc(index, () => {
                      Toast.show({
                        placement: "top",
                        render: () => {
                          return (
                            <ToastComponent
                              text={`${item.fromCurrency}/${item.toCurrency} is removed`}
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
                    })
                  }
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </HStack>
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  list: {
    height: 60,
    borderTopWidth: 1,
    backgroundColor: "#E5E5E5",
  },
  textIconStyle: {
    marginTop: 20,
  },
});

export default HistAndFav;
