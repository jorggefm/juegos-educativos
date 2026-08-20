export type GeneKey = 'HBB' | 'CA2'
export type LearningLevel = '4S' | '5S'

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
  { id: 'cell', short: 'Núcleo', title: 'La información comienza dentro del núcleo', question: '¿En qué compartimento celular está el gen?', object: 'CÉLULA → NÚCLEO', evidence: 'MODELO DIDÁCTICO', rule: 'La transcripción y la maduración del ARNm ocurren en el núcleo; la traducción ocurre en el citoplasma.' },
  { id: 'locus', short: 'Locus', title: 'Del cromosoma al locus del gen', question: '¿Un gen ocupa todo un cromosoma?', object: 'CROMATINA', evidence: 'DATO REAL + MODELO', rule: 'Un gen es una región del ADN localizada en un cromosoma, no el cromosoma completo.' },
  { id: 'gene', short: 'Gen', title: 'Dos hebras, exones e intrones', question: '¿Qué partes del gen seguirán la ruta?', object: 'ADN · GEN', evidence: 'DATO REAL + MODELO', rule: 'Los exones permanecen en el ARNm maduro; los intrones se transcriben y después se eliminan.' },
  { id: 'transcription', short: 'Transcripción', title: 'La polimerasa abre y copia el ADN', question: '¿Qué hebra se usa como plantilla?', object: 'ADN → PRE-ARNm', evidence: 'MODELO DIDÁCTICO', rule: 'La hebra molde se lee 3′→5′ mientras el ARN se sintetiza 5′→3′.' },
  { id: 'maturation', short: 'Maduración', title: 'Proteger, cortar y volver a unir', question: '¿Cómo se convierte el pre-ARNm en ARNm?', object: 'PRE-ARNm', evidence: 'MODELO DIDÁCTICO', rule: 'Se añade cap 5′, se eliminan intrones mediante splicing y se añade una cola poli-A.' },
  { id: 'export', short: 'Exportación', title: 'El mensaje atraviesa el poro nuclear', question: '¿Cómo llega el ARNm al ribosoma?', object: 'mRNP · PORO NUCLEAR', evidence: 'MODELO DIDÁCTICO', rule: 'Solo después de madurar, el ARNm se exporta del núcleo hacia el citoplasma.' },
  { id: 'mrna', short: 'ARNm', title: 'El mensaje contiene regiones con trabajos distintos', question: '¿Todo el ARNm se convierte en aminoácidos?', object: 'ARNm MADURO', evidence: 'MODELO + REFSEQ', rule: 'Las UTR forman parte del ARNm pero quedan fuera de la CDS.' },
  { id: 'orf', short: 'ORF / CDS', title: 'El marco cambia la forma de leer', question: '¿ORF y CDS significan exactamente lo mismo?', object: 'MARCOS DE LECTURA', evidence: 'MODELO DIDÁCTICO', rule: 'ORF es una posibilidad de lectura; CDS es la región anotada que produce el producto proteico.' },
  { id: 'translation', short: 'Traducción', title: 'El ribosoma lee de tres en tres', question: '¿Cómo se convierte un codón en un aminoácido?', object: 'RIBOSOMA', evidence: 'MODELO DIDÁCTICO', rule: 'El ribosoma avanza 5′→3′; cada codón aporta un aminoácido o una señal STOP.' },
  { id: 'protein', short: 'Proteína', title: 'La cadena se pliega y adquiere función', question: '¿Cómo se conecta la secuencia con la estructura?', object: 'PROTEÍNA 3D', evidence: 'ESTRUCTURA EXPERIMENTAL', rule: 'La secuencia determina una cadena que debe plegarse y, a veces, asociarse con otras cadenas o cofactores.' },
] as const

export const CODON_NAMES: Record<string, string> = {
  AUG:'Met', GUG:'Val', CAC:'His', CUG:'Leu', ACU:'Thr', CCU:'Pro', GAG:'Glu', AAG:'Lys', UCU:'Ser', GCC:'Ala', GUU:'Val', UGG:'Trp', GGC:'Gly', AAC:'Asn',
  AGC:'Ser', CAU:'His', UAC:'Tyr', AAA:'Lys', GGA:'Gly', CCA:'Pro', AUC:'Ile', UGC:'Cys', GAC:'Asp', UUC:'Phe', UAA:'STOP', UAG:'STOP', UGA:'STOP',
}
