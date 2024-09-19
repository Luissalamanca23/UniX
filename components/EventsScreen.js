import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import HeaderBar from './HeaderBar'; 
import QuickAccessBar from './QuickAccessBar';
import featuredEvents from '../data/eventsData';

const EventsScreen = () => {
  const route = useRoute();
  const usuario = route.params?.usuario;
  const selectedCategories = route.params?.selectedCategories || [];
  const [registeredEvents, setRegisteredEvents] = useState([]);  // Manejar eventos registrados como un array
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentQR, setCurrentQR] = useState('');

  useEffect(() => {
    // Cargar los eventos registrados desde AsyncStorage al iniciar
    const loadRegisteredEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('registeredEvents');
        const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];
        setRegisteredEvents(parsedEvents);
      } catch (error) {
        console.error("Error al cargar eventos registrados:", error);
      }
    };

    loadRegisteredEvents();
  }, []);

  // Guardar los eventos registrados en AsyncStorage
  const saveEventsToStorage = async (updatedEvents) => {
    try {
      await AsyncStorage.setItem('registeredEvents', JSON.stringify(updatedEvents));
      console.log('Eventos actualizados guardados:', updatedEvents);
    } catch (error) {
      console.error("Error al guardar eventos registrados:", error);
    }
  };

  // Registrar al usuario en un evento
  const registerForEvent = (event) => {
    const eventId = event.id;

    // Verificar si el usuario ya está registrado en el evento
    if (registeredEvents.some(e => e.id === eventId)) {
      Alert.alert("Ya estás registrado", "Ya te has inscrito a este evento.");
      return;
    }

    global.setTimeout(() => {
      // Agregar el evento a la lista de registrados localmente
      const updatedEvents = [...registeredEvents, event];
      setRegisteredEvents(updatedEvents);

      // Guardar en AsyncStorage
      saveEventsToStorage(updatedEvents);

      Alert.alert(
        "Registro Exitoso",
        `Te has inscrito al evento: ${event.title}. Se ha enviado un correo de confirmación a tu dirección registrada.`
      );
      
      const qrData = `event-${eventId}-user-123-${Date.now()}`;
      setCurrentQR(qrData);
      setShowQRModal(true);
    }, 1000);
  };

  // Desuscribirse de un evento
  const unregisterFromEvent = (eventId) => {
    const updatedEvents = registeredEvents.filter(e => e.id !== eventId);
    setRegisteredEvents(updatedEvents);

    // Guardar cambios en AsyncStorage
    saveEventsToStorage(updatedEvents);

    Alert.alert("Desuscripción Exitosa", "Te has desuscrito del evento.");
  };

  const validateQR = (qrData) => {
    Alert.alert("QR Válido", "Bienvenido al evento. Tu participación ha sido registrada.");
    setShowQRModal(false);
  };

  // Filtrar eventos según las categorías seleccionadas y la universidad del usuario
  const filteredEvents = featuredEvents.filter(
    event =>
      (event.universidad === usuario?.institucion || event.universidad === "libre") &&
      (selectedCategories.length === 0 || selectedCategories.includes(event.carrera))
  );

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {/* Barra superior */}
      <HeaderBar usuario={usuario} title="Unyx - Eventos" />

      {/* Contenedor principal */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Eventos Inscritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus Eventos Inscritos</Text>
          {registeredEvents.length > 0 ? (
            registeredEvents.map(event => (
              <Card key={event.id} style={styles.eventCard}>
                <Card.Content>
                  <Title>{event.title}</Title>
                  <Paragraph>{event.dateFormatted}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <TouchableOpacity
                    style={[styles.button, styles.unregisterButton]}
                    onPress={() => unregisterFromEvent(event.id)}
                  >
                    <Text style={styles.buttonText}>Desuscribirse</Text>
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Text style={styles.noEventsText}>No estás registrado en ningún evento</Text>
          )}
        </View>

        {/* Eventos Destacados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eventos Destacados</Text>
          {filteredEvents.map(event => (
            <Card key={event.id} style={styles.eventCard}>
              <Image source={event.image} style={styles.eventImage} resizeMode="contain" />
              <Card.Content>
                <Title>{event.title}</Title>
                <Paragraph>{event.dateFormatted}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <TouchableOpacity
                  style={[styles.button, registeredEvents.some(e => e.id === event.id) ? styles.registeredButton : {}]}
                  onPress={() => registerForEvent(event)}
                >
                  <Text style={styles.buttonText}>
                    {registeredEvents.some(e => e.id === event.id) ? "Registrado" : "Unirse al Evento"}
                  </Text>
                </TouchableOpacity>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Modal para mostrar el código QR */}
      <Modal isVisible={showQRModal} onBackdropPress={() => setShowQRModal(false)}>
        <View style={styles.qrModal}>
          <Text style={styles.qrTitle}>Tu Pase de Evento</Text>
          <QRCode value={currentQR} size={200} color="black" backgroundColor="white" />
          <TouchableOpacity style={styles.button} onPress={() => validateQR(currentQR)}>
            <Text style={styles.buttonText}>Validar QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => setShowQRModal(false)}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <QuickAccessBar usuario={usuario} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noEventsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  eventCard: {
    marginBottom: 15,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registeredButton: {
    backgroundColor: '#4CAF50',
  },
  unregisterButton: {
    backgroundColor: '#FF3B30',
  },
  qrModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
  },
});

export default EventsScreen;