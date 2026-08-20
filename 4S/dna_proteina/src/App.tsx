import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import SequenceMap from './SequenceMap'
import { ArrowIcon, ChevronIcon, DnaIcon, EyeIcon, InfoIcon, LayersIcon, PlayIcon, ResetIcon } from './Icons'
import { GENES, STEPS, type GeneKey, type LearningLevel } from './data'

const MolecularScene = lazy(() => import('./MolecularScene'))

type Quality = 'high' | 'medium' | 'basic'

function detectQuality(): Quality {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!gl) return 'basic'
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
  const cores = navigator.hardwareConcurrency ?? 8
  return memory >= 6 && cores >= 6 ? 'high' : 'medium'
}

function classNames(...values: Array<string | false | null | undefined>) { return values.filter(Boolean).join(' ') }

export default function App() {
  const [geneKey, setGeneKey] = useState<GeneKey>('HBB')
  const [level, setLevel] = useState<LearningLevel>('4S')
  const [step, setStep] = useState(0)
  const [furthest, setFurthest] = useState(0)
  const [quality, setQuality] = useState<Quality>(() => detectQuality())
  const [transcription, setTranscription] = useState(.12)
  const [maturation, setMaturation] = useState({ cap: false, splice: false, polyA: false })
  const [frame, setFrame] = useState(0)
  const [translation, setTranslation] = useState(0)
  const [activeRegion, setActiveRegion] = useState('cds')
  const [selectedExon, setSelectedExon] = useState(0)
  const [strandView, setStrandView] = useState<'both'|'template'>('both')
  const [exportProgress, setExportProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showSources, setShowSources] = useState(false)
  const [showMolstar, setShowMolstar] = useState(false)
  const [teacher, setTeacher] = useState(false)
  const gene = GENES[geneKey]
  const current = STEPS[step]

  useEffect(() => {
    setShowMolstar(false)
    setTranslation(0)
    setFrame(0)
    setTranscription(.12)
    setMaturation({ cap: false, splice: false, polyA: false })
    setSelectedExon(0)
    setStrandView('both')
    setExportProgress(0)
  }, [geneKey])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update(); query.addEventListener('change',update)
    return () => query.removeEventListener('change',update)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const completion = useMemo(() => Math.round(((furthest + 1) / STEPS.length) * 100), [furthest])
  const pdb = gene.pdb[0]

  function goTo(next: number) {
    const bounded = Math.max(0, Math.min(STEPS.length - 1, next))
    if (bounded === 8) setFrame(0)
    setStep(bounded)
    setFurthest(value => Math.max(value, bounded))
  }

  function resetStation() {
    if (step === 3) setTranscription(.12)
    if (step === 4) setMaturation({ cap: false, splice: false, polyA: false })
    if (step === 7) setFrame(0)
    if (step === 8) setTranslation(0)
    if (step === 5) setExportProgress(0)
  }

  function showTeacherSolution() {
    if (step === 3) setTranscription(1)
    if (step === 4) setMaturation({cap:true,splice:true,polyA:true})
    if (step === 5) setExportProgress(1)
    if (step === 7) setFrame(0)
    if (step === 8) setTranslation(gene.aminoAcids.length)
  }

  function renderControls() {
    if (step === 0) return <><button className="action primary" onClick={() => goTo(1)}>Entrar al núcleo <ArrowIcon/></button><span className="control-explain">La cámara cambia de célula a núcleo.</span></>
    if (step === 1) return <><button className="action primary" onClick={() => goTo(2)}>Acercarse al gen <LayersIcon/></button><span className="control-explain">Zoom de cromosoma a cromatina y locus.</span></>
    if (step === 2) return <><button aria-pressed={strandView==='both'} onClick={()=>setStrandView('both')} className={classNames('action',strandView==='both'&&'selected')}><EyeIcon/> Mostrar ambas hebras</button><button aria-pressed={strandView==='template'} onClick={()=>setStrandView('template')} className={classNames('action',strandView==='template'&&'selected')}>Aislar hebra molde</button><span className="control-explain">Exón {selectedExon+1}: rastreo didáctico de continuidad, no anotación residuo a residuo.</span></>
    if (step === 3) return <><button className="action primary" onClick={() => setTranscription(v => Math.min(1,v+.06))}>+ 1 base</button><button className="action" onClick={() => setTranscription(v => Math.min(1,v+.18))}>+ 3 bases</button><button className="action" onClick={() => setTranscription(1)}><PlayIcon/> Completar copia</button><span className="control-explain">{Math.round(transcription*36)} / 36 bases del tramo didáctico.</span></>
    if (step === 4) return <><button aria-pressed={maturation.cap} className={classNames('action',maturation.cap&&'selected')} onClick={() => setMaturation(v=>({...v,cap:!v.cap}))}>{maturation.cap?'✓ Quitar':'Añadir'} cap 5′</button><button aria-pressed={maturation.splice} className={classNames('action',maturation.splice&&'selected')} onClick={() => setMaturation(v=>({...v,splice:!v.splice}))}>{maturation.splice?'✓ Revertir':'Realizar'} splicing</button><button aria-pressed={maturation.polyA} className={classNames('action',maturation.polyA&&'selected')} onClick={() => setMaturation(v=>({...v,polyA:!v.polyA}))}>{maturation.polyA?'✓ Quitar':'Añadir'} poli-A</button><span className="control-explain">{Object.values(maturation).filter(Boolean).length}/3 transformaciones · reversible.</span></>
    if (step === 5) return <><button aria-pressed={exportProgress===1} className={classNames('action','primary',exportProgress===1&&'selected')} onClick={() => setExportProgress(v=>v===1?0:1)}>{exportProgress===1?'Regresar al núcleo':'Atravesar el poro'} <ArrowIcon/></button><span className="control-explain">La cap 5′ guía el tránsito hacia el citoplasma.</span></>
    if (step === 6) return <>{[['utr5','5′ UTR'],['start','START'],['cds','CDS'],['stop','STOP'],['utr3','3′ UTR']].map(([id,label])=><button key={id} className={classNames('action',activeRegion===id&&'selected')} onClick={()=>setActiveRegion(id)}>{label}</button>)}<span className="control-explain">CDS es el término correcto; no “CDC”.</span></>
    if (step === 7) return <>{[0,1,2].map(value=><button key={value} className={classNames('action',frame===value&&'selected')} onClick={()=>setFrame(value)}>Marco +{value+1}</button>)}<span className="control-explain">Mover una base reagrupa todos los tripletes.</span></>
    if (step === 8) return <><button className="action primary" onClick={()=>setTranslation(v=>Math.min(gene.aminoAcids.length,v+1))}>Leer 1 codón <ArrowIcon/></button><button className="action" onClick={()=>setTranslation(gene.aminoAcids.length)}><PlayIcon/> Traducir hasta STOP</button><span className="control-explain">{translation}/{gene.aminoAcids.length} aminoácidos añadidos.</span></>
    return <><button className="action primary" onClick={()=>setShowMolstar(v=>!v)}>{showMolstar?'Volver a la ruta':'Abrir estructura experimental'} <ArrowIcon/></button><a className="action external" href={`https://www.rcsb.org/structure/${pdb}`} target="_blank" rel="noreferrer">Registro RCSB · {pdb}</a></>
  }

  return <div className="app">
    <a className="skip-link" href="#main-scene">Saltar a la escena molecular</a>
    <header className="topbar">
      <a className="brand" href="#main-scene" aria-label="ProteinLab, observatorio molecular"><DnaIcon size={34}/><span>ProteinLab</span><b>2.0</b></a>
      <div className="topbar-controls">
        <label className="selector-label"><span>Caso</span><select value={geneKey} onChange={event=>setGeneKey(event.target.value as GeneKey)}><option value="HBB">HBB · ruta clásica</option><option value="CA2">CA2 · ruta enzimática</option></select></label>
        <div className="segmented" aria-label="Nivel de profundidad">
          <button aria-pressed={level==='4S'} className={level==='4S'?'active':''} onClick={()=>setLevel('4S')}>4.º</button>
          <button aria-pressed={level==='5S'} className={level==='5S'?'active':''} onClick={()=>setLevel('5S')}>5.º</button>
        </div>
        <button aria-pressed={teacher} className={classNames('teacher-button',teacher&&'active')} onClick={()=>setTeacher(v=>!v)}>Profesor</button>
      </div>
      <div className="progress-readout"><span>{completion}%</span><div><i style={{width:`${completion}%`}}/></div></div>
    </header>

    <main className="observatory">
      <nav className="route-rail" aria-label="Ruta molecular">
        <div className="route-title"><span>Ruta molecular</span><strong>{step+1} / {STEPS.length}</strong></div>
        <ol>{STEPS.map((item,index)=><li key={item.id}><button disabled={!teacher && index>furthest+1} className={classNames(index===step&&'current',index<step&&'complete')} onClick={()=>goTo(index)}><span>{index<step?'✓':index+1}</span><b>{item.short}</b><ChevronIcon/></button></li>)}</ol>
        <div className="quality-control"><label htmlFor="quality">Calidad 3D</label><select id="quality" value={quality} onChange={event=>setQuality(event.target.value as Quality)}><option value="high">Alta</option><option value="medium">Media</option><option value="basic">Compatibilidad</option></select><small>WebGL en tu navegador</small></div>
      </nav>

      <section className="main-column" id="main-scene">
        <header className="scene-heading">
          <div><h1>{current.title}</h1><p className="station-challenge">Reto · {current.question}</p></div>
          <span className={classNames('evidence',current.evidence.includes('MODELO')&&'model')}>{current.evidence}</span>
        </header>
        <div className="viewport-shell">
          {step===9 && showMolstar ? <div className="molstar-panel"><iframe title={`Estructura ${pdb} en Mol*`} src={`https://molstar.org/viewer/?pdb=${pdb}&hide-controls=1`}/><div className="molstar-caption"><strong>{pdb}</strong><span>Mol* · estructura experimental RCSB PDB</span></div></div> : <Suspense fallback={<div className="scene-loading"><DnaIcon size={42}/><strong>Preparando escena molecular</strong><span>WebGL · {quality}</span></div>}><MolecularScene step={step} gene={gene} transcription={transcription} maturation={maturation} frame={frame} translation={translation} quality={quality} selectedExon={selectedExon} strandView={strandView} exportProgress={exportProgress} advanced={level==='5S'} reducedMotion={reducedMotion}/></Suspense>} 
          <p className="sr-only" aria-live="polite">{current.object}. Exón {selectedExon+1} seleccionado. {current.rule}</p>
          <div className="viewport-tools"><span>Arrastra para rotar · rueda para acercar</span><button aria-label="Reiniciar estación" onClick={resetStation}><ResetIcon/></button></div>
          <div className="scale-rail" aria-label="Escala de observación"><span className={step===0?'active':''}>CÉLULA</span><i/><span className={step>=1&&step<=2?'active':''}>GEN</span><i/><span className={step>=3&&step<=7?'active':''}>ARN</span><i/><span className={step>=8?'active':''}>PROTEÍNA</span></div>
        </div>
        <SequenceMap gene={gene} step={step} frame={frame} translation={translation} activeRegion={activeRegion} selectedExon={selectedExon} onSelectExon={setSelectedExon}/>
        <div className="control-deck" aria-label="Controles de la estación">{renderControls()}</div>
        <footer className="station-nav"><button disabled={step===0} onClick={()=>goTo(step-1)}>Anterior</button><p>{current.rule}</p><button className="next" disabled={step===STEPS.length-1} onClick={()=>goTo(step+1)}>Siguiente <ArrowIcon/></button></footer>
      </section>

      <aside className="evidence-panel">
        <div className="object-heading"><span>Qué estás mirando</span><strong>{current.object}</strong></div>
        <dl><div><dt>Caso molecular</dt><dd>{gene.symbol}</dd></div><div><dt>Gen</dt><dd>{gene.name}</dd></div><div><dt>Gene ID</dt><dd>{gene.geneId}</dd></div>{level==='5S'&&<><div><dt>Transcrito</dt><dd>{gene.transcript}</dd></div><div><dt>Proteína</dt><dd>{gene.protein}</dd></div><div><dt>Coordenadas</dt><dd>{gene.coordinates}</dd></div></>}<div><dt>Dirección</dt><dd>{step<=2?`hebra ${gene.strand}`:'5′ → 3′'}</dd></div></dl>
        <div className="rule-panel"><InfoIcon/><div><span>Regla clave</span><p>{current.rule}</p></div></div>
        <div className="gene-function"><span>Del dato a la función</span><p>{gene.function}</p></div>
        <button className="sources-button" onClick={()=>setShowSources(v=>!v)} aria-expanded={showSources}><InfoIcon/> Fuentes y alcance <ChevronIcon className={showSources?'open':''}/></button>
        {showSources&&<div className="sources"><a href={`https://www.ncbi.nlm.nih.gov/gene/${gene.geneId}`} target="_blank" rel="noreferrer">NCBI Gene · {gene.geneId}</a><a href={`https://www.ncbi.nlm.nih.gov/nuccore/${gene.transcript}`} target="_blank" rel="noreferrer">RefSeq · {gene.transcript}</a><a href={`https://www.rcsb.org/structure/${pdb}`} target="_blank" rel="noreferrer">RCSB PDB · {pdb}</a><p>Las escalas celulares y animaciones están identificadas como modelos didácticos.</p></div>}
      </aside>
    </main>
    {teacher&&<div className="teacher-dock"><strong>Control docente</strong><button onClick={showTeacherSolution}>Mostrar solución de esta estación</button><button onClick={resetStation}>Reiniciar estación</button><span>{level==='5S'?'Datos avanzados visibles':'Explicación esencial visible'}</span></div>}
  </div>
}
