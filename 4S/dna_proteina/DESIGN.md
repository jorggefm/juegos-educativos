---
name: ProteinLab 2.0
description: Observatorio molecular multiescala para seguir ADN → ARN → proteína.
colors:
  ink: "#142a31"
  muted: "#536d74"
  canvas: "#dfe8e9"
  paper: "#f9fbfa"
  paper-secondary: "#eef3f2"
  line: "#cad7d8"
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
    fontSize: "clamp(1.8rem, 3.2vw, 3.15rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 400
  label:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "0.63rem"
    fontWeight: 800
    letterSpacing: "0.08em"
  sequence:
    fontFamily: "ui-monospace, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 800
rounded:
  xs: "5px"
  sm: "6px"
  control: "9px"
  route: "10px"
  panel: "12px"
  sequence: "13px"
  viewport: "16px"
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
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.52rem 0.75rem"
    height: "39px"
  action-primary:
    backgroundColor: "{colors.teal}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.52rem 0.75rem"
    height: "39px"
  viewport:
    backgroundColor: "{colors.night}"
    textColor: "#ffffff"
    rounded: "{rounded.viewport}"
    height: "clamp(450px, 57vh, 660px)"
  sequence-map:
    backgroundColor: "{colors.paper-secondary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sequence}"
  evidence-badge:
    backgroundColor: "#d6eee8"
    textColor: "#075a53"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.6rem"
---

# Design System: ProteinLab 2.0

## Overview

**Creative North Star: “El observatorio editorial”**

ProteinLab combina dos registros que cumplen tareas distintas: un laboratorio editorial claro organiza decisiones, evidencia y lectura; un visor nocturno, material y volumétrico concentra la observación molecular. La escena 3D es el objeto dominante y el mapa 2D inmediatamente inferior aporta posición, dirección y conteo. No son vistas alternativas: trabajan sincronizadas sobre la misma estación.

La experiencia es densa pero jerarquizada para estudiantes de 4.º y 5.º de secundaria. Cada estación formula una pregunta, identifica el estatuto de la evidencia, ofrece una transformación manipulable y cierra con una regla breve. HBB y CA2 comparten exactamente el mismo lenguaje visual; el nivel 5.º añade datos y sitios ribosomales sin crear una interfaz paralela.

El sistema expresa continuidad causal mediante identidad persistente: un exón conserva color, número y selección al pasar por ADN, ARN, marcos, traducción y proteína. La interfaz debe seguir declarando cuándo algo es dato real y cuándo es un modelo didáctico.

**Características clave:**

- Escena 3D oscura y dominante dentro de una arquitectura científica clara.
- Diez estaciones ordenadas desde célula y locus hasta proteína experimental.
- Mapa 2D siempre próximo a la escena para anotar lo que el 3D representa.
- Verde petróleo para acción y estado; ámbar para atención, foco y selección.
- Rotulación compacta, numérica y explícita en dirección 5′→3′.
- Controles reversibles o paso a paso en transcripción, maduración, exportación, marcos y traducción.

**La regla de doble lectura.** El 3D explica espacio, estructura y transformación; el mapa 2D explica secuencia, dirección y pertenencia. Ninguna capa reemplaza a la otra.

**La regla de evidencia honesta.** Todo encabezado de estación conserva una insignia visible de dato real o modelo didáctico, y las fuentes se mantienen accesibles desde el panel de evidencia.

## Colors

La paleta enfrenta papel mineral frío y tinta azul verdosa con un campo nocturno profundo. El verde petróleo señala acciones y estados; el ámbar se reserva para atención, foco y continuidad seleccionada.

### Primary

- **Verde observatorio** (`teal`): acciones primarias, estación activa, progreso, START y controles seleccionados.
- **Verde profundo** (`teal-dark`): hover primario, vínculos científicos, dirección y texto enfático sobre superficies claras.
- **Menta molecular** (`mint`): acentos luminosos, ARN y estados de carga dentro del visor.

### Secondary

