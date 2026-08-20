# ProteinLab 2.0 · Brief de diseño 3D

**Estado:** diseño de producto para confirmación  
**Destino:** web conectada → GitHub → prueba final → Railway  
**Casos iniciales:** HBB y CA2  
**Modo de la experiencia:** operar, observar y explicar

## 1. Trabajo y audiencia

ProteinLab debe permitir que estudiantes de 4.º y 5.º de secundaria sigan una misma información molecular desde el ADN hasta una proteína. La experiencia ocurre durante una clase, una demostración proyectada o una exploración individual.

El problema principal no es presentar definiciones: es evitar que el estudiante reciba diagramas separados y crea que gen, pre-ARNm, ARNm, CDS, ORF y proteína son objetos sin continuidad.

La aplicación tendrá una sola experiencia con profundidad regulable:

- **4.º:** objeto, proceso, dirección, qué cambia y qué permanece.
- **5.º:** secuencia, coordenadas, accesiones, hebra, UTR, CDS, ORF, marcos, variantes y evidencia.
- **Profesor:** saltar de escena, pausar, reiniciar, mostrar solución y fijar el nivel.

## 2. Resultado y prueba

Al terminar, el estudiante debe poder explicar y mostrar en la escena:

1. dónde se encuentra un gen;
2. qué son exones e intrones;
3. qué hebra se usa como molde;
4. cómo se forma y madura el pre-ARNm;
5. cómo el ARNm sale del núcleo;
6. dónde están 5′ UTR, START, CDS, STOP y 3′ UTR;
7. por qué ORF y CDS no son exactamente lo mismo;
8. cómo se lee el ARNm 5′→3′ por codones;
9. cómo aparece la cadena de aminoácidos y luego una proteína tridimensional.

La prueba específica del producto es la persistencia: un exón seleccionado debe conservar identidad, color, nombre y procedencia al pasar de ADN a pre-ARNm, ARNm y CDS.

## 3. Dirección seleccionada

### Observatorio molecular multiescala

La pantalla funciona como un observatorio científico. Una escena 3D continua ocupa el área principal. La cámara cambia de escala y contexto sin cortar la historia: célula → núcleo → cromatina → gen → doble hélice → transcrito → poro nuclear → ribosoma → proteína.

Sobre esa escena existe una capa de lectura precisa que puede desplegarse como un mapa de secuencia. El 3D explica espacio, estructura y transformación; el plano explica anotación, posición, dirección y conteo. Ninguna de las dos capas intenta sustituir a la otra.

### Momento focal

El ARNm maduro atraviesa un poro nuclear. El estudiante ve simultáneamente:

- el núcleo que queda detrás;
- el extremo 5′ que cruza primero en el modelo;
- la caperuza, los exones unidos y la cola poli-A;
- el cambio de contexto hacia el citoplasma;
- el ribosoma que espera fuera del núcleo.

Este movimiento une maduración y traducción en una sola geografía celular.

### Interacción característica

**Zoom semántico:** la rueda, el gesto o el control de escala no solo acerca la cámara; cambia el nivel de representación. Una cromatina deja de ser fibra, se convierte en nucleosomas, luego en doble hélice y finalmente en bases legibles. Cada cambio anuncia si es zoom, transformación molecular o cambio de representación.

## 4. Topología general

```text
┌──────────────────────────────────────────────────────────────┐
│ ProteinLab · caso · nivel · progreso · profesor             │
├───────────────┬──────────────────────────────┬───────────────┤
│ RUTA          │                              │ OBJETO ACTUAL │
│ MOLECULAR     │       ESCENA 3D VIVA         │ evidencia     │
│               │                              │ datos reales  │
│ escalas       │  anotaciones sobre el mundo  │ regla clave   │
├───────────────┴──────────────────────────────┴───────────────┤
│ MAPA DE SECUENCIA · 5′ UTR · EXONES · CDS · 3′ UTR         │
├──────────────────────────────────────────────────────────────┤
│ reto / controles / explicación / siguiente transformación   │
└──────────────────────────────────────────────────────────────┘
```

