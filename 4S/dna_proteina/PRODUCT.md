# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Aplicación web conectada y desplegable como servicio Node.js en Railway. La experiencia 3D se renderiza principalmente en el navegador mediante WebGL; Railway sirve la aplicación, APIs, datos científicos procesados y caché. El repositorio se alojará en GitHub cuando la implementación y las pruebas locales estén completas.

## Users

Estudiantes de 4.º y 5.º de secundaria que estudian la expresión génica, con uso individual o guiado por un docente en clase. Esta audiencia se infiere del material entregado y de los modos pedagógicos ya planificados.

## Product Purpose

ProteinLab permite seguir visual e interactivamente la información biológica desde un gen humano hasta su producto proteico. El éxito consiste en que el estudiante pueda explicar qué objeto observa, qué proceso ocurre, en qué dirección se lee y qué partes se conservan, eliminan o traducen.

## Positioning

La misma identidad visual de cada segmento molecular persiste al cambiar de escala y de objeto: cromosoma, gen, pre-ARNm, ARNm maduro, codones y proteína se recorren como una sola historia causal, no como diagramas aislados.

## Operating Context

Uso local en navegador, con una ruta principal HBB y una ruta de comparación CA2. El docente puede proyectar la aplicación y avanzar estación por estación; el estudiante puede explorar libremente y recibir comprobaciones conceptuales inmediatas.

## Capabilities and Constraints

- El recorrido comienza en el gen antes de entrar al ARNm o a la proteína.
- Distingue gen, exón, intrón, hebras de ADN, pre-ARNm, ARNm maduro, UTR, CDS y ORF.
- Enseña síntesis y lectura en dirección 5′→3′, codón START y codones STOP.
- Usa HBB para validar una región genómica en hebra negativa y CA2 para una región en hebra positiva.
- Separa datos auténticos de NCBI/RCSB de secuencias o animaciones didácticas.
- Integra el laboratorio de proteína existente como etapa final.
- El término correcto es CDS; “CDC” se corrige explícitamente.
- Durante diseño e implementación se trabaja localmente. Al completar y probar el producto se publicará en GitHub; el despliegue en Railway será una etapa posterior y separada.

## Evidence on Hand

- `recursos previos/SCIENCE_SPEC_GENE_TO_PROTEIN.md`
- `recursos previos/UX_FLOW_GENE_TO_PROTEIN.md`
- `recursos previos/planning_gene_to_protein.md`
- `recursos previos/proteinlab-v1.4.html`
- Registros NCBI Gene 3043 (HBB) y 760 (CA2), y estructuras RCSB PDB 4HHB, 1CA2 y 3HS4.

No se dispone todavía de un paquete local congelado con secuencias RefSeq completas y límites de todos los exones del transcrito. Las secuencias cortas usadas para practicar se etiquetan como modelo didáctico.

## Product Principles

- Identidad molecular persistente: un segmento conserva color y nombre a través de las transformaciones.
- Transformar antes de memorizar: cada concepto se comprende mediante una acción visible.
- Dirección siempre explícita: 5′ y 3′ nunca quedan implícitos cuando importan.
- Evidencia honesta: dato real y modelo didáctico se diferencian en cada escena.
- Progresión causal: no se accede a la proteína sin comprender primero ARNm, CDS y lectura por codones.

## Accessibility & Inclusion

Interacciones utilizables con teclado, foco visible, contraste legible, alternativas textuales a la codificación por color, reducción de movimiento y diseño adaptable a pantallas pequeñas.