- **Ámbar de rastreo** (`warm`): codón en lectura, foco global, locus y llamadas de atención. La selección de exón usa además un resaltado crema y contorno ámbar.
- **Coral codificante** (`danger` y variantes locales): CDS, STOP o énfasis proteico según el objeto. No funciona como mensaje de error global en la versión enviada.

### Tertiary

- **Serie de exones 1–7** (`exon-1`…`exon-7`): identidad ordinal persistente para HBB y CA2. El orden de la serie no se reasigna entre estaciones.

### Neutral

- **Tinta científica** (`ink`): texto principal, botones de avance y superficies de alto contraste.
- **Texto sedimentario** (`muted`): metadatos, ayudas y descripciones secundarias.
- **Papel de laboratorio** (`paper`): riel, columna central y panel de evidencia.
- **Papel mineral** (`paper-secondary`): mapas y agrupaciones internas.
- **Línea fría** (`line`): divisores de un píxel, bordes de controles y separación estructural.
- **Campo nocturno** (`night`, `night-secondary`): visor WebGL, fallback y overlays de escena.
- **Lienzo exterior** (`canvas`): fondo fuera de las superficies de trabajo.

**La regla del color acompañado.** Exón, intrón, START, STOP, CDS y selección deben conservar texto, número, forma, posición o contorno además del color. Los exones son E1–E7; los intrones I1–I6; los extremos y regiones siempre llevan nombre.

**La regla del ámbar escaso.** El ámbar identifica foco de teclado, exón seleccionado, codón actual o locus; no se usa como decoración ambiental.

## Typography

**Display Font:** Barlow Condensed 800, servida localmente con fallback `sans-serif`.  
**Body Font:** Atkinson 400/700, servida localmente con fallback `sans-serif`.  
**Sequence Font:** `ui-monospace`, Consolas, `monospace`.

La combinación es científica y editorial: Barlow Condensed produce títulos compactos de alto impacto sin robar ancho al visor; Atkinson sostiene lectura funcional a tamaños reducidos; la monoespaciada marca únicamente bases, codones y extremos.

### Hierarchy

- **Display** (800, escala fluida, interlínea 0.92): título de la estación, máximo aproximado de 23 caracteres tipográficos por línea y texto balanceado.
- **Title** (800, 1.35rem, interlínea 1): objeto actual, títulos de fallback y encabezados compactos.
- **Body** (400/700, principalmente 0.70–0.74rem): reglas, ayudas, función del gen, datos y controles. La regla central limita su línea a 68ch.
- **Label** (700–900, 0.56–0.72rem, espaciado 0.05–0.08em): metadatos y navegación; suele ir en mayúsculas.
- **Sequence** (800, 0.72–0.74rem): codones, nombres de aminoácidos, conteos y marcas 5′/3′.

**La regla de tres voces.** Barlow se reserva para títulos de estación y objeto; Atkinson gobierna la interfaz; la monoespaciada aparece solo donde el ancho constante ayuda a leer secuencias o coordenadas.

## Layout

La composición de escritorio usa una cabecera sticky de 70px y una rejilla de observatorio de tres columnas: ruta de 215px, columna principal flexible con mínimo de 590px y evidencia de 270px. Separadores de un píxel forman la estructura. Los rieles laterales son sticky, ocupan la altura restante del viewport y desplazan su contenido de manera independiente.

La columna principal mantiene este orden fijo: encabezado de estación, visor, mapa de secuencia, controles de transformación y navegación anterior/siguiente. El visor mide `clamp(450px, 57vh, 660px)`; es el área visual dominante. El mapa se coloca a 0.85rem del visor y permite desplazamiento horizontal para preservar legibilidad molecular en lugar de comprimir segmentos.

El ritmo usa incrementos recurrentes de 0.25, 0.5, 0.75, 1, 1.25 y 1.5rem. El padding central es fluido entre 1 y 1.7rem; botones y etiquetas usan densidad compacta porque la escena recibe la mayor parte del área.

### Responsive

