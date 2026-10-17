# Band Manager – módulo catálogo/pitch
## Backend
cd server && npm i && cp .env.example .env (completar) && mysql < schema.sql && npm start
## App
cd app && npm i && npx expo start   (a = Android, i = iOS, w = web)
- Windows: sumar `react-native-windows` (npx react-native-windows-init) o usar la versión web.
- Linux: React Native no lo soporta oficialmente; usar `expo start --web` en el navegador o empaquetarlo con Electron/Tauri.
