// Pantalla de PITCH: elegir tema -> filtrar/seleccionar playlists -> escribir mail -> enviar.
// Modo "Productora": mail personalizado a un único destinatario (sin playlists).
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, Pressable, Alert } from 'react-native';
import { api } from '../api';
import { Field, Btn, s } from '../theme';

const PLANTILLA = 'Hola {{curador}},\n\nTe comparto "{{cancion}}", creemos que encaja en tu playlist "{{playlist}}".\n\nEscuchala acá:\n{{links}}\n\n¡Gracias por tu tiempo!';

export default function PitchScreen() {
  const [modo, setModo] = useState('playlists');        // 'playlists' | 'productora'
  const [songQ, setSongQ] = useState('');                // búsqueda del tema por nombre
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState(null);                // tema elegido
  const [filtros, setFiltros] = useState({ genero: '', minOyentes: '', q: '' });
  const [playlists, setPlaylists] = useState([]);
  const [sel, setSel] = useState(new Set());             // ids de playlists seleccionadas
  const [subject, setSubject] = useState('Pitch: {{cancion}}');
  const [body, setBody] = useState(PLANTILLA);
  const [prod, setProd] = useState({ to: '', nombre: '' }); // destinatario modo productora
  const [sending, setSending] = useState(false);

  // Buscar temas cada vez que cambia el texto
  useEffect(() => { api.getSongs(songQ).then(setSongs).catch(() => {}); }, [songQ]);

  // Buscar playlists con los filtros actuales
  const buscar = useCallback(() => api.getPlaylists(filtros).then(setPlaylists).catch((e) => Alert.alert('Error', e.message)), [filtros]);
  useEffect(() => { buscar(); }, []);

  // Marca/desmarca una playlist
  const toggle = (id) => setSel((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const selTodas = () => setSel(new Set(playlists.map((p) => p.id)));

  const listo = song && (modo === 'productora' ? prod.to : sel.size > 0);

  const enviar = async () => {
    setSending(true);
    try {
      const payload = modo === 'productora'
        ? { songId: song.id, to: prod.to, nombre: prod.nombre, subject, body }
        : { songId: song.id, playlistIds: [...sel], subject, body };
      const r = await api.sendPitch(payload);
      const fallos = r.results.filter((x) => !x.ok).length;
      Alert.alert('Listo', `Enviados: ${r.enviados}${fallos ? `\nFallidos: ${fallos}` : ''}`);
    } catch (e) { Alert.alert('Error', e.message); }
    setSending(false);
  };

  return (
    <ScrollView style={s.screen}>
      <Text style={s.h1}>Pitch de temas</Text>

      {/* 1. Tema */}
      <Field label="1. Tema (buscá por nombre)" value={song ? song.nombre : songQ}
        onChangeText={(t) => { setSong(null); setSongQ(t); }} placeholder="Nombre del tema" />
      {!song && songs.slice(0, 5).map((x) => (
        <Pressable key={x.id} style={s.item} onPress={() => setSong(x)}>
          <Text style={s.itemTxt}>{x.nombre}</Text>
          <Text style={s.sub}>ISRC {x.isrc || '—'} · {x.estado_inscripcion}</Text>
        </Pressable>
      ))}

      {/* Selector de modo */}
      <View style={[s.row, { marginTop: 16 }]}>
        <Btn ghost={modo !== 'playlists'} title="Playlists" onPress={() => setModo('playlists')} />
        <Btn ghost={modo !== 'productora'} title="Productora" onPress={() => setModo('productora')} />
      </View>

      {/* 2a. Playlists con filtros */}
      {modo === 'playlists' ? (
        <>
          <Field label="2. Filtrar por género" value={filtros.genero} onChangeText={(t) => setFiltros({ ...filtros, genero: t })} />
          <Field label="Oyentes mínimos" keyboardType="numeric" value={filtros.minOyentes} onChangeText={(t) => setFiltros({ ...filtros, minOyentes: t })} />
          <Field label="Nombre de playlist / curador" value={filtros.q} onChangeText={(t) => setFiltros({ ...filtros, q: t })} />
          <View style={s.row}><Btn title="Buscar" onPress={buscar} /><Btn ghost title="Seleccionar todas" onPress={selTodas} /></View>
          <Text style={[s.label, { marginTop: 12 }]}>{sel.size} seleccionadas de {playlists.length}</Text>
          {playlists.map((p) => (
            <Pressable key={p.id} onPress={() => toggle(p.id)} style={[s.item, sel.has(p.id) && s.itemOn]}>
              <Text style={s.itemTxt}>{p.nombre}</Text>
              <Text style={s.sub}>{p.genero} · {p.oyentes?.toLocaleString()} oyentes · {p.curador}</Text>
            </Pressable>
          ))}
        </>
      ) : (
        /* 2b. Destinatario individual */
        <>
          <Field label="2. Mail de la productora" keyboardType="email-address" autoCapitalize="none" value={prod.to} onChangeText={(t) => setProd({ ...prod, to: t })} />
          <Field label="Nombre del contacto" value={prod.nombre} onChangeText={(t) => setProd({ ...prod, nombre: t })} />
        </>
      )}

      {/* 3. Texto del mail. Variables: {{curador}} {{playlist}} {{cancion}} {{links}} */}
      <Field label="3. Asunto" value={subject} onChangeText={setSubject} />
      <Field label="Mensaje (variables: {{curador}} {{playlist}} {{cancion}} {{links}})" multiline value={body} onChangeText={setBody} />
      <Btn title={sending ? 'Enviando…' : 'Enviar pitch'} onPress={enviar} disabled={!listo || sending} />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