- **Hasta 1180px:** la rejilla pasa a ruta de 190px + escena con mínimo de 550px. Evidencia baja a una fila completa de cuatro zonas; deja de ser sticky.
- **Hasta 820px:** cabecera de 62px; la interfaz pasa a un solo flujo. La ruta se convierte en tira horizontal sticky; se ocultan su título y el selector de calidad. La escena sigue antes que evidencia, con altura `min(64vh, 560px)` y mínimo de 430px. El mapa sigue siendo desplazable. La evidencia pasa debajo y la navegación apila su regla sobre dos botones.
- **Hasta 470px:** se oculta el nombre de marca, el título limita su ancho a 15ch, el visor conserva un mínimo de 400px y las acciones se expanden para aprovechar el ancho. La aplicación establece 320px como ancho mínimo soportado.

**La regla de escena primero.** En pantallas pequeñas se reordena la periferia, pero nunca se convierte la experiencia en una colección de tarjetas ni se desplaza la escena por debajo del panel de evidencia.

**La regla de precisión desplazable.** Las pistas genómicas y de ARNm conservan mínimos de 620px y 720px; en pantallas estrechas se desplazan horizontalmente en vez de deformar proporciones o borrar etiquetas.

## Elevation & Depth

El sistema es plano y lineal fuera del visor: el papel, los fondos tonales y las divisiones de un píxel definen jerarquía. La profundidad se concentra en la escena molecular y en pocos objetos que deben sentirse levantados.

### Shadow Vocabulary

- **Visor dominante** (`0 18px 42px rgba(8,30,36,.18)`): separa el campo 3D nocturno del papel.
- **Segmento molecular** (`0 5px 12px rgba(18,46,53,.12)`): levanta exones interactivos sobre la pista.
- **Región activa** (`0 7px 15px rgba(20,42,49,.18)`): acompaña el desplazamiento vertical de una región del ARNm.
- **Dock docente** (`0 16px 32px rgba(7,26,32,.26)`): mantiene visible el control flotante sobre el contenido.

En WebGL, iluminación ambiental, luz direccional fría, niebla nocturna y materiales con rugosidad/transmisión distinguen membrana, ADN, ARN, complejos y proteína. La escena evita partículas decorativas y rotación automática.

**La regla de profundidad concentrada.** Las sombras pertenecen al visor, a selección molecular y al dock docente; no se añaden a paneles de datos ordinarios.

## Shapes

La interfaz usa rectángulos suavemente redondeados y cápsulas solo para estados compactos. Controles estándar tienen 9px; ruta y agrupaciones usan 10–13px; el visor usa 16px en escritorio y 13px en móvil. Insignias, progreso, caperuza y contadores circulares usan radio completo.

Las formas moleculares diferencian función: hebras como tubos, enlaces como cilindros, membranas y complejos como volúmenes translúcidos, codones/regiones como bloques redondeados y cap 5′ como poliedro. Los intrones 2D se dibujan como arco elevado sobre una base, no como una línea plana indistinta.

**La regla de forma semántica.** Una píldora significa estado o dato breve; una tarjeta redondeada agrupa contenido; un arco señala intrón; un bloque sólido señala región retenida o codón.

## Components

### Topbar y selección de contexto

Cabecera sticky con marca, selector HBB/CA2, control segmentado 4.º/5.º, modo Profesor y progreso porcentual. Los controles activos cambian a verde observatorio con texto blanco. En móvil desaparecen texto auxiliar, progreso y parte de la marca; “Profesor” se abrevia visualmente a “P” pero conserva su nombre accesible en el botón.

### Ruta molecular

Lista numerada de diez estaciones. La estación actual usa fondo verde pálido, número blanco sobre verde y chevron visible; las completadas muestran verificación sobre tinta; las futuras no desbloqueadas reducen opacidad y quedan deshabilitadas. El modo Profesor permite saltar de estación. En móvil la lista se vuelve horizontal y desplazable.

### Encabezado de estación

