import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, ProgressBar, Card, Paragraph } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

// Importa la barra superior
import HeaderBar from './HeaderBar'; 
import QuickAccessBar from './QuickAccessBar';
import registeredEventsData from '../data/registeredEvents'; // Carga los eventos registrados de un archivo o estado

const Homepage = () => {
  const route = useRoute();
  const usuario = route.params?.usuario;
  const [progress, setProgress] = useState(0.13);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const timer = global.setTimeout(() => setProgress(0.64), 500);
    return () => global.clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filtrar eventos registrados para mostrar los próximos eventos
    const upcomingEvents = registeredEventsData.filter(event => new Date(event.date) > new Date());
    setRegisteredEvents(upcomingEvents);
  }, []);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {/* Reutiliza la barra superior */}
      <HeaderBar usuario={usuario} title="Unyx" />

      {/* Contenido Principal */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.welcomeText}>¡Hola, {usuario?.nombre || 'Usuario'}!</Text>
          <ProgressBar progress={progress} color="#007AFF" style={styles.progressBar} />
        </View>

        {/* Sección de Próximos Eventos Registrados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos Eventos Registrados</Text>
          {registeredEvents.length > 0 ? (
            registeredEvents.map((event, index) => (
              <Card key={index} style={styles.card}>
                <Card.Title title={event.title} subtitle={event.dateFormatted} />
                <Card.Content>
                  <Paragraph>{event.description}</Paragraph>
                  <Paragraph>{`Ubicación: ${event.location}`}</Paragraph>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text style={styles.noEventsText}>No tienes eventos registrados próximamente.</Text>
          )}
        </View>

        {/* Sección de Noticias Universitarias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Noticias Universitarias</Text>
          {[1, 2, 3].map((post) => (
            <Card key={post} style={styles.card}>
              <Card.Title
                title={`Noticia ${post}`}
                subtitle={`Fecha: Abril ${post + 14}, 2024`}
                left={(props) => <Avatar.Icon {...props} icon="newspaper" />}
              />
              <Card.Content>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
      <QuickAccessBar usuario={usuario} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
  scrollContainer: {
    paddingBottom: 80,
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  card: {
    marginBottom: 15,
    elevation: 3,
  },
  noEventsText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  quickAccess: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  quickAccessItem: {
    alignItems: 'center',
  },
  quickAccessText: {
    marginTop: 3,
    marginBottom: 10,
    fontSize: 12,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Homepage;