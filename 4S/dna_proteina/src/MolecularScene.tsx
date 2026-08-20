import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line, OrbitControls, RoundedBox } from '@react-three/drei'
import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { GeneRecord } from './data'
import { EXON_COLORS } from './data'

type MaturationState = { cap: boolean; splice: boolean; polyA: boolean }
type Quality = 'high' | 'medium' | 'basic'

type SceneProps = {
  step: number
  gene: GeneRecord
  transcription: number
  maturation: MaturationState
  frame: number
  translation: number
  activeRegion: string
  quality: Quality
  selectedExon: number
  selectedCodon: number
  strandView: 'both' | 'template'
  exportProgress: number
  proteinView: 'fold' | 'active' | 'reaction' | 'altered'
  reducedMotion: boolean
  theme: 'dark' | 'light'
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function Label({ position, children, tone = 'light' }: { position: [number, number, number]; children: ReactNode; tone?: 'light' | 'accent' | 'warm' }) {
  return <Html position={position} center><span className={`scene-label ${tone}`}>{children}</span></Html>
}

function Annotation({ position, title, text, radius = .35 }: { position: [number,number,number]; title: string; text: string; radius?: number }) {
  const [open,setOpen] = useState(false)
  return <group position={position}><mesh onPointerOver={event=>{event.stopPropagation();setOpen(true)}} onPointerOut={()=>setOpen(false)} onClick={event=>{event.stopPropagation();setOpen(value=>!value)}}><sphereGeometry args={[radius,16,12]}/><meshBasicMaterial transparent opacity={.001}/></mesh>{open&&<Html position={[0,radius+.18,0]} center><div className="molecule-tip"><strong>{title}</strong><span>{text}</span></div></Html>}</group>
}

function Bond({ a, b, color = '#7fb7c4', radius = 0.035 }: { a: THREE.Vector3; b: THREE.Vector3; color?: string; radius?: number }) {
  const { midpoint, length, quaternion } = useMemo(() => {
    const midpoint = a.clone().add(b).multiplyScalar(0.5)
    const direction = b.clone().sub(a)
    const length = direction.length()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
    return { midpoint, length, quaternion }
  }, [a, b])
  return <mesh position={midpoint} quaternion={quaternion}><cylinderGeometry args={[radius, radius, length, 8]} /><meshStandardMaterial color={color} roughness={0.45} /></mesh>
}

function Tube({ points, color, radius = .05, opacity = 1 }: { points: THREE.Vector3[]; color: string; radius?: number; opacity?: number }) {
  const geometry = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), Math.max(24, points.length * 3), radius, 10, false), [points, radius])
  return <mesh geometry={geometry}><meshStandardMaterial color={color} roughness={.38} metalness={.08} transparent={opacity < 1} opacity={opacity} depthWrite={opacity>.3} /></mesh>
}

function SceneMotion({ children, amount = .05, paused = false }: { children: ReactNode; amount?: number; paused?: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.position.y = paused ? 0 : Math.sin(clock.elapsedTime * .42) * amount
  })
  return <group ref={group}>{children}</group>
}

function CellScene({ quality, reducedMotion }: { quality: Quality; reducedMotion: boolean }) {
  const pores = quality === 'high' ? 16 : 8
  const porePlacements = useMemo(() => Array.from({ length: pores }, (_, i) => {
    const y = 1 - (i / Math.max(1, pores - 1)) * 2
    const radial = Math.sqrt(Math.max(0, 1 - y * y))
    const angle = i * Math.PI * (3 - Math.sqrt(5))
    const normal = new THREE.Vector3(Math.cos(angle) * radial, y, Math.sin(angle) * radial)
    const position = normal.clone().multiplyScalar(1.68).add(new THREE.Vector3(-.35, .05, .1))
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
    return { position, quaternion }
  }), [pores])
  return <SceneMotion amount={.08} paused={reducedMotion}>
    <mesh scale={[1.45, 1, 1]}>
      <sphereGeometry args={[3.25, quality === 'high' ? 72 : 40, quality === 'high' ? 48 : 28]} />
      <meshPhysicalMaterial color="#0b5260" transparent opacity={.16} roughness={.16} transmission={.18} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
    <mesh position={[-.35, .05, .1]}>
      <sphereGeometry args={[1.68, quality === 'high' ? 64 : 36, quality === 'high' ? 42 : 24]} />
      <meshPhysicalMaterial color="#25a7a1" transparent opacity={.3} roughness={.22} transmission={.1} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
    {porePlacements.map(({ position, quaternion }, i) => {
      return <mesh key={i} position={position} quaternion={quaternion}>
        <torusGeometry args={[.08, .025, 8, 18]} /><meshStandardMaterial color="#7ef1d3" emissive="#1a7c72" emissiveIntensity={.45} />
      </mesh>
    })}
    <Label position={[-.35, .2, 1.85]} tone="accent">NÚCLEO</Label>
    <Label position={[1.35, -1.45, .6]}>CITOPLASMA</Label>
    <Annotation position={[-.35,.05,1.2]} title="Núcleo" text="Compartimento que contiene los cromosomas y donde se transcribe el ADN." radius={.7}/>
    <Annotation position={[1.65,0,.5]} title="Citoplasma" text="Espacio exterior al núcleo donde los ribosomas traducen el ARNm." radius={.7}/>
    <Annotation position={[1.1,1.25,.9]} title="Envoltura nuclear" text="Doble membrana que separa núcleo y citoplasma; contiene poros selectivos." radius={.4}/>
  </SceneMotion>
}

