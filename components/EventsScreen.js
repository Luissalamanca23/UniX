import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, Animated } from 'react-native';
import { Avatar, Badge, FAB, ProgressBar, Card, Title, Paragraph, Appbar, Searchbar, Menu, Divider, Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'react-native-modal';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import featuredEvents from '../data/eventsData';

const EventsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const usuario = route.params?.usuario;
  const selectedCategories = route.params?.selectedCategories || []; // Obtener categorías seleccionadas
  const [progress, setProgress] = useState(0.13);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState({});
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentQR, setCurrentQR] = useState('');
  const [isQuickAccessVisible, setIsQuickAccessVisible] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = global.setTimeout(() => setProgress(0.64), 500);
    return () => global.clearTimeout(timer);
  }, []);

  const onChangeSearch = query => setSearchQuery(query);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const registerForEvent = (eventId) => {
    if (registeredEvents[eventId]) {
      Alert.alert("Ya estás registrado", "Ya te has inscrito a este evento.");
      return;
    }

    global.setTimeout(() => {
      setRegisteredEvents(prev => ({ ...prev, [eventId]: true }));
      Alert.alert(
        "Registro Exitoso",
        "Te has inscrito al evento. Se ha enviado un correo de confirmación a tu dirección registrada."
      );
      const qrData = `event-${eventId}-user-123-${Date.now()}`;
      setCurrentQR(qrData);
      setShowQRModal(true);
    }, 1000);
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
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Unyx" titleStyle={styles.headerTitle} />
        
        <Appbar.Action icon="bell-outline" onPress={() => Alert.alert("Notificaciones", "No hay nuevas notificaciones")} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Avatar.Image size={40} source={{ uri: 'https://placehold.co/40x40' }} />
            </TouchableOpacity>
          }
        >
          <View style={styles.menuHeader}>
            <Image
              source={{ uri: 'https://placehold.co/40x40' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.username}>{usuario?.nombre || 'Usuario'}</Text>
              <Text style={styles.email}>{usuario?.email || 'email@example.com'}</Text>
            </View>
          </View>

          <Divider />
          <Menu.Item
            onPress={() => navigation.navigate('Perfil', { usuario })}
            title="Ver perfil"
            icon="account"
          />
          <Menu.Item
            onPress={() => navigation.navigate('Settings', { usuario, currentCategories: selectedCategories })}
            title="Configuración"
            icon="cog"
          />
          <Divider />
          <Menu.Item onPress={() => Alert.alert("Cerrar Sesión", "Función no implementada")} title="Cerrar sesión" icon="logout" />
        </Menu>
      </Appbar.Header>

      {/* Contenedor que envuelve el ScrollView y el quickAccess */}
      <View style={styles.contentContainer}>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            {
              useNativeDriver: false,
              listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setIsQuickAccessVisible(offsetY <= 0);
                setIsFilterVisible(offsetY <= 0);
              },
            }
          )}
        >
          {/* Featured Events */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eventos Destacados</Text>
            <Swiper style={styles.wrapper} showsButtons loop autoplay>
              {filteredEvents.map((event) => (
                <View style={styles.slide} key={event.id}>
                  <Card style={styles.eventCard}>
                    <Image source={event.image} style={styles.eventImage} resizeMode="contain" />
                    <Card.Content>
                      <Title>{event.title}</Title>
                      <Paragraph>{event.dateFormatted}</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                      <TouchableOpacity
                        style={[styles.button, registeredEvents[event.id] ? styles.registeredButton : {}]}
                        onPress={() => registerForEvent(event.id)}
                      >
                        <Text style={styles.buttonText}>
                          {registeredEvents[event.id] ? "Registrado" : "Unirse al Evento"}
                        </Text>
                      </TouchableOpacity>
                    </Card.Actions>
                  </Card>
                </View>
              ))}
            </Swiper>
          </View>

          {/* Main Feed */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Noticias Universitarias</Text>
            {[1, 2, 3].map((post) => (
              <Card key={post} style={styles.card}>
                <Card.Title
                  title={`Actualización de Noticias ${post}`}
                  subtitle={`Abril ${post + 14}, 2023`}
                  left={(props) => <Avatar.Icon {...props} icon="newspaper" />}
                />
                <Card.Cover source={{ uri: `https://placehold.co/300x200?text=Noticia+${post}` }} />
                <Card.Content>
                  <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Ver Más", "Función no implementada")}>
                    <Text style={styles.buttonText}>Ver Más</Text>
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Quick Access Buttons */}
      <View style={styles.quickAccess}>
        {[
          { title: 'Calendario', icon: 'calendar-month', screen: 'Calendario' },
          { title: 'Tareas', icon: 'clipboard-list' },
          { title: 'Clubs', icon: 'account-group' },
          { title: 'Biblioteca', icon: 'bookshelf' },
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
      
      {/* Gamification Elements */}
      <View style={styles.gamification}>
        <Badge style={styles.badge}>Nivel 4 {usuario?.nombre}</Badge>
        <ProgressBar progress={progress} color="#007AFF" style={styles.progressBar} />
      </View>

      {/* QR Code Modal */}
      <Modal isVisible={showQRModal} onBackdropPress={() => setShowQRModal(false)}>
        <View style={styles.qrModal}>
          <Text style={styles.qrTitle}>Tu Pase de Evento</Text>
          <QRCode
            value={currentQR}
            size={200}
            color="black"
            backgroundColor="white"
          />
          <TouchableOpacity style={styles.button} onPress={() => validateQR(currentQR)}>
            <Text style={styles.buttonText}>Validar QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => setShowQRModal(false)}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  contentContainer: {
    flex: 1, // Hace que el contenedor principal ocupe todo el espacio
    position: 'relative', // Permite que quickAccess se posicione de manera absoluta
  },
  scrollContainer: {
    paddingBottom: 80, // Asegura que el contenido de scroll no se sobreponga a quickAccess
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  searchbar: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    backgroundColor: '#F0F0F0',
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  filterContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    marginHorizontal: 5,
  },
  wrapper: {
    height: 300,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCard: {
    width: '90%',
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,  // Mantiene la altura a 150 para respetar el tamaño solicitado
  },
  card: {
    marginBottom: 15,
    elevation: 3,
  },
  quickAccess: {
    position: 'absolute',
    bottom: 0, // Siempre en la parte inferior de la pantalla
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
    marginTop: 5,
    fontSize: 12,
  },
  gamification: {
    position: 'absolute',
    top: 70,
    right: 15,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  badge: {
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
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