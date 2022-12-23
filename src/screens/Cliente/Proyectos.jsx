import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity ,  RefreshControl,} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ObtenerProyecto } from '../../services/AuthService'
import Toast from "react-native-root-toast";

const Proyectos = ({ route, navigation }) => {

  const { proyecto_id } = route.params

  const [Proyecto, setProyecto] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  /* Envia el id del proyecto para traer datos */
  useEffect(() => {
    (async () => {
      const _proyectos = await ObtenerProyecto(proyecto_id);
      // console.log("GET _proyectos ", _proyectos);
      setProyecto(_proyectos);
    })();
  }, []);



  function cambiarColorEstado(estado) {
    if (estado == 'En ejecución') {
      return <Text style={{ color: "#2ecc71" }}>{estado}</Text>
    } else {
      return <Text style={{ color: "#e74c3c" }}>{estado}</Text>

    }

  }

    //Actualizar datos de Proyectos
    const onRefresh = async () => {
      setRefreshing(true);
      try {
        const _proyectos = await ObtenerProyecto(proyecto_id);
        setProyecto(_proyectos);
        Toast.show("Cargando...");
      } catch (error) {
        console.error(error);
      } finally {
        setRefreshing(false);
      }
    };


  return (
    <ScrollView key={Proyecto.id} 
    contentContainerStyle={styles.container} 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        
      />
    }
    >
      <View >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {Proyecto.nombre}
          </Text>
        </View>

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>
            Estado:{cambiarColorEstado(Proyecto.estado)}
          </Text>


          <Text style={styles.tags}>
            Ubicacion: {Proyecto.ubicacion}

          </Text>

          <Text style={styles.date}>
            Fecha de inicio: {Proyecto.fecha_inicio} {"\n"}
            Fecha Fin: {Proyecto.fecha_fin}


          </Text>

          <View style={{ marginTop: 25 }} />
          <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate("Info", Proyecto.id)} >
            <Text style={styles.shareButtonText}>Ver informes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Proyectos

const styles = StyleSheet.create({
  container: {
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