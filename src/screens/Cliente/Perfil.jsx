import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { logout ,CountContrato,CountDocumentos,CountInformes} from "../../services/AuthService";
import { useAuth, USER_KEY } from "../../Providers/AuthPRovider";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";

const Perfil = () => {
  const [user, setUser] = useState([]);
  const [TotalContrato, setTotalContrato] = useState([]);
  const [TotalDocumentos, setTotalDocumentos] = useState([]);
  const [TotalInformes, setTotalInformes] = useState([]);


  /* Obteniendo datos del usuario */
  useEffect(() => {
    (async () => {
      const _user = await SecureStore.getItemAsync(USER_KEY);
      setUser(JSON.parse(_user));
      console.log("user",_user)
    })();
  }, []);

  // obteniendo total de contratos ,documentos,informes

  useEffect(() => {
   (async()=>{

    // controtos
    const _totalContrato=await CountContrato();
    console.log("DESDE LA VISTA",_totalContrato)
    setTotalContrato(_totalContrato);

    // documentos
    const _totalDocumentos=await CountDocumentos();
    console.log("DESDE LA doc",_totalDocumentos)
    setTotalDocumentos(_totalDocumentos);

    // informes
    const _totalInformes=await CountInformes();
    console.log("DESDE LA _totalInformes",_totalInformes)
    setTotalInformes(_totalInformes);
     
   })()
  }, [])
  

  const { handleLogout } = useAuth();
  const _logout = async () => {
    try {
      await logout();
      await handleLogout();
      Toast.show("Hasta la proxima");
    } catch (e) {
      console.log("DESDE CIERR SESSION",e)
      Toast.show(e.message);
    }
  };

  return (
    <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <Text style={styles.name}>
                 {user.name}
                </Text>
                
            </View>
          </View>

          <View style={styles.profileDetail}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Contratos</Text>
              <Text style={styles.count}>{TotalContrato}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Documentos</Text>
              <Text style={styles.count}>{TotalDocumentos}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Informes</Text>
              <Text style={styles.count}>{TotalInformes}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => _logout()}>
                <Text style={{color:"#ffffff"}}>Cerrar sesion</Text>  
              </TouchableOpacity> 
              
            </View>
        </View>
      </View>
    );
};


export default Perfil;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#ff6348",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:200,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    margin:10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:15,
    color: "#ff6348"
  },
  count:{
    fontSize:16,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:40
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#ff6348",
    

  },
  
});
