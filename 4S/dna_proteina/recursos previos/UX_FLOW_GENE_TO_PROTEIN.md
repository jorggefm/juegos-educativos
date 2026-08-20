# UX_FLOW_GENE_TO_PROTEIN.md

## ProteinLab — MVP A · del cromosoma al ARNm maduro

**Versión:** 0.1  
**Estado:** UX definido, listo para validación científica  
**Caso conductor:** `CA2` humano  
**Trabajo:** local  
**GitHub:** no subir todavía  
**Depende de:** `planning_gene_to_protein.md`

---

# 1. Objetivo del MVP A

Construir una experiencia visual continua:

```text
GENOMA HUMANO
→ CROMOSOMA 8
→ GEN CA2
→ EXONES / INTRONES
→ HEBRA MOLDE / CODIFICANTE
→ TRANSCRIPCIÓN
→ PRE-ARNm
→ CAP 5'
→ SPLICING
→ POLI-A
→ ARNm MADURO
```

El MVP A termina cuando el estudiante distingue con seguridad:

- ADN genómico;
- gen;
- exón;
- intrón;
- hebra molde;
- hebra codificante;
- pre-ARNm;
- ARNm maduro;
- dirección 5' y 3';
- qué se elimina;
- qué permanece;
- qué se añade durante maduración.

Todavía no se entra a ORF/CDS/traducción.

---

# 2. Pregunta central

> **¿Cómo pasa la información de una región del ADN a un ARNm maduro listo para ser interpretado por el ribosoma?**

---

# 3. Regla de continuidad visual

Los mismos segmentos conservarán su identidad gráfica a través de toda la experiencia.

```text
EXÓN 1 = azul
EXÓN 2 = verde
EXÓN 3 = naranja
EXÓN 4 = violeta
...
```

Los intrones serán líneas/tramos desaturados.

Así el alumno podrá seguir visualmente qué se conserva y qué desaparece.

---

# 4. Navegación persistente

```text
CROMOSOMA
→ GEN
→ TRANSCRIPCIÓN
→ PRE-ARNm
→ MADURACIÓN
→ ARNm
```

Estados:

```text
✓ completado
● actual
○ bloqueado
```

---

# 5. Panel permanente “¿Qué objeto estoy mirando?”

Ejemplo:

```text
CASO MOLECULAR · CA2

OBJETO ACTUAL
PRE-ARNm

TIPO
ARN

HEBRAS
1

DIRECCIÓN
5'→3'
```

Este panel cambia según la pantalla.

---

# 6. Sistema de evidencia

Cada escena indicará:

```text
DATO REAL
```

o:

```text
MODELO DIDÁCTICO
```

Ejemplo:

- Gene ID y cromosoma: dato real.
- Animación de ARN polimerasa: modelo didáctico.

---

# 7. Estructura general de pantalla

```text
┌──────────────────────────────────────────────────────────────┐
│ RUTA MOLECULAR                                              │
├──────────────┬─────────────────────────────┬─────────────────┤
│ MISIÓN       │                             │ EVIDENCIA       │
│ pregunta     │       VISUAL PRINCIPAL      │ objeto actual   │
│ controles    │                             │ datos reales    │
│ reto         │                             │ regla clave     │
├──────────────┴─────────────────────────────┴─────────────────┤
│ OBSERVA → DESCUBRE → TRANSFORMA → EXPLICA                  │
└──────────────────────────────────────────────────────────────┘
```

---

# 8. Secuencia de pantallas

```text
00 · Genoma humano
01 · Cromosoma 8
02 · Gen CA2
03 · Exones e intrones
04 · Hebra molde / codificante
05 · Transcripción
06 · PRE-ARNm
07 · CAP 5'
08 · Splicing
09 · Cola poli-A
10 · ARNm maduro
```

---

# PANTALLA 00 — GENOMA HUMANO

## Título

> ¿Dónde comienza nuestra historia molecular?

## Objetivo

Comprender que un gen es una región dentro de un cromosoma.

## Vista

Cariotipo/esquema cromosómico simplificado con cromosoma 8 destacable.

## Interacción

El alumno selecciona:

```text
CROMOSOMA 8
```

Al tocarlo:

- los demás cromosomas disminuyen opacidad;
- cromosoma 8 aumenta tamaño;
- aparece transición de zoom.

## Pregunta

> ¿CA2 es un cromosoma completo o una región dentro de un cromosoma?

Respuesta:

```text
región dentro de un cromosoma
```

## Desbloqueo

Seleccionar cromosoma 8 + respuesta correcta.

---

# PANTALLA 01 — CROMOSOMA 8

## Título

> Del cromosoma al locus

## Objetivo

Visualizar:

```text
cromosoma
→ banda
→ región
→ gen
```

## Vista