En móvil, la escena permanece primero; ruta, evidencia y mapa de secuencia se abren como paneles inferiores. No se reduce el producto a tarjetas.

## 5. Secuencia de escenas

### Escena A · Célula y núcleo

- Célula humana estilizada, no anatómicamente inventada.
- Núcleo claramente delimitado, citoplasma y poros nucleares visibles.
- El estudiante entra al núcleo mediante la cámara.
- Objetivo: situar transcripción y maduración dentro del núcleo, y traducción fuera.
- Fidelidad: representación celular didáctica 3D, etiquetada como modelo.

### Escena B · Cromosoma, cromatina y locus

- Cromosoma correspondiente a HBB o CA2.
- Transición de cromosoma condensado a fibra de cromatina.
- Nucleosomas visibles antes de llegar a la doble hélice.
- Locus real destacado: 11p15.4 para HBB y 8q21.2 para CA2.
- La interfaz distingue claramente “cambio de escala” de “cambio molecular”.

### Escena C · ADN y anatomía del gen

- Doble hélice 3D reconocible, con dos hebras y extremos 5′/3′.
- Zona del gen extendida en una pista de anotación sincronizada.
- Exones como segmentos sólidos numerados; intrones como tramos intermedios, nunca como líneas indistinguibles.
- Hebra codificante y molde pueden aislarse sin desarmar visualmente la hélice.
- En 5.º aparecen coordenadas y orientación positiva/negativa.
- La escena debe soportar 3 exones de HBB y 7 de CA2 sin perder legibilidad.

### Escena D · Transcripción

- Burbuja de transcripción abierta sobre el ADN.
- ARN polimerasa como complejo molecular didáctico con volumen, cavidad y dirección.
- La hebra molde entra 3′→5′; el ARN naciente sale 5′→3′.
- Las bases se emparejan una a una y pueden avanzar de una o tres bases.
- Un visor ampliado permite leer A–U y G–C sin obligar a interpretar toda la escena 3D.
- Exones e intrones conservan su identidad en el ARN naciente.

### Escena E · Pre-ARNm y maduración nuclear

- El pre-ARNm flota dentro del núcleo como una cadena flexible anotada.
- **Cap 5′:** se añade como una modificación diferenciada, no como otro exón.
- **Splicing:** el spliceosoma aproxima los límites, forma un lazo intrónico conceptual, separa el intrón y une exones.
- **Poliadenilación:** se muestra corte del extremo y adición de la cola poli-A; no se representa como copia de una región larga de timinas.
- Control temporal reversible: original → cap → intrón seleccionado → exones unidos → poli-A.
- Comparador simultáneo: gen / pre-ARNm / ARNm maduro.

### Escena F · Exportación por el poro nuclear

- ARNm maduro empaquetado como mRNP didáctica.
- Cámara acompaña el tránsito por un complejo de poro nuclear.
- El núcleo y el citoplasma usan iluminación distinta para dejar claro el cambio de compartimento.
- Se conserva la dirección 5′→3′ durante el movimiento.
- Al completar el tránsito aparece el ribosoma en el horizonte de la escena.

### Escena G · Anatomía del ARNm maduro

- La molécula 3D permanece visible, pero el mapa de secuencia pasa a primer plano.
- Cap 5′, 5′ UTR, START, CDS, STOP, 3′ UTR y poli-A tienen regiones separadas y etiquetadas.
- START se muestra como AUG en ARN; STOP puede ser UAA, UAG o UGA.
- La CDS incluye la región anotada desde START hasta STOP según la convención del registro mostrado.
- La interfaz corrige “CDC” y usa siempre **CDS**.

### Escena H · Explorador ORF/CDS

