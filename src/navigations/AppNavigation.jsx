import AuthNavigation from './AuthNavigation'
import React,{useEffect} from 'react'
import { NavigationContainer,useNavigation } from '@react-navigation/native'
import TabBar from "../navigations/Stacks/ClienteNavigation"
import * as Notifications from "expo-notifications";

export default function Wrapper({userToken}){
  return (
    <NavigationContainer>
      <AppNavigation userToken={userToken}/>
    </NavigationContainer>
  );
}

const AppNavigation = ({userToken}) => {


  return (
    <>
       {userToken==null ?  <AuthNavigation/> : <TabBar/>}
    </>
  )
}


