import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const QuickAccessBar = ({ usuario }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.quickAccess}>
      {[
        { title: 'Inicio', icon: 'home', screen: 'Home' },
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
  );
};

const styles = {
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
};

export default QuickAccessBar;