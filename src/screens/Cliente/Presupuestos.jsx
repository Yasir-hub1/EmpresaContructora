import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Presupuestos = ({route,navigate}) => {
  console.log("PRESUPUESTO ",route.params)
  return (
    <View>
      <Text>Presupuestos</Text>
    </View>
  );
}

export default Presupuestos

const styles = StyleSheet.create({})