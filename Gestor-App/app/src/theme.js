// Tema y componentes de UI compartidos (solo componentes core de RN => corre en todas las plataformas)
import React from 'react';
import { Text, TextInput, Pressable, StyleSheet } from 'react-native';

export const c = { bg: '#1A2030', card: '#252D42', text: '#F1EFE9', muted: '#8B94AB', accent: '#7FD6C2', danger: '#E57373' };

export const Field = ({ label, ...props }) => (
  <>
    <Text style={s.label}>{label}</Text>
    <TextInput placeholderTextColor={c.muted} style={[s.input, props.multiline && { height: 140, textAlignVertical: 'top' }]} {...props} />
  </>
);

export const Btn = ({ title, onPress, ghost, disabled }) => (
  <Pressable onPress={onPress} disabled={disabled}
    style={[s.btn, ghost && s.ghost, disabled && { opacity: 0.4 }]}>
    <Text style={[s.btnTxt, ghost && { color: c.accent }]}>{title}</Text>
  </Pressable>
);

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.bg, padding: 16 },
  h1: { color: c.text, fontSize: 22, fontWeight: '700', marginBottom: 12 },
  label: { color: c.muted, fontSize: 13, marginTop: 10, marginBottom: 4 },
  input: { backgroundColor: c.card, color: c.text, borderRadius: 8, padding: 10, fontSize: 15 },
  btn: { backgroundColor: c.accent, borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 12 },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: c.accent },
  btnTxt: { color: c.bg, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8 },
  item: { backgroundColor: c.card, borderRadius: 8, padding: 10, marginBottom: 6, borderWidth: 1, borderColor: 'transparent' },
  itemOn: { borderColor: c.accent },
  itemTxt: { color: c.text }, sub: { color: c.muted, fontSize: 12 },
});
