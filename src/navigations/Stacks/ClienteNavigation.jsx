import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../../components/DrawerContent"
import ClienteStack from "../Stacks/ClienteStack";
// import ScannerQrStack from "./Stacks/ScannerQrStack";
import React from "react";
// import NotificacionesStack from "./Stacks/NotificacionStack";

const btnTabs = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const TabBar = ({ appName }) => {
  return (
    <btnTabs.Navigator
    initialRouteName="Cliente"
    screenOptions={({route,navigation})=>({
      headerRight:()=>menuIcon(navigation),
        tabBarIcon:({focused})=>verIcon(route,focused),
        tabBarStyle:{
            borderTopLeftRadius:40,
            borderTopRightRadius:40,
            alignItems: "center",
            backgroundColor:"#dbdcdc",
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
          headerTitle: "Contratos",
          headerTitleAlign: "center",
          title:"Inicio"
        }}
      />

     {/*  <btnTabs.Screen
        name="Cuenta"
        component={ScannerQrStack}
        options={{
          headerTitle: "PhotoMemories",
          headerTitleAlign: "center",
          title:"QR"
        }}
      /> */}
      {/*  <btnTabs.Screen
        name="Notificacion"
        component={NotificacionesStack}
        options={{
          headerTitle: "Notificaciones",
          headerTitleAlign: "center",
          title:"Notificacion"
        }}
      /> */}

    </btnTabs.Navigator>
  );
};

const ClienteNavigation = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props)=><DrawerContent {...props}/>}
    screenOptions={{headerShown:false}}
    >
      <Drawer.Screen
      name="btnTabs"
      component={TabBar}
      />

    </Drawer.Navigator>
  );
};

btnTabs.defaultProps = {
  appName: Constants.manifest.name,
};

const verIcon = (route, focused) => {
  let icon = "";
  switch (route.name) {
    case "Cliente": {
      icon = "home";
      break;
    }
    case "Cuenta": {
      icon = "qr-code-outline";
      break;
    }
    case "Notificacion": {
      icon = "notifications-outline";
      break;
    }
  }
  return (
    <Icon
      name={icon}
      type="ionicon"
      color={focused ? "#2570e3" : "white"}
      style={{ marginTop: 2 }}
    />
  );
};

const menuIcon=(navigation)=>{
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

}

export default ClienteNavigation;


