// Dados públicos do projeto no Supabase (Project Settings > API).
// A chave "anon" / "publishable" é feita para ficar no navegador: a segurança
// vem das regras (RLS) do banco. Nunca coloque aqui a chave "service_role".
window.APP_CONFIG = {
  SUPABASE_URL: "https://laawhbidvfbhymboqlid.supabase.co",
  SUPABASE_KEY: "sb_publishable_GyBmbjsFbVbGHWc2u7FSTQ_n_VZYl3T",

  // Logos oficiais da Keep Ads (pasta img/ do site)
  LOGOS: {
    escuro: "img/Logo Horizontal Keep Ads 1.png", // "ads" cinza claro: para fundo preto
    claro: "img/Logo Horizontal Keep Ads 2.png"   // "ads" preto: para fundo branco
  }
};
