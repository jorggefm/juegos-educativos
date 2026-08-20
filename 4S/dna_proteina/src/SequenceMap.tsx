import type { GeneRecord } from './data'
import { CODON_NAMES, EXON_COLORS } from './data'

type Props = { gene: GeneRecord; step: number; frame: number; translation: number; activeRegion: string; selectedExon: number; onSelectExon: (index: number) => void }

function GeneTrack({ gene, mature = false, selectedExon, onSelectExon }: { gene: GeneRecord; mature?: boolean; selectedExon: number; onSelectExon: (index:number)=>void }) {
  return <div className="gene-map" aria-label={`${mature ? 'ARNm maduro' : 'Gen'} con ${gene.exonCount} exones`}>
    <span className="end-label">5′</span>
    {Array.from({ length: gene.exonCount }, (_, index) => <div className="gene-map-fragment" key={index}>
      <button aria-pressed={selectedExon===index} onClick={()=>onSelectExon(index)} className={`exon-segment ${selectedExon===index?'selected':''}`} style={{ '--exon': EXON_COLORS[index] } as React.CSSProperties}>E{index + 1}</button>
      {!mature && index < gene.exonCount - 1 && <span className="intron-segment"><b>I{index + 1}</b></span>}
    </div>)}
    <span className="end-label">3′</span>
  </div>
}

function CodonTrack({ gene, translation, frame, selectedExon }: { gene: GeneRecord; translation: number; frame: number; selectedExon: number }) {
  const compact = gene.codons.join('')
  const shifted = compact.slice(frame)
  const codons = Array.from({ length: Math.floor(shifted.length / 3) }, (_, index) => shifted.slice(index * 3, index * 3 + 3))
  return <div className="codon-map" aria-label="Secuencia de codones">
    {codons.map((codon,index) => <span key={`${codon}-${index}`} className={`codon-cell ${codon === 'AUG' ? 'start' : ''} ${['UAA','UAG','UGA'].includes(codon) ? 'stop' : ''} ${index === translation ? 'reading' : ''} ${index%gene.exonCount===selectedExon?'selected-exon':''}`}>
      <b>{codon}</b><small>{CODON_NAMES[codon] ?? '—'}</small>
    </span>)}
  </div>
}

export default function SequenceMap({ gene, step, frame, translation, activeRegion, selectedExon, onSelectExon }: Props) {
  const isGene = step <= 3
  const isCodon = step >= 7
  return <section className="sequence-map" aria-labelledby="sequence-map-title">
    <div className="sequence-map-heading">
      <div><span id="sequence-map-title">Mapa de secuencia</span><strong>{isGene ? `ADN genómico · hebra ${gene.strand}` : isCodon ? `Marco +${frame + 1} · ARNm 5′→3′` : 'ARN mensajero · 5′→3′'}</strong></div>
      <span className="scale-notice">{step === 1 ? 'CAMBIO DE ESCALA' : step === 3 || step === 4 ? 'TRANSFORMACIÓN' : 'ANOTACIÓN SINCRONIZADA'}</span>
    </div>
    <div className="sequence-scroll">
      {isCodon ? <CodonTrack gene={gene} translation={translation} frame={frame} selectedExon={selectedExon}/> : step === 6 ? <div className="mrna-map">
        <span className="cap-mark">CAP</span>
        <span className={`region utr ${activeRegion === 'utr5' ? 'active' : ''}`}>5′ UTR</span>
        <span className={`region start ${activeRegion === 'start' ? 'active' : ''}`}>AUG<br/><small>START</small></span>
        <span className={`region cds ${activeRegion === 'cds' ? 'active' : ''}`}>CDS · REGIÓN TRADUCIDA</span>
        <span className={`region stop ${activeRegion === 'stop' ? 'active' : ''}`}>UAA<br/><small>STOP</small></span>
        <span className={`region utr ${activeRegion === 'utr3' ? 'active' : ''}`}>3′ UTR</span>
        <span className="poly-mark">A A A A A…</span>
      </div> : <GeneTrack gene={gene} mature={step >= 4} selectedExon={selectedExon} onSelectExon={onSelectExon}/>} 
    </div>
    <table className="sr-only"><caption>Mapa accesible completo de {gene.symbol}</caption><thead><tr><th>Elemento</th><th>Función o estado</th></tr></thead><tbody>
      <tr><td>5 prima UTR</td><td>Región no traducida anterior al codón de inicio</td></tr>
      {Array.from({length:gene.exonCount},(_,index)=><tr key={`exon-${index}`}><td>Exón {index+1}</td><td>{selectedExon===index?'seleccionado para rastreo didáctico':'región retenida en el ARN maduro'}</td></tr>)}
      {Array.from({length:Math.max(0,gene.exonCount-1)},(_,index)=><tr key={`intron-${index}`}><td>Intrón {index+1}</td><td>región retirada durante el empalme</td></tr>)}
      <tr><td>Codón START AUG</td><td>inicia el ORF en el marco seleccionado</td></tr>
      <tr><td>CDS</td><td>secuencia codificante traducida de 5 prima a 3 prima</td></tr>
      <tr><td>Codón STOP</td><td>termina la traducción</td></tr>
      <tr><td>3 prima UTR</td><td>región no traducida seguida por la cola poli-A</td></tr>
    </tbody></table>
  </section>
}