Compone título display, reto en una pastilla mineral y badge de evidencia. `DATO REAL` usa verde pálido; cualquier evidencia que contenga `MODELO` usa fondo crema y texto ocre. La jerarquía siempre responde: qué observar, qué explicar y con qué estatuto científico.

### Visor molecular 3D

Superficie nocturna con React Three Fiber, cámara de perspectiva, niebla, luces y OrbitControls. Arrastre rota; rueda acerca entre distancias acotadas; no hay paneo. Un reset de estación y una regla CÉLULA—GEN—ARN—PROTEÍNA se superponen al canvas. Las etiquetas HTML ancladas usan fondo nocturno translúcido, borde tenue y tonos claro, menta o ámbar.

La calidad se detecta al iniciar: sin WebGL se usa `basic`; con WebGL, memoria y núcleos estimados separan `high` y `medium`. Alta eleva densidad, antialiasing y DPR; media reduce geometría/DPR. El usuario puede cambiarla en escritorio.

### Mapa de secuencia sincronizado

Panel mineral inmediatamente bajo el visor con encabezado de contexto y aviso `CAMBIO DE ESCALA`, `TRANSFORMACIÓN` o `ANOTACIÓN SINCRONIZADA`.

- En gen/pre-ARNm, exones E1–E7 son botones coloreados y los intrones I1–I6 son arcos etiquetados.
- En ARNm maduro, CAP, 5′ UTR, AUG/START, CDS, STOP, 3′ UTR y poli-A ocupan bloques separados; la región elegida sube 3px y gana sombra.
- En ORF/traducción, cada codón es una celda monoespaciada; START y STOP tienen rellenos propios y el codón actual recibe contorno ámbar.
- Toda la estructura tiene una tabla equivalente solo para lectores de pantalla.

### Rastreo didáctico de identidad

La selección de un exón nace en el mapa 2D y permanece en el estado de la aplicación al cambiar de estación. La escena 3D la traduce a enlaces resaltados en ADN y ARN, escala de bloques ORF, aminoácidos destacados y un tramo crema sobre la proteína. El mapa de codones añade una marca inferior al grupo atribuido. Cambiar de gen reinicia la selección en E1.

Este trazado es explícitamente didáctico: la atribución de codones, aminoácidos y tramos de proteína se distribuye por índice/módulo del número de exones, no por límites RefSeq residuo a residuo. Nunca debe presentarse como anotación experimental exacta.

### Controles de estación

Botones compactos de 39px mínimo, radio de 9px y peso 800. Primario/seleccionado usa verde con texto blanco; secundario usa papel blanco y borde frío; hover secundario adopta papel mineral y borde verdoso; hover primario oscurece a verde profundo. Los toggles exponen `aria-pressed`.

Las acciones representan transformaciones observables: entrar, acercar, aislar hebra, copiar 1/3 bases, completar, añadir/quitar cap, splicing y poli-A, atravesar/regresar, elegir región o marco, leer codón y abrir Mol*. La estación termina con navegación anterior/siguiente y una regla textual centrada.

### Panel de evidencia

Panel lateral con objeto actual, datos HBB/CA2, dirección, regla clave, función y fuentes expandibles. El nivel 5.º añade transcrito, proteína y coordenadas. NCBI Gene, RefSeq y RCSB PDB se abren en una sección desplegable; los modelos celulares se declaran como didácticos.

### Modo Profesor

Dock nocturno flotante con acciones para mostrar la solución de la estación y reiniciar. En móvil pasa a sticky al final del flujo. La solución completa estados manipulables, pero no sustituye la explicación textual.

### Estados, motion y reduced motion

- La carga diferida del módulo 3D muestra icono pulsante, nombre de la preparación y calidad activa.
- Las moléculas tienen una flotación sinusoidal lenta; exportación interpola la posición del ARNm; regiones y chevrons usan transiciones de 0.18–0.2s; el loader pulsa durante 1.4s.
- Con `prefers-reduced-motion`, la flotación se pausa, la exportación salta al estado final, OrbitControls queda deshabilitado y CSS reduce animaciones/transiciones a 0.01ms.
- La progresión conserva la estación más lejana alcanzada; las estaciones futuras quedan bloqueadas salvo en modo Profesor.
- Cambiar HBB/CA2 reinicia transcripción, maduración, marco, traducción, exón, hebra, exportación y Mol*.

