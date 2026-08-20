---
name: ProteinLab 2.1
description: Observatorio editorial inmersivo para seguir ADN → ARN → proteína.
colors:
  ink: "#142a31"
  muted: "#58747b"
  canvas: "#dfe8e9"
  paper: "#f7faf9"
  paper-secondary: "#e9f0ef"
  line: "#bfd0d1"
  teal: "#0b756e"
  teal-dark: "#074e4b"
  mint: "#43d7ad"
  night: "#071a20"
  night-secondary: "#0b252d"
  warm: "#f3a84b"
  danger: "#dc644f"
  exon-1: "#42c8ff"
  exon-2: "#45d6a0"
  exon-3: "#ffb454"
  exon-4: "#9f86ff"
  exon-5: "#ff668c"
  exon-6: "#34d3df"
  exon-7: "#f3d44e"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2rem, 3.25vw, 3.7rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "1.28rem"
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "0.71rem"
    fontWeight: 400
  label:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "0.62rem"
    fontWeight: 800
    letterSpacing: "0.07em"
  sequence:
    fontFamily: "ui-monospace, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 800
rounded:
  xs: "5px"
  label: "6px"
  segment: "7px"
  control: "8px"
  input: "9px"
  compact-panel: "10px"
  panel: "12px"
  overlay: "14px"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.25rem"
  xxl: "1.5rem"
components:
  action:
    backgroundColor: "#17333a"
    textColor: "#eaf4f4"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.42rem 0.65rem"
    height: "36px"
  action-primary:
    backgroundColor: "#66dbb9"
    textColor: "#06211f"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.42rem 0.65rem"
    height: "36px"
  viewer:
    backgroundColor: "{colors.night}"
    textColor: "#ffffff"
    rounded: "0px"
    height: "calc(100svh - 64px)"
  sequence-map:
    backgroundColor: "#eef3f2"
    textColor: "{colors.ink}"
    rounded: "0px"
  evidence-badge:
    backgroundColor: "rgba(11,104,94,.78)"
    textColor: "#b9f6e4"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.58rem"
---

# Design System: ProteinLab 2.1

## Overview

**Creative North Star: “El observatorio editorial inmersivo”**

ProteinLab 2.1 convierte la pantalla en una cámara de observación molecular. El campo nocturno WebGL ocupa toda la altura útil; ruta, evidencia, títulos y controles se posan encima como instrumental científico translúcido. La dimensión editorial surge de esa composición precisa dentro de la escena, no de una página blanca alrededor del visor.

La experiencia cuenta una historia causal en diez estaciones. El 3D explica espacio, escala y transformación; el mapa 2D inferior explica secuencia, dirección y pertenencia. HBB y CA2 comparten lenguaje, y cada exón conserva identidad ordinal y cromática de ADN a proteína. Toda estación distingue dato real de modelo didáctico.

**Características clave:**

- Visor nocturno a pantalla útil completa como protagonista absoluto.
- Instrumentos compactos de vidrio oscuro anclados a la periferia.
- Corredor central despejado para modelos, etiquetas y manipulación orbital.
- Menta luminosa para acción; ámbar escaso para foco y rastreo.
- Mapa claro inmediatamente después de la escena.
- Transformaciones reversibles, progreso textual y evidencia visible.

**La regla de doble lectura.** El 3D explica volumen y transformación; el mapa 2D explica orden, dirección y segmentación. Ninguno sustituye al otro.

**La regla de evidencia honesta.** Una geometría didáctica nunca adopta el lenguaje de certeza de una estructura PDB.

## Colors

La paleta enfrenta noche azul petróleo, menta bioluminiscente, tinta editorial y papeles minerales fríos. Los valores del frontmatter son normativos.

### Primary

- **Verde observatorio** (`teal`): progreso, Profesor activo, START y estados sobre papel.
- **Menta bioluminiscente** (`mint` y `#66dbb9` en controles): acción primaria, estación actual, ARN y continuidad dentro del visor.
- **Verde profundo** (`teal-dark`): vínculos científicos y énfasis sobre papel.

### Secondary

- **Ámbar de rastreo** (`warm`): foco de teclado, locus/promotor, codón actual y exón seleccionado.
- **Coral funcional** (`danger` y variantes locales): STOP, alteración y advertencia molecular; no es el error global de formulario.

### Tertiary

- **Serie E1–E7** (`exon-1`…`exon-7`): identidad ordinal persistente; nunca se reasigna entre genes o estaciones.

### Neutral

