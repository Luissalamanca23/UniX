import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TextInput } from 'react-native';
import { Avatar, Divider, List, Button, Card, Modal, Portal, Provider } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

const PerfilScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(route.params?.usuario); // Obtener el usuario de los parámetros de navegación
  const [mostrarModalEditarPerfil, setMostrarModalEditarPerfil] = useState(false); // Estado para mostrar el modal de edición de perfil

  // Función para solicitar cambio de sede o institución
  const solicitarCambio = () => {
    Alert.alert(
      "Solicitud de Cambio",
      "Te enviaremos un correo para revisar tu solicitud de cambio. Nuestro equipo procesará la solicitud y te informaremos del resultado."
    );
  };

  // Función para abrir el modal de edición de perfil
  const abrirModalEditarPerfil = () => {
    setMostrarModalEditarPerfil(true);
  };

  // Función para cerrar el modal de edición de perfil
  const cerrarModalEditarPerfil = () => {
    setMostrarModalEditarPerfil(false);
  };

  return (
    <Provider>
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
            <Divider />
            <List.Item
              title="Institución"
              description={usuario?.institucion || 'No especificada'}
              left={(props) => <List.Icon {...props} icon="school" />}
            />
            <Divider />
            <List.Item
              title="Sede"
              description={usuario?.sede || 'No especificada'}
              left={(props) => <List.Icon {...props} icon="map-marker" />}
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
              onPress={abrirModalEditarPerfil}
              style={styles.button}
            >
              Editar Perfil
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={styles.button}
            >
              Cerrar Sesión
            </Button>
          </Card.Content>
        </Card>

        {/* Modal para editar perfil */}
        <Portal>
          <Modal
            visible={mostrarModalEditarPerfil}
            onDismiss={cerrarModalEditarPerfil}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            {/* Campos de edición del perfil */}
            <TextInput
              value={usuario?.nombre}
              onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
              style={styles.input}
              placeholder="Nombre de Usuario"
              placeholderTextColor="#666"
            />

            {/* Mostrar solo la institución y sede, pero no permitir su edición */}
            <TextInput
              value={usuario?.institucion}
              editable={false}
              style={styles.input}
              placeholder="Institución"
              placeholderTextColor="#666"
            />
            <TextInput
              value={usuario?.sede}
              editable={false}
              style={styles.input}
              placeholder="Sede"
              placeholderTextColor="#666"
            />

            {/* Botón para solicitar cambio de sede o institución */}
            <Button
              mode="outlined"
              onPress={solicitarCambio}
              style={styles.button}
            >
              Solicitar Cambio de Sede o Institución
            </Button>

            <Button mode="contained" onPress={cerrarModalEditarPerfil} style={styles.modalButton}>
              Guardar Cambios
            </Button>
          </Modal>
        </Portal>
      </ScrollView>
    </Provider>
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
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4A90E2',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#4A90E2',
  },
});

export default PerfilScreen;