# SCIENCE_SPEC_GENE_TO_PROTEIN.md

## ProteinLab — especificación científica de las dos rutas iniciales

**Versión:** 0.1  
**Estado:** base científica para implementación local  
**GitHub:** no subir todavía  
**Casos conductores:** `HBB` y `CA2`

---

# 1. Decisión principal

ProteinLab tendrá dos rutas seleccionables desde el comienzo:

```text
RUTA CLÁSICA
HBB → beta-globina → hemoglobina

RUTA ENZIMÁTICA
CA2 → anhidrasa carbónica II
```

Ambas compartirán exactamente el mismo motor pedagógico:

```text
CROMOSOMA
→ GEN
→ EXONES / INTRONES
→ TRANSCRIPCIÓN
→ PRE-ARNm
→ MADURACIÓN
→ ARNm MADURO
→ CDS / ORF
→ START / STOP
→ TRADUCCIÓN
→ PROTEÍNA
```

Después divergirán en el módulo estructural y funcional.

---

# 2. Por qué usar dos genes

## HBB

Ventajas didácticas:

- gen pequeño y compacto;
- solo 3 exones;
- un transcrito RefSeq principal muy conocido;
- relación directa con hemoglobina;
- permite introducir estructura cuaternaria;
- permite posteriormente enseñar anemia falciforme y beta-talasemia;
- está en la hebra negativa, por lo que enseña que la dirección del gen no tiene que coincidir con izquierda→derecha en el cromosoma.

## CA2

Ventajas didácticas:

- 7 exones;
- dos variantes RefSeq;
- estructura enzimática;
- Zn²⁺;
- centro activo;
- ligandos e inhibidores;
- desnaturalización por urea;
- mutación H107Y;
- permite conectar secuencia → plegamiento → función.

---

# 3. Selector inicial

Pantalla:

```text
ELIGE UNA HISTORIA MOLECULAR

[ HBB ]
Hemoglobina
Ruta clásica

[ CA2 ]
Anhidrasa carbónica II
Ruta enzimática
```

Modo profesor:

```text
ASIGNAR HBB
ASIGNAR CA2
PERMITIR ELECCIÓN
```

---

# 4. Datos verificados — CA2

```text
Símbolo: CA2
Nombre: carbonic anhydrase 2
Organismo: Homo sapiens
Gene ID: 760
Ensembl gene: ENSG00000104267
Cromosoma: 8
Localización citogenética: 8q21.2
Tipo: protein coding
Exon count NCBI: 7
```

## GRCh38.p14

```text
Accesión cromosómica: NC_000008.11
Rango: 85464007..85481493
Hebra: +
```

Por tanto, para la representación principal:

```text
coordenada genómica creciente
≈
dirección transcripcional del gen
```

Este hecho se usará didácticamente, pero no se generalizará a todos los genes.

---

# 5. Transcrito principal CA2

Usaremos:

```text
NM_000067.3
```

Descripción:

```text
CA2 transcript variant 1
```

Producto:

```text
NP_000058.1
```

UniProt:

```text
P00918
```

Proteína:

```text
Carbonic anhydrase 2
260 aminoácidos
```

NCBI indica que CA2 tiene además otra variante RefSeq:

```text
NM_001293675.2
```

No se mostrará en el primer recorrido.

Se utilizará después para enseñar:

```text
MISMO GEN
→ DIFERENTE TRANSCRITO
→ DIFERENTE ISOFORMA
```

---

# 6. Proteína estructural CA2

Endpoint principal del recorrido:

```text
P00918
260 aa
```

Estructuras experimentales ya seleccionadas:

```text
1CA2
CA II humana
Zn²⁺

3HS4
CA II humana + acetazolamida
```

El módulo existente seguirá mostrando:

- Zn²⁺;
- His94;
- His96;
- His119;
- centro activo;
- acetazolamida;
- H107Y;
- urea.

---

# 7. Datos verificados — HBB

```text
Símbolo: HBB
Nombre: hemoglobin subunit beta
Organismo: Homo sapiens
Gene ID: 3043
Ensembl gene: ENSG00000244734
Cromosoma: 11
Localización citogenética: 11p15.4
Tipo: protein coding
Exon count NCBI: 3
```

## GRCh38.p14

```text
Accesión cromosómica: NC_000011.10
Rango: 5225464..5227071
Hebra: -
```

Este caso es especialmente valioso porque:

```text
las coordenadas crecen izquierda→derecha
PERO
el gen se transcribe en la dirección opuesta
```

La plataforma deberá representar esto explícitamente.

---

# 8. Exones HBB — GRCh38

Para el transcrito canónico/MANE equivalente:

```text
Exón 1
5226930..5227071

Exón 2
5226577..5226799

Exón 3
5225464..5225726
```

