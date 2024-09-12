import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Provider, Snackbar, Button } from 'react-native-paper';

// Cargar los datos de usuarios desde el archivo JSON
const usuariosData = require('../usuarios.json'); // Ajusta la ruta según tu estructura de carpetas

const LoginScreen = () => {
  const navigation = useNavigation();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [mostrarModalCambioContraseña, setMostrarModalCambioContraseña] = useState(false);
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarNuevaContraseña, setConfirmarNuevaContraseña] = useState('');

  // Función para manejar el inicio de sesión
  const manejarInicioSesion = () => {
    if (nombreUsuario === '' || contraseña === '') {
      setMensajeAlerta('Por favor, ingresa tu nombre de usuario y contraseña.');
      setMostrarAlerta(true);
      return;
    }

    // Buscar el usuario en los datos cargados
    const usuario = usuariosData.usuarios.find(
      (user) => user.nombre.toLowerCase() === nombreUsuario.toLowerCase()
    );

    if (usuario && usuario.contraseña === contraseña) {
      setMensajeAlerta('Inicio de sesión exitoso. ¡Bienvenido!');
      setMostrarAlerta(true);
      setTimeout(() => {
        navigation.navigate('Home'); // Asegúrate de que 'Home' esté registrado
      }, 1500);
    } else {
      setMensajeAlerta('Nombre de usuario o contraseña incorrectos.');
      setMostrarAlerta(true);
    }
  };

  // Función para manejar el cambio de contraseña
  const manejarCambioContraseña = () => {
    if (contraseñaActual === '' || nuevaContraseña === '' || confirmarNuevaContraseña === '') {
      setMensajeAlerta('Por favor, completa todos los campos.');
      setMostrarAlerta(true);
      return;
    }
    if (nuevaContraseña !== confirmarNuevaContraseña) {
      setMensajeAlerta('Las nuevas contraseñas no coinciden.');
      setMostrarAlerta(true);
      return;
    }

    // Aquí simulamos el cambio de contraseña
    const usuario = usuariosData.usuarios.find(
      (user) => user.nombre.toLowerCase() === nombreUsuario.toLowerCase()
    );

    if (usuario && usuario.contraseña === contraseñaActual) {
      usuario.contraseña = nuevaContraseña;  // Simulamos el cambio de contraseña
      setMensajeAlerta('Contraseña cambiada con éxito.');
      setMostrarModalCambioContraseña(false);
    } else {
      setMensajeAlerta('Contraseña actual incorrecta.');
    }

    setMostrarAlerta(true);
    setContraseñaActual('');
    setNuevaContraseña('');
    setConfirmarNuevaContraseña('');
  };

  return (
    <Provider>
      <View style={styles.container}>
        {/* Título Superior con Nombre de la App */}
        <Text style={styles.appTitle}>UnyX</Text>

        <Text style={styles.title}>Inicio de Sesión</Text>

        <TextInput
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
          style={styles.input}
          placeholder="Nombre de Usuario"
          placeholderTextColor="#666"
        />

        <TextInput
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#666"
        />

        <Button mode="contained" onPress={manejarInicioSesion} style={styles.button}>
          Iniciar Sesión
        </Button>
        <Button
          mode="outlined"
          onPress={() => setMostrarModalCambioContraseña(true)}
          style={styles.changePasswordButton}
        >
          Cambiar Contraseña
        </Button>

        {/* Modal de Cambio de Contraseña */}
        <Portal>
          <Modal
            visible={mostrarModalCambioContraseña}
            onDismiss={() => setMostrarModalCambioContraseña(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>

            <TextInput
              value={contraseñaActual}
              onChangeText={setContraseñaActual}
              secureTextEntry
              style={styles.input}
              placeholder="Contraseña Actual"
              placeholderTextColor="#666"
            />

            <TextInput
              value={nuevaContraseña}
              onChangeText={setNuevaContraseña}
              secureTextEntry
              style={styles.input}
              placeholder="Nueva Contraseña"
              placeholderTextColor="#666"
            />

            <TextInput
              value={confirmarNuevaContraseña}
              onChangeText={setConfirmarNuevaContraseña}
              secureTextEntry
              style={styles.input}
              placeholder="Confirmar Nueva Contraseña"
              placeholderTextColor="#666"
            />

            <Button mode="contained" onPress={manejarCambioContraseña} style={styles.button}>
              Cambiar Contraseña
            </Button>
          </Modal>
        </Portal>

        {/* Snackbar de Alerta */}
        <Snackbar
          visible={mostrarAlerta}
          onDismiss={() => setMostrarAlerta(false)}
          duration={3000}
          action={{
            label: 'OK',
            onPress: () => {
              setMostrarAlerta(false);
            },
          }}
          style={styles.snackbar}
        >
          {mensajeAlerta}
        </Snackbar>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  appTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A90E2', // Color llamativo para el nombre de la app
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
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
  button: {
    marginTop: 20,
    backgroundColor: '#4A90E2', // Color llamativo para botones
    paddingVertical: 10,
    borderRadius: 8,
  },
  changePasswordButton: {
    marginTop: 10,
    borderColor: '#4A90E2',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 8,
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
  snackbar: {
    backgroundColor: '#4A90E2',
  },
});

export default LoginScreen;