- `night`/`night-secondary`: canvas, niebla, overlays y profundidad óptica.
- `ink`/`muted`: texto principal, ayudas y metadatos.
- `paper`/`paper-secondary`/`canvas`: mapa, diálogos y continuación del documento.
- `line`: bordes, divisores y controles claros.

Ruta y evidencia usan noche translúcida (`rgba(7,26,32,.82)`) con blur de 14px; el deck usa blur de 12px. El intro usa `rgba(3,15,19,.92)` con blur de 18px. Etiquetas ancladas usan `rgba(7,26,32,.88)` y tooltips `rgba(4,20,25,.96)`.

**La regla del color acompañado.** Exón, intrón, START, STOP, CDS, hebra y selección conservan nombre, número, forma, posición, escala o contorno además del color.

**La regla del ámbar escaso.** Señala el único foco relevante; no crea ambiente decorativo.

## Typography

**Display:** Barlow Condensed 800, local, fallback `sans-serif`.

**Body:** Atkinson 400/700, local, fallback `sans-serif`.
**Sequence:** `ui-monospace`, Consolas, `monospace`.

Barlow aporta escala editorial sin consumir el corredor; Atkinson sostiene lectura compacta; la monoespaciada aparece solo al comparar bases, codones, conteos o extremos.

### Hierarchy

- **Display** (800, `clamp(2rem,3.25vw,3.7rem)`, 0.9): estación, máximo 22ch en escritorio y 14–16ch en móvil.
- **Intro display** (800, `clamp(2.5rem,6vw,5.4rem)`, 0.87): única voz de bienvenida, máximo 18ch.
- **Title** (800, 1.05–1.28rem): objeto, diálogo y fallback.
- **Body** (400/700, 0.57–0.9rem): explicación, observación, regla y ayuda; 48–68ch.
- **Label** (700–900, 0.51–0.72rem): ruta, metadatos, badges y controles.
- **Sequence** (800, 0.72–0.78rem): bases, codones y 5′/3′.

**La regla de tres voces.** Barlow titula, Atkinson opera y la monoespaciada mide.

## Layout

La topbar sticky mide 64px y organiza marca (240px), contexto flexible y progreso (160px). El visor ocupa `calc(100svh - 64px)`, mínimo 680px, con canvas absoluto. Un degradado oscurece el primer 23% y el último 30% para proteger la lectura.

En escritorio, ruta y evidencia flotan a 18px de los bordes (194px y 288px). Título y controles respetan un corredor central de 232px a la izquierda y 326px a la derecha. El deck se ancla 58px sobre el borde inferior; navegación a 13px. El mapa aparece después del visor, máximo 1480px. Sus pistas conservan mínimos de 760px (gen) y 970px (ARNm) y desplazan horizontalmente.

El ritmo usa 0.25, 0.5, 0.75, 1, 1.25 y 1.5rem. El espacio amplio pertenece al modelo; los instrumentos usan 0.45–1rem.

### Responsive

- **≤1100px:** ruta 178px, evidencia 252px, corredor 212px/284px; datos en una columna.
- **≤820px:** topbar 58px; visor `max(760px,calc(100svh - 58px))`. Ruta horizontal de 46px arriba; se ocultan su título y calidad. Título, evidencia y controles se apilan dentro del visor. Evidencia limita altura a 220px y oculta datos secundarios; deck desplazable verticalmente. Desaparecen escala y ayuda gestual, no la escena.
- **≤470px:** marca abreviada, visor mínimo 780px, título 14ch, evidencia 168px y deck 228px. Ancho mínimo: 320px.
- **Cámara <520px:** posición z=13.5 en vez de 9; sitio activo usa z=8.6 fuera de ese caso.

**La regla de escena primero.** En móvil se comprime la instrumentación; el visor nunca baja detrás de evidencia ni se vuelve tarjeta.

**La regla de precisión desplazable.** Las secuencias se desplazan antes de perder etiquetas o proporción.

## Elevation & Depth

Fuera de WebGL, la profundidad procede de vidrio, blur, degradados y pocos levantamientos. Dentro, materiales translúcidos, rugosidad, transmisión, niebla y luces fría/cálida separan estructuras.

### Shadow Vocabulary

- **Overlay:** `0 18px 42px rgba(0,0,0,.2)`.
- **Tooltip:** `0 12px 28px rgba(0,0,0,.35)`.
- **Exón:** `0 5px 12px rgba(18,46,53,.12)`.
- **Selección:** `0 7px 15px rgba(20,42,49,.18)`.
- **Dock:** `0 16px 32px rgba(7,26,32,.3)`.
- **Diálogo:** `0 24px 60px rgba(0,0,0,.35)`.

