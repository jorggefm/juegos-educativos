import { lazy, Suspense, useEffect, useMemo, useState, type FormEvent } from 'react'
import SequenceMap from './SequenceMap'
import { ArrowIcon, ChevronIcon, DnaIcon, EyeIcon, InfoIcon, LayersIcon, PlayIcon, ResetIcon } from './Icons'
import { GENES, STEPS, type GeneKey } from './data'

const MolecularScene = lazy(() => import('./MolecularScene'))

type Quality = 'high' | 'medium' | 'basic'
type ProteinView = 'fold' | 'active' | 'reaction' | 'altered'

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
  const [step, setStep] = useState(0)
  const [furthest, setFurthest] = useState(0)
  const [quality, setQuality] = useState<Quality>(() => detectQuality())
  const [transcription, setTranscription] = useState(.12)
  const [maturation, setMaturation] = useState({ cap: false, splice: false, polyA: false })
  const [frame, setFrame] = useState(0)
  const [translation, setTranslation] = useState(0)
  const [activeRegion, setActiveRegion] = useState('cds')
  const [selectedExon, setSelectedExon] = useState(0)
  const [selectedCodon, setSelectedCodon] = useState(0)
  const [strandView, setStrandView] = useState<'both'|'template'>('both')
  const [exportProgress, setExportProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showSources, setShowSources] = useState(false)
  const [showMolstar, setShowMolstar] = useState(false)
  const [proteinView, setProteinView] = useState<ProteinView>('fold')
  const [teacher, setTeacher] = useState(false)
  const [teacherGate, setTeacherGate] = useState(false)
  const [teacherPassword, setTeacherPassword] = useState('')
  const [teacherError, setTeacherError] = useState('')
  const [introOpen, setIntroOpen] = useState(true)
  const gene = GENES[geneKey]
  const current = STEPS[step]
  const showSequenceMap = [2,4,5,6,7,8,9].includes(step)

  useEffect(() => {
    setShowMolstar(false); setTranslation(0); setSelectedCodon(0); setFrame(0); setTranscription(.12)
    setMaturation({ cap: false, splice: false, polyA: false }); setSelectedExon(0); setStrandView('both')
    setExportProgress(0); setProteinView('fold')
  }, [geneKey])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const completion = useMemo(() => Math.round(((furthest + 1) / STEPS.length) * 100), [furthest])
  const pdb = gene.pdb[0]

  function goTo(next: number) {
    const bounded = Math.max(0, Math.min(STEPS.length - 1, next))
    if (bounded === 8) setFrame(0)
    setStep(bounded); setFurthest(value => Math.max(value, bounded))
  }

  function resetStation() {
    if (step === 3) setTranscription(.12)
    if (step === 4) setMaturation({ cap: false, splice: false, polyA: false })
    if (step === 5) setExportProgress(0)
    if (step === 7) setFrame(0)
    if (step === 8) { setTranslation(0); setSelectedCodon(0) }
    if (step === 9) { setProteinView('fold'); setShowMolstar(false) }
  }

  function showTeacherSolution() {
    if (step === 3) setTranscription(1)
    if (step === 4) setMaturation({ cap: true, splice: true, polyA: true })
    if (step === 5) setExportProgress(1)
    if (step === 7) setFrame(0)
    if (step === 8) { setTranslation(gene.aminoAcids.length); setSelectedCodon(gene.aminoAcids.length - 1) }
    if (step === 9 && geneKey === 'CA2') setProteinView('reaction')
  }

  function openTeacher() {
    if (teacher) { setTeacher(false); return }
    setTeacherPassword(''); setTeacherError(''); setTeacherGate(true)
  }

  function unlockTeacher(event: FormEvent) {
    event.preventDefault()
    if (teacherPassword === '67676767') {
      setTeacher(true); setTeacherGate(false); setTeacherPassword(''); return
    }
    setTeacherError('Contraseña incorrecta. Revisa los ocho dígitos.')
  }

  function selectCodon(index: number) {
    setSelectedCodon(index)
    if (step === 8) setTranslation(Math.min(gene.aminoAcids.length, index + 1))
  }

  function renderControls() {
    if (step === 0) return <><button className="action primary" onClick={() => goTo(1)}>Entrar al núcleo <ArrowIcon/></button><span className="control-explain">Cambiaremos de escala: célula → núcleo → cromosoma.</span></>
    if (step === 1) return <><button className="action primary" onClick={() => goTo(2)}>Acercarse al gen <LayersIcon/></button><span className="control-explain">El cromosoma se abre en cromatina hasta localizar {gene.symbol}.</span></>
    if (step === 2) return <><button aria-pressed={strandView==='both'} onClick={()=>setStrandView('both')} className={classNames('action',strandView==='both'&&'selected')}><EyeIcon/> Mostrar ambas hebras</button><button aria-pressed={strandView==='template'} onClick={()=>setStrandView('template')} className={classNames('action',strandView==='template'&&'selected')}>Aislar solo la hebra molde</button><span className="control-explain">Al aislarla desaparecen la hebra codificante y sus puentes de hidrógeno.</span></>
    if (step === 3) return <><button className="action" onClick={() => setTranscription(v => Math.max(.04,v-.06))}>− 1 base</button><button className="action primary" onClick={() => setTranscription(v => Math.min(1,v+.06))}>+ 1 base</button><button className="action" onClick={() => setTranscription(v => Math.min(1,v+.18))}>+ 3 bases</button><button className="action" onClick={() => setTranscription(1)}><PlayIcon/> Completar copia</button><button className="action" onClick={() => setTranscription(.12)}><ResetIcon/> Reiniciar ARN</button><span className="control-explain">{Math.round(transcription*36)} / 36 bases · el pre-ARNm crece 5′→3′.</span></>
    if (step === 4) return <><button aria-pressed={maturation.cap} className={classNames('action',maturation.cap&&'selected')} onClick={() => setMaturation(v=>({...v,cap:!v.cap}))}>{maturation.cap?'✓ Quitar':'Añadir'} cap 5′</button><button aria-pressed={maturation.splice} className={classNames('action',maturation.splice&&'selected')} onClick={() => setMaturation(v=>({...v,splice:!v.splice}))}>{maturation.splice?'✓ Repetir':'Realizar'} splicing</button><button aria-pressed={maturation.polyA} className={classNames('action',maturation.polyA&&'selected')} onClick={() => setMaturation(v=>({...v,polyA:!v.polyA}))}>{maturation.polyA?'✓ Quitar':'Añadir'} poli-A</button><span className="control-explain">{Object.values(maturation).filter(Boolean).length}/3 cambios · el spliceosoma se retira al terminar.</span></>
    if (step === 5) return <><button aria-pressed={exportProgress===1} className={classNames('action','primary',exportProgress===1&&'selected')} onClick={() => setExportProgress(v=>v===1?0:1)}>{exportProgress===1?'Regresar lentamente al núcleo':'Atravesar lentamente el poro'} <ArrowIcon/></button><span className="control-explain">La envoltura tiene dos membranas; el poro atraviesa ambas.</span></>
    if (step === 6) return <>{[['utr5','5′ UTR'],['start','AUG · START'],['cds','CDS'],['stop','STOP'],['utr3','3′ UTR']].map(([id,label])=><button key={id} aria-pressed={activeRegion===id} className={classNames('action',activeRegion===id&&'selected')} onClick={()=>setActiveRegion(id)}>{label}</button>)}<span className="control-explain">UTR no se traduce; CDS sí. “CDS” es el término correcto.</span></>
    if (step === 7) {
      const compact = gene.codons.join(''); const shifted = compact.slice(frame)
      const frameCodons = Array.from({length:Math.floor(shifted.length/3)},(_,i)=>shifted.slice(i*3,i*3+3))
      const start = frameCodons.indexOf('AUG'); const stop = start >= 0 ? frameCodons.findIndex((c,i)=>i>start&&['UAA','UAG','UGA'].includes(c)) : -1
      const verdict = start < 0 ? 'Este tramo no contiene AUG en este marco.' : stop < 0 ? `AUG aparece en el codón ${start+1}, pero no hay STOP posterior.` : `ORF visible: AUG en ${start+1} → STOP en ${stop+1}.`
      return <>{[0,1,2].map(value=><button key={value} aria-pressed={frame===value} className={classNames('action',frame===value&&'selected')} onClick={()=>setFrame(value)}>Comenzar en base {value+1}</button>)}<span className="control-explain">{verdict}</span></>
    }
    if (step === 8) return <><button className="action" onClick={()=>{setTranslation(v=>Math.max(0,v-1));setSelectedCodon(v=>Math.max(0,v-1))}}>Retroceder 1 codón</button><button className="action primary" onClick={()=>{setTranslation(v=>Math.min(gene.aminoAcids.length,v+1));setSelectedCodon(Math.min(gene.aminoAcids.length-1,translation))}}>Leer siguiente codón <ArrowIcon/></button><button className="action" onClick={()=>setTranslation(gene.aminoAcids.length)}><PlayIcon/> Traducir hasta STOP</button><button className="action" onClick={()=>{setTranslation(0);setSelectedCodon(0)}}><ResetIcon/> Reiniciar</button><span className="control-explain">{translation}/{gene.aminoAcids.length} aminoácidos · selecciona cualquier codón en el mapa.</span></>
    return <><button aria-pressed={!showMolstar&&proteinView==='fold'} className={classNames('action',!showMolstar&&proteinView==='fold'&&'selected')} onClick={()=>{setShowMolstar(false);setProteinView('fold')}}>Plegamiento</button>{geneKey==='CA2'&&<><button aria-pressed={!showMolstar&&proteinView==='active'} className={classNames('action',!showMolstar&&proteinView==='active'&&'selected')} onClick={()=>{setShowMolstar(false);setProteinView('active')}}>Acercar sitio activo</button><button aria-pressed={!showMolstar&&proteinView==='reaction'} className={classNames('action',!showMolstar&&proteinView==='reaction'&&'selected')} onClick={()=>{setShowMolstar(false);setProteinView('reaction')}}>CO₂ + H₂O ⇌ HCO₃⁻ + H⁺</button><button aria-pressed={!showMolstar&&proteinView==='altered'} className={classNames('action',!showMolstar&&proteinView==='altered'&&'selected')} onClick={()=>{setShowMolstar(false);setProteinView('altered')}}>Alterar His119</button></>}<button className="action primary" onClick={()=>setShowMolstar(v=>!v)}>{showMolstar?'Volver al modelo guiado':'Estructura experimental Mol*'} <ArrowIcon/></button><a className="action external" href={`https://www.rcsb.org/structure/${pdb}`} target="_blank" rel="noreferrer">RCSB · {pdb}</a></>
  }

  return <div className="app">
    <a className="skip-link" href="#main-scene">Saltar a la escena molecular</a>
    <header className="topbar"><a className="brand" href="#main-scene" aria-label="ProteinLab, observatorio molecular"><DnaIcon size={34}/><span>ProteinLab</span><b>2.1</b></a><div className="topbar-controls"><label className="selector-label"><span>Caso</span><select value={geneKey} onChange={event=>setGeneKey(event.target.value as GeneKey)}><option value="HBB">HBB · hemoglobina</option><option value="CA2">CA2 · anhidrasa carbónica</option></select></label><button aria-pressed={teacher} className={classNames('teacher-button',teacher&&'active')} onClick={openTeacher}>{teacher?'Cerrar Profesor':'Versión Profesor'}</button></div><div className="progress-readout"><span>{completion}%</span><div><i style={{width:`${completion}%`}}/></div></div></header>

    <main className="observatory" id="main-scene"><section className="main-column"><div className="viewport-shell">
      {step===9 && showMolstar ? <div className="molstar-panel"><iframe title={`Estructura ${pdb} en Mol*`} src={`https://molstar.org/viewer/?pdb=${pdb}&hide-controls=0`}/><div className="molstar-caption"><strong>{pdb}</strong><span>Arrastra, acerca y usa “Select” para inspeccionar ligandos y residuos.</span></div></div> : <Suspense fallback={<div className="scene-loading"><DnaIcon size={42}/><strong>Preparando escena molecular</strong><span>WebGL · {quality}</span></div>}><MolecularScene step={step} gene={gene} transcription={transcription} maturation={maturation} frame={frame} translation={translation} activeRegion={activeRegion} quality={quality} selectedExon={selectedExon} selectedCodon={selectedCodon} strandView={strandView} exportProgress={exportProgress} proteinView={proteinView} reducedMotion={reducedMotion}/></Suspense>}
      <header className="scene-heading"><div><h1>{current.title}</h1><p className="station-challenge">{current.question}</p></div><span className={classNames('evidence',current.evidence.includes('MODELO')&&'model')}>{current.evidence}</span></header>
      <nav className="route-rail" aria-label="Ruta molecular"><div className="route-title"><span>Ruta molecular</span><strong>{step+1}/{STEPS.length}</strong></div><ol>{STEPS.map((item,index)=><li key={item.id}><button disabled={!teacher && index>furthest+1} className={classNames(index===step&&'current',index<step&&'complete')} onClick={()=>goTo(index)} title={item.title}><span>{index<step?'✓':index+1}</span><b>{item.short}</b><ChevronIcon/></button></li>)}</ol><div className="quality-control"><label htmlFor="quality">Calidad 3D</label><select id="quality" value={quality} onChange={event=>setQuality(event.target.value as Quality)}><option value="high">Alta</option><option value="medium">Media</option><option value="basic">Compatibilidad</option></select></div></nav>
      <aside className="evidence-panel"><div className="object-heading"><span>Qué estás mirando</span><strong>{current.object}</strong></div><p className="scene-explanation">{current.explanation}</p><div className="observe-prompt"><EyeIcon/><span>{current.observe}</span></div><dl><div><dt>Caso</dt><dd>{gene.symbol}</dd></div><div><dt>Dirección</dt><dd>{step<=2?`hebra ${gene.strand}`:'5′ → 3′'}</dd></div>{teacher&&<><div><dt>Gen</dt><dd>{gene.name}</dd></div><div><dt>Gene ID</dt><dd>{gene.geneId}</dd></div><div><dt>Transcrito</dt><dd>{gene.transcript}</dd></div><div><dt>Proteína</dt><dd>{gene.protein}</dd></div><div><dt>Coordenadas</dt><dd>{gene.coordinates}</dd></div></>}</dl><div className="rule-panel"><InfoIcon/><div><span>Regla clave</span><p>{current.rule}</p></div></div><button className="sources-button" onClick={()=>setShowSources(v=>!v)} aria-expanded={showSources}><InfoIcon/> Fuentes y alcance <ChevronIcon className={showSources?'open':''}/></button>{showSources&&<div className="sources"><a href={`https://www.ncbi.nlm.nih.gov/gene/${gene.geneId}`} target="_blank" rel="noreferrer">NCBI Gene · {gene.geneId}</a><a href={`https://www.ncbi.nlm.nih.gov/nuccore/${gene.transcript}`} target="_blank" rel="noreferrer">RefSeq · {gene.transcript}</a><a href={`https://www.rcsb.org/structure/${pdb}`} target="_blank" rel="noreferrer">RCSB PDB · {pdb}</a><p>Geometrías celulares y reacciones animadas: modelos didácticos. Estructura PDB: evidencia experimental.</p></div>}</aside>
      <div className="viewport-tools"><span>Arrastra para rotar · rueda para acercar · toca una estructura para identificarla</span><button aria-label="Reiniciar estación" onClick={resetStation}><ResetIcon/></button></div><div className="control-deck" aria-label="Controles de la estación">{renderControls()}</div><div className="scale-rail" aria-label="Escala de observación"><span className={step===0?'active':''}>CÉLULA</span><i/><span className={step>=1&&step<=2?'active':''}>GEN</span><i/><span className={step>=3&&step<=7?'active':''}>ARN</span><i/><span className={step>=8?'active':''}>PROTEÍNA</span></div><footer className="station-nav"><button disabled={step===0} onClick={()=>goTo(step-1)}>Anterior</button><button className="next" disabled={step===STEPS.length-1} onClick={()=>goTo(step+1)}>Siguiente <ArrowIcon/></button></footer><p className="sr-only" aria-live="polite">{current.object}. Exón {selectedExon+1} seleccionado. {current.rule}</p>
    </div>{showSequenceMap&&<SequenceMap gene={gene} step={step} frame={frame} translation={translation} activeRegion={activeRegion} selectedExon={selectedExon} selectedCodon={selectedCodon} onSelectExon={setSelectedExon} onSelectCodon={selectCodon}/>}</section></main>

    {teacher&&<div className="teacher-dock"><strong>Profesor desbloqueado</strong><button onClick={showTeacherSolution}>Mostrar solución</button><button onClick={resetStation}>Reiniciar estación</button><button onClick={()=>setTeacher(false)}>Bloquear</button></div>}
    {introOpen&&<div className="intro-layer" role="dialog" aria-modal="true" aria-labelledby="intro-title"><div className="intro-content"><div className="intro-mark"><DnaIcon size={42}/><span>ProteinLab 2.1</span></div><h2 id="intro-title">Sigue una misma información desde el ADN hasta la proteína</h2><p>No es una colección de dibujos. Es una ruta de diez estaciones: cambiarás de escala, transformarás moléculas y comprobarás qué partes se conservan.</p><div className="intro-route" aria-label="Resumen de la ruta"><span>Núcleo</span><i/><span>Gen</span><i/><span>pre-ARNm</span><i/><span>ARNm</span><i/><span>Ribosoma</span><i/><span>Proteína</span></div><ul><li><b>Arrastra</b> la escena para rotarla y usa la rueda o gesto para acercarte.</li><li><b>Toca o pasa el puntero</b> sobre estructuras para saber qué son.</li><li><b>Actúa</b> con los controles: copiar, cortar, exportar y traducir.</li></ul><button className="intro-start" autoFocus onClick={()=>setIntroOpen(false)}>Comenzar en la célula <ArrowIcon/></button></div></div>}
    {teacherGate&&<div className="teacher-gate" role="dialog" aria-modal="true" aria-labelledby="teacher-title"><form onSubmit={unlockTeacher}><button type="button" className="gate-close" aria-label="Cerrar acceso Profesor" onClick={()=>setTeacherGate(false)}>×</button><DnaIcon size={34}/><h2 id="teacher-title">Versión Profesor</h2><p>Introduce la contraseña de ocho dígitos para desbloquear respuestas y navegación libre.</p><label htmlFor="teacher-password">Contraseña</label><input id="teacher-password" autoFocus type="password" inputMode="numeric" pattern="[0-9]*" maxLength={8} autoComplete="off" value={teacherPassword} onChange={event=>{setTeacherPassword(event.target.value.replace(/\D/g,'').slice(0,8));setTeacherError('')}}/><div className="pin-dots" aria-hidden="true">{Array.from({length:8},(_,i)=><i key={i} className={i<teacherPassword.length?'filled':''}/>)}</div>{teacherError&&<p className="gate-error" role="alert">{teacherError}</p>}<button type="submit" className="intro-start" disabled={teacherPassword.length!==8}>Desbloquear versión Profesor</button></form></div>}
  </div>
}
