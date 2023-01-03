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
    Button
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ObtenerInforme } from '../../services/AuthService';
import CustonModal from '../../components/CustonModal';
import Toast from "react-native-root-toast";
const { height, width } = Dimensions.get('screen');

const Informe = ({ route, navigation }) => {

    let id_proyecto = route.params;

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


    const [Informe, setInforme] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    /* obteniendo datos desde la API de INFORMES */
    useEffect(() => {
        (async () => {
            const _informe = await ObtenerInforme(id_proyecto);
            // console.log("GET _informe ", _informe);
            setInforme(_informe);
        })();
    }, []);

    //Actualizar datos de INFORME
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const _informe = await ObtenerInforme(id_proyecto);
            setInforme(_informe);
            Toast.show("Cargando...");
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };


    return (

        <View style={styles.container}>
            {Informe.length != 0 ? <>
                <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={Informe}
                    horizontal={false}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card} >
                                <View style={styles.cardHeader}>
                                    <Image style={styles.icon} source={require('../../image/info.png')} />
                                </View>
                                <Image style={styles.userImage} source={require('../../image/informe.png')} />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.name}>{item.titulo}</Text>
                                        <Text style={styles.position}>{item.fecha}</Text>
                                        <TouchableOpacity style={styles.followButton} onPress={() => { AbrirModal(); setInfoModal(item) }}>
                                            <Text style={styles.followButtonText}>Detalle</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                <View style={{ marginBottom: 50 }} />

                <Modal
                    visible={visible}
                    options={{ type: 'slide', from: 'top' }}
                    duration={500}
                    onClose={CerrarModal}
                    altoModal={height - 380}
                    info={InfoModal}

                />
            </> : <Text style={styles.noInforme}>No hay informes {"\n"} </Text>

            }

        </View>




    )
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
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ paddingHorizontal: -20 }}>
                        {/* <View style={{ width: '100%', right: -170 }}> */}
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
                            <Text style={styles.headerTextPerfil}>{info.titulo}{"\n"}</Text>

                        </View>

                        <Text style={styles.SubtitleModal}>Descripcion:</Text>

                        <Text >{info.descripcion}{"\n"}</Text>

                        <Text style={styles.SubtitleModal}>Fecha:</Text>

                        <Text >{info.fecha}</Text>


                    </ScrollView>
                </View>
            </View>
        </CustonModal>
    );
}
const styles = StyleSheet.create({
    /* SUB TITULO PARA EL MODAL */
    SubtitleModal: {
      fontWeight: 'bold',
      fontSize:15,
    },
    /* FIN */
    /* para texto de no hay informes */
    noInforme: {
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 18,
        fontWeight: "bold",
        top:-60
    },
    /* fin */
    headerTextPerfil: {
        paddingBottom: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: "#ffc72c",
    },
    CerrarModal: {

        color: "#ffc72c",
    },
    container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: "#ffffff",
    },
    listContainer: {
        alignItems: 'center'
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1.57,
        shadowRadius: 8.49,
        elevation: 20,

        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
        borderRadius:20,
        borderColor: "#f1f2f6",
        borderWidth:2
    },
    cardFooter: {
        paddingVertical: 17,
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: 'center',
        borderColor: "#DCDCDC",
        borderWidth: 3,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#008080",
        fontWeight: 'bold'
    },
    position: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#696969"
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#ffc72c",
    },
    followButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    icon: {
        height: 20,
        width: 20,
    }
});
export default Informe