### Accesibilidad

- Enlace de salto visible al recibir foco y destino semántico en la escena principal.
- Contorno de foco global ámbar de 3px con offset de 3px para botones, enlaces y selects.
- `aria-pressed` en estados seleccionables, `aria-expanded` en fuentes, etiquetas de navegación y controles, y región `aria-live` que anuncia objeto, exón y regla.
- Mapa completo duplicado como tabla semántica para tecnologías de asistencia.
- Texto, número, posición, forma y contorno acompañan la codificación cromática.
- Los controles nativos mantienen operación por teclado; el canvas es complementado por controles HTML y explicación textual.

### Fallback y degradación

La calidad `basic` y cualquier error capturado por el boundary sustituyen WebGL por una vista molecular 2.5D dentro del mismo visor. El fallback conserva el número de estación, una silueta que cambia por etapa y el mensaje de que dirección, segmentos y controles siguen disponibles. El mapa 2D y todos los controles React permanecen funcionales.

La etapa proteica puede abrir un iframe Mol* para la primera estructura PDB del gen y ofrece además un enlace directo a RCSB. La caption identifica PDB, Mol* y carácter experimental.

### Límites conocidos de la versión enviada

- Las diez estaciones sustituyen componentes 3D por estado; no existe todavía una cámara continua con zoom semántico entre escalas.
- La vista 2.5D es una abstracción genérica, no una imagen precalculada específica para cada molécula.
- Mol* depende de red y no tiene estado propio de carga, timeout o error; el enlace RCSB es la salida alternativa visible.
- No hay estados específicos para error de red, secuencia discrepante, PDB ausente o pérdida/restauración del contexto WebGL más allá del boundary genérico.
- `prefers-reduced-motion` desactiva también la rotación/zoom orbital y el cambio de estación aún solicita scroll suave desde JavaScript.
- El nivel de calidad puede verse y cambiarse solo en escritorio; se oculta bajo 820px.
- El mapa accesible describe la anatomía completa, pero no anuncia cada variación visual de frame o progreso de traducción celda por celda.
- La continuidad exón→codón→residuo es didáctica, no una trazabilidad RefSeq/PDB exacta.

## Do's and Don'ts

### Do:

- **Do** mantener el visor nocturno como protagonista y el mapa 2D inmediatamente relacionado con él.
- **Do** conservar el orden visual y cromático E1–E7 en HBB y CA2, acompañado siempre por números y estados de selección.
- **Do** declarar 5′→3′, hebra, START, STOP, CDS y estatuto de evidencia donde sean relevantes.
- **Do** describir cada acción por su transformación molecular observable y ofrecer progreso o resultado textual.
- **Do** conservar equivalentes HTML/tabla, foco visible y controles nativos aunque cambie la escena WebGL.
- **Do** distinguir estructura experimental RCSB de geometría celular o molecular didáctica.
- **Do** mantener la escena primero y permitir desplazamiento horizontal de las pistas en móvil.

### Don't:

- **Don't** convertir la experiencia en tarjetas desconectadas ni separar el mapa de la estación que anota.
- **Don't** usar color como única evidencia de exón, intrón, región o estado.
- **Don't** presentar el rastreo didáctico por exones como correspondencia exacta de coordenadas, codones o residuos.
- **Don't** añadir sombras a cada panel ni competir con la profundidad reservada al visor.
- **Don't** usar animación ambiental, partículas o giro permanente sin función pedagógica.
- **Don't** llamar “CDC” a la región codificante: el término de interfaz es siempre **CDS**.
- **Don't** afirmar que la navegación actual implementa una cámara continua o un zoom semántico completo.
