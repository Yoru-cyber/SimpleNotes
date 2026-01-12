# 📝 Simple Notes

A sleek, offline-first note-taking app built with **React Native**, **Expo**, and **Tamagui** — featuring smooth animations, and a fully native feel on both iOS and Android.

---

## ✨ Features

- **Smooth Animations**:
  - Slide transitions between tabs
  - Spring-based modal sheets with gesture support
  - Press feedback on all interactive elements
- **Offline-First**: All notes stored locally using **SQLite** via **Drizzle ORM**
- **Responsive Design**: Works beautifully on phones and tablets

---

## 🛠 Tech Stack

| Layer          | Technology                                  |
| -------------- | ------------------------------------------- |
| **Framework**  | React Native + Expo SDK 51                  |
| **Styling**    | Tamagui (v1.90+) with dynamic theme support |
| **Database**   | SQLite via `expo-sqlite` + Drizzle ORM      |
| **Navigation** | Expo Router (file-based)                    |
| **State**      | React hooks + MMKV for persistent settings  |
| **Animations** | Reanimated v3                               |

---

## 📱 Screens

### Home Screen

- Scrollable list of notes with preview
- Tap to view/edit
- Favorite toggle with smooth animation

### Note Editor (Modal Sheet)

- Clean, focused writing experience
- Title + body inputs with auto-save
- Cancel/Save actions with themed buttons
- Keyboard-aware layout (content scrolls when needed)

### Tab Navigation

- **Home** → view all notes
- **Favorites** → view starred notes only
- Smooth horizontal slide transition between tabs

## 🚀 Development

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI (for builds): `npm install -g eas-cli`

### Setup

```bash
git clone https://github.com/Yoru-cyber/SimpleNotes
cd SimpleNotes
npm install
```

### Run Dev Build

```bash
# Start dev server
npx expo start
```

> ⚠️ **Important**: Use a **development build** (not Expo Go) to test:
>
> - Custom package/bundle ID
> - Persistent database across sessions
> - True native performance

---

## 📦 Database Management

- Schema managed via **Drizzle ORM**
- Migrations run automatically on app launch
- Database file: `notes.db` in app documents directory
- To backup your notes:
  - manually extract from device (iOS Simulator / Android Device Explorer)

---

## 🎯 Future Ideas

- Encryptation
- Cloud sync (Firebase/Supabase)
- Markdown support
- Search & tags
- Widgets (iOS/Android)
- Dark mode scheduling

---

## 📄 License

GNU GENERAL PUBLIC LICENSE Version 3

See `LICENSE` for more info.

---

> Made with ❤️ using Expo, Tamagui, and Drizzle ORM  
> Designed for simplicity, speed, and personal taste

![Chopper Jumping](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWtpeTMwa203cmplMjk0cDJ6dXdtaDRjb3R2eWsxbm4ydWpzd2t4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R548B8WxpUTsI/giphy.gif)