- La misma secuencia se desplaza en tres marcos de lectura del ARNm.
- Cada marco agrupa bases en tripletes distintos.
- START y STOP son bloques legibles, no simples cambios de color.
- Se destacan ORF candidatos y se superpone la CDS anotada.
- Explicación central: ORF es una posibilidad definida por la secuencia; CDS es una región respaldada por anotación/evidencia que produce un producto.
- Nivel avanzado opcional: comparación con ORFfinder y explicación de los seis marcos al analizar ADN de doble hebra.

### Escena I · Ribosoma y traducción

- Ribosoma con subunidades distinguibles y canal para el ARNm.
- El ARNm entra y avanza 5′→3′.
- ARNt llega con anticodón complementario y aminoácido asociado.
- Los sitios A, P y E aparecen en modo 5.º.
- Cada avance mueve exactamente un codón y alarga la cadena un aminoácido.
- STOP convoca un factor de liberación y no añade aminoácido.

### Escena J · Proteína

- La cadena naciente emerge, se pliega y da paso a la estructura experimental.
- Mol* presenta 4HHB para HBB y 1CA2/3HS4 para CA2.
- El estudiante puede volver desde un residuo de la proteína al codón y exón de procedencia.
- El laboratorio de proteína existente se integra como una misión de profundidad, no como otro programa desconectado.

## 6. Lenguaje visual

- Se conserva el laboratorio claro del prototipo, pero la escena 3D adquiere profundidad material, iluminación y escala comparables al visor proteico.
- Fondo celular oscuro y controlado durante escenas inmersivas; paneles científicos claros para texto y datos.
- Exones mantienen colores persistentes y también número/patrón para no depender solo del color.
- Intrones usan volumen, longitud y etiqueta; no se reducen a conectores grises.
- ADN, ARN, proteínas y membranas tienen materiales distintos.
- Las etiquetas se anclan al objeto y evitan cruzarse; al alejarse se agrupan, al acercarse se despliegan.
- Movimiento con función: cámara, ensamblaje, corte, unión, tránsito y lectura. No habrá partículas decorativas ni giros permanentes.

## 7. Arquitectura técnica propuesta

### Cliente

- React + TypeScript.
- Three.js mediante React Three Fiber para célula, núcleo, cromatina, ADN, ARN, poro y ribosoma.
- Mol* embebido para estructuras PDB reales.
- SVG/Canvas/HTML sincronizado para el mapa de secuencia y las anotaciones exactas.
- Máquina de estados para escenas, progreso, animaciones reversibles y niveles 4.º/5.º.
- Web Workers para ORF, traducción y preparación de secuencias sin bloquear la escena.

### Servidor Railway

- Servicio Node.js para servir la aplicación y una API científica pequeña.
- Caché de metadatos y estructuras consultadas.
- Endpoint de ingestión/validación usado durante desarrollo, no abierto como editor público.
- Compresión Brotli/Gzip, archivos con hash y carga progresiva de modelos.

**Aclaración:** la potencia de Railway ayuda al servicio, procesamiento y caché; el WebGL 3D se renderiza en la GPU del navegador del estudiante. Por eso se necesitan niveles de calidad automáticos.

### Datos científicos

- Paquetes versionados y congelados para HBB y CA2.
- NCBI Datasets API como fuente de ingestión/actualización.
- RefSeq para transcritos y CDS; RCSB PDB para estructuras.
- Validación cruzada y archivo de procedencia por caso.
- La aplicación no dependerá de que NCBI responda en cada clase: usará datos preparados, con una opción de verificar actualización.

## 8. Estados y rendimiento

### Calidad alta

- Geometría completa, iluminación ambiental, antialiasing, animaciones moleculares y etiquetas espaciales.

### Calidad media

- Menos segmentos, materiales simplificados y menor densidad de nucleosomas/bases fuera de foco.

### Calidad básica

- Vista 2.5D precalculada y mapa de secuencia totalmente funcional cuando WebGL no esté disponible.

### Estados obligatorios

- Carga progresiva con nombre del objeto que se prepara.
- Error de red con reintento y datos locales de respaldo.
- WebGL no disponible.
- Modelo PDB no disponible.
- Secuencia incompleta o discrepante.
- Movimiento reducido.
- Pantalla pequeña y orientación vertical.
- Pérdida y restauración del contexto WebGL.