function Chromosome({ color = '#42d5b0', scale = 1 }: { color?: string; scale?: number }) {
  const left = useMemo(() => [new THREE.Vector3(-.8,2,0),new THREE.Vector3(-.65,.9,.12),new THREE.Vector3(0,0,0),new THREE.Vector3(-.55,-1.05,-.08),new THREE.Vector3(-.75,-2,0)], [])
  const right = useMemo(() => [new THREE.Vector3(.8,2,0),new THREE.Vector3(.65,.9,-.12),new THREE.Vector3(0,0,0),new THREE.Vector3(.55,-1.05,.08),new THREE.Vector3(.75,-2,0)], [])
  return <group scale={scale}><Tube points={left} color={color} radius={.28}/><Tube points={right} color="#2790a5" radius={.28}/><mesh><sphereGeometry args={[.34,24,18]}/><meshStandardMaterial color="#d8fff4" roughness={.4}/></mesh></group>
}

function LocusScene({ gene, reducedMotion }: { gene: GeneRecord; reducedMotion: boolean }) {
  const chromatin = useMemo(() => Array.from({ length: 48 }, (_, i) => new THREE.Vector3(-4.8 + i * .2, Math.sin(i * .48) * .32, Math.cos(i * .3) * .18)), [])
  return <SceneMotion paused={reducedMotion}>
    <group position={[-2.65,.15,0]} scale={.72}><Chromosome /></group>
    <Tube points={chromatin} color="#56d4c5" radius={.065} />
    {Array.from({ length: 16 }, (_, i) => <mesh key={i} position={[-4.55 + i * .58, Math.sin(i * 1.4) * .32, Math.cos(i) * .18]}><sphereGeometry args={[.13,16,12]}/><meshStandardMaterial color={i === 10 ? '#ffb24d' : '#a9e7dd'} roughness={.5}/></mesh>)}
    <mesh position={[1.25, -.25, .2]}><sphereGeometry args={[.22,24,16]}/><meshStandardMaterial color="#ffad3f" emissive="#b85d00" emissiveIntensity={.7}/></mesh>
    <Label position={[1.25,.35,.25]} tone="warm">{gene.symbol} · {gene.locus}</Label>
    <Label position={[-2.65,-1.7,.2]}>CROMOSOMA {gene.chromosome}</Label>
    <Annotation position={[-2.65,.15,.45]} title="Cromosoma compacto" text="Una molécula larga de ADN empaquetada con proteínas." radius={.7}/>
    <Annotation position={[-.2,0,.3]} title="Cromatina" text="ADN menos compacto enrollado alrededor de histonas, como cuentas en un hilo." radius={.55}/>
    <Annotation position={[1.25,-.25,.35]} title={`Locus de ${gene.symbol}`} text="Posición concreta del gen dentro del cromosoma; no es una proteína." radius={.35}/>
  </SceneMotion>
}