Cromosoma 8 grande y transición hacia región 8q21.2.

## Interacción

Control:

```text
CROMOSOMA
REGIÓN
GEN
```

## Pregunta

> Al hacer zoom, ¿estamos cambiando el ADN o solo la escala de observación?

Respuesta:

```text
solo la escala
```

## Desbloqueo

Llegar visualmente a CA2.

---

# PANTALLA 02 — GEN CA2

## Título

> Este es el gen CA2

## Objetivo

Reconocer que el gen tiene extensión, dirección y partes.

## Vista

```text
5' ───────────────────────────────────────── 3'
```

Botón:

```text
DESMONTAR EL GEN
```

Al pulsarlo aparecen exones e intrones.

## Controles

```text
[✓] Gen completo
[ ] Exones
[ ] Intrones
[ ] Coordenadas
[ ] Dirección
[ ] Secuencia
```

## Pregunta

> ¿Todo lo que está dentro del gen se convertirá finalmente en aminoácidos?

Respuesta:

```text
No
```

---

# PANTALLA 03 — EXONES E INTRONES

## Título

> ¿Qué partes del gen permanecen?

## Objetivo

Diferenciar exón e intrón.

## Vista

```text
[EXÓN 1]──INTRÓN──[EXÓN 2]──INTRÓN──[EXÓN 3]...
```

## Interacción

Al tocar un exón:

```text
EXÓN
coordenadas
longitud
permanece en ARN maduro
```

Al tocar un intrón:

```text
INTRÓN
coordenadas
longitud
se elimina durante splicing
```

## Reto

Clasificar:

```text
PERMANECE
SE ELIMINA
```

para exones e intrones.

## Pregunta clave

> ¿Un intrón desaparece del ADN?

Respuesta:

```text
No
```

Feedback:

> Se elimina del transcrito, no del ADN genómico.

---

# PANTALLA 04 — HEBRA MOLDE / CODIFICANTE

## Título

> Dos hebras, una plantilla

## Objetivo

Diferenciar hebra molde y codificante.

## Vista

```text
CODIFICANTE
5' ─ A T G ... ─ 3'

MOLDE
3' ─ T A C ... ─ 5'
```

La secuencia final será real y se fijará en el science spec.

## Interacción

```text
MOSTRAR CODIFICANTE
MOSTRAR MOLDE
MOSTRAR AMBAS
```

El alumno debe elegir qué hebra lee ARN polimerasa.

Respuesta:

```text
hebra molde
```

## Pregunta

> Si el ARN se sintetiza 5'→3', ¿en qué dirección se lee la hebra molde?

Respuesta:

```text
3'→5'
```

---

# PANTALLA 05 — TRANSCRIPCIÓN

## Título

> Copiar una región sin mover el ADN

## Objetivo

Visualizar ADN → ARN respetando complementariedad y dirección.

## Elementos

- ADN doble;
- burbuja de transcripción;
- ARN polimerasa;
- hebra molde;
- ARN naciente.

## Animación

```text
ARN polimerasa avanza
↓
lee molde 3'→5'
↓
ARN crece 5'→3'
```

## Controles

```text
PAUSA
AVANZAR 1 BASE
AVANZAR 3 BASES
REINICIAR
```

Toggles:

```text
[✓] direcciones
[ ] complementariedad
[ ] hebra codificante
[✓] hebra molde
```

## Reto

Resolver 3–5 bases por complementariedad.

## Desbloqueo

Completar correctamente la pequeña región.

---

# PANTALLA 06 — PRE-ARNm

## Título

> La primera copia todavía no está lista

## Objetivo

Diferenciar transcrito inicial y ARNm maduro.

## Vista

```text
PRE-ARNm

5'
[EXÓN 1]—INTRÓN—[EXÓN 2]—INTRÓN—[EXÓN 3]...
3'
```

Los colores coinciden exactamente con pantalla 03.

## Pregunta

> ¿Qué contiene todavía este ARN?

Respuesta:

```text
exones + intrones
```

## Comparador

Botón:

```text
COMPARAR CON EL GEN
```

Superposición:

```text
GEN
PRE-ARNm
```

---

# PANTALLA 07 — CAPERUZA 5'

## Título

> Primera modificación: proteger el extremo 5'

## Objetivo

Reconocer que maduración no significa solamente eliminar intrones.

## Interacción

```text
AÑADIR CAP 5'
```

Aparece una pieza visual en el extremo 5'.

## Pregunta

> ¿La caperuza es un exón adicional?

Respuesta:

```text
No
```

Modo avanzado de 5.º puede mostrar:

```text
m7G
```

---

# PANTALLA 08 — SPLICING

## Título

> Cortar intrones, unir exones

## Objetivo

Hacer visible el cambio entre pre-ARNm y ARNm maduro.

