import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notificaciones from "../../Screens/Notificaciones";
import Moderations from "../../Screens/Moderations";


const Stack = createNativeStackNavigator();

const NotificacionesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Notificacion" component={Moderations}  />
    
    </Stack.Navigator>
  );
};

export default NotificacionesStack;