function DnaHelix({ gene, spread = 1, fadedIntrons = false, selectedExon = 0, strandView = 'both', openCenter = false }: { gene: GeneRecord; spread?: number; fadedIntrons?: boolean; selectedExon?: number; strandView?: 'both' | 'template'; openCenter?: boolean }) {
  const count = 42
  const radius = .62 * spread
  const pairData = useMemo(() => Array.from({ length: count }, (_, i) => {
    const x = (i - count / 2) * .2
    const angle = i * .55
    const bubble = openCenter ? Math.max(0,1-Math.abs(i-count/2)/7) : 0
    const localRadius = radius * (1 + bubble * 1.75)
    return {
      a: new THREE.Vector3(x, Math.sin(angle) * localRadius + bubble*.45, Math.cos(angle) * localRadius),
      b: new THREE.Vector3(x, -Math.sin(angle) * localRadius - bubble*.45, -Math.cos(angle) * localRadius),
      exon: Math.min(gene.exonCount - 1, Math.floor((i / count) * gene.exonCount)),
      intron: (i % Math.max(5, Math.floor(count / gene.exonCount))) > 3,
      bubble,
    }
  }), [gene.exonCount, radius])
  const aPoints = useMemo(() => pairData.map(p => p.a), [pairData])
  const bPoints = useMemo(() => pairData.map(p => p.b), [pairData])
  return <group rotation={[0,0,-.06]}>
    {strandView==='both'&&<Tube points={aPoints} color="#70d8ff" radius={.075}/>}<Tube points={bPoints} color="#a88cff" radius={strandView==='template'?.1:.075}/>
    {pairData.map((p, i) => {
      const selected = p.exon === selectedExon && !p.intron
      const color = selected ? '#fff2b2' : p.intron && fadedIntrons ? '#527079' : EXON_COLORS[p.exon]
      return <group key={i} scale={selected ? 1.12 : 1}>{strandView==='both'&&p.bubble<.32&&<Bond a={p.a} b={p.b} color={color} radius={selected ? .04 : .025}/>} {i % 2 === 0 && <>{strandView==='both'&&<mesh position={p.a}><sphereGeometry args={[selected ? .12 : .09,12,8]}/><meshStandardMaterial color={color} emissive={selected?'#b37b13':'#000000'} emissiveIntensity={selected ? .55 : 0}/></mesh>}<mesh position={p.b}><sphereGeometry args={[selected ? .12 : .09,12,8]}/><meshStandardMaterial color={color}/></mesh></>}</group>
    })}
    {strandView==='both'&&<><Label position={[-4.4,.95,0]} tone="accent">5′ CODIFICANTE</Label><Label position={[4.4,-.95,0]} tone="accent">3′</Label></>}
    <Label position={[-4.4,-.95,0]}>3′ MOLDE</Label><Label position={[4.4,.95,0]}>5′</Label>
    {openCenter&&<Label position={[0,2.05,0]} tone="warm">BURBUJA DE TRANSCRIPCIÓN</Label>}
  </group>
}

function GeneScene({ gene, selectedExon, strandView, reducedMotion }: { gene: GeneRecord; selectedExon: number; strandView: 'both'|'template'; reducedMotion: boolean }) {
  return <SceneMotion amount={.035} paused={reducedMotion}><DnaHelix gene={gene} fadedIntrons selectedExon={selectedExon} strandView={strandView} />
    <Label position={[0,1.65,0]} tone="accent">GEN {gene.symbol} · EXÓN {selectedExon + 1} SELECCIONADO</Label>
  </SceneMotion>
}

function TranscriptionScene({ gene, progress, reducedMotion }: { gene: GeneRecord; progress: number; reducedMotion: boolean }) {
  const length = Math.max(2, Math.round(4 + progress * 26))
  const rnaPoints = useMemo(() => Array.from({ length }, (_, i) => new THREE.Vector3(.05 + i * .14, -1.15 - Math.sin(i * .6) * .18, .35 + i * .025)), [length])
  return <SceneMotion amount={.025} paused={reducedMotion}>
    <group scale={.92}><DnaHelix gene={gene} spread={1 + progress * .08} openCenter/></group>
    <group position={[-.15,0,.15]}>
      <mesh scale={[1.35,.95,1]}><sphereGeometry args={[.75,36,24]}/><meshPhysicalMaterial color="#ffb15a" roughness={.28} metalness={.08}/></mesh>
      <mesh position={[.18,0,.68]} scale={[.65,.32,.2]}><sphereGeometry args={[.8,24,16]}/><meshStandardMaterial color="#6b2c1b"/></mesh>
    </group>
    <group position={[-2.3,.15,.2]}><mesh scale={[.7,.5,.55]}><dodecahedronGeometry args={[.55,0]}/><meshStandardMaterial color="#7ed8ce" roughness={.32}/></mesh><Label position={[0,.78,0]} tone="accent">FACTOR DE TRANSCRIPCIÓN</Label></group>
    <mesh position={[-2.65,-.05,-.15]} rotation={[0,0,-.06]}><boxGeometry args={[.65,.16,.16]}/><meshStandardMaterial color="#f3a84b" emissive="#7f4a08" emissiveIntensity={.4}/></mesh>
    <Label position={[-2.65,-.62,0]} tone="warm">PROMOTOR</Label>
    <Tube points={rnaPoints} color="#60f0b8" radius={.075}/>
    <Label position={[-.15,1.35,.2]} tone="warm">ARN POLIMERASA</Label>
    <Label position={[2.4,-1.55,.5]} tone="accent">ARN NACIENTE · 5′→3′</Label>
    <Annotation position={[-.15,0,.8]} title="ARN polimerasa" text="Abre una burbuja local y añade ribonucleótidos complementarios a la hebra molde." radius={.7}/>
  </SceneMotion>
}

