import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScannerQr from "../../Screens/ScannerQr";



const Stack = createNativeStackNavigator();

const ScannerQrStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Qr" component={ScannerQr} />
      
    </Stack.Navigator>
  );
};

export default ScannerQrStack;
