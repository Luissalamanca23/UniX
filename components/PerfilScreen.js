// src/components/PerfilScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Avatar, Divider, List, Button, Card } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

const PerfilScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const usuario = route.params?.usuario; // Obtener el usuario de los parámetros de navegación

  return (
    <ScrollView style={styles.container}>
      {/* Header con imagen de fondo */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placehold.co/600x200' }}
          style={styles.headerBackground}
        />
        <Avatar.Image
          size={100}
          source={{ uri: 'https://placehold.co/100x100' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{usuario?.nombre || 'Usuario'}</Text>
        <Text style={styles.email}>{usuario?.email || 'email@example.com'}</Text>
      </View>

      {/* Información Personal */}
      <Card style={styles.card}>
        <Card.Title title="Información Personal" />
        <Card.Content>
          <List.Item
            title="Nombre de Usuario"
            description={usuario?.nombre || 'Usuario'}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <Divider />
          <List.Item
            title="Correo Electrónico"
            description={usuario?.email || 'email@example.com'}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
        </Card.Content>
      </Card>

      {/* Gamificación */}
      <Card style={styles.card}>
        <Card.Title title="Gamificación" />
        <Card.Content>
          <List.Item
            title="Nivel"
            description={`Nivel ${usuario?.nivel || 1}`}
            left={(props) => <List.Icon {...props} icon="star" />}
          />
          <Divider />
          <List.Item
            title="Puntos"
            description={`${usuario?.puntos || 0} puntos`}
            left={(props) => <List.Icon {...props} icon="trophy" />}
          />
        </Card.Content>
      </Card>

      {/* Configuraciones de la Cuenta */}
      <Card style={styles.card}>
        <Card.Title title="Configuraciones de la Cuenta" />
        <Card.Content>
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
        </Card.Content>
      </Card>
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
    backgroundColor: '#4A90E2',
    paddingBottom: 30,
    marginBottom: 20,
  },
  headerBackground: {
    width: '100%',
    height: 120,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  avatar: {
    marginTop: 70,
    borderWidth: 3,
    borderColor: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#d1d1d1',
  },
  card: {
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
  },
  button: {
    marginVertical: 10,
  },
});

export default PerfilScreen;