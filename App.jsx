import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "./src/Providers/AuthPRovider";
export default function App() {
  return (
    <RootSiblingParent>
    <AuthProvider />
  </RootSiblingParent>
  );
}


