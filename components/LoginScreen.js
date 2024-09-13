import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Provider, Snackbar, Button } from 'react-native-paper';

// Importar los datos de usuarios
let usuariosData = require('../usuarios.json');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [mostrarModalCambioContraseña, setMostrarModalCambioContraseña] = useState(false);
  const [nombreUsuarioCambio, setNombreUsuarioCambio] = useState('');
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarNuevaContraseña, setConfirmarNuevaContraseña] = useState('');

  const manejarInicioSesion = () => {
    if (nombreUsuario === '' || contraseña === '') {
      setMensajeAlerta('Por favor, ingresa tu nombre de usuario y contraseña.');
      setMostrarAlerta(true);
      return;
    }

    const usuario = usuariosData.usuarios.find(
      (user) => user.nombre.toLowerCase() === nombreUsuario.toLowerCase()
    );

    if (usuario && usuario.contraseña === contraseña) {
      setMensajeAlerta('Inicio de sesión exitoso. ¡Bienvenido!');
      setMostrarAlerta(true);
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1500);
    } else {
      setMensajeAlerta('Nombre de usuario o contraseña incorrectos.');
      setMostrarAlerta(true);
    }
  };

  const actualizarContraseña = (nombreUsuario, nuevaContraseña) => {
    const usuarioIndex = usuariosData.usuarios.findIndex(
      (user) => user.nombre.toLowerCase() === nombreUsuario.toLowerCase()
    );
    
    if (usuarioIndex !== -1) {
      usuariosData.usuarios[usuarioIndex].contraseña = nuevaContraseña;
      // Aquí simularemos guardar los cambios
      guardarCambios();
      return true;
    }
    return false;
  };

  const guardarCambios = () => {
    // En una aplicación real, aquí enviarías los datos actualizados a un servidor
    console.log('Datos actualizados:', JSON.stringify(usuariosData, null, 2));
  };

  const manejarCambioContraseña = () => {
    if (nombreUsuarioCambio === '' || contraseñaActual === '' || nuevaContraseña === '' || confirmarNuevaContraseña === '') {
      setMensajeAlerta('Por favor, completa todos los campos.');
      setMostrarAlerta(true);
      return;
    }
    if (nuevaContraseña !== confirmarNuevaContraseña) {
      setMensajeAlerta('Las nuevas contraseñas no coinciden.');
      setMostrarAlerta(true);
      return;
    }

    const usuario = usuariosData.usuarios.find(
      (user) => user.nombre.toLowerCase() === nombreUsuarioCambio.toLowerCase()
    );

    if (usuario && usuario.contraseña === contraseñaActual) {
      if (actualizarContraseña(nombreUsuarioCambio, nuevaContraseña)) {
        setMensajeAlerta('Contraseña cambiada con éxito.');
        setMostrarModalCambioContraseña(false);
      } else {
        setMensajeAlerta('Error al actualizar la contraseña.');
      }
    } else {
      setMensajeAlerta('Nombre de usuario o contraseña actual incorrectos.');
    }

    setMostrarAlerta(true);
    setNombreUsuarioCambio('');
    setContraseñaActual('');
    setNuevaContraseña('');
    setConfirmarNuevaContraseña('');
  };

  return (
    <Provider>
      <View style={styles.container}>
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

        <Portal>
          <Modal
            visible={mostrarModalCambioContraseña}
            onDismiss={() => setMostrarModalCambioContraseña(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>

            <TextInput
              value={nombreUsuarioCambio}
              onChangeText={setNombreUsuarioCambio}
              style={styles.input}
              placeholder="Nombre de Usuario"
              placeholderTextColor="#666"
            />

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
    color: '#4A90E2',
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
    backgroundColor: '#4A90E2',
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