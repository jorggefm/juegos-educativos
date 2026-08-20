# PLANNING — GEN → ARN → CDS/ORF → PROTEÍNA

## ProteinLab · nueva etapa inicial

**Estado:** planificación local  
**GitHub:** no subir todavía  
**Caso conductor:** `CA2` humano

---

## 1. Nuevo orden del proyecto

ProteinLab dejará de comenzar en la proteína 3D.

La ruta completa será:

```text
CROMOSOMA
→ GEN
→ PARTES DEL GEN
→ TRANSCRIPCIÓN
→ PRE-ARNm
→ MADURACIÓN
→ ARNm MADURO
→ UTR / CDS
→ ORF / MARCO DE LECTURA
→ START / STOP
→ LECTURA 5'→3'
→ TRADUCCIÓN
→ SECUENCIA DE AMINOÁCIDOS
→ PROTEÍNA 3D
→ FUNCIÓN / DESNATURALIZACIÓN / MUTACIÓN / FÁRMACO
```

La proteína 3D que ya existe se convierte en el **último nivel de una historia molecular continua**.

---

## 2. Caso conductor: CA2

Datos de referencia:

```text
Gen: CA2
Nombre: carbonic anhydrase 2
Gene ID: 760
Organismo: Homo sapiens
Cromosoma: 8
Localización: 8q21.2
Exones anotados: 7
Transcrito de trabajo: NM_000067.3
Proteína RefSeq: NP_000058.1
UniProt: P00918
Longitud proteica: 260 aa
```

Trabajaremos siempre con el mismo caso para que el alumno vea continuidad entre:

```text
CA2
→ NM_000067.3
→ CDS
→ NP_000058.1 / P00918
→ estructura 3D
```

---

## 3. Barra de navegación molecular

Toda la plataforma tendrá una ruta visible:

```text
CROMOSOMA
→ GEN
→ PRE-ARNm
→ ARNm
→ CDS / ORF
→ TRADUCCIÓN
→ SECUENCIA
→ PROTEÍNA 3D
```

El elemento actual estará resaltado.

Ejemplo:

```text
✓ CROMOSOMA
✓ GEN
● PRE-ARNm
○ ARNm
○ CDS
○ PROTEÍNA
```

---

## 4. Regla visual fundamental

Los mismos segmentos conservarán color en todas las etapas.

Ejemplo:

```text
GEN
[EXÓN 1]---intrón---[EXÓN 2]---intrón---[EXÓN 3]

PRE-ARNm
[EXÓN 1]-intrón-[EXÓN 2]-intrón-[EXÓN 3]

ARNm MADURO
[EXÓN 1][EXÓN 2][EXÓN 3]

CDS
        [parte codificante]

PROTEÍNA
        segmento correspondiente
```

Así el estudiante ve qué:

- permanece;
- desaparece;
- se añade;
- se traduce.

---

# MÓDULO 0 — Encontrar el gen

## Pregunta

> ¿Dónde está CA2 dentro del genoma humano?

## Flujo visual

```text
GENOMA HUMANO
↓
CROMOSOMA 8
↓
8q21.2
↓
CA2
```

## Interacción

1. Mostrar cromosomas humanos.
2. Seleccionar cromosoma 8.
3. Zoom a 8q21.2.
4. Mostrar región genómica de CA2.
5. Mostrar dirección del gen.

## Visualización auténtica

Usaremos datos reales de NCBI.

Como capa adicional podrá abrirse:

```text
VER EN NCBI SEQUENCE VIEWER
```

---

# MÓDULO 1 — Anatomía del gen

## Pregunta

> ¿Todo el gen termina convertido en proteína?

Respuesta:

```text
NO
```

## Vista

Mostrar:

- exones;
- intrones;
- dirección 5'/3';
- región transcrita;
- región reguladora cuando exista anotación validada.

Ejemplo:

```text
5' ────────────────────────────────────── 3'

[EXÓN 1]──INTRÓN──[EXÓN 2]──INTRÓN──[EXÓN 3] ...
```

## Controles

```text
[✓] Exones
[✓] Intrones
[ ] Secuencia
[ ] Coordenadas
[ ] Dirección
[ ] Regiones reguladoras
```

Al tocar un exón:

```text
EXÓN
coordenadas
longitud
destino en el transcrito
```

---

# MÓDULO 2 — Transcripción

## Pregunta

> ¿Qué hebra de ADN se utiliza para fabricar el ARN?

Mostrar:

```text
HEBRA CODIFICANTE
5' ─────────────────── 3'

HEBRA MOLDE
3' ─────────────────── 5'
```

Animación:

```text
ARN polimerasa
LEE molde:      3' → 5'
SINTETIZA ARN:  5' → 3'
```

## Controles

- pausar;
- avanzar;
- mostrar complementariedad;
- mostrar hebra molde;
- mostrar hebra codificante;
- velocidad.

---

# MÓDULO 3 — PRE-ARNm

## Pregunta

> ¿El primer ARN producido ya está listo para traducirse?

Respuesta:

