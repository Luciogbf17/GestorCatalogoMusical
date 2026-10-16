// Cliente HTTP hacia el backend. Cambiá BASE_URL por la IP/dominio de tu servidor
// (en Android emulador "localhost" es 10.0.2.2; en celular real usá la IP de tu PC).
export const BASE_URL = 'http://localhost:3000';

async function req(path, opts = {}) {
  const res = await fetch(BASE_URL + path, {
    headers: { 'Content-Type': 'application/json' }, ...opts,
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `Error ${res.status}`);
  return res.json();
}
const qs = (o) => '?' + new URLSearchParams(Object.fromEntries(Object.entries(o).filter(([, v]) => v))).toString();

export const api = {
  getPlaylists: (filtros) => req('/playlists' + qs(filtros)),
  addPlaylist:  (data) => req('/playlists', { method: 'POST', body: JSON.stringify(data) }),
  getSongs:     (q = '') => req('/songs' + qs({ q })),
  addSong:      (data) => req('/songs', { method: 'POST', body: JSON.stringify(data) }),
  sendPitch:    (data) => req('/pitch/send', { method: 'POST', body: JSON.stringify(data) }),
};
