import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Provider, Snackbar } from 'react-native-paper';

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

    // Aquí iría la lógica real para cambiar la contraseña
    setMensajeAlerta('Contraseña cambiada con éxito.');
    setMostrarAlerta(true);
    setMostrarModalCambioContraseña(false);
    setContraseñaActual('');
    setNuevaContraseña('');
    setConfirmarNuevaContraseña('');
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Inicio de Sesión</Text>

        <Text>Nombre de Usuario</Text>
        <TextInput
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
          style={styles.input}
          placeholder="Nombre de Usuario"
        />

        <Text>Contraseña</Text>
        <TextInput
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry
          style={styles.input}
          placeholder="Contraseña"
        />

        <Button title="Iniciar Sesión" onPress={manejarInicioSesion} />
        <Button
          title="Cambiar Contraseña"
          onPress={() => setMostrarModalCambioContraseña(true)}
          color="gray"
        />

        {/* Modal de Cambio de Contraseña */}
        <Portal>
          <Modal
            visible={mostrarModalCambioContraseña}
            onDismiss={() => setMostrarModalCambioContraseña(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>

            <Text>Contraseña Actual</Text>
            <TextInput
              value={contraseñaActual}
              onChangeText={setContraseñaActual}
              secureTextEntry
              style={styles.input}
              placeholder="Contraseña Actual"
            />

            <Text>Nueva Contraseña</Text>
            <TextInput
              value={nuevaContraseña}
              onChangeText={setNuevaContraseña}
              secureTextEntry
              style={styles.input}
              placeholder="Nueva Contraseña"
            />

            <Text>Confirmar Nueva Contraseña</Text>
            <TextInput
              value={confirmarNuevaContraseña}
              onChangeText={setConfirmarNuevaContraseña}
              secureTextEntry
              style={styles.input}
              placeholder="Confirmar Nueva Contraseña"
            />

            <Button title="Cambiar Contraseña" onPress={manejarCambioContraseña} />
          </Modal>
        </Portal>

        {/* Snackbar de Alerta */}
        <Snackbar
          visible={mostrarAlerta}
          onDismiss={() => setMostrarAlerta(false)}
          duration={3000}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;