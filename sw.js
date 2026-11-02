// Service worker do Keep Ads Academy.
// Serve só para mostrar os avisos do pomodoro no celular (o Android exige um service worker
// para notificações) e para o app poder ser instalado. Não guarda páginas em cache: o site
// sempre carrega a versão mais nova.
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (ev) { ev.waitUntil(self.clients.claim()); });

// Tocar no aviso abre (ou traz para a frente) a plataforma
self.addEventListener("notificationclick", function (ev) {
  ev.notification.close();
  ev.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (lista) {
    for (const c of lista) { if ("focus" in c) return c.focus(); }
    return self.clients.openWindow("./");
  }));
});
