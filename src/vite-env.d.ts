/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_FORMSPREE_ENDPOINT?: string;
  readonly VITE_CONTACT_FORMSPREE_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
