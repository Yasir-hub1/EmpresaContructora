import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Contratos from "../../screens/Cliente/Contratos";
import Documentos from "../../screens/Cliente/Documentos";
import Proyectos from "../../screens/Cliente/Proyectos";
import Presupuestos from "../../screens/Cliente/Presupuestos";
import Informe from "../../screens/Cliente/Informe";
const Stack = createNativeStackNavigator();

const ClienteStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:true}} initialRouteName="Contratos">
      <Stack.Screen  name="Contratos" component={Contratos} options={{headerTitleAlign:"center",headerTitle:"Contratos",headerTintColor:"#ff7f50"}} />
      <Stack.Screen name="Doc" component={Documentos} options={{headerTitleAlign:"center",headerTitle:"Documentos",headerTintColor:"#ff7f50"}} />
      <Stack.Screen name="Proy" component={Proyectos} options={{headerTitleAlign:"center",headerTitle:"Proyectos",headerTintColor:"#ff7f50"}} />
      <Stack.Screen name="Info" component={Informe} options={{headerTitleAlign:"center",headerTitle:"Informes",headerTintColor:"#ff7f50"}} />
      <Stack.Screen name="Pre" component={Presupuestos} options={{headerTitleAlign:"center",headerTitle:"Presupuestos",headerTintColor:"#ff7f50"}} />
    


    
    </Stack.Navigator>
  );
};

export default ClienteStack;
