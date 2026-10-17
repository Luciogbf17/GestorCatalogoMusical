/**
 * API de la banda. React Native NO puede hablar directo con MySQL,
 * por eso este backend hace de puente (y además envía los mails,
 * así las credenciales SMTP/DB nunca viajan dentro de la app).
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Pool de conexiones MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST, user: process.env.DB_USER,
  password: process.env.DB_PASS, database: process.env.DB_NAME,
});

// Transporte de mail
const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST, port: +process.env.SMTP_PORT, secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// ---------- PLAYLISTS ----------
// GET /playlists?genero=rock&minOyentes=1000&q=indie
app.get('/playlists', async (req, res) => {
  const { genero, minOyentes, maxOyentes, q } = req.query;
  const where = [], params = [];
  if (genero)      { where.push('genero = ?');     params.push(genero); }
  if (minOyentes)  { where.push('oyentes >= ?');   params.push(+minOyentes); }
  if (maxOyentes)  { where.push('oyentes <= ?');   params.push(+maxOyentes); }
  if (q)           { where.push('(nombre LIKE ? OR curador LIKE ?)'); params.push(`%${q}%`, `%${q}%`); }
  const sql = `SELECT * FROM playlists ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY oyentes DESC LIMIT 500`;
  const [rows] = await db.query(sql, params);
  res.json(rows);
});

app.post('/playlists', async (req, res) => {
  const { nombre, genero, oyentes, curador, email_curador, url } = req.body;
  const [r] = await db.query(
    'INSERT INTO playlists (nombre, genero, oyentes, curador, email_curador, url) VALUES (?,?,?,?,?,?)',
    [nombre, genero, oyentes || 0, curador, email_curador, url]);
  res.status(201).json({ id: r.insertId });
});

// ---------- TEMAS ----------
app.get('/songs', async (req, res) => {
  const q = req.query.q ? `%${req.query.q}%` : '%';
  const [rows] = await db.query('SELECT * FROM songs WHERE nombre LIKE ? ORDER BY nombre', [q]);
  res.json(rows);
});

app.post('/songs', async (req, res) => {
  const { nombre, links, fecha_lanzamiento, isrc, estado_inscripcion } = req.body;
  const [r] = await db.query(
    'INSERT INTO songs (nombre, links, fecha_lanzamiento, isrc, estado_inscripcion) VALUES (?,?,?,?,?)',
    [nombre, JSON.stringify(links || {}), fecha_lanzamiento || null, isrc || null, estado_inscripcion || 'pendiente']);
  res.status(201).json({ id: r.insertId });
});

// ---------- ENVÍO DE PITCH ----------
// Reemplaza {{curador}}, {{playlist}}, {{cancion}}, {{links}} en el texto.
const render = (txt, v) => txt.replace(/{{(\w+)}}/g, (_, k) => v[k] ?? '');

/**
 * Modo "playlists": body = { songId, playlistIds[], subject, body }
 * Modo "custom":    body = { songId, to, nombre, subject, body } (productora, mail 1 a 1)
 */
app.post('/pitch/send', async (req, res) => {
  const { songId, playlistIds = [], to, nombre, subject, body } = req.body;
  const [[song]] = await db.query('SELECT * FROM songs WHERE id = ?', [songId]);
  if (!song) return res.status(404).json({ error: 'Tema no encontrado' });

  const links = typeof song.links === 'string' ? JSON.parse(song.links) : song.links || {};
  const linksTxt = Object.entries(links).map(([k, v]) => `${k}: ${v}`).join('\n');

  // Armamos la lista de destinatarios según el modo
  let targets = [];
  if (to) targets = [{ email: to, curador: nombre, playlist: '' }];
  else if (playlistIds.length) {
    const [pls] = await db.query('SELECT * FROM playlists WHERE id IN (?)', [playlistIds]);
    targets = pls.map(p => ({ email: p.email_curador, curador: p.curador, playlist: p.nombre }));
  }

  const results = [];
  for (const t of targets) {
    if (!t.email) { results.push({ ...t, ok: false, error: 'sin email' }); continue; }
    const vars = { curador: t.curador, playlist: t.playlist, cancion: song.nombre, links: linksTxt };
    try {
      await mailer.sendMail({ from: process.env.MAIL_FROM, to: t.email,
        subject: render(subject, vars), text: render(body, vars) });
      results.push({ ...t, ok: true });
    } catch (e) { results.push({ ...t, ok: false, error: e.message }); }
    await new Promise(r => setTimeout(r, 1500)); // pausa para no caer en spam/límites SMTP
  }
  res.json({ enviados: results.filter(r => r.ok).length, results });
});

app.listen(3000, () => console.log('API lista en :3000'));
