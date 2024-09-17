import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import { Button, Divider, List, Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

const Settings = ({ route }) => {
  const navigation = useNavigation(); // Utilizar useNavigation
  const usuario = route.params?.usuario; // Obtener el usuario de los parámetros de navegación

  const [selectedCategories, setSelectedCategories] = useState([]); // Estado para categorías seleccionadas
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Estado para las notificaciones
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal de solicitud de cambio

  // Nuevas categorías con iconos
  const categories = [
    { name: 'Informática', icon: 'laptop' },
    { name: 'Salud', icon: 'heart-pulse' },
    { name: 'Construcción', icon: 'hammer' },
    { name: 'Arte', icon: 'palette' },
    { name: 'Negocios', icon: 'briefcase' },
    { name: 'Música', icon: 'music-note' },
  ];

  const handleCategoryPress = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const requestChange = () => {
    Alert.alert(
      'Solicitud Enviada',
      'Te enviaremos un correo para revisar tu solicitud de cambio de sede o institución.',
    );
    setShowModal(false);
  };

  const handleSaveCategories = () => {
    // Navegar de regreso a la pantalla principal con las nuevas categorías seleccionadas
    navigation.navigate('Home', { usuario, selectedCategories });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Usuario</Text>
      
      {/* Sección de Preferencias de Categorías */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filtrar por Categorías</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategories.includes(category.name) && styles.activeCategoryButton,
              ]}
              onPress={() => handleCategoryPress(category.name)}
            >
              <Icon
                name={category.icon}
                size={20}
                color={selectedCategories.includes(category.name) ? '#FFF' : '#007AFF'}
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategories.includes(category.name) && styles.activeCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button mode="contained" onPress={handleSaveCategories} style={styles.modalButton}>
          Guardar Categorías
        </Button>
      </View>

      {/* Sección de Notificaciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>Activar Notificaciones</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: '#767577', true: '#007AFF' }}
            thumbColor={notificationsEnabled ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Sección de Configuración de Cuenta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración de Cuenta</Text>
        <Divider />
        <List.Item
          title="Cambiar Contraseña"
          description="Actualiza tu contraseña de acceso."
          left={(props) => <List.Icon {...props} icon="lock-reset" />}
          onPress={() => Alert.alert('Función no implementada', 'Esta función estará disponible pronto.')}
        />
        <Divider />
        <List.Item
          title="Solicitar Cambio de Sede/Institución"
          description="Envía una solicitud para cambiar tu sede o institución."
          left={(props) => <List.Icon {...props} icon="school" />}
          onPress={() => setShowModal(true)}
        />
        <Divider />
      </View>

      {/* Modal de Solicitud de Cambio de Sede o Institución */}
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Solicitud de Cambio de Sede o Institución</Text>
          <Text style={styles.modalText}>Para cambiar tu sede o institución, envía una solicitud. Revisaremos tu petición y te informaremos por correo electrónico.</Text>
          <Button mode="contained" onPress={requestChange} style={styles.modalButton}>
            Enviar Solicitud
          </Button>
          <Button mode="outlined" onPress={() => setShowModal(false)} style={styles.modalButton}>
            Cancelar
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  activeCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  categoryIcon: {
    marginRight: 5,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});

export default Settings;