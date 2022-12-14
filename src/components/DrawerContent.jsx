import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Icon } from "react-native-elements";
import { logout } from "../services/AuthService";
import { useAuth, USER_KEY } from "../Providers/AuthPRovider";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";

export default function DrawerContent(props) {
  const [user, setUser] = useState([]);

  /* Obteniendo datos del usuario */
  useEffect(() => {
    (async () => {
      const _user = await SecureStore.getItemAsync(USER_KEY);
      setUser(JSON.parse(_user));
    })();
  }, []);

  const { handleLogout } = useAuth();

  /* funcion de cierre de sesion */
  const _logout = async () => {
    try {
      await logout();
      await handleLogout();
      Toast.show("Hasta la proxima");
    } catch (e) {
      Toast.show(e.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfo}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar
                rounded
                size="medium"
                source={require("../image/fotoMe.jpg")}
              />

              {user && (
                <View style={{ marginLeft: 15, marginTop: 15 }}>
                  <Text style={styles.tittle}>{user.name}</Text>
                  <Text style={styles.subTitle}>{user.email}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.drawItem}>
           {/*  <DrawerItem
              label="Mis fotos"
              onPress={() => props.navigation.navigate("Cliente")}
              icon={({ color, size }) => (
                <Icon name="image-outline" color={color} size={size} type="ionicon" />
              )}
            /> */}

            <DrawerItem
              label="Contratos"
              onPress={() => props.navigation.navigate("Contratos")}
              icon={({ color, size }) => (
                <Icon name="albums" color={color} size={size} type="ionicon" />
              )}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View  style={styles.btnDrawerItem}>
        <DrawerItem
        label="Cerrar sesion"
        onPress={()=>_logout()}
        icon={({ color, size }) => (
            <Icon name="exit-outline" color={color} size={size} type="ionicon" />
        )}
        
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfo: {
    paddingLeft: 20,
  },
  tittle: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',

  },
  subTitle: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawItem: {
    marginTop: 15,
  },
  btnDrawerItem: {
    marginBottom: 10,
    borderTopColor: "#ddd5d5",
    borderTopWidth: 1,
  },
});
