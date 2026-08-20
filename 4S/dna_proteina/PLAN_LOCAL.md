# Plan local · del gen a la proteína

## Alcance implementado

1. Ubicar HBB o CA2 en el cromosoma.
2. Reconocer dirección, exones e intrones del gen.
3. Diferenciar hebra codificante y hebra molde.
4. Simular transcripción y complementariedad.
5. Comparar gen, pre-ARNm y ARNm maduro.
6. Aplicar cap 5′, splicing y cola poli-A.
7. Identificar 5′ UTR, CDS, 3′ UTR, START y STOP.
8. Comparar ORF con CDS y explorar tres marcos.
9. Traducir codón por codón en dirección 5′→3′.
10. Abrir la experiencia de proteína ya existente.

## Datos

Los metadatos de gen, transcrito, proteína y estructura provienen de los registros indicados en la especificación científica. Las secuencias cortas de práctica son modelos didácticos y no sustituyen el futuro paquete RefSeq congelado.

## Próxima capa científica

- Ingerir GenBank/FASTA completos de NM_000518.5 y NM_000067.3.
- Congelar límites exactos de exón, UTR y CDS en `scientific-data/`.
- Validar automáticamente traducción contra NP_000509.1 y NP_000058.1.
- Sustituir los tramos didácticos por ventanas auténticas del transcrito sin cambiar el motor visual.

## Restricción

Todo permanece local; GitHub queda fuera de este ciclo.
