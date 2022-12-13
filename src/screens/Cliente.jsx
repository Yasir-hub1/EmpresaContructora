import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { logout } from "../services/AuthService";
import { useAuth, USER_KEY } from "../Providers/AuthPRovider";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
const Cliente = () => {
  const [user, setUser] = useState([]);
  /* Obteniendo datos del usuario */
  useEffect(() => {
    (async () => {
      const _user = await SecureStore.getItemAsync(USER_KEY);
      setUser(JSON.parse(_user));
    })();
  }, []);

  const { handleLogout } = useAuth();
  const _logout = async () => {
    try {
      await logout();
      await handleLogout();
      Toast.show("Hasta la proxima");
    } catch (e) {
      console.log("DESDE CIERR SESSION",e)
      Toast.show(e.message);
    }
  };
  return (
    <View>
      <Text>Cliente</Text>
      <TouchableOpacity onPress={() => _logout()}>
        <Text>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cliente;

const styles = StyleSheet.create({});
