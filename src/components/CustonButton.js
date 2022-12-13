import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function CustomButton({ label, onPress, padding }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { padding: padding }]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fe5000',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
});
