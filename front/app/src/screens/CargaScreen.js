// Pantalla de CARGA: alta de temas y de playlists en la base de datos.
import React, { useState } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { api } from '../api';
import { Field, Btn, s } from '../theme';

const ESTADOS = ['pendiente', 'en_proceso', 'inscripto'];

export default function CargaScreen() {
  const [tipo, setTipo] = useState('tema');
  const [t, setT] = useState({ nombre: '', spotify: '', youtube: '', otro: '', fecha: '', isrc: '', estado: 'pendiente' });
  const [p, setP] = useState({ nombre: '', genero: '', oyentes: '', curador: '', email_curador: '', url: '' });

  const guardar = async () => {
    try {
      if (tipo === 'tema') {
        if (!t.nombre) return Alert.alert('Falta el nombre del tema');
        // Armamos el JSON de links solo con los que se completaron
        const links = Object.fromEntries(Object.entries({ spotify: t.spotify, youtube: t.youtube, otro: t.otro }).filter(([, v]) => v));
        await api.addSong({ nombre: t.nombre, links, fecha_lanzamiento: t.fecha, isrc: t.isrc, estado_inscripcion: t.estado });
      } else {
        if (!p.nombre || !p.email_curador) return Alert.alert('Nombre y mail del curador son obligatorios');
        await api.addPlaylist({ ...p, oyentes: +p.oyentes || 0 });
      }
      Alert.alert('Guardado');
    } catch (e) { Alert.alert('Error', e.message); }
  };

  const ct = (k) => ({ value: t[k], onChangeText: (v) => setT({ ...t, [k]: v }) });
  const cp = (k) => ({ value: p[k], onChangeText: (v) => setP({ ...p, [k]: v }) });

  return (
    <ScrollView style={s.screen}>
      <Text style={s.h1}>Carga de datos</Text>
      <View style={s.row}>
        <Btn ghost={tipo !== 'tema'} title="Tema" onPress={() => setTipo('tema')} />
        <Btn ghost={tipo !== 'playlist'} title="Playlist" onPress={() => setTipo('playlist')} />
      </View>

      {tipo === 'tema' ? (
        <>
          <Field label="Nombre del tema" {...ct('nombre')} />
          <Field label="Link Spotify" autoCapitalize="none" {...ct('spotify')} />
          <Field label="Link YouTube" autoCapitalize="none" {...ct('youtube')} />
          <Field label="Otro link" autoCapitalize="none" {...ct('otro')} />
          <Field label="Fecha de lanzamiento (AAAA-MM-DD)" {...ct('fecha')} />
          <Field label="Código ISRC" autoCapitalize="characters" {...ct('isrc')} />
          <Text style={s.label}>Estado de inscripción</Text>
          <View style={s.row}>{ESTADOS.map((e) => <Btn key={e} ghost={t.estado !== e} title={e} onPress={() => setT({ ...t, estado: e })} />)}</View>
        </>
      ) : (
        <>
          <Field label="Nombre de la playlist" {...cp('nombre')} />
          <Field label="Género" {...cp('genero')} />
          <Field label="Oyentes" keyboardType="numeric" {...cp('oyentes')} />
          <Field label="Curador" {...cp('curador')} />
          <Field label="Mail del curador" keyboardType="email-address" autoCapitalize="none" {...cp('email_curador')} />
          <Field label="URL de la playlist" autoCapitalize="none" {...cp('url')} />
        </>
      )}
      <Btn title="Guardar" onPress={guardar} />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
