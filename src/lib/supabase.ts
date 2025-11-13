// File: src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// **PENTING**: Di proyek Vite, variabel lingkungan diakses melalui import.meta.env
// Pastikan Anda menggunakan prefiks VITE_ yang benar.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Pemeriksaan Keamanan & Kejelasan (Optional, tapi Direkomendasikan)
if (!supabaseUrl || !supabaseAnonKey) {
  // Jika ini terjadi, cek apakah server Vite sedang berjalan dan file .env sudah dimuat.
  console.error("Kredensial Supabase tidak ditemukan. Cek file .env dan prefiks VITE_.");
  // Throw error agar aplikasi berhenti jika koneksi utama gagal
  throw new Error("Kredensial Supabase hilang. Tidak dapat menginisialisasi klien.");
}

// Inisialisasi klien Supabase
// Gunakan URL dan Kunci Anonim dari .env
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

console.log("Klien Supabase berhasil diinisialisasi.");