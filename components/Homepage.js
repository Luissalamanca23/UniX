import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { Avatar, Badge, FAB, ProgressBar, Card, Title, Paragraph, Appbar, Searchbar, Menu, Divider } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'react-native-modal';

// Importar imágenes locales
import img1 from '../assets/images.jpeg';
import img2 from '../assets/images-2.jpeg';
import img3 from '../assets/images-3.jpeg';
import img4 from '../assets/images-4.jpeg';
import img5 from '../assets/images-5.jpeg';

const Homepage = () => {
  const [progress, setProgress] = useState(0.13);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState({});
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentQR, setCurrentQR] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setProgress(0.64), 500);
    return () => clearTimeout(timer);
  }, []);

  const onChangeSearch = query => setSearchQuery(query);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const registerForEvent = (eventId) => {
    if (registeredEvents[eventId]) {
      Alert.alert("Ya estás registrado", "Ya te has inscrito a este evento.");
      return;
    }

    setTimeout(() => {
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

  const featuredEvents = [
    { id: 1, title: "Festival de Primavera", date: "Mayo 15, 2023", image: img1 },
    { id: 2, title: "Hackathon Universitario", date: "Junio 5, 2023", image: img2 },
    { id: 3, title: "Feria de Ciencias", date: "Julio 10, 2023", image: img3 },
    { id: 4, title: "Concierto de Verano", date: "Agosto 20, 2023", image: img4 },
    { id: 5, title: "Maratón Universitaria", date: "Septiembre 3, 2023", image: img5 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Unyx" titleStyle={styles.headerTitle} />
        <Searchbar
          placeholder="Buscar"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
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
          <Menu.Item onPress={() => Alert.alert("Perfil", "Función no implementada")} title="Perfil" />
          <Menu.Item onPress={() => Alert.alert("Configuración", "Función no implementada")} title="Configuración" />
          <Divider />
          <Menu.Item onPress={() => Alert.alert("Cerrar Sesión", "Función no implementada")} title="Cerrar sesión" />
        </Menu>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Featured Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eventos Destacados</Text>
          <Swiper style={styles.wrapper} showsButtons loop autoplay>
            {featuredEvents.map((event) => (
              <View style={styles.slide} key={event.id}>
                <Card style={styles.eventCard}>
                  {/* Ajuste de imagen para que se ajuste al contenedor */}
                  <Image source={event.image} style={styles.eventImage} resizeMode="contain" />
                  <Card.Content>
                    <Title>{event.title}</Title>
                    <Paragraph>{event.date}</Paragraph>
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

        {/* Quick Access Buttons */}
        <View style={styles.quickAccess}>
          {[
            { title: 'Calendario', icon: 'calendar-month' },
            { title: 'Tareas', icon: 'clipboard-list' },
            { title: 'Clubs', icon: 'account-group' },
            { title: 'Biblioteca', icon: 'bookshelf' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.quickAccessItem} onPress={() => Alert.alert(item.title, "Función no implementada")}>
              <Icon name={item.icon} size={24} color="#007AFF" />
              <Text style={styles.quickAccessText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Gamification Elements */}
      <View style={styles.gamification}>
        <Badge style={styles.badge}>Nivel 4 Luis S</Badge>
        <ProgressBar progress={progress} color="#007AFF" style={styles.progressBar} />
      </View>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => Alert.alert("Añadir", "Función no implementada")}
      />

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
  container: {
    flexGrow: 1,
    padding: 15,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  quickAccessItem: {
    alignItems: 'center',
  },
  quickAccessText: {
    marginTop: 5,
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
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

export default Homepage;