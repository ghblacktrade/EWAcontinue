import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import Navigation from "./app/navigation/Navigation";
import Header from "./app/Componets/Header";
import AuthProvider from './app/providers/AuthProvider'


export default function App() {
    return (
        <>
            <AuthProvider>
                <SafeAreaProvider>
                    <Navigation />
                </SafeAreaProvider>
            </AuthProvider>
            <StatusBar style='light'/>
        </>
    );
}