function RnaStrand({ gene, spliced, cap, polyA, selectedExon }: { gene: GeneRecord; spliced: boolean; cap: boolean; polyA: boolean; selectedExon: number }) {
  const count = spliced ? gene.exonCount * 7 : gene.exonCount * 11
  const points = useMemo(() => Array.from({ length: count }, (_, i) => new THREE.Vector3(-4 + (8 * i) / (count - 1), Math.sin(i * .55) * .28, Math.cos(i * .35) * .16)), [count])
  return <group>
    {points.slice(0,-1).map((p, i) => {
      const next = points[i+1]
      const segment = Math.min(gene.exonCount - 1, Math.floor((i / points.length) * gene.exonCount))
      const intron = !spliced && i % 11 > 6
      return <Bond key={i} a={p} b={next} color={segment===selectedExon&&!intron?'#fff2b2':intron ? '#607780' : EXON_COLORS[segment]} radius={segment===selectedExon&&!intron ? .095 : .065}/>
    })}
    {cap && <mesh position={[-4.25,0,0]}><dodecahedronGeometry args={[.24,0]}/><meshStandardMaterial color="#f8e7a5" metalness={.5} roughness={.22}/></mesh>}
    {polyA && Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[4.2 + i * .16, Math.sin(i)*.08,0]}><sphereGeometry args={[.08,12,8]}/><meshStandardMaterial color="#ffcf54"/></mesh>)}
  </group>
}

function MaturationScene({ gene, maturation, selectedExon, reducedMotion }: { gene: GeneRecord; maturation: MaturationState; selectedExon: number; reducedMotion: boolean }) {
  return <SceneMotion paused={reducedMotion}>
    <RnaStrand gene={gene} spliced={maturation.splice} cap={maturation.cap} polyA={maturation.polyA} selectedExon={selectedExon}/>
    {!maturation.splice && <><mesh position={[.25,-.55,.4]}><torusGeometry args={[.6,.055,10,36]}/><meshStandardMaterial color="#82959b" transparent opacity={.75}/></mesh><group position={[0,.15,.15]}>
      <mesh position={[-.55,0,0]}><sphereGeometry args={[.48,24,16]}/><meshStandardMaterial color="#a77df6" transparent opacity={.72}/></mesh>
      <mesh position={[.52,.05,0]}><sphereGeometry args={[.42,24,16]}/><meshStandardMaterial color="#d47eff" transparent opacity={.68}/></mesh>
    </group><Annotation position={[0,.15,.6]} title="Spliceosoma" text="Complejo de ARN y proteínas que reconoce los límites, corta intrones y une exones." radius={.65}/></>}
    <Label position={[0,1.15,.2]} tone="accent">{maturation.splice ? 'EXONES UNIDOS' : 'SPLICEOSOMA · INTRÓN EN LAZO'}</Label>
    {maturation.cap && <Label position={[-4.3,.65,0]} tone="warm">CAP 5′</Label>}{maturation.polyA && <Label position={[4.7,.65,0]} tone="warm">POLI-A</Label>}
  </SceneMotion>
}

function ExportScene({ gene, progress, reducedMotion }: { gene: GeneRecord; progress: number; reducedMotion: boolean }) {
  const rna = useMemo(() => Array.from({ length: 36 }, (_, i) => new THREE.Vector3(-2.2 + i * .125, Math.sin(i * .48) * .25, .1)), [])
  const moving = useRef<THREE.Group>(null)
  useFrame((_,delta) => { if (moving.current) moving.current.position.x = reducedMotion ? -2.8 + progress * 5.6 : THREE.MathUtils.damp(moving.current.position.x, -2.8 + progress * 5.6, 1.35, delta) })
  return <SceneMotion amount={.03} paused={reducedMotion}>
    {[-.28,.28].flatMap((x,xi)=>[-1,1].map(side=><mesh key={`${xi}-${side}`} position={[x,side*2.15,-.65]}><boxGeometry args={[.14,2.8,4.8]}/><meshPhysicalMaterial color={xi===0?'#2e9d98':'#49c2ad'} transparent opacity={.34} roughness={.28} transmission={.08}/></mesh>))}
    {[-.28,.28].map(x=><mesh key={x} position={[x,0,-.6]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[1.12,.22,20,64]}/><meshStandardMaterial color={x<0?'#55d8c1':'#2d9895'} roughness={.35}/></mesh>)}
    {Array.from({length:8},(_,i)=><mesh key={i} position={[0,Math.sin(i*Math.PI/4)*1.65,-.6+Math.cos(i*Math.PI/4)*1.65]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.22,.07,10,22]}/><meshStandardMaterial color="#257f84"/></mesh>)}
    <group ref={moving} position={[-2.8,0,0]}><Tube points={rna} color="#5ef0b8" radius={.075}/><mesh position={[2.42,0,.1]}><dodecahedronGeometry args={[.22,0]}/><meshStandardMaterial color="#f8e7a5"/></mesh></group>
    <Label position={[0,2.25,0]} tone="accent">COMPLEJO DEL PORO NUCLEAR</Label>
    <Label position={[-3,-1.25,0]}>NÚCLEO</Label><Label position={[3,-1.25,0]}>CITOPLASMA</Label><Label position={[2.1,.8,.2]} tone="warm">CAP 5′ · EXTREMO GUÍA</Label>
    <Annotation position={[0,0,.2]} title="Poro nuclear" text="Complejo proteico que forma un canal a través de las dos membranas nucleares." radius={.9}/>
  </SceneMotion>
}

