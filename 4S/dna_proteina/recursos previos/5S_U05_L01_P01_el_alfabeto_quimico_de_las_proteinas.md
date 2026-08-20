# MICROPLANIFICACION POR LECCION

## Datos de identificacion

- Codigo: `5S_U05_L01_P01`
- Leccion matriz: `5S_U05_L01 - Aminoacidos, enlaces y estructura de proteinas`
- Grado: `5to de secundaria`
- Unidad: `Unidad 5 - Termodinamica y dinamica de biomoleculas`
- Periodo: `III BIMESTRE - 10 DE AGOSTO AL 11 DE SETIEMBRE`
- Parte: `PARTE 1 DE 3`
- Titulo de la clase: `Del gen MB a la secuencia primaria de la mioglobina`
- Competencia principal: `C2 - EXPLICA EL MUNDO FISICO`
- Duracion: `45 minutos`
- Fecha sugerida: `LUNES 10 DE AGOSTO DE 2026`
- Docente: `JORGE LUIS FERNANDEZ MANRIQUE`
- Estado: `BASE`

## Resumen

La clase reconstruye la ruta desde el gen humano `MB` hasta la secuencia primaria de la mioglobina mediante registros reales de NCBI y UniProt; los estudiantes diferencian gen, transcrito, UTR, CDS y ORF, comprueban la relacion entre 465 nucleotidos codificantes y 154 aminoacidos y producen una ficha individual de trazabilidad molecular sustentada con evidencias visibles en las bases de datos.

## Objetivos

### Objetivo de la clase

Reconstruir y explicar la ruta `MB -> NM_005368.3 -> CDS -> NP_005359.1 / P02144`, diferenciando los niveles de informacion y verificando la secuencia proteica obtenida.

### Objetivos especificos

- Diferenciar ADN genomico, ARNm maduro, UTR, CDS, ORF y proteina.
- Localizar la CDS del transcrito `NM_005368.3` y relacionarla con su producto proteico.
- Comprobar matematicamente la relacion entre nucleotidos, codones, codon de parada y 154 aminoacidos.
- Explicar por que un ORF potencial no es un alelo ni demuestra por si solo una proteina funcional.

## Desarrollo

### Antes de ingresar al aula

