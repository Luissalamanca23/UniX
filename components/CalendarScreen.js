// src/components/CalendarScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import CalendarEvents from 'react-native-calendar-events';
import HeaderBar from './HeaderBar'; 
import QuickAccessBar from './QuickAccessBar';

const CalendarScreen = () => {
  const route = useRoute();
  const usuario = route.params?.usuario; // Obtener el usuario de los parámetros de navegación
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); // Fecha seleccionada por el usuario
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = useState([]); // Eventos en la fecha seleccionada

  // Eventos de ejemplo - en una aplicación real, esto podría venir de una API o del estado global
  const allEvents = [
    { id: 1, title: "Festival de Primavera", date: "2024-09-03", universidad: "Instituto Profesional Duoc UC" },
    { id: 2, title: "Hackathon Universitario", date: "2024-09-03", universidad: "libre" },
    { id: 3, title: "Feria de Ciencias", date: "2024-09-03", universidad: "Instituto AIEP" },
    { id: 4, title: "Concierto de Verano", date: "2024-09-03", universidad: "Instituto Profesional Duoc UC" },
    { id: 5, title: "Maratón Universitaria", date: "2024-09-03", universidad: "libre" },
    { id: 6, title: "Fiesta de Bienvenida", date: "2024-09-03", universidad: "Universidad de Los Lagos" },
    { id: 7, title: "Fiesta de Fin de Año", date: "2024-09-03", universidad: "Instituto AIEP" },
  ];

  useEffect(() => {
    // Filtrar eventos según la universidad del usuario o que sean "libre"
    const filteredEvents = allEvents.filter(event => 
      event.universidad === usuario.universidad || event.universidad === "libre"
    );

    setRegisteredEvents(filteredEvents);
  }, [usuario]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    // Filtrar eventos que coincidan con la fecha seleccionada
    const eventsOnThisDate = registeredEvents.filter(event => event.date === day.dateString);
    setEventsOnSelectedDate(eventsOnThisDate);
  };

  const connectCalendar = async () => {
    try {
      const authStatus = await CalendarEvents.requestPermissions();
      if (authStatus === 'authorized') {
        Alert.alert("Permiso concedido", "Ahora puedes sincronizar los eventos con tu calendario.");
      } else {
        Alert.alert("Permiso denegado", "No se pudo acceder a tu calendario.");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al intentar acceder al calendario.");
      console.error("Error al solicitar permisos de calendario:", error); // Asegúrate de imprimir el error para depuración
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar usuario={usuario} title="Unyx - Calendario" />
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Mi calendario" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="calendar-plus" onPress={connectCalendar} />
      </Appbar.Header>

      {/* Calendario de selección de fechas */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          ...registeredEvents.reduce((acc, event) => {
            acc[event.date] = { marked: true };
            return acc;
          }, {}),
        }}
      />

      {/* Lista de eventos en la fecha seleccionada */}
      <FlatList
        data={eventsOnSelectedDate}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>{item.date}</Paragraph>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay eventos registrados para esta fecha.</Text>}
      />
      <QuickAccessBar usuario={usuario} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 3,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 18,
  },
});

export default CalendarScreen;