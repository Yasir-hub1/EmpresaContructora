import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Clientes from "../../screens/Cliente/InicioCliente";
import Contratos from "../../screens/Cliente/Contratos";
import Documentos from "../../screens/Cliente/Documentos";

import VerPDF from "../../screens/Cliente/VerPDF";
const Stack = createNativeStackNavigator();

const ClienteStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Contratos">
      <Stack.Screen  name="Contratos" component={Contratos} options={{headerShown:false}} />
      <Stack.Screen name="Cliente" component={Clientes}  />
      <Stack.Screen name="Doc" component={Documentos}  />
      <Stack.Screen name="Pdf" component={VerPDF}  />


    
    </Stack.Navigator>
  );
};

export default ClienteStack;