```text
NO
```

Vista:

```text
PRE-ARNm

5'
[EXÓN 1]—INTRÓN—[EXÓN 2]—INTRÓN—[EXÓN 3]...
3'
```

Debe verse claramente:

```text
ADN = doble hebra / T
ARN = hebra sencilla / U
```

---

# MÓDULO 4 — Maduración del ARN

## Pregunta

> ¿Cómo pasa el pre-ARNm a ARNm maduro?

La experiencia tendrá tres eventos.

### 1. Caperuza 5'

```text
pre-ARNm
↓
+ CAP 5'
```

### 2. Splicing

```text
EXÓN 1 — intrón — EXÓN 2
          ↓
EXÓN 1 ───────── EXÓN 2
```

El intrón:

- se arquea;
- se corta;
- sale;
- los exones se unen.

### 3. Cola poli-A

```text
3' → AAAAAAAAA...
```

## Control temporal

```text
[1] PRE-ARNm
[2] CAP 5'
[3] SPLICING
[4] POLI-A
[5] ARNm MADURO
```

El alumno podrá avanzar y retroceder.

---

# MÓDULO 5 — Anatomía del ARNm maduro

## Pregunta

> ¿Todo el ARNm maduro se traduce?

Respuesta:

```text
NO
```

Vista:

```text
CAP
 ↓
5' UTR
│
AUG
 ↓
CDS ========================== STOP
                                  │
                                3' UTR
                                     │
                                   POLI-A
```

## Capas

```text
[ ] 5' UTR
[ ] CDS
[ ] START
[ ] STOP
[ ] 3' UTR
[ ] bases
[ ] coordenadas
```

---

# MÓDULO 6 — CDS y ORF

La sigla correcta será:

```text
CDS
Coding Sequence
```

No `CDC`.

## Pregunta

> ¿ORF y CDS son lo mismo?

Respuesta:

```text
NO
```

## Visualización

```text
ARNm
5' A U G C C A U G ... 3'

MARCO 1
AUG | CCA | ...

MARCO 2
 UGC | CAU | ...

MARCO 3
  GCC | AUG | ...
```

Conceptos:

```text
ORF
= región potencial de lectura

CDS
= región codificante anotada con evidencia
```

---

# MÓDULO 7 — ORF Explorer

Construiremos un mini ORF Finder propio.

Entrada:

```text
ARNm/cDNA
```

Salida:

```text
ORF candidato
START
STOP
longitud
marco
traducción
```

Modo avanzado:

```text
COMPARAR CON NCBI ORFfinder
```

En el ARNm principal se mostrarán tres marcos de lectura.

La explicación de seis marcos quedará para modo avanzado aplicado a ADN.

---

# MÓDULO 8 — START y STOP

## Pregunta

> ¿Dónde comienza y dónde termina la traducción?

Mostrar:

```text
AUG
START
Met
```

y:

```text
UAA
UAG
UGA
STOP
```

El alumno deberá localizar START y STOP en el transcrito real.

Cuando ambos se seleccionen:

```text
START ================= STOP
          CDS
```

---

# MÓDULO 9 — Marco de lectura

Vista normal:

```text
AUG | XXX | XXX | XXX | STOP
```

Después desplazar una base:

```text
A | UGX | XXX | XXX ...
```

Preguntas:

```text
¿Cambió el ARN?       NO
¿Cambió la lectura?   SÍ
```

Objetivo:

comprender por qué el marco importa.

---

# MÓDULO 10 — Ribosoma y lectura 5'→3'

Vista:

```text
5' ─ AUG ─ XXX ─ XXX ─ ... ─ STOP ─ 3'
      ↑
   ribosoma
```

Botón:

```text
AVANZAR UN CODÓN
```

Cada clic:

1. entra el codón;
2. aparece ARNt;
3. se alinea anticodón;
4. llega aminoácido;
5. crece la cadena.

---

# MÓDULO 11 — Codón y anticodón

Ejemplo:

```text
ARNm
5' AUG 3'

ARNt
3' UAC 5'
```

Las direcciones deben permanecer visibles.

No mostraremos codón y anticodón como si tuvieran la misma orientación.

---

# MÓDULO 12 — Traducción

Pantalla dividida:

```text
ARNm
AUG | ... | ... | ... | STOP

PROTEÍNA
Met – ... – ... – ...
```

Cada codón iluminado genera el aminoácido correspondiente.

El STOP:

```text
NO añade aminoácido
```

---

# MÓDULO 13 — Secuencia proteica

Al terminar:

```text
NP_000058.1
P00918
260 aa
```

Visual:

```text
M S H H W G ...
```

El alumno puede tocar cualquier letra y obtener:

```text
nombre
posición
propiedad
```

---

# MÓDULO 14 — De secuencia a proteína 3D

Botón principal:

```text
PLEGAR / VER ESTRUCTURA
```

Transición visual:

```text
secuencia lineal
↓
estructura secundaria
↓
estructura terciaria
↓
CA2 3D
```

Aquí entra el ProteinLab ya construido.

---

