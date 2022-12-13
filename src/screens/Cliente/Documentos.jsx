import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";

import React, { useState, useEffect } from "react";
import { getDocumento } from "../../services/AuthService";
import { USER_KEY } from "../../Providers/AuthPRovider";
import * as SecureStore from "expo-secure-store";
import CustomButton from "../../components/CustonButton";
const Documentos = ({ route, navigation }) => {
  const { id_contrato } = route.params;

  const [User, setUser] = useState([]);
  const usuarioActual = JSON.stringify(User.id);
  const [Documento, setDocumento] = useState([]);

  /* obteniendo datos desde la API de Documentos */
  useEffect(() => {
    (async () => {
      const _documento = await getDocumento();
      console.log("GET _documento ", _documento);
      setDocumento(_documento);
    })();
  }, []);



  return (
   
    <View style={styles.container}>
       <View>
       <CustomButton label={"Subir documento"} padding={12}/>
       </View>
      <FlatList style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={Documento}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <View>
              {item.contrato_id == id_contrato ? <>
                <TouchableOpacity style={[styles.card, { backgroundColor: "#87CEEB" }]}>
                  <Image style={styles.cardImage} source={{ uri: "https://img.icons8.com/dusk/70/000000/checklist.png" }} />
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.title, { color: "#87CEEB" }]}>{item.Titulo}</Text>
                  </View>
                </View>
              </>

                : null}

            </View>
          )
        }} />
    </View>
  );
};

export default Documentos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: 'center'
  },
  /******** card **************/
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#e2e2e2",
    //flexBasis: '42%',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardHeader: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: 'center'
  },
  title: {
    fontSize: 12,
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
});        
