# Estudio Bonta — notas del proyecto (para retomar en otra conversación)

## Qué es esto
Sitio estático (HTML + CSS + JS, sin build) para Estudio Bonta: imprenta gráfica y taller de
fabricación (impresión gran formato, CNC/láser, acrílico, vidrieras/señalética, stands y piezas
a medida). Repo: https://github.com/GonzaloVarelaDSC/WEB-estudio-Bonta — ya sincronizado, Claude
puede pushear cambios directo con git (credenciales ya cacheadas en esta máquina).

## Datos reales confirmados (no inventar otros)
- WhatsApp: +54 9 11 3300-7858 · Mail: ploteosbonta@gmail.com
- +40 años en el oficio (dato real del brief original)
- Clientes/marcas: Lacoste, Cristóbal Colón, Molca × Carrefour, campaña Colapinto (real, texto
  únicamente — no hay archivos de logo de estas marcas, así que se muestran como texto, no logo)
- NO hay dirección física ni horario de atención confirmados — no agregar sin preguntar antes.
- Turnaround/plazos de entrega tipo "24/48hs": NUNCA visto confirmado — no usarlo si aparece en
  alguna referencia de diseño, es una promesa que el negocio no validó.

## Fotos — política de honestidad (importante)
- Las fotos de proyectos reales (Lacoste, Colapinto, etc.) son SIEMPRE placeholders de texto
  hasta que el cliente suba las fotos reales — nunca reemplazar por stock que aparente ser
  trabajo propio.
- Fotos genéricas ilustrativas (equipos, materiales) sí pueden ser stock con licencia CC
  verificada (ver `assets/credits.json` y `creditos.html`), pero el cliente pidió sacar las que
  había (impresoras que no eran las suyas) — hoy esos slots están en placeholder.
- El cliente va a subir fotos reales a una carpeta de Google Drive compartida (link se pasa en
  el chat cuando haga falta). Claude solo lee de ahí, nunca escribe/edita el Drive del cliente.

## Diseño — decisiones ya tomadas (no volver a proponer desde cero)
- Tipografía: Cormorant Garamond (headings, sin cursiva — el cliente pidió explícitamente no
  abusar de itálicas) + Lora (body) + Archivo (UI: nav, botones, kickers, tablas, números).
- Paleta: azul de marca `#13077a` (tomado del logo real, usar como trazo/acento — títulos,
  botones, bandas — no como fondo grande de página) + dorado `#b68235` + papel `#f3f2f2` + tinta
  `#14113d`. El cliente rechazó una paleta cálida tipo "cream/bone" anterior — no volver a eso.
- El cliente pidió puntualmente que el resultado final "copie exactamente" el export que generó
  con Claude Design (Cormorant + Archivo + esta paleta) — no reinterpretar el estilo por cuenta
  propia, seguir ese sistema.
- Logo real: `assets/img/logo-bonta.png` (lockup completo) y `logo-mark.png` (isotipo circular).
  Nunca recrear el logo a mano — siempre usar estos archivos.
- Ficha técnica es una página separada (`ficha-tecnica.html`), no una sección del home.

## Estructura actual del home (índice, ver index.html)
Header sticky → hero → capacidades (cards, el cliente pidió dejarlas como están organizadas,
NO reordenar) → marcas (carrusel) → proceso → por qué Bonta → trabajos/portfolio → contacto.
Footer con colofón.

## Pendiente / para preguntar antes de asumir
- Fotos reales de portfolio (Lacoste, Colapinto, Cristóbal Colón, Molca, bajo acrílico, trofeos).
- Fotos de equipos/taller propias para reemplazar los placeholders de capacidades, si el cliente
  las consigue.
- Confirmar si quiere agregar dirección/horario antes de publicarlos.

## Sesión de trabajo
Todo este contexto viene de una conversación larga con muchas iteraciones de feedback directo
del dueño del estudio (Gonzalo). Si arrancás una conversación nueva: leé este archivo primero,
después mirá `index.html` / `assets/css/` tal como están — reflejan el estado aprobado, no hace
falta re-preguntar lo ya decidido arriba.