function MrnaScene({ gene, reducedMotion, activeRegion, selectedExon }: { gene: GeneRecord; reducedMotion: boolean; activeRegion: string; selectedExon: number }) {
  const count=58
  const points=useMemo(()=>Array.from({length:count},(_,i)=>new THREE.Vector3(-4.35+i*.15,Math.sin(i*.55)*.2,Math.cos(i*.31)*.12)),[])
  return <SceneMotion paused={reducedMotion}><group>{points.slice(0,-1).map((point,i)=>{
    const next=points[i+1]
    const region=i<7?'utr5':i===7?'start':i<49?'cds':i===49?'stop':'utr3'
    const exon=Math.min(gene.exonCount-1,Math.floor(Math.max(0,i-8)/Math.max(1,41/gene.exonCount)))
    const color=region==='cds'?EXON_COLORS[exon]:region==='start'?'#42d2aa':region==='stop'?'#ff6e59':'#648eaa'
    const active=activeRegion===region
    return <Bond key={i} a={point} b={next} color={color} radius={active ? .11 : (region==='cds'&&exon===selectedExon ? .095 : .07)}/>
  })}</group><mesh position={[-4.58,0,0]}><dodecahedronGeometry args={[.22,0]}/><meshStandardMaterial color="#f8e7a5"/></mesh>{Array.from({length:8},(_,i)=><mesh key={i} position={[4.5+i*.14,Math.sin(i)*.07,0]}><sphereGeometry args={[.075,12,8]}/><meshStandardMaterial color="#ffcf54"/></mesh>)}
    <Label position={[-3.75,.75,0]}>5′ UTR</Label><Label position={[-3.15,.85,0]} tone="accent">AUG · START</Label><Label position={[0,.9,0]} tone="accent">CDS · EXONES CONSERVAN SU COLOR</Label><Label position={[3.15,.85,0]} tone="warm">STOP</Label><Label position={[3.85,.75,0]}>3′ UTR</Label><Label position={[-4.55,-.7,0]} tone="accent">CAP · 5′</Label><Label position={[4.75,-.7,0]} tone="warm">POLI-A · 3′</Label><Label position={[0,-1.4,0]}>{gene.transcript}</Label>
  </SceneMotion>
}

function OrfScene({ gene, frame, selectedExon, selectedCodon, reducedMotion }: { gene: GeneRecord; frame: number; selectedExon: number; selectedCodon: number; reducedMotion: boolean }) {
  const compact = gene.codons.join('')
  const shifted = compact.slice(frame)
  const codons = Array.from({ length: Math.min(18, Math.floor(shifted.length / 3)) }, (_, i) => shifted.slice(i*3,i*3+3))
  const hasStart=codons.includes('AUG')
  return <SceneMotion paused={reducedMotion}>{codons.map((codon,i) => <group key={`${codon}-${i}`} scale={i===selectedCodon?1.28:(i%gene.exonCount===selectedExon?1.12:1)} position={[-4.4+i*.52,(frame-1)*.08,Math.sin(i*.4)*.06]}><RoundedBox args={[.44,.56,.35]} radius={.08} smoothness={3}><meshStandardMaterial emissive={i===selectedCodon?'#8a5c10':'#000'} emissiveIntensity={i===selectedCodon ? .65 : 0} color={i%gene.exonCount===selectedExon?'#fff2b2':codon==='AUG'?'#37d29e':['UAA','UAG','UGA'].includes(codon)?'#ff7e5f':EXON_COLORS[i%gene.exonCount]} roughness={.35}/></RoundedBox><Label position={[0,.52,0]} tone={codon==='AUG'?'accent':(['UAA','UAG','UGA'].includes(codon)?'warm':'light')}>{codon}</Label></group>)}
    <Label position={[0,-1.2,0]}>COMENZAR EN BASE {frame+1} · lectura 5′→3′</Label><Label position={[0,1.45,0]} tone={hasStart?'accent':'warm'}>{hasStart?'AUG ENCONTRADO: BUSCA UN STOP POSTERIOR':'SIN AUG EN ESTE TRAMO'}</Label>
  </SceneMotion>
}

