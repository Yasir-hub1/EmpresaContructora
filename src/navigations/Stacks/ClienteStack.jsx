import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Clientes from "../../screens/Cliente/InicioCliente";
import Contratos from "../../screens/Cliente/Contratos";
import Documentos from "../../screens/Cliente/Documentos";
import Proyectos from "../../screens/Cliente/Proyectos";
import Presupuestos from "../../screens/Cliente/Presupuestos";
import Informe from "../../screens/Cliente/Informe";
const Stack = createNativeStackNavigator();

const ClienteStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Contratos">
      <Stack.Screen  name="Contratos" component={Contratos} options={{headerShown:false}} />
      <Stack.Screen name="Cliente" component={Clientes}  />
      <Stack.Screen name="Doc" component={Documentos}  />
      <Stack.Screen name="Proy" component={Proyectos}  />
      <Stack.Screen name="Info" component={Informe}  />
      <Stack.Screen name="Pre" component={Presupuestos}  />
    


    
    </Stack.Navigator>
  );
};

export default ClienteStack;