# MÓDULO 15 — ProteinLab actual

La ruta continuará con:

```text
CA2 3D
→ Zn²⁺
→ centro activo
→ ligandos
→ urea
→ H107Y
→ casos posteriores
```

---

# VISUALIZADORES / LIBRERÍAS

## 1. NCBI Sequence Viewer

Uso:

- contexto genómico real;
- tracks;
- genes;
- coordenadas;
- zoom;
- marcadores.

Será una capa auténtica opcional.

No dependeremos de ella para la clase offline.

---

## 2. SeqViz

Candidato para visualizar:

- ADN;
- ARN;
- proteína;
- anotaciones;
- regiones;
- traducciones.

Muy útil para:

```text
secuencia real
+
anotaciones propias
```

---

## 3. IGV.js

No es indispensable para el primer MVP.

Será útil después para:

- variantes;
- ClinVar;
- SNP;
- tracks genómicos;
- comparaciones.

---

## 4. Componentes propios

Construiremos nosotros:

- cromosoma → gen;
- transcripción;
- splicing;
- maduración;
- ORF Explorer;
- Codon Reader;
- ribosoma paso a paso.

Se implementarán con:

```text
SVG / Canvas
```

porque la prioridad es enseñar el proceso.

---

## 5. Mol*

Se mantiene para:

```text
proteína 3D
ligandos
centro activo
interacciones
```

---

# ESTRATEGIA DE DATOS

Importaremos datos reales y guardaremos una copia local.

```text
NCBI / RefSeq / UniProt / PDB
↓
scripts de descarga
↓
validación
↓
JSON / FASTA / mmCIF local
↓
ProteinLab
```

Así la clase no depende de internet.

---

# PANEL DE IDENTIDAD PERMANENTE

Siempre visible:

```text
CASO MOLECULAR · CA2

GEN
CA2
Gene ID 760

TRANSCRITO
NM_000067.3

PROTEÍNA
NP_000058.1
P00918

ESTRUCTURA
1CA2 / otras PDB
```

El objeto actual estará destacado.

---

# DOS NIVELES

## 4.º secundaria

Priorizar:

- gen;
- exones/intrones;
- transcripción;
- pre-ARNm;
- maduración;
- START/STOP;
- codones;
- 5'→3';
- traducción.

## 5.º secundaria

Agregar:

- accession;
- UTR;
- CDS;
- ORF;
- coordenadas;
- isoformas;
- bases de datos;
- ORFfinder;
- UniProt;
- PDB.

---

# PRIMER MVP NUEVO

## MVP A — GEN → ARNm MADURO

Implementar primero:

```text
Cromosoma
→ CA2
→ exones/intrones
→ transcripción
→ pre-ARNm
→ splicing
→ ARNm maduro
```

No integrar todavía toda la traducción.

---

# SEGUNDO MVP NUEVO

## MVP B — ARNm → proteína

```text
ARNm
→ UTR/CDS
→ ORF
→ START/STOP
→ marco
→ 5'→3'
→ traducción
→ 260 aa
→ Mol*
```

---

# REGLA DE AVANCE

Un estudiante no debería entrar a la proteína 3D si todavía no puede responder:

```text
¿Estoy mirando ADN, ARN o proteína?
¿Hay intrones?
¿Hay UTR?
¿Qué región se traduce?
¿Dónde está START?
¿Dónde está STOP?
¿Qué significa CDS?
¿Qué significa ORF?
¿En qué dirección lee el ribosoma?
```

---

# DECISIONES CERRADAS

1. CA2 seguirá siendo el caso conductor.
2. ProteinLab comenzará en el gen.
3. La proteína será el final de la primera gran ruta.
4. Exones e intrones deben visualizarse.
5. Pre-ARNm y ARNm maduro serán objetos diferentes.
6. El splicing será animado.
7. CAP 5' y poli-A serán visibles.
8. UTR, CDS, START y STOP serán activables.
9. ORF y CDS se enseñarán por separado.
10. La lectura 5'→3' será interactiva.
11. La traducción será paso a paso.
12. SeqViz será candidato para secuencia.
13. NCBI Sequence Viewer será capa auténtica opcional.
14. Mol* seguirá como visor proteico.
15. No se subirá nada a GitHub todavía.
16. Todo seguirá trabajando localmente.

---

# SIGUIENTE PASO

Crear primero:

```text
UX_FLOW_GENE_TO_PROTEIN.md
```

con las pantallas exactas:

```text
00 cromosoma
01 gen
02 exones/intrones
03 transcripción
04 pre-ARNm
05 splicing
06 ARNm maduro
07 CDS/ORF
08 START/STOP
09 marco
10 traducción
11 secuencia
12 proteína
```

Después:

```text
SCIENCE_SPEC_GENE_TO_PROTEIN.md
```

para fijar con datos reales:

- coordenadas de CA2;
- estructura de exones;
- transcrito;
- UTR;
- CDS;
- START;
- STOP;
- secuencia;
- identificadores.

Solo después comenzaremos a programar esta nueva etapa.