function TranslationScene({ gene, translation, selectedExon, selectedCodon, reducedMotion }: { gene: GeneRecord; translation: number; selectedExon: number; selectedCodon: number; reducedMotion: boolean }) {
  const visibleCodons = gene.codons.slice(0, 14)
  return <SceneMotion amount={.025} paused={reducedMotion}>
    <group position={[0,.35,0]}><mesh position={[0,.35,0]} rotation={[Math.PI/2,0,0]} scale={[1.5,1,.75]}><torusGeometry args={[1.05,.48,24,64,Math.PI*1.65]}/><meshStandardMaterial color="#63d7c5" roughness={.3}/></mesh><mesh position={[0,-.58,.05]} scale={[1.75,.52,.92]}><sphereGeometry args={[1,48,28]}/><meshStandardMaterial color="#267f8b" roughness={.38}/></mesh><mesh position={[0,-.25,.88]} scale={[1.45,.14,.14]}><sphereGeometry args={[1,24,12]}/><meshStandardMaterial color="#071a20"/></mesh></group>
    {visibleCodons.map((codon,i)=><group key={i} scale={i===selectedCodon?1.18:1} position={[-4.3+i*.64,-1.05,.98]}><RoundedBox args={[.54,.38,.25]} radius={.06} smoothness={3}><meshStandardMaterial emissive={i===selectedCodon?'#9b5b08':'#000'} emissiveIntensity={i===selectedCodon ? .7 : 0} color={i===translation-1?'#ffb24d':codon==='AUG'?'#42d2aa':['UAA','UAG','UGA'].includes(codon)?'#ff6e59':'#7fa2ad'}/></RoundedBox></group>)}
    {[-.82,0,.82].map((x,i)=><group key={x} position={[x,.25,.9]} rotation={[0,0,i===0 ? .25 : i===2 ? -.18 : 0]}><mesh position={[0,.55,0]}><cylinderGeometry args={[.045,.045,1.15,10]}/><meshStandardMaterial color={i===2?'#f2b354':'#c5a5ff'}/></mesh><mesh position={[0,1.18,0]}><sphereGeometry args={[.18,18,12]}/><meshStandardMaterial color={i===2?'#ffb24d':EXON_COLORS[(Math.max(0,selectedCodon+i-1))%gene.exonCount]}/></mesh><mesh position={[0,-.08,0]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[.22,.055,10,22,Math.PI]}/><meshStandardMaterial color={i===2?'#f2b354':'#c5a5ff'}/></mesh></group>)}
    {gene.aminoAcids.slice(0,translation).map((aa,i)=><group key={i} scale={i===selectedCodon?1.5:(i%gene.exonCount===selectedExon?1.25:1)} position={[-.1+Math.sin(i*.82)*.38,1.55+i*.19,Math.cos(i*.8)*.28]}><mesh><sphereGeometry args={[.13,16,10]}/><meshStandardMaterial emissive={i===selectedCodon?'#9b5b08':'#000'} emissiveIntensity={i===selectedCodon ? .7 : 0} color={i%gene.exonCount===selectedExon?'#fff2b2':EXON_COLORS[i%gene.exonCount]}/></mesh>{i===selectedCodon&&<Label position={[.6,0,0]} tone="accent">{aa}</Label>}</group>)}
    <Label position={[-.82,.9,1.15]}>E · salida</Label><Label position={[0,.9,1.15]} tone="accent">P · cadena</Label><Label position={[.82,.9,1.15]} tone="warm">A · entrada</Label><Label position={[0,-1.65,0]}>ARNm ENTRA 5′ → 3′</Label><Label position={[0,2.75,0]} tone="accent">CADENA DE AMINOÁCIDOS SALE</Label><Annotation position={[0,.25,.65]} title="Ribosoma" text="Dos subunidades forman un canal para el ARNm y tres sitios para los ARNt." radius={1.3}/>
  </SceneMotion>
}

function ActiveSite({ view }: { view: 'active'|'reaction'|'altered' }) {
  const zinc=new THREE.Vector3(0,0,0)
  const residues=[{name:'His94',p:new THREE.Vector3(-1.35,.85,.15)},{name:'His96',p:new THREE.Vector3(1.35,.85,-.1)},{name:'His119',p:new THREE.Vector3(view==='altered'?2.15:0,-1.35,.2)}]
  return <group><mesh><sphereGeometry args={[.34,32,22]}/><meshStandardMaterial color="#b9dcff" metalness={.72} roughness={.18} emissive="#4d82a8" emissiveIntensity={.32}/></mesh><Label position={[0,.55,0]} tone="accent">Zn²⁺</Label>{residues.map((residue,index)=><group key={residue.name}><Bond a={zinc} b={residue.p} color={view==='altered'&&index===2?'#ff6e59':'#d9b4ff'} radius={.045}/><mesh position={residue.p}><torusGeometry args={[.28,.09,12,24]}/><meshStandardMaterial color={view==='altered'&&index===2?'#ff6e59':'#a98be8'} roughness={.32}/></mesh><Label position={[residue.p.x,residue.p.y+.48,residue.p.z]} tone={view==='altered'&&index===2?'warm':'light'}>{residue.name}</Label></group>)}<mesh position={[0,-.72,-.1]}><sphereGeometry args={[.18,20,14]}/><meshStandardMaterial color="#7bd8ff"/></mesh><Label position={[0,-1.12,0]}>H₂O / OH⁻</Label>{view==='reaction'&&<><group position={[1.35,-.25,.2]}><mesh position={[-.22,0,0]}><sphereGeometry args={[.18,18,12]}/><meshStandardMaterial color="#616a70"/></mesh><mesh position={[.18,.18,0]}><sphereGeometry args={[.14,18,12]}/><meshStandardMaterial color="#ff7968"/></mesh><mesh position={[.18,-.18,0]}><sphereGeometry args={[.14,18,12]}/><meshStandardMaterial color="#ff7968"/></mesh><Label position={[0,.7,0]} tone="warm">CO₂ ENTRA</Label></group><group position={[-1.45,-.25,.2]}><mesh><tetrahedronGeometry args={[.3,0]}/><meshStandardMaterial color="#70d8d0"/></mesh><Label position={[0,.65,0]} tone="accent">HCO₃⁻ SALE</Label></group><Label position={[0,1.75,0]} tone="accent">CO₂ + H₂O ⇌ HCO₃⁻ + H⁺</Label></>}{view==='altered'&&<Label position={[0,1.75,0]} tone="warm">COORDINACIÓN ALTERADA · FUNCIÓN COMPROMETIDA</Label>}<Annotation position={[0,0,.35]} title="Centro catalítico" text="El zinc orienta agua/hidróxido y está coordinado por His94, His96 y His119." radius={.52}/></group>
}