Todos están en:

```text
hebra negativa
```

Orden transcripcional:

```text
Exón 1
→ Exón 2
→ Exón 3
```

aunque sus coordenadas genómicas disminuyan.

Esto será uno de los puntos didácticos más interesantes de la plataforma.

---

# 9. Transcrito principal HBB

Usaremos:

```text
NM_000518.5
```

Producto:

```text
NP_000509.1
```

UniProt:

```text
P68871
```

Protein de referencia UniProt:

```text
147 aminoácidos
```

La estructura experimental madura puede mostrar 146 residuos en la cadena beta porque el iniciador puede no formar parte de la cadena madura modelada.

La aplicación deberá distinguir:

```text
producto de traducción
vs
cadena madura observada estructuralmente
```

y no presentarlo como error.

---

# 10. Estructura final HBB

Usaremos como referencia clásica:

```text
PDB 4HHB
```

Características:

```text
hemoglobina humana desoxi
rayos X
1.74 Å
A2B2
```

Composición:

```text
2 cadenas alfa
+
2 cadenas beta
```

Las cadenas beta:

```text
B
D
```

corresponden a HBB.

Cada subunidad contiene:

```text
HEM
```

La estructura permite enseñar:

```text
HBB
→ una cadena beta
→ se pliega
→ incorpora hemo
→ se asocia con otras cadenas
→ hemoglobina funcional
```

---

# 11. Diferencia conceptual clave entre CA2 y HBB

## CA2

```text
GEN
→ una proteína monomérica
→ centro activo
→ Zn²⁺
→ función enzimática
```

## HBB

```text
GEN
→ una cadena beta
→ plegamiento
→ hemo
→ asociación con cadenas alfa/beta
→ estructura cuaternaria
→ transporte de O₂
```

Así el estudiante descubre que:

```text
UNA PROTEÍNA
NO SIEMPRE FUNCIONA SOLA
```

---

# 12. HBB como ruta inicial recomendada

Para estudiantes que recién comienzan:

```text
HBB
```

será la ruta recomendada.

Motivos:

- 3 exones;
- gen compacto;
- producto conocido;
- estructura muy visual;
- hemo visible;
- relación inmediata con oxígeno y sangre.

---

# 13. CA2 como ruta avanzada

Después:

```text
CA2
```

permitirá introducir:

- 7 exones;
- isoformas;
- enzimas;
- coordinación metálica;
- ligandos;
- mutaciones de estabilidad;
- desnaturalización.

---

# 14. Arquitectura científica compartida

Los dos casos deberán usar el mismo schema.

```json
{
  "gene": {},
  "genomicLocation": {},
  "transcript": {},
  "exons": [],
  "protein": {},
  "structure": {},
  "sources": []
}
```

Esto permitirá cambiar:

```text
HBB ↔ CA2
```

sin cambiar la interfaz.

---

# 15. Schema de gen

```json
{
  "symbol": "HBB",
  "geneId": 3043,
  "chromosome": "11",
  "cytogeneticLocation": "11p15.4",
  "strand": "-",
  "assembly": "GRCh38.p14",
  "chromosomeAccession": "NC_000011.10",
  "start": 5225464,
  "end": 5227071,
  "exonCount": 3
}
```

CA2:

```json
{
  "symbol": "CA2",
  "geneId": 760,
  "chromosome": "8",
  "cytogeneticLocation": "8q21.2",
  "strand": "+",
  "assembly": "GRCh38.p14",
  "chromosomeAccession": "NC_000008.11",
  "start": 85464007,
  "end": 85481493,
  "exonCount": 7
}
```

---

# 16. Regla de orientación

La interfaz nunca asumirá:

```text
izquierda = 5'
derecha = 3'
```

sin revisar la hebra.

En cada caso deberá construirse la dirección a partir de:

```text
strand
```

## CA2

```text
+ strand

5' → 3'
izquierda → derecha
```

## HBB

```text
- strand

5' → 3'
derecha → izquierda
```

Esto debe verse desde la pantalla cromosómica.

---

# 17. Colores de exones

Los colores serán asignados dinámicamente por orden transcripcional.

Ejemplo HBB:

```text
Exón 1 = azul
Exón 2 = verde
Exón 3 = naranja
```

Aunque el exón 1 esté a la derecha en coordenadas genómicas.

La identidad del exón no dependerá de su posición visual izquierda/derecha.

---

# 18. ADN genómico vs transcript

La plataforma distinguirá dos sistemas de coordenadas:

```text
COORDENADA GENÓMICA
chr11:522...

COORDENADA DE TRANSCRITO
1, 2, 3...
```

Modo 4.º:

```text
ocultar coordenadas
```

Modo 5.º:

