import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, Animated } from 'react-native';
import { Avatar, Badge, FAB, ProgressBar, Card, Title, Paragraph, Appbar, Searchbar, Menu, Divider, Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'react-native-modal';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import img1 from '../assets/images.jpeg';
import img2 from '../assets/images-2.jpeg';
import img3 from '../assets/images-3.jpeg';
import img4 from '../assets/images-4.jpeg';
import img5 from '../assets/images-5.jpeg';

const Homepage = () => {
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

  const featuredEvents = [
    // Universidad de Los Lagos
    { id: 1, title: "Festival de Primavera", date: "Mayo 15, 2023", image: img1, universidad: "Universidad de Los Lagos", carrera: "Informática", sede: "Campus Osorno" },
    { id: 2, title: "Concierto de Verano", date: "Agosto 20, 2023", image: img4, universidad: "Universidad de Los Lagos", carrera: "Construcción", sede: "Campus Puerto Montt" },
    { id: 3, title: "Seminario de Ciberseguridad", date: "Octubre 25, 2023", image: img1, universidad: "Universidad de Los Lagos", carrera: "Informática", sede: "Campus Chinquihue" },
    
    // Instituto AIEP
    { id: 4, title: "Feria de Ciencias", date: "Julio 10, 2023", image: img3, universidad: "Instituto AIEP", carrera: "Salud", sede: "Sede Providencia" },
    { id: 5, title: "Taller de Emergencias Médicas", date: "Noviembre 11, 2023", image: img3, universidad: "Instituto AIEP", carrera: "Salud", sede: "Sede Concepción" },
    { id: 6, title: "Jornada de Actualización en Enfermería", date: "Diciembre 5, 2023", image: img4, universidad: "Instituto AIEP", carrera: "Salud", sede: "Sede Bellavista" },
    
    // Instituto Profesional Duoc UC
    { id: 7, title: "Fiesta de Bienvenida", date: "Octubre 12, 2023", image: img1, universidad: "Instituto Profesional Duoc UC", carrera: "Construcción", sede: "Sede San Joaquín" },
    { id: 8, title: "Fiesta de Fin de Año", date: "Diciembre 31, 2023", image: img2, universidad: "Instituto Profesional Duoc UC", carrera: "Informática", sede: "Sede Antonio Varas" },
    { id: 9, title: "Torneo de Innovación y Tecnología", date: "Marzo 5, 2024", image: img2, universidad: "Instituto Profesional Duoc UC", carrera: "Informática", sede: "Sede Plaza Oeste" },
    
    // Universidad de Chile
    { id: 10, title: "Congreso de Ciencias Políticas", date: "Abril 4, 2023", image: img5, universidad: "Universidad de Chile", carrera: "Ciencias Políticas", sede: "Campus Juan Gómez Millas" },
    { id: 11, title: "Feria del Libro Universitario", date: "Junio 16, 2023", image: img1, universidad: "Universidad de Chile", carrera: "Literatura", sede: "Campus Andrés Bello" },
    { id: 12, title: "Hackathon de Inteligencia Artificial", date: "Agosto 12, 2023", image: img2, universidad: "Universidad de Chile", carrera: "Informática", sede: "Facultad de Ciencias Físicas y Matemáticas" },
  
    // Pontificia Universidad Católica de Chile
    { id: 13, title: "Conferencia de Economía y Negocios", date: "Mayo 20, 2023", image: img4, universidad: "Pontificia Universidad Católica de Chile", carrera: "Negocios", sede: "Campus San Joaquín" },
    { id: 14, title: "Feria de Arte y Cultura", date: "Septiembre 14, 2023", image: img3, universidad: "Pontificia Universidad Católica de Chile", carrera: "Arte", sede: "Campus Lo Contador" },
    { id: 15, title: "Simposio de Energías Renovables", date: "Noviembre 23, 2023", image: img1, universidad: "Pontificia Universidad Católica de Chile", carrera: "Construcción", sede: "Campus San Joaquín" },
  
    // Universidad de Concepción
    { id: 16, title: "Semana de la Ingeniería", date: "Octubre 2, 2023", image: img2, universidad: "Universidad de Concepción", carrera: "Informática", sede: "Campus Concepción" },
    { id: 17, title: "Ciclo de Cine Documental", date: "Julio 18, 2023", image: img5, universidad: "Universidad de Concepción", carrera: "Comunicación", sede: "Campus Chillán" },
    { id: 18, title: "Feria de Emprendimiento e Innovación", date: "Diciembre 15, 2023", image: img4, universidad: "Universidad de Concepción", carrera: "Negocios", sede: "Campus Los Ángeles" },
  
    // Libre (Abiertos a todos)
    { id: 19, title: "Hackathon Universitario", date: "Junio 5, 2023", image: img2, universidad: "libre", carrera: "Informática" },
    { id: 20, title: "Maratón Universitaria", date: "Septiembre 3, 2023", image: img5, universidad: "libre", carrera: "Salud" },
    { id: 21, title: "Festival de Cortometrajes", date: "Abril 28, 2023", image: img1, universidad: "libre", carrera: "Arte" },
    { id: 22, title: "Competencia de Robótica", date: "Mayo 30, 2023", image: img3, universidad: "libre", carrera: "Informática" },
    { id: 23, title: "Torneo de Debate Interuniversitario", date: "Octubre 8, 2023", image: img4, universidad: "libre", carrera: "Ciencias Políticas" },
  ];

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

export default Homepage;