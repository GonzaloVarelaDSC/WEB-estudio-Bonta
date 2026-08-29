(() => {
  "use strict";

  const list = document.querySelector("[data-credits]");
  if (!list) return;

  fetch("assets/credits.json")
    .then((r) => r.json())
    .then((credits) => {
      const entries = Object.values(credits);
      if (!entries.length) {
        list.innerHTML = "<li>Por ahora no hay fotos con licencia externa en uso en el sitio — las capacidades se muestran con placeholders de texto hasta sumar fotos propias del estudio.</li>";
        return;
      }
      const items = entries.map((c) => `
        <li>
          <strong>${c.title}</strong> — ${c.creator_url ? `<a href="${c.creator_url}" target="_blank" rel="noopener">${c.creator}</a>` : c.creator}
          · <a href="${c.license_url}" target="_blank" rel="noopener">${c.license.toUpperCase()} ${c.license_version || ""}</a>
          · <a href="${c.foreign_landing_url}" target="_blank" rel="noopener">Ver original ↗</a>
        </li>
      `);
      list.innerHTML = items.join("");
    })
    .catch(() => {
      list.innerHTML = "<li>No se pudieron cargar los créditos.</li>";
    });
})();