## 9. Accesibilidad

- Controles y navegación completos por teclado.
- Narración textual equivalente a cada transformación.
- Etiquetas, números y patrones además de color.
- Pausa de animación y control paso a paso.
- `prefers-reduced-motion` cambia movimientos de cámara por cortes de estado explicados.
- El mapa de secuencia sigue disponible para lectores de pantalla como una tabla estructurada.
- Contraste mínimo WCAG AA.

## 10. Límites y antiobjetivos

- No se intentará representar cada átomo en las escenas celulares completas.
- No se mostrarán estados no experimentales como si fueran estructuras PDB reales.
- No se usarán diagramas planos como reemplazo permanente del ADN, ARN o ribosoma 3D.
- No se mezclarán coordenadas de distintas fuentes sin trazabilidad.
- No se realizará un despliegue automático en Railway antes de probar el build de producción.
- No se publicarán secretos, claves de NCBI ni configuraciones privadas en GitHub.

## 11. Fases de construcción

### Fase 1 · Base 3D y datos

- Migrar a React/TypeScript.
- Crear escena, cámara semántica, sistema de etiquetas y niveles de calidad.
- Congelar paquetes HBB/CA2 y validar CDS/traducción.

### Fase 2 · Núcleo y gen

- Escenas A–D: célula, núcleo, cromatina, ADN, gen y transcripción.
- Validar orientación positiva y negativa desde el motor inicial.

### Fase 3 · Maduración y exportación

- Escenas E–F: cap, splicing, poli-A, mRNP y poro nuclear.
- Comparador gen/pre-ARNm/ARNm.

### Fase 4 · ORF, CDS y traducción

- Escenas G–I: mapa exacto, marcos, ORF/CDS, codones, ARNt y ribosoma.

### Fase 5 · Proteína e integración

- Escena J con Mol*.
- Unir CA2 existente y crear cierre HBB con 4HHB.
- Trazabilidad codón → residuo → estructura.

### Fase 6 · Pruebas y publicación

- Pruebas científicas automáticas.
- Pruebas funcionales y visuales en escritorio, tablet y móvil.
- Auditoría de accesibilidad y rendimiento.
- Build de producción probado localmente.
- Crear repositorio GitHub y subir la versión aprobada.
- Detenerse antes de Railway para revisar el repositorio y el build.

## 12. Criterios de aceptación del diseño

- El ADN se reconoce inmediatamente como doble hélice y permite distinguir sus dos hebras.
- Exones e intrones son legibles en HBB y CA2 sin depender únicamente del color.
- La transcripción muestra simultáneamente hebra molde, dirección y ARN naciente.
- La maduración ocurre dentro del núcleo y cada transformación puede pausarse y revertirse.
- La salida por el poro conecta espacialmente núcleo y citoplasma.
- UTR, START, CDS, STOP y poli-A se localizan con precisión en el mismo ARNm.
- Los tres marcos producen agrupaciones visiblemente distintas.
- El ribosoma avanza 5′→3′ y STOP no incorpora aminoácido.
- La proteína experimental conserva vínculo con secuencia, codón y exón.
- La experiencia mantiene función pedagógica en los tres niveles de calidad.

## 13. Decisiones cerradas

1. Es una aplicación con internet y servidor Railway.
2. El código se publicará en GitHub solo después de terminar y probar la implementación.
3. El despliegue Railway ocurre después de revisar GitHub.
4. La escena celular continua núcleo → poro → citoplasma → ribosoma es obligatoria.
5. 4.º y 5.º son capas de una misma experiencia.
6. El 3D explica estructura y proceso; el mapa plano explica la secuencia exacta.
7. HBB y CA2 comparten motor visual y científico.
8. Mol* se usa para la etapa proteica real.
9. Los datos de clase se congelan y versionan; la red sirve para actualizar y enriquecer, no para volver frágil la lección.
