import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
const VerPDF = ({route, navigation}) => {
    const { url } = route.params;
    console.log("DESDE  VER PDF ", `"${url}"`)
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri:JSON.stringify(`"${url}"`) }}
   /*    contentMode={"desktop"} */
      mixedContentMode={"always"}
      textZoom={100}
    />
  )
}

export default VerPDF

