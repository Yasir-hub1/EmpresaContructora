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
import React, { useState, useEffect } from 'react'
import { ObtenerInforme } from '../../services/AuthService';
import CustonModal from '../../components/CustonModal';

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

    /* obteniendo datos desde la API de contratos */
    useEffect(() => {
        (async () => {
            const _informe = await ObtenerInforme(id_proyecto);
            // console.log("GET _informe ", _informe);
            setInforme(_informe);
        })();
    }, []);


    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={Informe}
                horizontal={false}
                numColumns={2}
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
                                    <Text style={styles.name}>{item.Titulo}</Text>
                                    <Text style={styles.position}>{item.fecha}</Text>
                                    <TouchableOpacity style={styles.followButton} onPress={() =>{ AbrirModal();setInfoModal(item)}}>
                                        <Text style={styles.followButtonText}>Detalle</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />

            <Modal
                visible={visible}
                options={{ type: 'slide', from: 'top' }}
                duration={500}
                onClose={CerrarModal}
                altoModal={height - 380}
                info={InfoModal}
                
            />
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
            <View style={{padding:5}}>
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
                            <Text style={styles.headerTextPerfil}>{info.Titulo}{"\n"}</Text>
                           
                        </View>

                        <Text>Descripcion:</Text>
                        
                        <Text >{info.Descripcion}{"\n"}</Text>

                        <Text>Fecha:</Text>
                        
                        <Text >{info.fecha}</Text>


                    </ScrollView>
                </View>
            </View>
        </CustonModal>
    );
}
const styles = StyleSheet.create({
    
    headerTextPerfil: {
        paddingBottom: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        // color: Colors.primary,
      },
    CerrarModal: {

        color: "#ffc72c",
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
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
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
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
        backgroundColor: "#00BFFF",
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