/// <reference types="vite/client" />
// File: vite-env.d.ts (Lanjutan)

// Deklarasi ini memberi tahu TypeScript bahwa variabel ini ada di import.meta.env
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}