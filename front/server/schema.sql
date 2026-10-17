-- Tabla de temas (la de playlists ya la tenés: ajustá nombres de columnas en index.js si difieren)
CREATE TABLE IF NOT EXISTS songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  links JSON NULL,                       -- {"spotify":"...","youtube":"...","bandcamp":"..."}
  fecha_lanzamiento DATE NULL,
  isrc VARCHAR(12) NULL UNIQUE,
  estado_inscripcion ENUM('pendiente','en_proceso','inscripto') DEFAULT 'pendiente'
);
-- Se asume que playlists tiene: id, nombre, genero, oyentes, curador, email_curador, url
