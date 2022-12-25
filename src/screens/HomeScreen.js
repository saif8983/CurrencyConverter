import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Button } from "react-native";


const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Hi saif ali</Text>
      <Button onPress={() => navigation.navigate('Component')} title="go to component Demo" />
      <Button onPress={() => navigation.navigate('List')} title="go to List Demo" />
      <Button onPress={() => navigation.navigate('Image')} title="go to Image Demo" />
      <Button onPress={() => navigation.navigate('Counter')} title="go to Counter Demo" />
      <Button onPress={() => navigation.navigate('Color')} title="go to Color Demo" />
      <Button onPress={() => navigation.navigate('Square')} title="go to Square Demo" />
      <Button onPress={() => navigation.navigate('Text')} title="go to Text Demo" />
    </View>

  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;

