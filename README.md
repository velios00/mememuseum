# 📦 MemeMuseum

Questo progetto è stato realizzato come parte del corso di __Tecnologie Web__ dell'anno accademico __2024-2025__ presso l'__Università degli Studi di Napoli Federico II__.
Mememuseum e' __una single page application__ reattiva e responsive, dedicata alla condivisione e alla scoperta di meme.
Consente agli utenti di autenticarsi, pubblicare meme, e interagire con un sistema di upvotes/downvotes, e commenti.
La visualizzazione dei meme e' aperta anche a chi non registrato, con l'eccezione che quest'ultimo non ha possibilita' di interagire attivamente con i meme.

---

## 🚀 Struttura del progetto

- ⚛️ React + Vite (Frontend)
- 🧠 Node.js + Express (Backend)
- 🗃️ Sequelize + SQLite3 (Database)
- 🧪 Playwright (E2E Testing)
- 🐙 Git + GitHub

---

## 🔧 Setup del progetto

### 1. Clona il repository

```bash
git clone https://github.com/velios00/mememuseum
cd mememuseum
```
### 2. Installa le dipendenze
Vai alla directory del backend e installa
```bash
cd server
npm install
```
Vai alla directory del frontend e installa
```bash
cd client
npm install
```
### 3. Configurazione .env
Il file .env e' essenziale perche' contiene tutte le variabili d'ambiente necessarie per configurare il backend.
Nella directory "server" creare un file ".env" e inserire il seguente template:
```bash
DB_CONNECTION_URI = "mememuseumDB.db"
DIALECT = "sqlite"
TOKEN_SECRET = "M3meMuseumS3cret"
```
### 3. Esecuzione dell'applicazione
Dalla directory "server":
```bash
npm start
```
Il server sara' attivo all'indirizzo: `http://localhost:3000`
Dalla directory "client":
```bash
npm start
```
Il client sara' attivo all'indirizzo: `http://localhost:5173/`
