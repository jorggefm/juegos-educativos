---
name: "Expedición Hábitat"
description: "Una expedición científica cinematográfica para decidir, investigar y comprobar si una colonia sobreviviría."
colors:
  ink: "#f6fbff"
  muted: "#c4d5df"
  night: "#030b13"
  glass: "rgba(4,18,29,.76)"
  line: "rgba(185,226,244,.24)"
  sensor-cyan: "#67ddff"
  decision-yellow: "#ffd15a"
  survival-green: "#67e4a6"
  danger-red: "#ff796f"
  focus: "#fff2a5"
  control-blue: "#183d55"
  favorable-deep: "#145c50"
  critical-deep: "#6d292d"
  uncertain-deep: "#5d4b22"
typography:
  display:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(42px, 5vw, 70px)"
    fontWeight: 800
    lineHeight: 0.93
    letterSpacing: "-0.015em"
  briefing-display:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(54px, 8vw, 92px)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Atkinson, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: "Atkinson, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  tooltip: "7px"
  row: "10px"
  toast: "11px"
  control: "12px"
  action: "13px"
  result: "14px"
  panel: "16px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "10px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  frame: "24px"
  briefing: "34px"
components:
  button-primary:
    backgroundColor: "{colors.decision-yellow}"
    textColor: "{colors.night}"
    typography: "{typography.body}"
    rounded: "{rounded.action}"
    padding: "12px 16px"
    height: "54px"
  button-secondary:
    backgroundColor: "{colors.control-blue}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.action}"
    padding: "12px 16px"
    height: "54px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.action}"
    padding: "12px 16px"
    height: "54px"
  choice-default:
    backgroundColor: "rgba(23,56,74,.9)"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px"
    height: "58px"
  choice-selected:
    backgroundColor: "{colors.decision-yellow}"
    textColor: "{colors.night}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px"
    height: "58px"
  decision-panel:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "22px"
    width: "min(430px, calc(100vw - 48px))"
---

# Design System: Expedición Hábitat

## Overview

**Creative North Star: "El Observatorio en Órbita"**

Expedición Hábitat convierte una lección colectiva en una expedición científica cinematográfica. Un planeta de escala monumental ocupa el escenario completo mientras una consola translúcida reúne solo la evidencia y las decisiones necesarias. La interfaz se siente instrumental, legible y urgente sin adoptar la frialdad de un tablero administrativo.

La composición materializa la tesis pedagógica: primero se observa una impresión planetaria dominante y se compromete una decisión; después, la consola revela sensores, diagnóstico y supervivencia. El fondo mantiene asombro y contexto, mientras la superficie de vidrio oscuro protege la lectura desde un televisor y concentra la operación con un único mouse.

**Key Characteristics:**

- Planetas completos, fotográficos y de escala dominante como escenario de cada expediente.
- Consola científica flotante, estrecha y translúcida anclada a la derecha.
- Cian para instrumentación, amarillo para decisión y colores semánticos solo al emitir un diagnóstico.
- Titulares condensados de misión combinados con texto hiperlegible y generoso.
- Deriva planetaria, estrellas, barrido de escáner y trayectoria de aterrizaje como motion narrativo.
- Flujo visual único: briefing, cuatro diagnósticos y consejo final.

## Colors

La paleta combina la oscuridad azul-negra del espacio con luz instrumental fría y un único acento cálido reservado para comprometer decisiones.

### Primary

- **Amarillo de decisión** (`decision-yellow`): identifica la acción principal, la selección activa y la evidencia que exige atención; su calidez separa la voluntad humana de la instrumentación.
- **Cian de sensor** (`sensor-cyan`): comunica lectura, actividad, progreso y orientación científica sin competir con la llamada a la acción.

### Secondary

- **Verde de supervivencia** (`survival-green` y `favorable-deep`): aparece cuando la evidencia converge en un resultado favorable.
- **Rojo de riesgo** (`danger-red` y `critical-deep`): se reserva para fallos de supervivencia y diagnósticos críticos.
- **Ámbar de incertidumbre** (`uncertain-deep`): distingue evidencia insuficiente de una respuesta favorable o crítica.

### Neutral

- **Noche orbital** (`night`): base del lienzo y respaldo de contraste cuando la fotografía no está presente.
- **Vidrio de cabina** (`glass`): superficie principal de paneles que conserva contexto planetario sin sacrificar lectura.
- **Tinta estelar** (`ink`): texto y controles de máxima prioridad.
- **Lectura secundaria** (`muted`): instrucciones auxiliares, estados incompletos y metadatos discretos.
- **Línea atmosférica** (`line`): contornos tenues, divisores y límites del vidrio.
- **Halo de foco** (`focus`): indicador de teclado de alto contraste.

