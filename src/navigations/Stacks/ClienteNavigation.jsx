import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import { createDrawerNavigator } from "@react-navigation/drawer";

import ClienteStack from "../Stacks/ClienteStack";
import Perfil from "../../screens/Cliente/Perfil";

import React from "react";


const btnTabs = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const TabBar = ({ appName }) => {
  return (
    <btnTabs.Navigator
    initialRouteName="Cliente"
    screenOptions={({route,navigation})=>({
    
        tabBarIcon:({focused})=>verIcon(route,focused), 
        tabBarStyle:{
            borderTopLeftRadius:40,
            borderTopRightRadius:40,
            alignItems: "center",
            backgroundColor:"#ffffff",
            paddingTop:5,
            position:"absolute",
            overflow: "hidden",
        }
    })}
    >


      <btnTabs.Screen
        name="Cliente"
        component={ClienteStack}
        options={{
          // headerTitle: "Contratos",
          // headerTitleAlign: "center",
          headerShown:false,
        
        }}
      />
      <btnTabs.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerTitle: "Perfil",
          headerTitleAlign: "center",
          headerTintColor:"#ff7f50"
        
        }}
      />

     

    </btnTabs.Navigator>
  );
};
export default TabBar;


const verIcon = (route, focused) => {
  let icon = "";
  switch (route.name) {
    case "Cliente": {
      icon = "home";
      break;
    }
    case "Perfil": {
      icon = "person-circle-outline";
      break;
    }
    
  }
  return (
    <Icon
      name={icon}
      type="ionicon"
      color={focused ? "#ff7f50" : "#2f3542"}
      style={{ marginTop: 2 }}
    />
  );
};

/* const menuIcon=(navigation)=>{
  return(
    <Icon
    name="menu"
    type="ionicon"
    size={30}
    color="black"
    style={{marginTop:2,marginRight:10}}
    onPress={()=>navigation.toggleDrawer()}

    />
  );

} */




