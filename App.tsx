import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import Navigation from "./app/navigation/Navigation";
import Header from "./app/Componets/Header";

export default function App() {
    return (
        <>
            <SafeAreaProvider>
            <Navigation />
            </SafeAreaProvider>
            <StatusBar style='light'/>
        </>
    );
}