### Named Rules

**The Warm Decision Rule.** El amarillo pertenece a decisiones activas, selecciones y llamadas a la acción; no decora fondos ni texto ordinario.

**The Instrument Color Rule.** El cian señala lo que el sistema observa o reporta; el verde, rojo y ámbar solo aparecen cuando existe un juicio semántico.

## Typography

**Display Font:** Barlow Condensed ExtraBold (con `sans-serif` como respaldo)  
**Body Font:** Atkinson Hyperlegible (con Arial y `sans-serif` como respaldos)

**Character:** Barlow aporta la voz compacta, técnica y cinematográfica del mando de misión. Atkinson mantiene preguntas, informes y consecuencias legibles para un grupo que observa desde lejos; la dupla separa atmósfera de comprensión sin introducir ornamento.

### Hierarchy

- **Briefing Display** (800, fluido de 54px a 92px, 0.88): pregunta inicial y promesa dramática de la experiencia.
- **Display** (800, fluido de 42px a 70px, 0.93): planeta, diagnóstico y consejo de misión.
- **Result Title** (800, 32px, 1): consecuencia de supervivencia dentro del bloque semántico.
- **Body** (400, 20px, 1.35): narración, preguntas y explicaciones principales.
- **Evidence Reading** (400, 22px): dato revelado por cada sensor; debe dominar el contenido de la consola durante el diagnóstico.
- **Label** (700, 16–18px): condición, metadatos, botones y rótulos en mayúsculas.

### Named Rules

**The Mission Voice Rule.** Barlow se limita a nombres de mundos, títulos de fases y resultados; las decisiones y la evidencia siempre se leen en Atkinson.

**The Television Test.** Ninguna decisión operable baja de 17px ni de 47px de altura en los estados compactos implementados.

## Layout

La simulación ocupa el viewport completo y oculta el scroll del documento. El mundo se extiende ligeramente fuera del marco para permitir deriva sin revelar bordes; una superposición oscura refuerza el contraste hacia la consola y en el borde inferior. En escritorio, la consola se ancla a 24px de la derecha, entre 82px y 24px de los límites verticales, con un ancho máximo de 430px. La barra de misión vive arriba y el progreso de cuatro mundos se agrupa abajo a la izquierda, dejando el planeta casi intacto.

El briefing reemplaza esa geometría con una tarjeta central de hasta 760px. La consola usa flujo vertical y empuja las acciones al fondo cuando hay altura disponible. Las selecciones binarias se organizan en dos columnas, los diagnósticos en tres y el consejo final en una cuadrícula de dos por dos.

A 850px o menos, la consola se convierte en una lámina casi completa con márgenes de 12px, la grilla de evidencia pasa a una columna, el protocolo del briefing se apila y el progreso orbital desaparece. Por debajo de 700px de alto, la densidad aumenta: se reducen padding, cuerpo, nombres de planeta y alturas de control, manteniendo objetivos táctiles grandes.

**The Planet-First Rule.** En el primer viewport, el mundo debe seguir siendo reconocible de cuerpo completo y la consola debe leerse como instrumento flotante, no como página principal opaca.

## Elevation & Depth

La profundidad es un híbrido de fotografía, vidrio y sombra ambiental. El planeta establece la capa más profunda; estrellas y barridos añaden parallax perceptual; el panel usa desenfoque y saturación de fondo para sentirse como cristal de cabina. Las sombras son difusas y amplias, nunca duras: separan controles y superficies del fondo irregular sin simular tarjetas apiladas.

### Shadow Vocabulary

- **Consola flotante** (`0 20px 60px rgba(0,0,0,.38)`): separa la consola de decisión del planeta.
- **Briefing de mando** (`0 30px 90px #000`): concentra el comienzo de la misión y suspende temporalmente el resto de la interfaz.
- **Acción primaria** (`0 10px 26px rgba(0,0,0,.3)`): eleva la decisión comprometida sobre acciones secundarias.
- **Control de cabina** (`0 8px 20px rgba(0,0,0,.2)`): mantiene legibles los controles superiores sobre cualquier mundo.
- **Sensor activo** (`0 0 14px var(--cyan)`): halo compacto para actividad instrumental, no para decoración general.

### Named Rules

**The Atmospheric Depth Rule.** El vidrio y las sombras existen para conservar el planeta detrás y asegurar lectura; nunca deben multiplicar capas administrativas dentro de la consola.

## Shapes

La geometría combina placas suavemente redondeadas con indicadores orbitales circulares. Paneles y briefing comparten esquinas de 16px; acciones y selecciones se mueven entre 12px y 14px; filas de registro son más compactas con 10px. Los círculos se reservan para planeta, órbita, estado y progreso, preservando una asociación clara entre forma y mundo.