Dejar abiertas, en pestanas separadas, [NCBI Gene MB](https://www.ncbi.nlm.nih.gov/gene/4151), [NCBI Nucleotide NM_005368.3](https://www.ncbi.nlm.nih.gov/nuccore/NM_005368.3), la [vista GenBank en texto](https://www.ncbi.nlm.nih.gov/sviewer/viewer.fcgi?id=NM_005368.3&db=nuccore&report=genbank&retmode=text), la [secuencia FASTA](https://www.ncbi.nlm.nih.gov/sviewer/viewer.fcgi?id=NM_005368.3&db=nuccore&report=fasta&retmode=text), [NCBI ORFfinder](https://www.ncbi.nlm.nih.gov/orffinder/) y [UniProt P02144](https://www.uniprot.org/uniprotkb/P02144/entry). Verificar que carguen y guardar capturas de la linea `CDS`, del identificador de proteina y de la secuencia de 154 aminoacidos. Si falla internet, realizar el mismo recorrido con esas capturas impresas o proyectadas.

Preparar una ficha dividida en cinco casillas: `GEN`, `ARNm`, `CDS`, `PROTEINA` y `EVIDENCIA`. En la pizarra escribir solo la pregunta: “¿Todo lo que pertenece a un gen termina convertido en aminoacidos?”.

### 1. Apertura: una informacion, varias representaciones - 0 a 7 minutos

Mostrar una comparacion visual entre un tramo de ADN genomico con exones e intrones, un ARNm maduro y una cadena de aminoacidos, sin colocar todavía los nombres CDS y UTR. Pedir a cada estudiante que identifique qué desaparece, qué permanece y qué cambia de alfabeto.

Preguntas iniciales:

- ¿Todo el ADN del gen se copia al ARN maduro?
- ¿Todo el ARN maduro se convierte en aminoacidos?
- ¿Dónde empieza la transcripcion y dónde empieza la traduccion?
- ¿Por qué una herramienta puede encontrar varios ORF en la misma secuencia?

No corregir inmediatamente la idea “el gen completo se convierte en proteina”. Conservarla en la pizarra como hipotesis para contrastarla con el registro real.

#### Imagen 1: el problema que debemos resolver

Uso didactico: abrir preguntas mostrando tres escalas de la misma informacion sin revelar todavía qué segmentos se eliminan o no se traducen.

![Del ADN al ARN y a la proteina: problema inicial](https://raw.githubusercontent.com/jorggefm/juegos-educativos/main/5S/L1/assets/p01_01_adn_arn_proteina_pregunta.png)

[Abrir la imagen 1 en tamaño completo](https://raw.githubusercontent.com/jorggefm/juegos-educativos/main/5S/L1/assets/p01_01_adn_arn_proteina_pregunta.png)

Prompt:

```text
Lamina cientifica horizontal 16:9, fondo blanco, estilo academico claro y preciso, bajo consumo de tinta. Mostrar de izquierda a derecha: una region larga de ADN con varios bloques separados, una molecula de ARN mas corta formada por bloques unidos y una cadena de aminoacidos plegandose. Usar el mismo codigo de color para segmentos relacionados, pero dejar sin rotulos los conceptos exon, intron, UTR y CDS. Incluir flechas discretas y amplio espacio blanco para que el docente agregue nombres. No usar retratos, decoracion ni texto extenso.
```

### 2. Construccion conceptual con NCBI - 7 a 20 minutos

Abrir [NCBI Gene MB](https://www.ncbi.nlm.nih.gov/gene/4151). Señalar `Gene ID 4151`, organismo humano, tipo `protein coding` y la existencia de varios transcritos. Explicar que el gen es una region del ADN y que NCBI reúne distintas representaciones de la informacion asociada.

Abrir [NM_005368.3](https://www.ncbi.nlm.nih.gov/nuccore/NM_005368.3) y cambiar a formato GenBank o usar la vista en texto. Pedir que localicen con `Ctrl+F`:

1. `LOCUS`, para reconocer la longitud del ARNm.
2. `CDS`, para encontrar el intervalo codificante.
3. `protein_id`, para relacionar el ARN con `NP_005359.1`.
4. `translation`, para observar la secuencia proteica anotada.

Dibujar en la pizarra:

`5' UTR | AUG | CDS | STOP | 3' UTR`

Definir con precisión:

- `UTR`: region presente en el ARNm pero no traducida como parte de la cadena principal.
- `CDS`: intervalo anotado desde el codon de inicio hasta el codon de parada; el STOP pertenece al intervalo, pero no aporta un aminoacido.
- `ORF`: marco potencial de lectura sin una parada interna; una herramienta puede encontrar varios candidatos.
- `Alelo`: version de un locus que difiere en secuencia; no es sinónimo de ORF ni de transcrito.

Corregir dos errores frecuentes: el promotor está en el ADN y participa en el inicio de la transcripcion; `AUG` inicia la traduccion. El codon STOP termina la traduccion, no el ARNm, porque después permanece la 3' UTR.

#### Imagen 2: respuesta progresiva

Uso didactico: resolver la imagen inicial incorporando las regiones y los procesos correctos.

![ADN genomico, pre-ARNm, ARNm maduro, CDS y proteina](https://raw.githubusercontent.com/jorggefm/juegos-educativos/main/5S/L1/assets/p01_02_adn_prearnm_arnm_cds_proteina.png)

[Abrir la imagen 2 en tamaño completo](https://raw.githubusercontent.com/jorggefm/juegos-educativos/main/5S/L1/assets/p01_02_adn_prearnm_arnm_cds_proteina.png)

Prompt:

```text
Lamina cientifica horizontal 16:9, fondo blanco y estilo academico vectorial limpio. Mostrar tres niveles alineados: ADN genomico con promotor, exones e intrones; pre-ARNm con exones e intrones; ARNm maduro con cap 5, 5 UTR, AUG, CDS, STOP, 3 UTR y cola poli-A. Debajo, mostrar la cadena de aminoacidos que procede solo de la CDS. Mantener colores consistentes entre niveles, flechas finas y etiquetas breves en espanol. Destacar visualmente que las UTR permanecen en el ARNm pero no pasan a la proteina. Poco consumo de tinta, sin escenas decorativas.
```

### 3. Aplicacion guiada: de la CDS a la proteina - 20 a 35 minutos

Organizar equipos de tres con roles rotativos: operador, registrador y auditor. El operador navega; el registrador completa la ficha; el auditor exige que cada afirmacion indique dónde se observó.

Pasos:

1. Abrir la [vista FASTA de NM_005368.3](https://www.ncbi.nlm.nih.gov/sviewer/viewer.fcgi?id=NM_005368.3&db=nuccore&report=fasta&retmode=text) y copiar la secuencia completa.
2. Abrir [ORFfinder](https://www.ncbi.nlm.nih.gov/orffinder/), pegar la secuencia en `Enter Query Sequence`, elegir codigo genetico 1, inicio `ATG only` y longitud minima de 150 nt.
3. Ejecutar la busqueda y comparar los candidatos con la CDS anotada en GenBank. Aclarar que ORFfinder identifica posibilidades matematicas; la coincidencia con la CDS y el producto RefSeq aporta respaldo biologico.
4. Abrir [UniProt P02144](https://www.uniprot.org/uniprotkb/P02144/entry), localizar `Sequence` y comprobar la longitud de 154 aminoacidos.
5. Registrar la ruta completa y el tipo de objeto representado por cada identificador.

Comprobacion matemática guiada:

`465 nucleotidos / 3 = 155 codones`

`154 codones con aminoacido + 1 codon de parada = 155 codones`

La cifra no debe memorizarse: sirve como control de consistencia entre CDS y producto proteico.

Si NCBI cambia la interfaz, usar `Ctrl+F` en la vista GenBank en texto. Si ORFfinder no carga, entregar la captura del resultado y pedir que el equipo compare coordenadas, longitud y traduccion.

### 4. Dinamica: Control de calidad molecular - 35 a 41 minutos

Cada equipo recibe cinco tarjetas mezcladas: `MB`, `NM_005368.3`, `CDS`, `NP_005359.1` y `P02144`. Debe ordenarlas y responder para cada una: qué representa, en qué base se localiza y qué evidencia conecta con la siguiente.

Reglas:

1. No se acepta “porque sigue después”; debe nombrarse una evidencia.
2. El auditor puede detener una afirmacion que confunda gen, transcrito, CDS u ORF.
3. El equipo obtiene el punto solo cuando una persona diferente explica la correccion.

El docente escucha especialmente estas distinciones: transcrito no significa gen completo; CDS no significa todo el ARNm; varios ORF no significan varios alelos; una secuencia proteica no muestra todavía la forma tridimensional.

### 5. Cierre y evidencia individual - 41 a 45 minutos

Cada estudiante completa sin ayuda:

1. La ruta `MB -> ______ -> CDS -> ______ / ______`.
2. Una diferencia entre ARNm y CDS.
3. La razon por la cual 465 nucleotidos producen 154 aminoacidos y no 155.
4. La razon por la cual un ORF potencial no es un alelo.

Respuesta esperada: una explicacion que vincule identificadores, intervalo codificante, codon de parada y evidencia de NCBI/UniProt. La siguiente parte tomara la secuencia `P02144` como un objeto quimico: sus letras representan residuos con propiedades diferentes y unidos en una direccion definida.

### Fuentes y respaldo docente

- [NCBI Gene: MB, Gene ID 4151](https://www.ncbi.nlm.nih.gov/gene/4151): identifica el gen, sus transcritos y productos.
- [NCBI Nucleotide: NM_005368.3](https://www.ncbi.nlm.nih.gov/nuccore/NM_005368.3): registro del ARNm usado en clase.
- [NCBI ORFfinder](https://www.ncbi.nlm.nih.gov/orffinder/): localiza ORF potenciales y muestra su traduccion.
- [UniProtKB: P02144](https://www.uniprot.org/uniprotkb/P02144/entry): confirma la mioglobina humana revisada y su secuencia de 154 aminoacidos.

### Notas para optimizacion docente

- Registrar qué paso de navegación consumió más tiempo y qué concepto produjo más confusión.
- Si los estudiantes dominan la distinción CDS/UTR, reducir ORFfinder y ampliar la comprobacion de la secuencia.
- Crear `5S_U05_L01_P01_el_alfabeto_quimico_de_las_proteinas_optimizado.md` solo después de incorporar la experiencia real del aula.

## Ficha de aplicacion

Seccion reservada para una futura ficha imprimible. Por ahora, la evidencia individual se realiza en el cuaderno o en la ficha breve preparada por el docente.