function HemeSite({ view }: { view: 'active'|'reaction'|'altered' }) {
  const iron = new THREE.Vector3(0,0,0)
  const nitrogen = [new THREE.Vector3(-.9,0,0),new THREE.Vector3(.9,0,0),new THREE.Vector3(0,.9,0),new THREE.Vector3(0,-.9,0)]
  const histidine = new THREE.Vector3(view==='altered'?1.55:-.08,-1.65,.18)
  return <group>
    <mesh><torusGeometry args={[1.05,.16,16,64]}/><meshStandardMaterial color="#b33b4b" roughness={.34}/></mesh>
    {nitrogen.map((point,index)=><group key={index}><Bond a={iron} b={point} color="#ef9da8" radius={.035}/><mesh position={point}><sphereGeometry args={[.13,16,12]}/><meshStandardMaterial color="#92b8ff"/></mesh></group>)}
    <mesh><sphereGeometry args={[.3,28,18]}/><meshStandardMaterial color="#d77a38" metalness={.65} roughness={.2} emissive="#8f351f" emissiveIntensity={.28}/></mesh><Label position={[0,.48,0]} tone="warm">Fe²⁺</Label>
    <Bond a={iron} b={histidine} color={view==='altered'?'#ff6e59':'#d9b4ff'} radius={.045}/><mesh position={histidine}><torusGeometry args={[.25,.08,12,24]}/><meshStandardMaterial color={view==='altered'?'#ff6e59':'#a98be8'}/></mesh><Label position={[histidine.x,histidine.y-.42,histidine.z]} tone={view==='altered'?'warm':'light'}>His92</Label>
    {view==='reaction'&&<group position={[0,0,.92]}><mesh position={[-.13,0,0]}><sphereGeometry args={[.16,18,12]}/><meshStandardMaterial color="#ff7968"/></mesh><mesh position={[.13,0,0]}><sphereGeometry args={[.16,18,12]}/><meshStandardMaterial color="#ff7968"/></mesh><Bond a={new THREE.Vector3(-.13,0,0)} b={new THREE.Vector3(.13,0,0)} color="#ffd1ca" radius={.04}/><Label position={[0,.52,0]} tone="accent">O₂ UNIDO</Label></group>}
    {view==='altered'&&<Label position={[0,1.65,0]} tone="warm">GEOMETRÍA ALTERADA · UNIÓN DE O₂ COMPROMETIDA</Label>}
    <Annotation position={[0,0,.35]} title="Grupo hemo" text="El Fe²⁺ del hemo se coordina con la histidina proximal y puede unir oxígeno de forma reversible." radius={.55}/>
  </group>
}

function ProteinScene({ gene, selectedExon, selectedCodon, proteinView, reducedMotion }: { gene: GeneRecord; selectedExon: number; selectedCodon: number; proteinView: 'fold'|'active'|'reaction'|'altered'; reducedMotion: boolean }) {
  const curve = useMemo(() => Array.from({length:70},(_,i)=>{
    const t=i/8
    return new THREE.Vector3(Math.sin(t*.9)*1.7+Math.sin(t*2.3)*.35,(i-35)*.055,Math.cos(t*1.12)*1.4+Math.cos(t*2.1)*.3)
  }),[])
  const center=Math.round((selectedCodon/Math.max(1,gene.codons.length-1))*(curve.length-1))
  const trace=curve.slice(Math.max(0,center-3),Math.min(curve.length,center+4))
  if(gene.symbol==='CA2'&&proteinView!=='fold') return <SceneMotion amount={.025} paused={reducedMotion}><group position={[0,.28,0]} scale={1.02}><ActiveSite view={proteinView}/></group><Label position={[0,-1.72,0]}>MODELO GUIADO · PDB 1CA2</Label></SceneMotion>
  if(gene.symbol==='HBB'&&proteinView!=='fold') return <SceneMotion amount={.025} paused={reducedMotion}><group position={[0,.2,0]} scale={1.02}><HemeSite view={proteinView}/></group><Label position={[0,-1.52,0]}>MODELO GUIADO · PDB 4HHB</Label></SceneMotion>
  return <SceneMotion amount={.04} paused={reducedMotion}><Tube points={curve} color={gene.symbol==='HBB'?'#db646f':'#43c7b4'} radius={.11}/><Tube points={trace} color="#fff2b2" radius={.17}/>
    <mesh position={[.35,.2,.2]}><sphereGeometry args={[.25,24,16]}/><meshStandardMaterial color={gene.symbol==='HBB'?'#a83232':'#b7d9ff'} metalness={.55} roughness={.22}/></mesh>
    <Label position={[.35,-.35,.2]} tone="warm">{gene.symbol==='HBB'?'GRUPO HEMO · Fe²⁺':'Zn²⁺ · SITIO ACTIVO'}</Label><Label position={[0,2.45,0]} tone="accent">{gene.pdb.join(' · ')} · CODÓN {selectedCodon+1} RESALTADO (MAPEO DIDÁCTICO)</Label>
  </SceneMotion>
}

