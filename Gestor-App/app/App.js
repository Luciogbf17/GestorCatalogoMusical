// Punto de entrada. Navegación simple por pestañas con useState (sin dependencias extra).
// Cuando sumes más módulos (shows, finanzas...) podés migrar a React Navigation.
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import PitchScreen from './src/screens/PitchScreen';
import CargaScreen from './src/screens/CargaScreen';
import { c, s } from './src/theme';

const TABS = { Pitch: PitchScreen, Carga: CargaScreen };

export default function App() {
  const [tab, setTab] = useState('Pitch');
  const Screen = TABS[tab];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={[s.row, { padding: 8 }]}>
        {Object.keys(TABS).map((t) => (
          <Pressable key={t} onPress={() => setTab(t)}
            style={{ padding: 10, borderBottomWidth: 2, borderColor: tab === t ? c.accent : 'transparent' }}>
            <Text style={{ color: tab === t ? c.text : c.muted, fontWeight: '600' }}>{t === 'Pitch' ? 'Pitch de temas' : 'Carga de datos'}</Text>
          </Pressable>
        ))}
      </View>
      <Screen />
    </SafeAreaView>
  );
}