Los bordes son líneas atmosféricas de un píxel y baja opacidad. Los resultados no cambian de material: conservan un fondo profundo y reciben un contorno interior semántico, evitando bloques saturados que compitan con la imagen.

**The Orbital Geometry Rule.** Usa círculos para mundo, trayectoria o estado puntual; usa rectángulos redondeados para información y decisiones.

## Components

### Buttons

- **Shape:** acción amplia y táctil con esquinas suaves (13px), altura mínima de 54px y padding de 12px por 16px.
- **Primary:** amarillo de decisión con texto nocturno y sombra ambiental; representa el compromiso o el avance principal.
- **Secondary:** azul profundo con tinta estelar; ofrece una alternativa real sin disputar jerarquía.
- **Ghost:** vidrio transparente y línea atmosférica; se usa para reinicio o acción auxiliar.
- **Semantic:** verde, rojo y ámbar profundos distinguen diagnósticos favorables, críticos e inciertos.
- **Hover / Focus:** todos los botones se elevan 2px en 160ms; el foco visible es un halo sólido de 3px con 3px de separación.

### Chips

- **Style:** el progreso de mundos usa discos de 54px con vidrio nocturno, línea atmosférica y número centrado.
- **State:** el mundo activo se llena de amarillo; el expediente completado adopta vidrio verde oscuro y texto verde; el nombre aparece como tooltip oscuro al pasar el cursor.

### Cards / Containers

- **Corner Style:** paneles mayores de 16px, resultados de 14px y filas internas de 10px.
- **Background:** vidrio de cabina translúcido sobre fotografía; filas y resultados usan azules nocturnos más densos.
- **Shadow Strategy:** una única sombra ambiental por superficie principal; los contenedores internos se separan con tono o contorno interior.
- **Border:** línea atmosférica de 1px en paneles y controles que necesitan límite.
- **Internal Padding:** 22px en la consola, 34px en el briefing y 16px en resultados.

### Inputs / Fields

No existen campos de texto. La entrada del grupo ocurre mediante opciones discretas y grandes. Las opciones de sensor usan tres botones iguales; el estado seleccionado invierte a amarillo de decisión con texto nocturno.

### Navigation

La navegación es temporal y espacial: marca de misión y utilidades arriba, progreso orbital abajo a la izquierda y avance de fase dentro de la consola. En vistas estrechas se oculta el progreso y el control de sonido para priorizar la tarea, manteniendo pantalla completa y la consola.

### Decision Console

La consola es el componente firma. Se comporta como una única superficie persistente que cambia de contenido entre primera impresión, sensores, diagnóstico, consecuencia y consejo. Debe preservar su anclaje, material y jerarquía mientras el planeta y la evidencia cambian.

### Sensor Report

Un par de divisores encierra la lectura del sensor. El rótulo amarillo identifica la revelación y el dato a 22px recibe prioridad sobre la pregunta posterior. Las respuestas se convierten en un registro compacto antes de pedir el diagnóstico integral.

### Motion Grammar

El planeta deriva lentamente durante 18 segundos; el escáner cruza la escena en 1.8 segundos al cargar un expediente; el aterrizaje recorre la diagonal en 1.35 segundos. Pulso y sacudida comunican resultado, mientras el toast entra con una curva rápida y controlada. `prefers-reduced-motion` reduce todas las animaciones a una sola fracción de milisegundo y detiene la animación continua del canvas.

## Do's and Don'ts

### Do:

- **Do** deja que un planeta o fenómeno celeste domine el escenario antes de revelar la evidencia.
- **Do** conserva una sola consola persistente para decisión, sensor, diagnóstico y resultado.
- **Do** usa amarillo para comprometer acciones y cian para comunicar instrumentación o progreso.
- **Do** expresa resultados con contorno, título y movimiento semántico, no solo con color.
- **Do** mantiene controles legibles desde un televisor y operación completa con mouse.
- **Do** respeta reducción de movimiento en deriva, escaneo, aterrizaje y feedback.

### Don't:

- **Don't** conviertas el planeta en una miniatura, tarjeta o decoración secundaria detrás de una página opaca.
- **Don't** añadas barras laterales, métricas, puntajes o densidad de dashboard que rompa el ritmo de expedición.
- **Don't** uses verde o rojo antes de que exista evidencia suficiente para un diagnóstico.
- **Don't** disperses decisiones fuera de la consola ni agregues confirmaciones redundantes.
- **Don't** uses Barlow para párrafos, instrucciones largas o lecturas de sensor.
- **Don't** introduzcas neones múltiples, bordes brillantes o sombras duras que compitan con el mundo fotográfico.
