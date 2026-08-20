export type GeneKey = 'HBB' | 'CA2'
export type GeneRecord = {
  symbol: GeneKey
  name: string
  geneId: number
  chromosome: string
  locus: string
  coordinates: string
  strand: '+' | '−'
  transcript: string
  protein: string
  uniprot: string
  pdb: string[]
  exonCount: number
  function: string
  codons: string[]
  aminoAcids: string[]
}

export const GENES: Record<GeneKey, GeneRecord> = {
  HBB: {
    symbol: 'HBB',
    name: 'hemoglobina subunidad beta',
    geneId: 3043,
    chromosome: '11',
    locus: '11p15.4',
    coordinates: 'NC_000011.10: 5 225 464–5 227 071',
    strand: '−',
    transcript: 'NM_000518.5',
    protein: 'NP_000509.1',
    uniprot: 'P68871',
    pdb: ['4HHB'],
    exonCount: 3,
    function: 'Forma la cadena beta de la hemoglobina que transporta gases en la sangre.',
    codons: ['AUG','GUG','CAC','CUG','ACU','CCU','GAG','GAG','AAG','UCU','GCC','GUU','ACU','GCC','CUG','UGG','GGC','AAG','GUG','AAC','GUG','UAA'],
    aminoAcids: ['Met','Val','His','Leu','Thr','Pro','Glu','Glu','Lys','Ser','Ala','Val','Thr','Ala','Leu','Trp','Gly','Lys','Val','Asn','Val'],
  },
  CA2: {
    symbol: 'CA2',
    name: 'anhidrasa carbónica II',
    geneId: 760,
    chromosome: '8',
    locus: '8q21.2',
    coordinates: 'NC_000008.11: 85 464 007–85 481 493',
    strand: '+',
    transcript: 'NM_000067.3',
    protein: 'NP_000058.1',
    uniprot: 'P00918',
    pdb: ['1CA2', '3HS4'],
    exonCount: 7,
    function: 'Cataliza la hidratación reversible del dióxido de carbono mediante un centro activo con zinc.',
    codons: ['AUG','AGC','CAC','CAU','UGG','GGC','UAC','GGC','AAA','CAC','AAC','GGA','CCA','GAG','CAU','UGG','CAC','AAG','GAC','UUC','CCA','UAA'],
    aminoAcids: ['Met','Ser','His','His','Trp','Gly','Tyr','Gly','Lys','His','Asn','Gly','Pro','Glu','His','Trp','His','Lys','Asp','Phe','Pro'],
  },
}

export const EXON_COLORS = ['#42c8ff', '#45d6a0', '#ffb454', '#9f86ff', '#ff668c', '#34d3df', '#f3d44e']

