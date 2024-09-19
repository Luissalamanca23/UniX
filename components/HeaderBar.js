import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native'; // Asegúrate de importar Text desde 'react-native'
import { Appbar, Avatar, Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HeaderBar = ({ usuario, title }) => {
  const [visibleProfile, setVisibleProfile] = useState(false);
  const navigation = useNavigation();

  const openProfileMenu = () => setVisibleProfile(true);
  const closeProfileMenu = () => setVisibleProfile(false);

  return (
    <Appbar.Header style={{ backgroundColor: '#FFFFFF', elevation: 4 }}>
      <Appbar.Content title={title} titleStyle={{ fontWeight: 'bold' }} />

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
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Avatar.Image size={40} source={{ uri: 'https://placehold.co/40x40' }} />
          <View style={{ marginLeft: 10 }}>
            {/* Aquí estás usando el componente Text */}
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{usuario?.nombre || 'Usuario'}</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>{usuario?.email || 'email@example.com'}</Text>
          </View>
        </View>

        <Divider />
        <Menu.Item onPress={() => navigation.navigate('Perfil', { usuario })} title="Ver perfil" icon="account" />
        <Menu.Item onPress={() => navigation.navigate('Settings', { usuario })} title="Configuración" icon="cog" />
        <Divider />
        <Menu.Item onPress={() => Alert.alert("Cerrar Sesión", "Función no implementada")} title="Cerrar sesión" icon="logout" />
      </Menu>
    </Appbar.Header>
  );
};

export default HeaderBar;