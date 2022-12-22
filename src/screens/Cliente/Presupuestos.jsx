import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ObtenerPresupuesto, ObtenerServicio } from '../../services/AuthService'
import CustonModal from '../../components/CustonModal';

const { height, width } = Dimensions.get('screen');



const Presupuestos = ({ route, navigation }) => {

  const { presupuesto_id } = route.params;

  const [Presupuesto, setPresupuesto] = useState([]);
  const [Servicos, setServicos] = useState([]);

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
      console.log("DESDE VISTA ", _presupuesto)
      setPresupuesto(_presupuesto)

    })()
  }, [])

  //obteniendo datos del SERVICIO
  useEffect(() => {
    (async () => {
      const _servicio = await ObtenerServicio(presupuesto_id);
      console.log("DESDE VISTA _servicio", _servicio)
      setServicos(_servicio)

    })()
  }, [])


  console.log("PRESUPUESTO ", route.params)




  return (
    <View style={{ flex: 1 }}>
      <ScrollView key={Presupuesto.id}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Presupuesto
            </Text>
          </View>

          <View style={styles.postContent}>
            {/*  <Text style={styles.postTitle}>
            Estado:{Presupuesto.estado}
          </Text> */}
            <Text style={styles.postDescription}>
              {Presupuesto.descripcion}
            </Text>


            <Text style={styles.tags}>
              Precio: {Presupuesto.precio}

            </Text>



            <View style={{ marginTop: 25 }} />
            <TouchableOpacity style={styles.shareButton} onPress={() => { AbrirModal(); setInfoModal(Servicos) }} >
              <Text style={styles.shareButtonText}>Servicios</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      <Modal
        visible={visible}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={CerrarModal}
        altoModal={height - 380}
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
                  right: (width / 2 - width) + 90,
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
            <Text style={styles.headerTextPerfil}>Todos los Servicios{"\n"}</Text>

          </View>

          <FlatList
            style={styles.root}
            data={info}
            extraData={info}
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
                  {/*  <TouchableOpacity onPress={() => { }}>
                      <Image style={styles.image} source={{ uri: Notification.image }} />
                    </TouchableOpacity> */}
                  <View style={styles.content}>
                    <View style={styles.contentHeader}>
                      <Text style={styles.name}>{item.nombre}</Text>
                     {/*  <Text style={styles.time}>
                        9:58 am
                      </Text> */}
                    </View>
                    <Text rkType='primary3 mediumLine'>{item.descripcion}</Text>
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
  /* CONTENIDO DEL MODAL */
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
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
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
  /* FIN */
  container: {
    flex: 1,
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