```text
mostrar ambas
```

---

# 19. Pre-ARNm

No existe una única entrada RefSeq separada etiquetada simplemente como “pre-ARNm”.

La plataforma lo reconstruirá didácticamente como:

```text
secuencia transcrita genómica
con exones + intrones
```

Etiqueta obligatoria:

```text
MODELO DEL TRANSCRITO PRIMARIO
basado en la anotación genómica
```

No llamarlo “registro NCBI del pre-ARNm”.

---

# 20. CAP 5' y poli-A

Las modificaciones se representarán como procesos de maduración.

## CAP

Se añade al extremo 5'.

## poli-A

Se añade al extremo 3'.

La plataforma no debe insinuar:

```text
CAP = exón
```

ni:

```text
poli-A = larga secuencia de T copiada del ADN
```

---

# 21. Splicing

El splicing se basa en la anotación de exones del transcrito seleccionado.

La visualización:

```text
pre-ARNm
→ eliminar intrones
→ unir exones
```

Los puntos de corte exactos vendrán del archivo de datos de cada transcrito.

---

# 22. Regla para datos de exones

Para evitar errores por mezclar bases:

```text
NO combinar arbitrariamente
NCBI + Ensembl + UCSC
```

para coordenadas del mismo objeto.

En producción:

## Fuente principal

```text
NCBI RefSeq / NCBI Datasets
```

## Fuente de contraste

```text
Ensembl MANE
```

Si coinciden:

```text
validado
```

Si difieren:

```text
mostrar fuente y revisar
```

---

# 23. Regla para longitudes de ARNm

La longitud final de:

```text
NM_000067.3
NM_000518.5
```

se congelará directamente desde el FASTA RefSeq descargado durante la ingestión de datos.

No se copiarán longitudes de páginas secundarias cuando exista RefSeq.

---

# 24. Regla para CDS

La posición exacta de:

```text
START
STOP
CDS
UTR
```

se extraerá directamente del registro GenBank RefSeq.

La aplicación no calculará estas posiciones desde la proteína si la anotación oficial está disponible.

---

# 25. Validación automática de CDS

Para cada caso:

```text
CDS
↓
traducir
↓
comparar
```

con:

```text
NP_000058.1
NP_000509.1
```

Debe coincidir antes de permitir usar el asset.

---

# 26. Regla matemática

Si una proteína RefSeq tiene:

```text
n aminoácidos
```

la CDS deberá contener:

```text
3n nucleótidos codificantes
+
3 nucleótidos STOP
```

cuando el STOP esté incluido en la anotación CDS.

Esto será un test automático, no la fuente primaria del dato.

---

# 27. HBB: oportunidad de marco de lectura

El CDS conocido de beta-globina tiene:

```text
444 nt
```

incluyendo STOP.

Esto permite visualizar:

```text
147 codones de aminoácido
+
STOP
```

según el producto de traducción anotado.

La plataforma deberá explicar el procesamiento de la metionina inicial al comparar con estructuras maduras.

---

# 28. CA2: oportunidad de isoformas

CA2 tiene:

```text
2 transcript variants RefSeq
```

En el recorrido principal:

```text
variant 1
NM_000067.3
```

Posteriormente se podrá habilitar:

```text
¿QUÉ CAMBIA SI ELIJO OTRO TRANSCRITO?
```

---

# 29. HBB: oportunidad de enfermedad

Después de construir la proteína normal:

```text
HBB normal
```

se podrá introducir:

```text
HBB c.20A>T
```

que produce la variante falciforme.

Ese módulo permitirá recorrer:

```text
ADN
→ ARNm
→ codón
→ aminoácido
→ superficie proteica
→ interacción proteína-proteína
→ polimerización
```

Será uno de los casos finales más potentes de la plataforma.

---

# 30. CA2: oportunidad de enfermedad

Después:

```text
H107Y
```

permitirá recorrer:

```text
cambio de aminoácido
→ estabilidad
→ plegamiento
→ actividad
```

---

# 31. Diferencia entre los módulos finales

## HBB

```text
ALTERACIÓN DE INTERFAZ
→ polimerización
```

## CA2

```text
ALTERACIÓN DE ESTABILIDAD
→ pérdida funcional
```

Esto evita que el alumno crea que todas las mutaciones producen enfermedad del mismo modo.

---

# 32. Selección de caso — experiencia

Pantalla:

```text
¿QUÉ MOLÉCULA QUIERES SEGUIR?

HBB
3 exones
hemoglobina
hemo
oxígeno
enfermedad falciforme

CA2
7 exones
enzima
Zn²⁺
pH
desnaturalización
```

No etiquetar:

```text
fácil / difícil
```

Mejor:

```text
RUTA CLÁSICA
RUTA ENZIMÁTICA
```

