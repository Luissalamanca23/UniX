// App.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Homepage from './components/Homepage';

export default function App() {
  return (
    <PaperProvider>
      <Homepage />
    </PaperProvider>
  );
}