import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Provider, Snackbar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Importa Picker para selección

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
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [nuevoNombreUsuario, setNuevoNombreUsuario] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevaContraseñaRegistro, setNuevaContraseñaRegistro] = useState('');
  const [usuariosData, setUsuariosData] = useState({ usuarios: [] });
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState(''); // Estado para la institución
  const [sedeSeleccionada, setSedeSeleccionada] = useState(''); // Estado para la sede

  const universidadesInstitutos = [
    'Universidad de Chile',
    'Pontificia Universidad Católica de Chile',
    'Universidad de Santiago de Chile',
    'Instituto Profesional Duoc UC',
    'Universidad de Concepción',
    'Universidad de Los Lagos',
    'Universidad Austral de Chile',
    'Instituto Profesional AIEP',
    'Instituto Profesional Santo Tomás',
    'Universidad San Sebastián',
    'Universidad de Aconcagua',
    'Universidad de Los Andes',
  ];

  // Sedes de las universidades e institutos
  const sedesUniversidades = {
    'Universidad de Chile': [
      'Campus Juan Gómez Millas',
      'Campus Andrés Bello',
      'Campus Beauchef',
      'Facultad de Medicina',
      'Facultad de Derecho',
    ],
    'Pontificia Universidad Católica de Chile': [
      'Campus San Joaquín',
      'Campus Casa Central',
      'Campus Lo Contador',
      'Campus Oriente',
      'Campus Villarrica',
    ],
    'Universidad de Santiago de Chile': [
      'Campus Central',
      'Facultad Tecnológica',
      'Facultad de Ingeniería',
      'Escuela de Artes y Oficios (EAO)',
      'Facultad de Humanidades',
    ],
    'Instituto Profesional Duoc UC': [
      'Puerto Montt',
      'Plaza Vespucio',
      'San Joaquín',
      'Maipú',
      'Viña del Mar',
      'Antonio Varas',
      'Melipilla',
      'Puente Alto',
      'Plaza Oeste',
      'Concepción',
      'San Carlos de Apoquindo',
      'Alameda',
      'San Bernardo',
      'Sede Valparaíso',
      'Sede San Andrés de Concepción',
    ],
    'Universidad de Concepción': [
      'Campus Concepción',
      'Campus Chillán',
      'Campus Los Ángeles',
    ],
    'Universidad de Los Lagos': [
      'Campus Osorno',
      'Campus Puerto Montt',
      'Campus Chinquihue',
    ],
    'Universidad Austral de Chile': [
      'Campus Isla Teja',
      'Campus Miraflores',
      'Campus Patagonia',
      'Campus Puerto Montt',
    ],
    'Instituto Profesional AIEP': [
      'Sede Providencia',
      'Sede Bellavista',
      'Sede Concepción',
      'Sede Rancagua',
      'Sede Antofagasta',
      'Sede Viña del Mar',
    ],
    'Instituto Profesional Santo Tomás': [
      'Sede Santiago Centro',
      'Sede Talca',
      'Sede La Serena',
      'Sede Chillán',
      'Sede Temuco',
      'Sede Valdivia',
    ],
    'Universidad San Sebastián': [
      'Sede Santiago',
      'Sede Concepción',
      'Sede Valdivia',
      'Sede Puerto Montt',
    ],
    'Universidad de Aconcagua': [
      'Sede Santiago',
      'Sede Rancagua',
      'Sede San Felipe',
    ],
    'Universidad de Los Andes': [
      'Campus San Carlos de Apoquindo',
    ],
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const usuariosGuardados = await AsyncStorage.getItem('usuarios');
      if (usuariosGuardados !== null) {
        setUsuariosData(JSON.parse(usuariosGuardados));
      } else {
        const usuariosPorDefecto = {
          usuarios: [
            { id: 101, nombre: 'Admin', email: 'luis@example.com', contraseña: '1234', institucion: 'Instituto Profesional Duoc UC', sede: 'Maipú' },
            { id: 102, nombre: 'Ana M', email: 'ana@example.com', contraseña: '5678', institucion: 'Universidad de Chile', sede: '' },
          ],
        };
        setUsuariosData(usuariosPorDefecto);
        await AsyncStorage.setItem('usuarios', JSON.stringify(usuariosPorDefecto));
      }
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };

  const guardarUsuarios = async (nuevosDatos) => {
    try {
      setUsuariosData(nuevosDatos);
      await AsyncStorage.setItem('usuarios', JSON.stringify(nuevosDatos));
      console.log('Datos actualizados:', JSON.stringify(nuevosDatos, null, 2));
    } catch (error) {
      console.error('Error al guardar los usuarios:', error);
    }
  };

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
        navigation.navigate('Home', { usuario });
      }, 1500);
    } else {
      setMensajeAlerta('Nombre de usuario o contraseña incorrectos.');
      setMostrarAlerta(true);
    }
  };

  const manejarRegistroUsuario = () => {
    if (nuevoNombreUsuario === '' || nuevoEmail === '' || nuevaContraseñaRegistro === '') {
      setMensajeAlerta('Por favor, completa todos los campos para registrarte.');
      setMostrarAlerta(true);
      return;
    }

    const usuarioExistente = usuariosData.usuarios.find(
      (user) => user.nombre.toLowerCase() === nuevoNombreUsuario.toLowerCase() || user.email.toLowerCase() === nuevoEmail.toLowerCase()
    );

    if (usuarioExistente) {
      setMensajeAlerta('El nombre de usuario o correo ya están en uso.');
      setMostrarAlerta(true);
      return;
    }

    const nuevoUsuario = {
      id: usuariosData.usuarios.length + 101,
      nombre: nuevoNombreUsuario,
      email: nuevoEmail,
      contraseña: nuevaContraseñaRegistro,
      institucion: institucionSeleccionada,
      sede: sedesUniversidades[institucionSeleccionada]?.includes(sedeSeleccionada) ? sedeSeleccionada : '',
    };

    const nuevosUsuariosData = { ...usuariosData, usuarios: [...usuariosData.usuarios, nuevoUsuario] };
    guardarUsuarios(nuevosUsuariosData);

    setMensajeAlerta('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
    setMostrarAlerta(true);
    setMostrarModalRegistro(false);
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

    const usuarioIndex = usuariosData.usuarios.findIndex(
      (user) => user.nombre.toLowerCase() === nombreUsuarioCambio.toLowerCase()
    );

    if (usuarioIndex !== -1 && usuariosData.usuarios[usuarioIndex].contraseña === contraseñaActual) {
      const nuevosUsuarios = { ...usuariosData };
      nuevosUsuarios.usuarios[usuarioIndex].contraseña = nuevaContraseña;
      guardarUsuarios(nuevosUsuarios);
      setMensajeAlerta('Contraseña cambiada con éxito.');
      setMostrarModalCambioContraseña(false);
    } else {
      setMensajeAlerta('Nombre de usuario o contraseña actual incorrectos.');
    }

    setMostrarAlerta(true);
  };

  return (
    <Provider>
      <View style={styles.betaContainer}>
        <Text style={styles.betaText}>BETA</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.appTitle}>UnyX</Text>
        <Text style={styles.appParrafo}>¡Bienvenido a UnyX, La App para Estudiantes!</Text>
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

        <Button
          mode="outlined"
          onPress={() => setMostrarModalRegistro(true)}
          style={styles.changePasswordButton}
        >
          Registrarse
        </Button>

        {/* Modal para el registro de usuario */}
        <Portal>
          <Modal
            visible={mostrarModalRegistro}
            onDismiss={() => setMostrarModalRegistro(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Registrar Nuevo Usuario</Text>

            <TextInput
              value={nuevoNombreUsuario}
              onChangeText={setNuevoNombreUsuario}
              style={styles.input}
              placeholder="Nombre de Usuario"
              placeholderTextColor="#666"
            />

            <TextInput
              value={nuevoEmail}
              onChangeText={setNuevoEmail}
              style={styles.input}
              placeholder="Correo Electrónico"
              placeholderTextColor="#666"
            />

            <TextInput
              value={nuevaContraseñaRegistro}
              onChangeText={setNuevaContraseñaRegistro}
              secureTextEntry
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#666"
            />

            {/* Picker para seleccionar universidad o instituto */}
            <Picker
              selectedValue={institucionSeleccionada}
              onValueChange={(itemValue) => setInstitucionSeleccionada(itemValue)}
              style={styles.picker}
            >
              {universidadesInstitutos.map((institucion, index) => (
                <Picker.Item key={index} label={institucion} value={institucion} />
              ))}
            </Picker>

            {/* Mostrar Picker de sede solo si la institución seleccionada tiene sedes */}
            {sedesUniversidades[institucionSeleccionada] && (
              <Picker
                selectedValue={sedeSeleccionada}
                onValueChange={(itemValue) => setSedeSeleccionada(itemValue)}
                style={styles.picker}
              >
                {sedesUniversidades[institucionSeleccionada].map((sede, index) => (
                  <Picker.Item key={index} label={sede} value={sede} />
                ))}
              </Picker>
            )}

            <Button mode="contained" onPress={manejarRegistroUsuario} style={styles.button}>
              Registrar Usuario
            </Button>
          </Modal>

          {/* Modal para el cambio de contraseña */}
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
  betaContainer: {
    position: 'absolute',
    top: 20,
    right: -30,
    backgroundColor: '#FF6B6B',
    paddingVertical: 5,
    paddingHorizontal: 30,
    transform: [{ rotate: '45deg' }],
    zIndex: 1000,
  },
  betaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
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
  appParrafo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
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
  picker: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
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