import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Text, Button, Image,Avatar } from "react-native-elements";
import Toast from "react-native-root-toast";

import { ActivityLoader, ErrorText } from "../../components/Shared";
import { useForm } from "react-hook-form";
import { EmailInput, PasswordInput } from "../../components/Inputs/index";
/* importando useAuth para el login */
import { useAuth } from "../../Providers/AuthPRovider";
import { login } from "../../services/AuthService";



const Login = ({navigation}) => {
  const [Error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const {handleLogin}=useAuth();
  // proteccion de contraseña
  const [secureEntry, setSecureEntry] = useState(true);
   
  /* Errores de formulario */
  const { control, handleSubmit,formState: { errors }} = useForm();

  //TODO: Iniciar sesion

  const login1 = async (data) => {
    try{
      setloading(true);
      const response=await login(data);
      await handleLogin(response.data);
      Toast.show(response.message);

    }catch(e){
      setError(e.message);
      setloading(false);
    }
  };





  /* proteccion de contrasenia */

  const toggleSecureEntry = () => {
    setSecureEntry(!secureEntry);
  };



  return (
    <View style={styles.container}>
      {loading === true ? <ActivityLoader /> : null}

      <Image
        style={{ width: 100, height: 100, marginBottom: 20,borderRadius:20 }}
        source={require("../../image/fotoMe.jpg")}
      />
    

      <Text h4>Inicio de sesion</Text>

      <ErrorText error={Error} />

      <EmailInput
      placeholder="Correo"
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

      <Button
      title="Acceder"
      type="outline"
      onPress={handleSubmit(login1)}
      titleStyle={{color:"#70a1ff"}}   
      />
         <View style={{marginBottom:10}}/>
      <Text onPress={()=>navigation.navigate('Signup')} >Registrar </Text>
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

export default Login;