## Vista inicial

```text
CAP
 |
[EXÓN 1]—INTRÓN—[EXÓN 2]—INTRÓN—[EXÓN 3]...
```

## Control

```text
INICIAR SPLICING
```

## Animación didáctica

Para cada intrón:

1. se arquea;
2. extremos se aproximan;
3. se forma lazo conceptual;
4. se separa;
5. exones se unen;
6. ARN se acorta.

Etiqueta:

```text
MODELO DIDÁCTICO DEL PROCESO
```

## Control temporal

```text
PRE-ARNm
→ INTRÓN 1
→ INTRÓN 2
→ ...
→ EXONES UNIDOS
```

## Preguntas

> ¿Qué ocurrió con los exones?

```text
se conservaron y unieron
```

> ¿Qué ocurrió con los intrones?

```text
se eliminaron del transcrito maduro
```

---

# PANTALLA 09 — COLA POLI-A

## Título

> Modificar el extremo 3'

## Objetivo

Diferenciar secuencia transcrita y cola añadida.

## Interacción

```text
AÑADIR COLA POLI-A
```

Animación:

```text
A A A A A A A ...
```

## Pregunta

> ¿La cola poli-A se produce copiando una larga región de T del ADN?

Respuesta:

```text
No
```

---

# PANTALLA 10 — ARNm MADURO

## Título

> La copia de trabajo está lista

## Objetivo

Integrar todos los cambios.

## Vista final

```text
CAP 5'
  ↓
[EXÓN 1][EXÓN 2][EXÓN 3]...[EXÓN N]
                                 ↓
                              POLI-A

5' → 3'
```

## Comparador

Botón:

```text
COMPARAR LOS 3 NIVELES
```

Vista:

```text
GEN
[exón]-intrón-[exón]-intrón-[exón]

PRE-ARNm
[exón]-intrón-[exón]-intrón-[exón]

ARNm MADURO
[exón][exón][exón] + CAP + POLI-A
```

## Tabla interactiva

```text
                 GEN   PRE-ARNm   ARNm
INTRONES          ✓       ✓        ✕
EXONES            ✓       ✓        ✓
CAP 5'            ✕       ✕        ✓
POLI-A            ✕       ✕        ✓
DOBLE HEBRA       ✓       ✕        ✕
```

## Pregunta final

> ¿El ARNm maduro ya nos dice automáticamente qué parte se convertirá en proteína?

Respuesta esperada:

```text
Todavía debemos identificar qué región se traduce.
```

## Puente

```text
PRÓXIMO MÓDULO · CDS / ORF
```

Botón futuro:

```text
¿QUÉ PARTE DEL ARNm SE TRADUCE?
```

---

# 9. Componentes transversales

## MolecularRoute

Ruta persistente del proceso.

## ObjectIdentityPanel

Muestra:

```text
OBJETO
TIPO
IDENTIFICADOR
DIRECCIÓN
ESTADO
```

## EvidenceToggle

```text
EXPLICAR
VER DATO REAL
```

## ScaleRail

```text
GENOMA
│
CROMOSOMA
│
GEN
│
BASES
│
ARN
```

Distingue zoom de transformación.

---

# 10. Importar vs construir

## Importar

### NCBI / RefSeq

- CA2;
- coordenadas;
- transcritos;
- secuencias.

### NCBI Sequence Viewer

Modo auténtico opcional.

### SeqViz

Secuencia y anotaciones.

## Construir nosotros

- cariotipo didáctico;
- zoom cromosoma → gen;
- anatomía del gen;
- transcripción;
- pre-ARNm;
- cap;
- splicing;
- poli-A;
- comparador gen/pre-ARNm/ARNm.

---

# 11. Datos locales requeridos

El próximo science spec deberá producir:

```text
scientific-data/CA2/
├── gene.json
├── genomic.fasta
├── transcript_NM_000067.3.fasta
├── transcript.json
├── exons.json
└── provenance.json
```

Ejemplo de `gene.json`:

```json
{
  "symbol": "CA2",
  "geneId": 760,
  "organism": "Homo sapiens",
  "chromosome": "8",
  "cytogeneticLocation": "8q21.2"
}
```

Las coordenadas exactas se fijarán solo tras validación científica.

---

# 12. Flujo de desbloqueo

```text
00 cromosoma 8
↓
01 encontrar CA2
↓
02 activar exones/intrones
↓
03 clasificar exón/intrón
↓
04 identificar hebra molde
↓
05 construir ARN
↓
06 reconocer PRE-ARNm
↓
07 añadir cap
↓
08 realizar splicing
↓
09 añadir poli-A
↓
10 explicar diferencias
```

---

# 13. Errores conceptuales que debe detectar la UX

## Error A

```text
gen = CDS
```

Corrección:

> El gen contiene más información que la región codificante.

## Error B

```text
transcripción elimina intrones
```

Corrección:

> Primero aparece pre-ARNm; el splicing ocurre durante procesamiento.

## Error C

```text
intrón eliminado = intrón borrado del ADN
```

Corrección:

> Se elimina del transcrito, no del genoma.

## Error D

```text
ARN se sintetiza 3'→5'
```

Corrección inmediata con flechas.

## Error E

```text
poli-A = copia de TTTTT del ADN
```

Corrección en pantalla 09.

---

# 14. Modo 4.º secundaria

Ocultar por defecto:

- accession;
- coordenadas absolutas;
- isoformas;
- múltiples transcritos.

Priorizar:

```text
objeto
proceso
dirección
qué cambia
```

---

# 15. Modo 5.º secundaria

Mostrar:

```text
Gene ID 760
NM_000067.3
coordenadas
número de exón
longitudes
fuente
```

Botón:

```text
VER REGISTRO NCBI
```

---

# 16. Modo profesor

Controles:

```text
PANTALLA
[00] [01] [02] ...

MOSTRAR RESPUESTA
PAUSAR
REINICIAR
MOSTRAR DATO REAL

NIVEL
[4.º] [5.º]
```

---

# 17. Criterios de aceptación

## Pantalla 00
Identifica cromosoma 8.

## Pantalla 01
Comprende que zoom no modifica ADN.

## Pantalla 02
Reconoce que un gen tiene partes.

## Pantalla 03
Diferencia exón e intrón.

## Pantalla 04
Identifica hebra molde y dirección.

## Pantalla 05
Construye ARN 5'→3'.

## Pantalla 06
Reconoce intrones en PRE-ARNm.

## Pantalla 07
Comprende que CAP se añade.

## Pantalla 08
Comprende qué elimina splicing.

## Pantalla 09
Comprende que poli-A se añade.

## Pantalla 10
Distingue gen, PRE-ARNm y ARNm maduro.

---

# 18. Criterio de éxito pedagógico

Al terminar, el estudiante debe poder explicar algo equivalente a:

> CA2 es una región del cromosoma 8. Durante la transcripción, una hebra de ADN sirve como molde y el ARN se sintetiza 5'→3'. El primer producto contiene exones e intrones. Después recibe modificaciones y los intrones se eliminan por splicing, formando un ARNm maduro con exones unidos.

---

# 19. Arquitectura de componentes propuesta

```text
GeneToProteinApp
│
├── MolecularRoute
├── ObjectIdentityPanel
├── EvidencePanel
├── ChromosomePicker
├── ChromosomeZoom
├── GeneTrack
├── GeneFeatureInspector
├── StrandViewer
├── TranscriptionViewer
├── PreMrnaViewer
├── CapAnimator
├── SplicingAnimator
├── PolyAAnimator
└── MatureMrnaViewer
```

---

# 20. Orden de implementación futuro

Después del science spec:

```text
SPRINT 1
Pantallas 00–03

SPRINT 2
Pantallas 04–06

SPRINT 3
Pantallas 07–10

SPRINT 4
Integración + responsive + pruebas
```

---

# 21. Qué NO programar todavía

No implementar aún:

- ORFfinder completo;
- CDS;
- traducción;
- ribosoma;
- proteína 3D;
- H107Y;
- urea;
- ligandos;
- talidomida.

El objetivo actual es:

```text
GEN → ARNm MADURO
```

---

# 22. Decisiones cerradas

1. 11 pantallas en MVP A.
2. CA2 permanece como caso conductor.
3. Ruta molecular visible permanentemente.
4. Panel “qué objeto estoy mirando”.
5. Colores persistentes por exón.
6. Zoom y transformación se distinguen.
7. Exón/intrón será interactivo.
8. Hebra molde se seleccionará antes de transcribir.
9. Transcripción podrá avanzar base por base.
10. PRE-ARNm conservará intrones.
11. CAP 5' tendrá interacción propia.
12. Splicing será animado y reversible.
13. Poli-A tendrá interacción propia.
14. ARNm final se comparará con gen y PRE-ARNm.
15. MVP termina antes de CDS/ORF.
16. NCBI será capa auténtica opcional.
17. Datos principales estarán locales.
18. No se tocará GitHub todavía.

---

# 23. Próximo documento

El siguiente archivo debe ser:

```text
SCIENCE_SPEC_GENE_TO_PROTEIN.md
```

Debe fijar con datos reales:

- orientación real de CA2;
- coordenadas del gen;
- límites de exones;
- transcrito NM_000067.3;
- exones del transcrito;
- longitud;
- secuencia usada para animación;
- datos de maduración;
- nomenclatura;
- fuentes exactas.

Después de eso se podrá comenzar el código del nuevo MVP A.