export const STEPS = [
  { id: 'cell', short: 'Núcleo', title: 'La información comienza dentro del núcleo', question: '¿En qué compartimento celular está el gen?', object: 'CÉLULA → NÚCLEO', evidence: 'MODELO DIDÁCTICO', rule: 'La transcripción y la maduración del ARNm ocurren en el núcleo; la traducción ocurre en el citoplasma.', explanation: 'Primero ubica el escenario. La esfera interior es el núcleo: allí se guarda el ADN. En esta estación todavía no mostramos bases ni exones porque estamos observando la célula completa.', observe: 'Rota la célula y localiza núcleo, envoltura nuclear y citoplasma.' },
  { id: 'locus', short: 'Locus', title: 'Del cromosoma al locus del gen', question: '¿Un gen ocupa todo un cromosoma?', object: 'CROMOSOMA → CROMATINA → LOCUS', evidence: 'DATO REAL + MODELO', rule: 'Un gen es una región del ADN localizada en un cromosoma, no el cromosoma completo.', explanation: 'El cromosoma compacto se desenrolla en cromatina. Las “cuentas” son histonas alrededor de las cuales se enrolla el ADN. El marcador ámbar señala el locus: la dirección donde está el gen elegido.', observe: 'Pasa el puntero —o toca— el cromosoma, las histonas y el marcador del locus.' },
  { id: 'gene', short: 'Gen', title: 'Dos hebras, exones e intrones', question: '¿Qué partes del gen seguirán la ruta?', object: 'ADN · GEN', evidence: 'DATO REAL + MODELO', rule: 'Los exones permanecen en el ARNm maduro; los intrones se transcriben y después se eliminan.', explanation: 'La doble hélice tiene una hebra codificante y una hebra molde. E significa exón: segmento que permanecerá. I significa intrón: segmento que será retirado durante la maduración.', observe: 'Selecciona E1, E2… en el mapa y observa el mismo color sobre el ADN.' },
  { id: 'transcription', short: 'Transcripción', title: 'La polimerasa abre y copia el ADN', question: '¿Qué hebra se usa como plantilla?', object: 'ADN → PRE-ARNm', evidence: 'MODELO DIDÁCTICO', rule: 'La hebra molde se lee 3′→5′ mientras el ARN se sintetiza 5′→3′.', explanation: 'Los factores de transcripción reconocen el promotor. La ARN polimerasa abre una burbuja local, separa las hebras y construye un pre-ARNm complementario; no copia el ADN entero.', observe: 'Avanza y retrocede bases para seguir la hebra naciente desde su extremo 5′.' },
  { id: 'maturation', short: 'Maduración', title: 'Proteger, cortar y volver a unir', question: '¿Cómo se convierte el pre-ARNm en ARNm?', object: 'PRE-ARNm', evidence: 'MODELO DIDÁCTICO', rule: 'Se añade cap 5′, se eliminan intrones mediante splicing y se añade una cola poli-A.', explanation: 'El pre-ARNm todavía contiene exones e intrones. El spliceosoma forma lazos, corta los intrones y une los exones. Al terminar, el complejo de corte desaparece.', observe: 'Activa cada transformación por separado y compárala en la tira inferior.' },
  { id: 'export', short: 'Exportación', title: 'El mensaje atraviesa el poro nuclear', question: '¿Cómo llega el ARNm al ribosoma?', object: 'ARNm · PORO NUCLEAR', evidence: 'MODELO DIDÁCTICO', rule: 'Solo después de madurar, el ARNm se exporta del núcleo hacia el citoplasma.', explanation: 'La doble barrera representa la envoltura nuclear. El complejo del poro atraviesa ambas membranas y funciona como una puerta selectiva para el ARNm maduro.', observe: 'Haz avanzar o regresar el ARNm y sigue la cap 5′ como extremo guía.' },
  { id: 'mrna', short: 'ARNm', title: 'Un hilo continuo con regiones distintas', question: '¿Todo el ARNm se convierte en aminoácidos?', object: 'ARNm MADURO', evidence: 'MODELO + REFSEQ', rule: 'Las UTR forman parte del ARNm pero quedan fuera de la CDS.', explanation: 'El ARNm sigue siendo una hebra, no una colección de cajas. La cap y la cola poli-A protegen el mensaje; las UTR regulan; AUG abre la CDS; STOP la cierra. Los colores de los exones se conservan dentro de la CDS.', observe: 'Selecciona cada región para ver su función sin perder la continuidad de la hebra.' },
  { id: 'orf', short: 'ORF / CDS', title: 'Tres marcos, tres lecturas posibles', question: '¿Por qué mover una base cambia todos los codones?', object: 'MARCOS DE LECTURA', evidence: 'MODELO DIDÁCTICO', rule: 'ORF es una posibilidad de lectura; CDS es la región anotada que produce el producto proteico.', explanation: 'El ribosoma agrupa bases consecutivas de tres en tres. Empezar en la base 1, 2 o 3 produce tripletes diferentes. Un marco solo forma un ORF en este tramo si encuentra AUG y después un STOP en el mismo marco.', observe: 'Cambia de marco y compara los tripletes; la secuencia no cambia, solo el punto de inicio.' },
  { id: 'translation', short: 'Traducción', title: 'El ribosoma convierte codones en aminoácidos', question: '¿Cómo entra la información y cómo sale la cadena?', object: 'ARNm · RIBOSOMA · ARNt', evidence: 'MODELO DIDÁCTICO', rule: 'El ribosoma avanza 5′→3′; cada codón aporta un aminoácido o una señal STOP.', explanation: 'El ARNm atraviesa el canal del ribosoma. Un ARNt reconoce el codón en el sitio A, la cadena se transfiere en P y el ARNt vacío sale por E. La proteína nace como una cadena de aminoácidos.', observe: 'Lee, retrocede o selecciona un codón para relacionarlo con el aminoácido resaltado.' },
  { id: 'protein', short: 'Proteína', title: 'El plegamiento crea un sitio funcional', question: '¿Qué ocurre dentro del sitio activo?', object: 'PROTEÍNA 3D · SITIO ACTIVO', evidence: 'ESTRUCTURA EXPERIMENTAL + MODELO', rule: 'La forma coloca residuos y cofactores en posiciones precisas; cambiar esa geometría puede reducir o impedir la función.', explanation: 'En CA2, el Zn²⁺ está coordinado por His94, His96, His119 y agua/hidróxido. Allí se cataliza CO₂ + H₂O ⇌ HCO₃⁻ + H⁺. El modelo permite alterar una histidina para observar por qué la geometría importa.', observe: 'Abre el sitio activo, muestra sustrato/producto y compara la coordinación normal con la alterada.' },
] as const

export const CODON_NAMES: Record<string, string> = {
  AUG:'Met', GUG:'Val', CAC:'His', CUG:'Leu', ACU:'Thr', CCU:'Pro', GAG:'Glu', AAG:'Lys', UCU:'Ser', GCC:'Ala', GUU:'Val', UGG:'Trp', GGC:'Gly', AAC:'Asn',
  AGC:'Ser', CAU:'His', UAC:'Tyr', AAA:'Lys', GGA:'Gly', CCA:'Pro', AUC:'Ile', UGC:'Cys', GAC:'Asp', UUC:'Phe', UAA:'STOP', UAG:'STOP', UGA:'STOP',
}
