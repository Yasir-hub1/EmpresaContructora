import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ObtenerPresupuesto, ObtenerServicio ,SumCostoTotalServicios} from '../../services/AuthService'
import CustonModal from '../../components/CustonModal';
import Toast from "react-native-root-toast";
const { height, width } = Dimensions.get('screen');



const Presupuestos = ({ route, navigation }) => {


  const { presupuesto_id } = route.params;
  

  const [Presupuesto, setPresupuesto] = useState([]);
  const [Servicos, setServicos] = useState([]);
  const [CostotalServicio, setCostotalServicio] = useState(null)
  const [refreshing, setRefreshing] = useState(false);

  // MODAL
  const [InfoModal, setInfoModal] = useState([]);
  const [visible, setVisible] = useState(false);

  const AbrirModal = () => {
    setVisible(true);
  };
  const CerrarModal = () => {
    setVisible(false);
  };
  /* FIN MODAL */

  //obteniendo datos del presupuesto
  useEffect(() => {
    (async () => {
      const _presupuesto = await ObtenerPresupuesto(presupuesto_id);
      // console.log("DESDE VISTA ", _presupuesto)
      setPresupuesto(_presupuesto)
     
    })()
  }, [])

  //obteniendo datos del SERVICIO
  useEffect(() => {
    (async () => {
      const _servicio = await ObtenerServicio(presupuesto_id);
      // console.log("DESDE VISTA _servicio", _servicio)
      setServicos(_servicio)

      // obteniendo el costo total del servicio

      const _costoTotalSer= await SumCostoTotalServicios(presupuesto_id)
      console.log("DESDE VISTA _costoTotalSer", _costoTotalSer)
      setCostotalServicio(_costoTotalSer);

    })()
  }, [Presupuesto])

  // Obtener suma de costos de los servicios



  //Actualizar datos de PRESUPUESO
  const onRefresh = async () => {

    setRefreshing(true);
    try {
      const _presupuesto = await ObtenerPresupuesto(presupuesto_id);
      setPresupuesto(_presupuesto);
      Toast.show("Cargando...");
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };




  return (
    <View style={{ flex: 1 }}>
      <ScrollView key={Presupuesto.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.containerView}
      >
        <View >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Presupuesto
            </Text>
          </View>

          <View style={styles.postContent}>

          <Text style={[styles.postDescription,{fontWeight:"bold"}]}>
             Realizado por : {Presupuesto.usuario}
            </Text>
            <Text style={styles.postDescription}>
              Descriopcion: {"\n"}{Presupuesto.descripcion}
            </Text>


            <Text style={styles.tags}>
              Precio: {CostotalServicio}
            </Text>


            {Servicos.length == 0 ?
              <Text style={styles.noServicio}
              >{"\n"}No hay servicios</Text>
              : <>

                <View style={{ marginTop: 25 }} />
                <TouchableOpacity style={styles.shareButton} onPress={() => { AbrirModal(); setInfoModal(Servicos) }} >
                  <Text style={styles.shareButtonText}>Servicios</Text>
                </TouchableOpacity>

              </>}
          </View>

        </View>
      </ScrollView>
      <Modal
        visible={visible}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={CerrarModal}
        altoModal={height - 280}
        info={InfoModal}

      />
    </View>


  );

}
function Modal(props) {

  const { height, width } = Dimensions.get('screen');

  const { visible, options, duration, onClose, altoModal, info } = props;
  console.log("DESDE INFO ", info);
  return (
    <CustonModal
      visible={visible}
      options={options}
      duration={duration}
      altoModal={altoModal}
      onClose={onClose}
    >
      <View style={{ padding: 5 }}>
        <View >

          <View>
            <TouchableOpacity onPress={onClose}>
              {/* <Text>cerrar</Text> */}
              <Image
                source={require('../../image/close.png')}
                style={[styles.CerrarModal, {
                  tintColor: '#222', width: 20,
                  height: (height - height) + 20,
                  right: (width / 2 - width) + 80,
                  top: 5,
                  zIndex: 250,
                }]}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              top: 10
            }}
          >
            <Text style={styles.headerTextPerfil}>Servicios{"\n"}</Text>

          </View>
          <View style={styles.separator} />
          <FlatList
            style={styles.root}
            data={info}
            extraData={info}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.container}>

                  <View style={styles.content}>
                    <View style={styles.contentHeader}>
                      <Text style={styles.tituloModal}>{item.nombre}</Text>

                    </View>
                    <Text rkType='primary3 mediumLine'>{item.descripcion} {"\n"}</Text>
                    <Text style={styles.time}>
                      Costo:{item.costo}
                    </Text>
                  </View>
                </View>
              );
            }} />



        </View>
      </View>
    </CustonModal>
  );
}
export default Presupuestos

const styles = StyleSheet.create({
  noServicio: {
    justifyContent: "center",
    alignSelf: "center",
    color: "#ffc72c",
    fontWeight: "bold",
  },
  /* CONTENIDO DEL MODAL */
  headerTextPerfil: {
    color: "#ffc72c",
    fontWeight: "bold",
    fontSize: 18
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    /* paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start' */
    flex: 1,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080",
    fontWeight: "bold",
  },
  tituloModal: {
    fontSize: 14,
    fontWeight: "bold",
  },
  /* FIN */
  containerView: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 25,
    alignItems: 'center',
    backgroundColor: "#f39c12",
    borderRadius: 50,
    margin: 5

  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: -15,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    color: '#f39c12',
    marginTop: 10,
  },
  date: {
    color: '#696969',
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#f39c12",
  },
  profile: {
    flexDirection: 'row',
    marginTop: 20
  },
  name: {
    fontSize: 22,
    color: "#f39c12",
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#f39c12",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  }
});