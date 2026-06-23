# Breve App

Breve adalah aplikasi web inovatif yang memungkinkan Anda untuk merangkum konten dari video YouTube dan berinteraksi dengan rangkuman tersebut menggunakan kekuatan kecerdasan buatan. Aplikasi ini terintegrasi dengan model bahasa canggih dari Google (Gemini) dan OpenAI (ChatGPT) untuk memberikan Anda pemahaman yang cepat dan mendalam dari setiap video.

## Fitur Utama

- **Rangkum Video YouTube**: Cukup masukkan URL video YouTube, dan Breve akan secara otomatis menghasilkan transkrip dan rangkuman video tersebut.
- **Interaksi Berbasis AI**: Ajukan pertanyaan atau minta informasi spesifik dari rangkuman video menggunakan Gemini atau ChatGPT.
- **Antarmuka Modern**: Dibangun dengan React dan Tailwind CSS, Breve menawarkan pengalaman pengguna yang bersih, responsif, dan mudah digunakan.
- **Backend Bertenaga**: Backend yang andal dibangun dengan Node.js dan Express, memastikan pemrosesan yang cepat dan efisien.

## Teknologi yang Digunakan

### Frontend

- **React**: Pustaka JavaScript untuk membangun antarmuka pengguna yang interaktif.
- **Vite**: Alat pengembangan frontend yang cepat untuk pengalaman pengembangan yang lebih baik.
- **Tailwind CSS**: Kerangka kerja CSS untuk desain yang cepat dan modern.
- **React Router**: Untuk navigasi sisi klien dalam aplikasi.
- **React Player**: Komponen pemutar video untuk React.

### Backend

- **Node.js**: Lingkungan runtime JavaScript untuk membangun aplikasi sisi server.
- **Express**: Kerangka kerja aplikasi web minimalis untuk Node.js.
- **Google Generative AI (Gemini)**: Untuk kemampuan rangkuman dan interaksi AI.
- **OpenAI (ChatGPT)**: Alternatif model AI untuk interaksi yang lebih luas.
- **YouTube Transcript**: Untuk mengambil transkrip dari video YouTube.

## Instalasi dan Penggunaan

### Prasyarat

- Node.js (versi 14 atau lebih baru)
- npm atau yarn

### Langkah-langkah

1.  **Kloning Repositori**

    ```bash
    git clone https://github.com/nama-pengguna/breve-app.git
    cd breve-app
    ```

2.  **Instalasi Dependensi**

    - **Backend**:
      ```bash
      cd backend
      npm install
      ```
    - **Frontend**:
      ```bash
      cd ..
      npm install
      ```

3.  **Konfigurasi Lingkungan**

    - Buat file `.env` di dalam direktori `backend` dan tambahkan kunci API Anda:
      ```
      GOOGLE_API_KEY=KUNCI_API_GOOGLE_ANDA
      OPENAI_API_KEY=KUNCI_API_OPENAI_ANDA
      ```

4.  **Menjalankan Aplikasi**

    - **Mulai Backend Server**:
      ```bash
      cd backend
      npm start
      ```
    - **Mulai Frontend Development Server**:
      ```bash
      cd ..
      npm run dev
      ```

5.  **Buka Aplikasi**

    Buka browser Anda dan kunjungi `http://localhost:5173` (atau port lain yang ditampilkan di terminal Anda).

## Kontribusi

Kontribusi dari komunitas sangat kami hargai! Jika Anda ingin berkontribusi, silakan *fork* repositori ini dan buat *pull request* dengan perubahan Anda.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.
