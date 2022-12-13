import { View, StyleSheet, alert } from "react-native";
import React, { useState } from "react";
import { Text, Button, Image } from "react-native-elements";
import Toast from "react-native-root-toast";

import { ActivityLoader, ErrorText } from "../../components/Shared";
import { useForm } from "react-hook-form";
import { EmailInput, PasswordInput, TextInput } from "../../components/Inputs";


/* importando metodo de Autenticacion para el registro de usuario */
import  {signup1}  from "../../services/AuthService";


const Signup = ({ navigation }) => {


  const [Error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  // proteccion de contraseña
  const [secureEntry, setSecureEntry] = useState(true);
  const [secureConfirmationEntry, setSecureConfirmationEntry] = useState(true);
  /* Errores de formulario */
  const {control,handleSubmit,formState: { errors }} = useForm();



  //TODO: REGISTRAR USUARIO
  const _Signup = async(data) => {
  
    try{
      
      setloading(true);
      const message=await signup1(data);
     
      await navigation.navigate("Login");
      Toast.show(message,{});

    }catch(e){

     setError(e.message);

    }finally{

      setloading(false);
    }
    console.log("Enviando datos");
  };

  /* proteccion de contrasenia */
  const toggleSecureEntry = () => {
    setSecureEntry(!secureEntry);
  };
  const toggleSecureConfirmationEntry = () => {
    setSecureConfirmationEntry(!secureConfirmationEntry);
  };

  return (
    <View style={styles.container}>
      {loading === true ? <ActivityLoader /> : null}

      <Image
        style={{ width: 100, height: 100, marginBottom: 20,borderRadius:20 }}
        source={require("../../image/fotoMe.jpg")}
      />

      <Text h2>Registrate</Text>

      <ErrorText error={Error} />

      <TextInput
      placeholder="Nombre de usuario"
        name="name"
        minLength={2}
        maxLength={20}
        iconName="person-outline"
        control={control}
        errors={errors}
        errValiStyle={styles.errorValidacion}
        inputStyle={styles.input}
      />

      <EmailInput
      placeholder="Ingrese su correo"
        name="email"
        control={control}
        errors={errors}
        errValiStyle={styles.errorValidacion}
        inputStyle={styles.input}
      />

      <PasswordInput
      placeholder="Contraseña"
        name="password"
        control={control}
        errors={errors}
        errValiStyle={styles.errorValidacion}
        inputStyle={styles.input}
        secureEntry={secureEntry}
        toggleSecureEntry={toggleSecureEntry}
      />

      {/* CONFIRMACION DE PASSWORD */}
      <PasswordInput
        name="passwordConfirmation"
        placeholder="Confirmar contraseña"
        control={control}
        errors={errors}
        errValiStyle={styles.errorValidacion}
        inputStyle={styles.input}
        secureEntry={setSecureConfirmationEntry}
        toggleSecureEntry={toggleSecureConfirmationEntry}
      />

      <Button title="Registar" type="outline" onPress={handleSubmit(_Signup)} titleStyle={{color:"#70a1ff"}} />
      <View style={{marginBottom:5}}/>
      <Text onPress={()=>navigation.navigate('Login')}>Ya tienes una cuenta?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#2570e3",
    // fontFamily:'$400Regular',
    fontWeight: "600",
    fontSize: 24,
  },
  errorValidacion: {
    color: "#dd3333",
    fontSize: 12,
  },
  input: {
    color: "#000000",
  },
});

export default Signup;
