import axios from "../Utils/Axios";
import errorHandler from "../Utils/AxiosErrorHandler";
import { useAuth, USER_KEY } from "../Providers/AuthPRovider";



export async function getClientes(){
    try{
        let {data}=await axios.get("fotoClientes");
        // console.log(data);
        return data.data;
    }catch(e){
        throw errorHandler(e);

    }
}

//METODO PARA LAS FOTOS RECONOCIDAS DEL CLIENTE
export async function getFotoRekognition(){
    try{
        let {data}=await axios.get("fotoRekognition");
        // console.log('desde la function inicial ',data);
        return data.data;
    }catch(e){
        throw errorHandler(e);

    }
}



