import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import React, { useState, useEffect } from "react";
import { getContratos } from "../../services/AuthService";
import { USER_KEY } from "../../Providers/AuthPRovider";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";


const Contratos = ({ navigation }) => {

  const [User, setUser] = useState([]);
  const usuarioActual = JSON.stringify(User.id);
  const [Contratos, setContratos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  /* Obteniendo datos del usuario */
  useEffect(() => {
    (async () => {
      const _user = await SecureStore.getItemAsync(USER_KEY);
      setUser(JSON.parse(_user));
    })();
  }, []);

  /* obteniendo datos desde la API de contratos */
  useEffect(() => {
    (async () => {
      const _contratos = await getContratos();
      // console.log("GET CONTRATOS ", _contratos);
      setContratos(_contratos);
    })();
  }, []);

  //Actualizar datos de contratos
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const _contratos = await getContratos();
      setContratos(_contratos);
      Toast.show("Cargando...");
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1 }} >
      <FlatList
        extraData={Contratos}
        data={Contratos}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item, index }) => {
          return (
            <View>
              {item.cliente_id == usuarioActual ? <>
                <TouchableOpacity key={index}>
                  <View style={styles.row}>
                    <Image source={require('../../image/contrato.png')} style={styles.pic} />
                    <View>
                      <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.nombre}</Text>

                      </View>
                      <View style={styles.msgContainer}>
                        {/* <Text style={styles.msgTxt}>{item.status}</Text> */}
                        <TouchableOpacity  style={{ left: 35 }} onPress={()=>navigation.navigate("Doc",{id_contrato:item.id})}>
                          <Image source={require('../../image/pdf.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                        <TouchableOpacity  style={{ left: 55 }} onPress={()=>navigation.navigate("Proy",{proyecto_id:item.proyecto_id})}>
                          <Image source={require('../../image/proyecto.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                        <TouchableOpacity  style={{ left: 75 }} onPress={()=>navigation.navigate("Pre",{presupuesto_id:item.presupuesto_id})}>
                          <Image source={require('../../image/presupuesto.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              </> : null}

            </View>
          );
        }}
      />
    </View>
  );
};

export default Contratos;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    // right:150
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});