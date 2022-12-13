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
} from "react-native";

import React, { useState, useEffect } from "react";
import { getContratos } from "../../services/AuthService";
import { USER_KEY } from "../../Providers/AuthPRovider";
import * as SecureStore from "expo-secure-store";

const Contratos = ({navigation}) => {

  const [User, setUser] = useState([]);
  const usuarioActual = JSON.stringify(User.id);
  const [Contratos, setContratos] = useState([]);

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
      console.log("GET CONTRATOS ", _contratos);
      setContratos(_contratos);
    })();
  }, []);

  return (
    
    <View style={styles.container}>
      
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={Contratos}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item,index}) => {
          return (
            <View>
              {item.cliente_id==usuarioActual ?<>
            <TouchableOpacity style={styles.card}>
                <Image style={styles.image} source={{ uri:"https://img.icons8.com/color/100/000000/find-matching-job.png" }} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.nombre}</Text>
                {/* <Text style={styles.count}>{index}</Text> */}
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={()=>navigation.navigate("Doc",{id_contrato:item.id})}
                >
                  <Text style={styles.followButtonText}>Ver</Text>
                </TouchableOpacity>
              </View>
             
          
             
            </TouchableOpacity>
            </> 
            :null}
            </View>
            
          );
        }}
      />
    </View>
  );
};

export default Contratos;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#6666ff",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
});
