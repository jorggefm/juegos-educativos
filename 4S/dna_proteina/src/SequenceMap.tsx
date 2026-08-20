import type { CSSProperties } from 'react'
import type { GeneRecord } from './data'
import { CODON_NAMES, EXON_COLORS } from './data'

type Props = { gene: GeneRecord; step: number; frame: number; translation: number; activeRegion: string; selectedExon: number; selectedCodon: number; onSelectExon: (index: number) => void; onSelectCodon: (index: number) => void }

function GeneTrack({ gene, mature = false, selectedExon, onSelectExon }: { gene: GeneRecord; mature?: boolean; selectedExon: number; onSelectExon: (index:number)=>void }) {
  return <div className="gene-map" aria-label={`${mature ? 'ARNm maduro' : 'Gen o pre-ARNm'} con ${gene.exonCount} exones`}>
    <span className="end-label">5′</span>
    {Array.from({ length: gene.exonCount }, (_, index) => <div className="gene-map-fragment" key={index}>
      <button aria-pressed={selectedExon===index} onClick={()=>onSelectExon(index)} className={`exon-segment ${selectedExon===index?'selected':''}`} style={{ '--exon': EXON_COLORS[index] } as CSSProperties}><b>E{index + 1}</b><small>exón</small></button>
      {!mature && index < gene.exonCount - 1 && <span className="intron-segment"><b>I{index + 1}</b><small>intrón · se elimina</small></span>}
    </div>)}
    <span className="end-label">3′</span>
  </div>
}

function AnnotatedMrna({ gene, activeRegion, selectedExon, onSelectExon }: { gene: GeneRecord; activeRegion: string; selectedExon: number; onSelectExon: (index:number)=>void }) {
  return <div className="rna-annotation" aria-label="ARNm maduro continuo con regiones funcionales">
    <span className="rna-cap">CAP<br/><small>protege 5′</small></span>
    <span className={`rna-region utr ${activeRegion==='utr5'?'active':''}`}>5′ UTR<small>no se traduce</small></span>
    <span className={`rna-region start ${activeRegion==='start'?'active':''}`}>AUG<small>START</small></span>
    <div className={`rna-cds ${activeRegion==='cds'?'active':''}`}><span className="cds-title">CDS · región traducida</span>{Array.from({length:gene.exonCount},(_,index)=><button key={index} aria-pressed={selectedExon===index} onClick={()=>onSelectExon(index)} className={selectedExon===index?'selected':''} style={{'--exon':EXON_COLORS[index]} as CSSProperties}>E{index+1}</button>)}</div>
    <span className={`rna-region stop ${activeRegion==='stop'?'active':''}`}>STOP<small>fin de CDS</small></span>
    <span className={`rna-region utr ${activeRegion==='utr3'?'active':''}`}>3′ UTR<small>no se traduce</small></span>
    <span className="rna-tail">A A A A A…<small>cola poli-A</small></span>
  </div>
}

function CodonTrack({ gene, translation, frame, selectedExon, selectedCodon, onSelectCodon }: { gene: GeneRecord; translation: number; frame: number; selectedExon: number; selectedCodon: number; onSelectCodon:(index:number)=>void }) {
  const compact = gene.codons.join('')
  const shifted = compact.slice(frame)
  const codons = Array.from({ length: Math.floor(shifted.length / 3) }, (_, index) => shifted.slice(index * 3, index * 3 + 3))
  return <div className="frame-map"><div className="base-offset" aria-label={`La lectura comienza en la base ${frame+1}`}>{Array.from({length:frame},(_,i)=><span key={i}>base {i+1}<small>fuera del grupo</small></span>)}</div><div className="codon-map" aria-label={`Tripletes del marco que comienza en la base ${frame+1}`}>
    {codons.map((codon,index) => <button onClick={()=>onSelectCodon(index)} aria-pressed={selectedCodon===index} key={`${codon}-${index}`} className={`codon-cell ${codon === 'AUG' ? 'start' : ''} ${['UAA','UAG','UGA'].includes(codon) ? 'stop' : ''} ${index === translation-1 ? 'reading' : ''} ${index===selectedCodon?'chosen':''} ${index%gene.exonCount===selectedExon?'selected-exon':''}`}>
      <span>{index+1}</span><b>{codon}</b><small>{CODON_NAMES[codon] ?? 'otro triplete'}</small>
    </button>)}
  </div></div>
}

const PURPOSE: Record<number,string> = {
  2:'Selecciona un exón y sigue su color sobre las dos hebras del gen.',
  4:'Compara exones retenidos (E) e intrones que el spliceosoma retirará (I).',
  5:'Confirma que el mensaje exportado conserva solo exones unidos.',
  6:'Relaciona cada región funcional con la misma hebra continua de ARNm.',
  7:'La secuencia no cambia: cambia dónde comienza la agrupación de tres bases.',
  8:'Selecciona un codón; el ribosoma y el aminoácido correspondiente responderán.',
  9:'Selecciona un codón para localizar su tramo didáctico en la cadena plegada.',
}

export default function SequenceMap({ gene, step, frame, translation, activeRegion, selectedExon, selectedCodon, onSelectExon, onSelectCodon }: Props) {
  const isCodon = step >= 7
  const context = step===2?'ADN genómico':step===4?'pre-ARNm · antes del corte':step===5?'ARNm maduro · listo para exportar':step===6?'ARNm maduro · anatomía funcional':step===7?`marco desde base ${frame+1}`:step===8?'traducción 5′→3′':'secuencia → estructura'
  return <section className="sequence-map" aria-labelledby="sequence-map-title">
    <div className="sequence-map-heading"><div><span id="sequence-map-title">Mapa interactivo</span><strong>{context}</strong></div><p>{PURPOSE[step]}</p></div>
    <div className="sequence-scroll">
      {isCodon ? <CodonTrack gene={gene} translation={translation} frame={frame} selectedExon={selectedExon} selectedCodon={selectedCodon} onSelectCodon={onSelectCodon}/> : step===6 ? <AnnotatedMrna gene={gene} activeRegion={activeRegion} selectedExon={selectedExon} onSelectExon={onSelectExon}/> : <GeneTrack gene={gene} mature={step===5} selectedExon={selectedExon} onSelectExon={onSelectExon}/>}
    </div>
    <table className="sr-only"><caption>Mapa accesible completo de {gene.symbol}</caption><thead><tr><th>Elemento</th><th>Función o estado</th></tr></thead><tbody><tr><td>5 prima UTR</td><td>Región no traducida anterior al codón de inicio</td></tr>{Array.from({length:gene.exonCount},(_,index)=><tr key={`exon-${index}`}><td>Exón {index+1}</td><td>{selectedExon===index?'seleccionado para rastreo didáctico':'región retenida en el ARN maduro'}</td></tr>)}{Array.from({length:Math.max(0,gene.exonCount-1)},(_,index)=><tr key={`intron-${index}`}><td>Intrón {index+1}</td><td>región retirada durante el empalme</td></tr>)}<tr><td>Codón START AUG</td><td>inicia el ORF en el marco seleccionado</td></tr><tr><td>CDS</td><td>secuencia codificante traducida de 5 prima a 3 prima</td></tr><tr><td>Codón STOP</td><td>termina la traducción</td></tr><tr><td>3 prima UTR</td><td>región no traducida seguida por la cola poli-A</td></tr></tbody></table>
  </section>
}
