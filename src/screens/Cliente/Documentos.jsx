import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  RefreshControl,
  Linking,
  Button
} from "react-native";

import React, { useState, useEffect,useCallback } from "react";
import { getDocumento } from "../../services/AuthService";

import CustomButton from "../../components/CustonButton";
import * as DocumentPicker from "expo-document-picker";

import Toast from "react-native-root-toast";

const Documentos = ({ route, navigation }) => {
  const { id_contrato } = route.params;

  const [User, setUser] = useState([]);
  const usuarioActual = JSON.stringify(User.id);
  const [Documento, setDocumento] = useState([]);
  const [showDateModal, setShowDateModal] = useState();
  const [refreshing, setRefreshing] = useState(false);

  /* obteniendo datos desde la API de Documentos */
  useEffect(() => {
    (async () => {
      const _documento = await getDocumento();
      // console.log("GET _documento ", _documento);
      setDocumento(_documento);
    })();
  }, []);

  const [doc, setDoc] = useState({});
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        console.log(fileToUpload, "...............file");
        setDoc(fileToUpload);
        Toast.show("Enviando documento...");
      }
    });
    // console.log(result);
    console.log("Doc: " + doc.uri);
  };

 useEffect(() => {
  const postDocument = () => {
    const url = "https://insucons.website/api/documentos";
    const fileUri = doc.uri;
 
    const formData = new FormData();
    formData.append("document", doc);
    formData.append("id_contrato", id_contrato);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);

    fetch(url, options).catch((error) => console.log(error) );
  };
  postDocument();
 }, [doc])

//Actualizar datos de DOCUEMNTO
const onRefresh = async () => {
  setRefreshing(true);
  try {
    const _documento = await getDocumento();
    setDocumento(_documento);
    Toast.show("Cargando...");
 
  } catch (error) {
    console.error(error);
  } finally {
    setRefreshing(false);
  }
};

  
 //Abrir PDF y DESCARGAR
 const OpenURLButton = ({ Url, children }) => {
  const handlePress = useCallback(async () => {
    
    const supported = await Linking.canOpenURL(Url);

    if (supported) {
      
      await Linking.openURL(Url);
    } else {
      Alert.alert(`No es un link valido: ${Url}`);
    }
  }, [Url]);
  
  return <Button title={children} onPress={handlePress} />;
};
 

  return (
    <View style={styles.container}>
      <View style={{justifyContent:"center",alignSelf:"center",marginBottom:-20}}>
        <CustomButton
          label={"Subir Documento"}
          padding={10}
          onPress={pickDocument}
        />

      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={Documento}
        horizontal={false}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <View>
              {item.contrato_id == id_contrato ? (
                <>
                  <TouchableOpacity
                    style={[styles.card, { backgroundColor: "#87CEEB" }]}
                    // onPress={() => { navigation.navigate("Pdf",{url:item.URL}) }}
                  >
                     <OpenURLButton Url={item.URL}>Ver</OpenURLButton>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: "https://img.icons8.com/dusk/70/000000/checklist.png",
                      }}
                    />
                  </TouchableOpacity>

                  <View style={styles.cardHeader}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Text style={[styles.title, { color: "#87CEEB" }]}>
                        {item.Titulo}
                      </Text>
                    </View>

                  </View>
                </>
              ) : null}


            </View>
          );
        }}
      />
     <View style={{marginBottom:50}}/>
    </View>
  )
};

export default Documentos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#474747",
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
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 12,
    flex: 1,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
