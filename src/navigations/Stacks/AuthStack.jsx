
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import  Constants  from 'expo-constants'
import Login from '../../screens/Auth/Login'
import Signup from "../../screens/Auth/Signup" 
import { StyleSheet } from 'react-native'
const Stack=createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
    initialRouteName='Login'
    screenOptions={{
        headerBackTitle:"",
        headerShown:true,
        headerTitle:"INSUCONS",
        headerStyle:[styles.headerStyle],
        headerShadowVisible:false,
        headerTitleAlign:"center"
      
       

    }}
    >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />

    </Stack.Navigator>
  )
}






const styles = StyleSheet.create({
    headerStyle:{
        backgroundColor:'#eaf1f1'

    },
    header:{
        fontSize:28,
        color:'#2570e3',
        
    },
});
export default AuthStack