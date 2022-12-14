import axios from "../Utils/Axios";
import { Platform } from "react-native";
import { setItemAsync, deleteItemAsync } from "expo-secure-store";
import { USER_TOKEN_KEY, USER_KEY } from "../Providers/AuthPRovider";

import errorHandler from "../Utils/AxiosErrorHandler";

/* FUNCION PARA INICIAR SESION CON DATOS DE LA API */
export async function login(data) {
    try {
        data.device_name = Platform.OS;
        /* peticion a la API */
        let res = await axios.post("login", data);

        // console.log("DESDE LOGIN FUNCTION "+ JSON.stringify(res.data.data.cliente));
        await setItemAsync(USER_TOKEN_KEY, res.data.data.token);
        await setItemAsync(USER_KEY, JSON.stringify(res.data.data.cliente));// respuesta del server
        return res.data;
    } catch (e) {
        console.log("desde login",e);
        throw errorHandler(e);
    }

}
/* function para crear la cuenta */
export async function signup1(data) {
    // console.log(data);
    try {
        // console.log("entrando");
        let res = await axios.post("signup", data);

        return res.data.message;
    } catch (e) {
        console.log(e);
        throw errorHandler(e);

    }

}

/* ELIMINA EL TOKEN DE USUARIO AL CERRAR SESION */
export async function logout() {
    try {
        let res = await axios.post("logout");
        await deleteItemAsync(USER_TOKEN_KEY);
        await deleteItemAsync(USER_KEY);
        return res.data;
    } catch (e) {
        throw errorHandler(e);
    }

}

//OBTENER CONTRATOS ESFECIFICOS DEL CLIENTE

export async function getContratos() {
    try {
        let { data } = await axios.get("contracto");
        // console.log(data);
        return data.data;
    } catch (e) {
        throw errorHandler(e);

    }
}

export async function getDocumento() {
    try {
        let { data } = await axios.get("documento");
        // console.log("getDOC ",data);
        return data.data;
    } catch (e) {
        throw errorHandler(e);

    }

}

// Obteniendo datos del proyecto por ID
export async function ObtenerProyecto(id) {
    try {
        let res = await axios.post("ObtenerProyecto", { "id_proyecto": id });
          console.log("GET PROYECT ", res.data.data);
        /* console.log("GET id ", id); */

        return res.data.data;
    } catch (e) {
        throw errorHandler(e);

    }


}


// Obteniendo informes por ID
export async function ObtenerInforme(id_proyecto) {
    try {
        let res = await axios.post("ObtenerInforme", { "id_informe": id_proyecto });


        return res.data.data;
    } catch (e) {
        throw errorHandler(e);

    }

}


// Obtener presupuesto : ENVIANDO ID DE PRESUPUESTO
export async function ObtenerPresupuesto(id_presupuesto) {
    try {
        let res = await axios.post("ObtenerPresupuesto", { "id_presupuesto": id_presupuesto });

        return res.data.data;
    } catch (e) {
        throw errorHandler(e);
    }

}

// Obtener LOS servicio por un ID de PRESUPUESTO

export async function ObtenerServicio(id_presupuesto) {
    try {
        let res = await axios.post("ObtenerServicio", { "id_presupuesto": id_presupuesto });

        return res.data.data
    } catch (e) {
        throw errorHandler(e);
    }

}


// obteniendo el total de contratos del usuario

export async function CountContrato() {

    try {
        let res = await axios.get("CountContrato");

        return res.data.data
    } catch (e) {
        throw errorHandler(e);
    }

}

// obteniendo el total de DOCUMENTOS del usuario

export async function CountDocumentos() {

    try {
        let res = await axios.get("CountDocumentos");

        return res.data.data
    } catch (e) {
        throw errorHandler(e);
    }

}


// obteniendo el total de INFORMES del usuario

export async function CountInformes() {

    try {
        let res = await axios.get("CountInformes");

        return res.data.data
    } catch (e) {
        throw errorHandler(e);
    }

}


export async function SumCostoTotalServicios(id_presupuesto) {
    try {
        let res = await axios.post('SumCostoTotalServicios', { "id_presupuesto": id_presupuesto })

        return res.data.data;
    } catch (e) {
        throw errorHandler(e);
    }
}



