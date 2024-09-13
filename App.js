import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

// Importar las pantallas de tu aplicación
import Homepage from './components/Homepage';
import LoginScreen from './components/LoginScreen';
import PerfilScreen from './components/PerfilScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login" // Define la primera pantalla que se mostrará al iniciar la aplicación
          screenOptions={{
            headerShown: false, // Puedes ocultar el encabezado para todas las pantallas si prefieres un diseño limpio
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Homepage} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          {/* Agrega más pantallas aquí según sea necesario */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}