**La regla de profundidad concentrada.** El relieve pertenece al instrumental flotante, interacción molecular y modales.

## Shapes

Acciones/navegación usan 8px; inputs 9px; grupos 10–12px; overlays y diálogo 14px. Píldoras completas se reservan para badges, progreso y estados. En 3D, hebras/proteínas son tubos, enlaces cilindros, membranas volúmenes translúcidos, codones bloques y cap 5′ un dodecaedro. Intrones 2D son arcos; exones, bloques sólidos.

**La regla de forma semántica.** Arco significa intrón; bloque, región retenida; transparencia, compartimento; píldora, estado breve.

## Components

### Visor y safe areas 3D

Canvas base con cámara FOV 42, niebla nocturna y luces fría/teal/ámbar. OrbitControls permite rotación y zoom 4.5–16, sin paneo ni giro automático. Alta usa antialias y DPR hasta 1.75; media hasta 1.25; `basic` activa fallback 2.5D.

- En escritorio, el volumen principal debe ser legible dentro del corredor x=232px / reserva derecha 326px.
- El tercio superior central protege título/reto; los últimos ~120px protegen deck, escala, navegación y captions.
- Etiquetas HTML: máximo 210px, fondo nocturno, borde tenue, `pointer-events:none`; hotspots abren tooltips de 210px por hover/click.
- 5′/3′, hebra, locus, START/STOP, sitios E/P/A y estatuto didáctico permanecen explícitos.
- En móvil, evitar ruta 0–54px, encabezado desde 66px, evidencia desde 174px y deck inferior. Reducir etiquetas simultáneas antes que su legibilidad.
- Resaltado exón→codón→residuo usa crema, escala/emisión y siempre se rotula como mapeo didáctico.

`prefers-reduced-motion` detiene flotación, hace inmediata la exportación y reduce CSS; conserva rotación/zoom manual y elimina solo el damping orbital.

### Instrumentación y controles

Ruta/evidencia usan noche al 82%, blur 14px, radio 14px. Deck: noche al 82%, blur 12px, radio 12px. El heading flota sin tarjeta. Ruta actual usa teal translúcido, número menta y chevron; completada usa check; futura opacidad .33 y bloqueo salvo Profesor.

Acción base: mínimo 36px, radio 8px, fondo petróleo y borde mineral. Primaria/seleccionada: menta con tinta oscura. Toggles usan `aria-pressed`; deshabilitados reducen opacidad. Cada grupo cierra con explicación de progreso o resultado.

Estados: carga/calidad, fallback, ruta actual/completa/bloqueada, hebra/región/marco/codón/exón/proteína, transcripción/exportación/traducción, fuentes, Profesor/PIN, Mol* y enlace RCSB. El mapa sincronizado combina contorno, desplazamiento, sombra, crema o marca inferior y conserva equivalente semántico.

### Accesibilidad

- Skip link y `main` semántico; foco ámbar de 3px con offset de 3px.
- `aria-pressed`, `aria-expanded`, diálogos, alerta y `aria-live`.
- Color acompañado por texto/número/forma/posición/contorno.
- Canvas complementado por controles HTML, explicación, regla y mapa semántico.
- Reduced motion elimina ambiente sin retirar control manual.

## Do's and Don'ts

### Do:

- **Do** tratar el canvas como superficie primaria y los paneles como instrumentos periféricos.
- **Do** preservar safe areas antes de añadir modelos o etiquetas.
- **Do** conservar E1–E7, 5′→3′, hebra, START, STOP, CDS y evidencia.
- **Do** mantener acciones reversibles, progreso textual y foco visible.
- **Do** alejar cámara y reducir etiquetas en móvil antes de encoger texto.
- **Do** distinguir Mol*/RCSB de geometría y trazabilidad didácticas.

### Don't:

- **Don't** reintroducir una cuadrícula clara de tres columnas ni encerrar el visor en una tarjeta.
- **Don't** colocar información crítica bajo ruta, evidencia, heading o deck.
- **Don't** usar color, brillo o animación como única explicación.
- **Don't** añadir partículas, giro automático o movimiento sin función pedagógica.
- **Don't** presentar rastreo por exón como correspondencia RefSeq/PDB exacta.
- **Don't** llamar “CDC” a la región codificante: siempre **CDS**.
- **Don't** afirmar que reduced motion deshabilita OrbitControls en 2.1.
