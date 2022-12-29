import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import { Box } from 'native-base';
const ToastComponent = ({text,bg,px,py,rounded,mb,color}) => {
    return (
        
            <Box bg={bg} px={px} py={py} rounded={rounded} mb={mb}>
                  <Text style={{color}}> {text}</Text> 
                  </Box>
    );
}

const styles = StyleSheet.create({})

export default ToastComponent;
