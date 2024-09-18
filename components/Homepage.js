import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Animated } from 'react-native';
import { Avatar, Badge, ProgressBar, Card, Title, Paragraph, Appbar, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

// Suponiendo que tienes una lista de eventos registrados
import registeredEventsData from '../data/registeredEvents'; // Carga los eventos registrados de un archivo o estado

const Homepage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const usuario = route.params?.usuario;
  const [progress, setProgress] = useState(0.13);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(0.64), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filtrar eventos registrados para mostrar los próximos eventos
    const upcomingEvents = registeredEventsData.filter(event => new Date(event.date) > new Date());
    setRegisteredEvents(upcomingEvents);
  }, []);

  const openProfileMenu = () => setVisibleProfile(true);
  const closeProfileMenu = () => setVisibleProfile(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barra superior */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Unyx" titleStyle={styles.headerTitle} />

        <Appbar.Action icon="bell-outline" onPress={() => Alert.alert("Notificaciones", "No hay nuevas notificaciones")} />

        {/* Menú del perfil */}
        <Menu
          visible={visibleProfile}
          onDismiss={closeProfileMenu}
          anchor={
            <TouchableOpacity onPress={openProfileMenu}>
              <Avatar.Image size={40} source={{ uri: 'https://placehold.co/40x40' }} />
            </TouchableOpacity>
          }
        >
          <View style={styles.menuHeader}>
            <Avatar.Image size={40} source={{ uri: 'https://placehold.co/40x40' }} />
            <View>
              <Text style={styles.username}>{usuario?.nombre || 'Usuario'}</Text>
              <Text style={styles.email}>{usuario?.email || 'email@example.com'}</Text>
            </View>
          </View>

          <Divider />
          <Menu.Item onPress={() => navigation.navigate('Perfil', { usuario })} title="Ver perfil" icon="account" />
          <Menu.Item onPress={() => navigation.navigate('Settings', { usuario })} title="Configuración" icon="cog" />
          <Divider />
          <Menu.Item onPress={() => Alert.alert("Cerrar Sesión", "Función no implementada")} title="Cerrar sesión" icon="logout" />
        </Menu>
      </Appbar.Header>

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

      {/* Barra de acceso rápido inferior */}
      <View style={styles.quickAccess}>
        {[
          { title: 'Inicio', icon: 'home' },
          { title: 'Calendario', icon: 'calendar-month', screen: 'Calendario' },
          { title: 'Clubs', icon: 'account-group', screen: 'Clubs' },
          { title: 'Eventos', icon: 'calendar-star', screen: 'Eventos' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickAccessItem}
            onPress={() => item.screen ? navigation.navigate(item.screen, { usuario }) : Alert.alert(item.title, "Función no implementada")}
          >
            <Icon name={item.icon} size={24} color="#007AFF" />
            <Text style={styles.quickAccessText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
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