function SceneContent(props: SceneProps) {
  const scenes = [
    <CellScene quality={props.quality} reducedMotion={props.reducedMotion}/>,
    <LocusScene gene={props.gene} reducedMotion={props.reducedMotion}/>,
    <GeneScene gene={props.gene} selectedExon={props.selectedExon} strandView={props.strandView} reducedMotion={props.reducedMotion}/>,
    <TranscriptionScene gene={props.gene} progress={props.transcription} reducedMotion={props.reducedMotion}/>,
    <MaturationScene gene={props.gene} maturation={props.maturation} selectedExon={props.selectedExon} reducedMotion={props.reducedMotion}/>,
    <ExportScene gene={props.gene} progress={props.exportProgress} reducedMotion={props.reducedMotion}/>,
    <MrnaScene gene={props.gene} reducedMotion={props.reducedMotion} activeRegion={props.activeRegion} selectedExon={props.selectedExon}/>,
    <OrfScene gene={props.gene} frame={props.frame} selectedExon={props.selectedExon} selectedCodon={props.selectedCodon} reducedMotion={props.reducedMotion}/>,
    <TranslationScene gene={props.gene} translation={props.translation} selectedExon={props.selectedExon} selectedCodon={props.selectedCodon} reducedMotion={props.reducedMotion}/>,
    <ProteinScene gene={props.gene} selectedExon={props.selectedExon} selectedCodon={props.selectedCodon} proteinView={props.proteinView} reducedMotion={props.reducedMotion}/>,
  ]
  return <group key={`${props.step}-${props.gene.symbol}`}>{scenes[props.step]}</group>
}

function FallbackScene({ step }: { step: number }) {
  return <div className="webgl-fallback"><div className={`fallback-molecule step-${step}`} aria-hidden="true">{Array.from({length:10},(_,i)=><i key={i}/>)}</div><strong>Vista molecular 2.5D</strong><p>La escena conserva dirección, segmentos y controles aunque WebGL no esté disponible.</p><span>Estación {step + 1}</span></div>
}

export default function MolecularScene(props: SceneProps) {
  if (props.quality === 'basic') return <FallbackScene step={props.step}/>
  return <SceneBoundary fallback={<FallbackScene step={props.step}/>}>
    <Canvas dpr={props.quality === 'high' ? [1, 1.75] : [1, 1.25]} camera={{ position: [0, 0, 9], fov: 42 }} gl={{ antialias: props.quality === 'high', alpha: true, powerPreference: 'high-performance' }}>
      <color attach="background" args={[props.theme === 'light' ? '#dbe9e8' : '#071a20']} />
      <fog attach="fog" args={[props.theme === 'light' ? '#dbe9e8' : '#071a20', 9, 18]} />
      <ambientLight intensity={props.theme === 'light' ? 1.65 : 1.15} />
      <directionalLight position={[5,6,8]} intensity={2.2} color="#d9fff3" />
      <pointLight position={[-5,-3,4]} intensity={35} distance={14} color="#148fa5" />
      <pointLight position={[4,2,-2]} intensity={24} distance={12} color="#f0904d" />
      <ResponsiveCamera step={props.step} proteinView={props.proteinView}/>
      <SceneContent {...props} />
      <OrbitControls enabled enablePan={false} enableZoom minDistance={4.5} maxDistance={16} rotateSpeed={.62} dampingFactor={.08} enableDamping={!props.reducedMotion} />
    </Canvas>
  </SceneBoundary>
}

function ResponsiveCamera({ step, proteinView }: { step:number; proteinView:'fold'|'active'|'reaction'|'altered' }) {
  const { camera, size } = useThree()
  useEffect(() => { camera.position.set(0,0,size.width < 520 ? 13.5 : (step===9&&proteinView!=='fold'?8.6:9)); camera.lookAt(0,0,0); camera.updateProjectionMatrix() }, [camera, size.width, step, proteinView])
  return null
}