---

# 33. MVP de implementación

Primera implementación deberá soportar ambas rutas desde:

```text
cromosoma
```

hasta:

```text
ARNm maduro
```

sin duplicar componentes.

Datos:

```text
HBB.json
CA2.json
```

Mismo motor.

---

# 34. Orden recomendado de desarrollo

Aunque habrá dos casos, se programará primero:

```text
HBB
```

porque su gen tiene 3 exones y permite validar rápidamente:

- strand negativo;
- exones;
- transcripción;
- splicing.

Después:

```text
CA2
```

servirá como prueba de que el motor funciona con:

- más exones;
- strand positivo;
- mayor longitud;
- múltiples transcript variants.

---

# 35. Razón técnica para comenzar con HBB

Si el motor funciona solamente con:

```text
strand +
```

no sabremos si la arquitectura está bien.

HBB obliga desde el inicio a implementar correctamente:

```text
strand -
```

Por tanto, HBB es un excelente test arquitectónico.

---

# 36. Datos de estructura HBB

PDB recomendado:

```text
4HHB
```

Características verificadas:

```text
Homo sapiens
desoxihemoglobina
rayos X
1.74 Å
heterotetrámero A2B2
```

Cadenas beta:

```text
B
D
```

Cada beta madura:

```text
146 residuos modelados
```

Ligando:

```text
HEM
```

Esto permitirá mostrar:

```text
una cadena beta
```

y después:

```text
tetrámero completo
```

---

# 37. Datos de estructura CA2

Mantener:

```text
1CA2
```

para proteína nativa y Zn²⁺.

Mantener:

```text
3HS4
```

para acetazolamida.

---

# 38. Panel permanente de identidad

## HBB

```text
GEN
HBB
3043

TRANSCRITO
NM_000518.5

PROTEÍNA
NP_000509.1
P68871

ESTRUCTURA
4HHB
```

## CA2

```text
GEN
CA2
760

TRANSCRITO
NM_000067.3

PROTEÍNA
NP_000058.1
P00918

ESTRUCTURA
1CA2 / 3HS4
```

---

# 39. Fuentes principales

## NCBI Gene — CA2

Gene ID 760.

Datos utilizados:

- 8q21.2;
- 7 exones;
- GRCh38 NC_000008.11:85464007..85481493;
- NM_000067.3 → NP_000058.1;
- dos transcript variants.

## NCBI Gene — HBB

Gene ID 3043.

Datos utilizados:

- 11p15.4;
- 3 exones;
- GRCh38 NC_000011.10:5225464..5227071 complement;
- NM_000518.5 → NP_000509.1.

## UniProt — CA2

```text
P00918
260 aa
```

## UniProt — HBB

```text
P68871
147 aa
```

## RCSB PDB

```text
1CA2
3HS4
4HHB
```

---

# 40. Datos todavía por congelar

Antes de programar la parte exacta de secuencia se deberán descargar y validar:

## CA2

- FASTA de NM_000067.3;
- GenBank completo;
- límites de exón del transcrito;
- UTR;
- CDS;
- START;
- STOP.

## HBB

- FASTA de NM_000518.5;
- GenBank completo;
- límites RefSeq exactos de exones del transcript;
- UTR;
- CDS;
- START;
- STOP.

Esto se hará mediante un script de ingestión, no manualmente.

---

# 41. Validación cruzada

Cada paquete deberá pasar:

```text
NCBI Gene
↕
RefSeq transcript
↕
RefSeq protein
↕
UniProt
↕
PDB
```

Si existe discrepancia:

```text
se conserva la trazabilidad
y se explica
```

No se oculta.

---

# 42. Decisiones cerradas

1. ProteinLab tendrá dos rutas iniciales.
2. HBB será la ruta clásica.
3. CA2 será la ruta enzimática.
4. Ambas usarán el mismo motor.
5. HBB se implementará primero.
6. HBB permitirá validar strand negativo.
7. CA2 permitirá validar strand positivo y 7 exones.
8. Los datos se congelarán desde RefSeq.
9. Ensembl se usará para validación cruzada, no para mezclar coordenadas.
10. HBB terminará en 4HHB.
11. CA2 terminará en 1CA2/3HS4.
12. No se subirá nada a GitHub todavía.
13. Todo seguirá local.

---

# 43. Siguiente paso

Crear los paquetes de datos locales:

```text
scientific-data/HBB/
scientific-data/CA2/
```

con:

```text
gene.json
transcript.gb
transcript.fasta
protein.fasta
features.json
provenance.json
```

Después construir el primer prototipo:

```text
HBB
CROMOSOMA → GEN → EXONES/INTRONES
```

y usarlo como núcleo del nuevo ProteinLab.
