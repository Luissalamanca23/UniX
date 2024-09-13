// src/components/PerfilScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Avatar, Divider, List, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

const PerfilScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const usuario = route.params?.usuario; // Obtener el usuario de los parámetros de navegación

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image size={80} source={{ uri: 'https://placehold.co/100x100' }} />
        <Text style={styles.username}>{usuario?.nombre || 'Usuario'}</Text>
        <Text style={styles.email}>{usuario?.email || 'email@example.com'}</Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <List.Item
          title="Nombre de Usuario"
          description={usuario?.nombre || 'Usuario'}
          left={(props) => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="Correo Electrónico"
          description={usuario?.email || 'email@example.com'}
          left={(props) => <List.Icon {...props} icon="email" />}
        />
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gamificación</Text>
        <List.Item
          title="Nivel"
          description={`Nivel ${usuario?.nivel || 1}`}
          left={(props) => <List.Icon {...props} icon="star" />}
        />
        <List.Item
          title="Puntos"
          description={`${usuario?.puntos || 0} puntos`}
          left={(props) => <List.Icon {...props} icon="trophy" />}
        />
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuraciones de la Cuenta</Text>
        <Button
          mode="contained"
          onPress={() => Alert.alert("Función no implementada", "Próximamente podrás editar tu perfil.")}
          style={styles.button}
        >
          Editar Perfil
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            // Aquí podrías implementar el manejo de cerrar sesión
            navigation.navigate('Login');
          }}
          style={styles.button}
        >
          Cerrar Sesión
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  divider: {
    marginVertical: 10,
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
  },
  button: {
    marginTop: 15,
    marginHorizontal: 10,
  },
});

export default PerfilScreen;