import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line, OrbitControls, RoundedBox } from '@react-three/drei'
import { Component, type ReactNode, useEffect, useMemo, useRef } from 'react'
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
  quality: Quality
  selectedExon: number
  strandView: 'both' | 'template'
  exportProgress: number
  advanced: boolean
  reducedMotion: boolean
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function Label({ position, children, tone = 'light' }: { position: [number, number, number]; children: ReactNode; tone?: 'light' | 'accent' | 'warm' }) {
  return <Html position={position} center><span className={`scene-label ${tone}`}>{children}</span></Html>
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
  return <mesh geometry={geometry}><meshStandardMaterial color={color} roughness={.38} metalness={.08} transparent={opacity < 1} opacity={opacity} /></mesh>
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
  return <SceneMotion amount={.08} paused={reducedMotion}>
    <mesh scale={[1.45, 1, 1]}>
      <sphereGeometry args={[3.25, quality === 'high' ? 72 : 40, quality === 'high' ? 48 : 28]} />
      <meshPhysicalMaterial color="#0b5260" transparent opacity={.16} roughness={.16} transmission={.18} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
    <mesh position={[-.35, .05, .1]}>
      <sphereGeometry args={[1.68, quality === 'high' ? 64 : 36, quality === 'high' ? 42 : 24]} />
      <meshPhysicalMaterial color="#25a7a1" transparent opacity={.3} roughness={.22} transmission={.1} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
    {Array.from({ length: pores }, (_, i) => {
      const angle = (i / pores) * Math.PI * 2
      return <mesh key={i} position={[-.35 + Math.cos(angle) * 1.62, Math.sin(angle) * 1.16, .9]} rotation={[Math.PI / 2, 0, angle]}>
        <torusGeometry args={[.08, .025, 8, 18]} /><meshStandardMaterial color="#7ef1d3" emissive="#1a7c72" emissiveIntensity={.45} />
      </mesh>
    })}
    <Label position={[-.35, .2, 1.85]} tone="accent">NÚCLEO</Label>
    <Label position={[2.1, -1.45, .6]}>CITOPLASMA</Label>
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
  </SceneMotion>
}

function DnaHelix({ gene, spread = 1, fadedIntrons = false, selectedExon = 0, strandView = 'both' }: { gene: GeneRecord; spread?: number; fadedIntrons?: boolean; selectedExon?: number; strandView?: 'both' | 'template' }) {
  const count = 42
  const radius = .62 * spread
  const pairData = useMemo(() => Array.from({ length: count }, (_, i) => {
    const x = (i - count / 2) * .2
    const angle = i * .55
    return {
      a: new THREE.Vector3(x, Math.sin(angle) * radius, Math.cos(angle) * radius),
      b: new THREE.Vector3(x, -Math.sin(angle) * radius, -Math.cos(angle) * radius),
      exon: Math.min(gene.exonCount - 1, Math.floor((i / count) * gene.exonCount)),
      intron: (i % Math.max(5, Math.floor(count / gene.exonCount))) > 3,
    }
  }), [gene.exonCount, radius])
  const aPoints = useMemo(() => pairData.map(p => p.a), [pairData])
  const bPoints = useMemo(() => pairData.map(p => p.b), [pairData])
  return <group rotation={[0,0,-.06]}>
    <Tube points={aPoints} color="#70d8ff" radius={.075} opacity={strandView === 'template' ? .16 : 1}/><Tube points={bPoints} color="#a88cff" radius={.075}/>
    {pairData.map((p, i) => {
      const selected = p.exon === selectedExon && !p.intron
      const color = selected ? '#fff2b2' : p.intron && fadedIntrons ? '#527079' : EXON_COLORS[p.exon]
      return <group key={i} scale={selected ? 1.12 : 1}><Bond a={p.a} b={p.b} color={color} radius={selected ? .04 : .025}/>{i % 2 === 0 && <><mesh position={p.a}><sphereGeometry args={[selected ? .12 : .09,12,8]}/><meshStandardMaterial color={color} emissive={selected?'#b37b13':'#000000'} emissiveIntensity={selected ? .55 : 0}/></mesh><mesh position={p.b}><sphereGeometry args={[selected ? .12 : .09,12,8]}/><meshStandardMaterial color={color}/></mesh></>}</group>
    })}
    <Label position={[-4.4,.95,0]} tone="accent">5′ CODIFICANTE</Label><Label position={[4.4,-.95,0]} tone="accent">3′</Label>
    <Label position={[-4.4,-.95,0]}>3′ MOLDE</Label><Label position={[4.4,.95,0]}>5′</Label>
  </group>
}

function GeneScene({ gene, selectedExon, strandView, reducedMotion }: { gene: GeneRecord; selectedExon: number; strandView: 'both'|'template'; reducedMotion: boolean }) {
  return <SceneMotion amount={.035} paused={reducedMotion}><DnaHelix gene={gene} fadedIntrons selectedExon={selectedExon} strandView={strandView} />
    <Label position={[0,1.65,0]} tone="accent">GEN {gene.symbol} · EXÓN {selectedExon + 1} SELECCIONADO</Label>
  </SceneMotion>
}

function TranscriptionScene({ gene, progress, reducedMotion }: { gene: GeneRecord; progress: number; reducedMotion: boolean }) {
  const length = Math.max(2, Math.round(4 + progress * 26))
  const rnaPoints = useMemo(() => Array.from({ length }, (_, i) => new THREE.Vector3(-.1 + i * .13, -1.05 - Math.sin(i * .6) * .16, .3 + i * .025)), [length])
  return <SceneMotion amount={.025} paused={reducedMotion}>
    <group scale={.92}><DnaHelix gene={gene} spread={1 + progress * .18}/></group>
    <group position={[-.7,0,.15]}>
      <mesh scale={[1.35,.95,1]}><sphereGeometry args={[.75,36,24]}/><meshPhysicalMaterial color="#ffb15a" roughness={.28} metalness={.08}/></mesh>
      <mesh position={[.18,0,.68]} scale={[.65,.32,.2]}><sphereGeometry args={[.8,24,16]}/><meshStandardMaterial color="#6b2c1b"/></mesh>
    </group>
    <Tube points={rnaPoints} color="#60f0b8" radius={.075}/>
    <Label position={[-.7,1.25,.2]} tone="warm">ARN POLIMERASA</Label>
    <Label position={[2.4,-1.55,.5]} tone="accent">ARN NACIENTE · 5′→3′</Label>
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
    {!maturation.splice && <group position={[.25,-.55,.4]}>
      <torusGeometry args={[.6,.055,10,36]}/><meshStandardMaterial color="#82959b" transparent opacity={.75}/>
    </group>}
    <group position={[0,.15,.15]}>
      <mesh position={[-.55,0,0]}><sphereGeometry args={[.48,24,16]}/><meshStandardMaterial color="#a77df6" transparent opacity={.72}/></mesh>
      <mesh position={[.52,.05,0]}><sphereGeometry args={[.42,24,16]}/><meshStandardMaterial color="#d47eff" transparent opacity={.68}/></mesh>
    </group>
    <Label position={[0,1.15,.2]} tone="accent">{maturation.splice ? 'EXONES UNIDOS' : 'SPLICEOSOMA · INTRÓN EN LAZO'}</Label>
    {maturation.cap && <Label position={[-4.3,.65,0]} tone="warm">CAP 5′</Label>}{maturation.polyA && <Label position={[4.7,.65,0]} tone="warm">POLI-A</Label>}
  </SceneMotion>
}

function ExportScene({ gene, progress, reducedMotion }: { gene: GeneRecord; progress: number; reducedMotion: boolean }) {
  const rna = useMemo(() => Array.from({ length: 36 }, (_, i) => new THREE.Vector3(-3.8 + i * .22, Math.sin(i * .48) * .25, .1)), [])
  const moving = useRef<THREE.Group>(null)
  useFrame(() => { if (moving.current) moving.current.position.x = reducedMotion ? -2.2 + progress * 4.4 : THREE.MathUtils.lerp(moving.current.position.x, -2.2 + progress * 4.4, .035) })
  return <SceneMotion amount={.03} paused={reducedMotion}>
    <mesh position={[0,0,-.7]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[1.25,.3,20,64]}/><meshStandardMaterial color="#4acbb4" roughness={.35}/></mesh>
    {Array.from({length:8},(_,i)=><mesh key={i} position={[Math.cos(i*Math.PI/4)*1.85,Math.sin(i*Math.PI/4)*1.85,-.75]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.27,.08,10,22]}/><meshStandardMaterial color="#257f84"/></mesh>)}
    <group ref={moving} position={[-2.2,0,0]}><Tube points={rna} color="#5ef0b8" radius={.075}/>
    <mesh position={[4.05,0,.1]}><dodecahedronGeometry args={[.22,0]}/><meshStandardMaterial color="#f8e7a5"/></mesh></group>
    <Label position={[0,2.25,0]} tone="accent">COMPLEJO DEL PORO NUCLEAR</Label>
    <Label position={[-3,-1.25,0]}>NÚCLEO</Label><Label position={[3,-1.25,0]}>CITOPLASMA</Label><Label position={[2.1,.8,.2]} tone="warm">CAP 5′ · EXTREMO GUÍA</Label>
  </SceneMotion>
}

function MrnaScene({ gene, reducedMotion }: { gene: GeneRecord; reducedMotion: boolean }) {
  const regions = [
    { x:-3.7,w:1.1,c:'#5f9fc4',label:'5′ UTR' },
    { x:-2.5,w:.55,c:'#42d2aa',label:'AUG' },
    { x:0,w:4.35,c:'#e56640',label:'CDS' },
    { x:2.5,w:.55,c:'#263d48',label:'STOP' },
    { x:3.7,w:1.1,c:'#5f9fc4',label:'3′ UTR' },
  ]
  return <SceneMotion paused={reducedMotion}>{regions.map(region => <group key={region.label} position={[region.x,0,0]}><RoundedBox args={[region.w,.72,.45]} radius={.13} smoothness={4}><meshStandardMaterial color={region.c} roughness={.32}/></RoundedBox><Label position={[0,.72,0]} tone={region.label==='AUG'?'accent':'light'}>{region.label}</Label></group>)}
    <Label position={[-4.45,-.75,0]} tone="accent">CAP · 5′</Label><Label position={[4.45,-.75,0]} tone="warm">POLI-A · 3′</Label>
    <Label position={[0,-1.45,0]}>{gene.transcript}</Label>
  </SceneMotion>
}

function OrfScene({ gene, frame, selectedExon, reducedMotion }: { gene: GeneRecord; frame: number; selectedExon: number; reducedMotion: boolean }) {
  const compact = gene.codons.join('')
  const shifted = compact.slice(frame)
  const codons = Array.from({ length: Math.min(18, Math.floor(shifted.length / 3)) }, (_, i) => shifted.slice(i*3,i*3+3))
  return <SceneMotion paused={reducedMotion}>{codons.map((codon,i) => <group key={`${codon}-${i}`} scale={i%gene.exonCount===selectedExon?1.16:1} position={[-4.4+i*.52,(frame-1)*.08,Math.sin(i*.4)*.06]}><RoundedBox args={[.44,.56,.35]} radius={.08} smoothness={3}><meshStandardMaterial color={i%gene.exonCount===selectedExon?'#fff2b2':codon==='AUG'?'#37d29e':['UAA','UAG','UGA'].includes(codon)?'#ff7e5f':EXON_COLORS[i%gene.exonCount]} roughness={.35}/></RoundedBox><Label position={[0,.52,0]} tone={codon==='AUG'?'accent':(['UAA','UAG','UGA'].includes(codon)?'warm':'light')}>{codon}</Label></group>)}
    <Label position={[0,-1.2,0]}>MARCO +{frame+1} · lectura 5′→3′</Label>
  </SceneMotion>
}

function TranslationScene({ gene, translation, selectedExon, advanced, reducedMotion }: { gene: GeneRecord; translation: number; selectedExon: number; advanced: boolean; reducedMotion: boolean }) {
  const visibleCodons = gene.codons.slice(0, 14)
  return <SceneMotion amount={.025} paused={reducedMotion}>
    <group position={[0,.42,0]}>
      <mesh position={[0,.25,0]} scale={[2.15,.85,1]}><sphereGeometry args={[1,48,30]}/><meshStandardMaterial color="#5dcfc0" roughness={.35}/></mesh>
      <mesh position={[0,-.55,.1]} scale={[1.65,.55,.9]}><sphereGeometry args={[1,42,28]}/><meshStandardMaterial color="#2d8d94" roughness={.38}/></mesh>
      <mesh position={[0,-.15,.82]} scale={[1.2,.18,.16]}><sphereGeometry args={[1,24,12]}/><meshStandardMaterial color="#102f38"/></mesh>
    </group>
    {visibleCodons.map((codon,i)=><group key={i} position={[-4.3+i*.64,-.95,.95]}><RoundedBox args={[.54,.38,.25]} radius={.06} smoothness={3}><meshStandardMaterial color={i===translation?'#ffb24d':codon==='AUG'?'#42d2aa':['UAA','UAG','UGA'].includes(codon)?'#ff6e59':'#7fa2ad'}/></RoundedBox></group>)}
    {gene.aminoAcids.slice(0,translation).map((aa,i)=><group key={i} scale={i%gene.exonCount===selectedExon?1.45:1} position={[-.25 + Math.sin(i*.8)*.42,1.45+i*.18,Math.cos(i*.8)*.3]}><mesh><sphereGeometry args={[.13,16,10]}/><meshStandardMaterial color={i%gene.exonCount===selectedExon?'#fff2b2':EXON_COLORS[i%gene.exonCount]}/></mesh>{i===translation-1&&<Label position={[.55,0,0]} tone="accent">{aa}</Label>}</group>)}
    {advanced&&<><Label position={[-.85,.8,1.15]} tone="accent">E</Label><Label position={[0,.8,1.15]} tone="accent">P</Label><Label position={[.85,.8,1.15]} tone="accent">A</Label></>}
    <Label position={[0,-1.65,0]}>ARNm · 5′ → 3′</Label><Label position={[0,2.55,0]} tone="accent">CADENA NACIENTE</Label>
  </SceneMotion>
}

function ProteinScene({ gene, selectedExon, reducedMotion }: { gene: GeneRecord; selectedExon: number; reducedMotion: boolean }) {
  const curve = useMemo(() => Array.from({length:70},(_,i)=>{
    const t=i/8
    return new THREE.Vector3(Math.sin(t*.9)*1.7+Math.sin(t*2.3)*.35,(i-35)*.055,Math.cos(t*1.12)*1.4+Math.cos(t*2.1)*.3)
  }),[])
  const trace = curve.filter((_, index) => Math.floor(index / 9) % gene.exonCount === selectedExon)
  return <SceneMotion amount={.04} paused={reducedMotion}><Tube points={curve} color={gene.symbol==='HBB'?'#db646f':'#43c7b4'} radius={.11}/>
    {trace.length > 2 && <Tube points={trace} color="#fff2b2" radius={.16}/>} 
    <mesh position={[.35,.2,.2]}><sphereGeometry args={[.25,24,16]}/><meshStandardMaterial color={gene.symbol==='HBB'?'#a83232':'#b7d9ff'} metalness={.55} roughness={.22}/></mesh>
    <Label position={[0,2.45,0]} tone="accent">{gene.pdb.join(' · ')} · MAPEO DIDÁCTICO DEL EXÓN {selectedExon+1}</Label>
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
    <MrnaScene gene={props.gene} reducedMotion={props.reducedMotion}/>,
    <OrfScene gene={props.gene} frame={props.frame} selectedExon={props.selectedExon} reducedMotion={props.reducedMotion}/>,
    <TranslationScene gene={props.gene} translation={props.translation} selectedExon={props.selectedExon} advanced={props.advanced} reducedMotion={props.reducedMotion}/>,
    <ProteinScene gene={props.gene} selectedExon={props.selectedExon} reducedMotion={props.reducedMotion}/>,
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
      <color attach="background" args={['#071a20']} />
      <fog attach="fog" args={['#071a20', 9, 18]} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[5,6,8]} intensity={2.2} color="#d9fff3" />
      <pointLight position={[-5,-3,4]} intensity={35} distance={14} color="#148fa5" />
      <pointLight position={[4,2,-2]} intensity={24} distance={12} color="#f0904d" />
      <ResponsiveCamera />
      <SceneContent {...props} />
      <OrbitControls enabled={!props.reducedMotion} enablePan={false} enableZoom minDistance={6.5} maxDistance={15} rotateSpeed={.45} dampingFactor={.08} enableDamping />
    </Canvas>
  </SceneBoundary>
}

function ResponsiveCamera() {
  const { camera, size } = useThree()
  useEffect(() => { camera.position.z = size.width < 520 ? 13.5 : 9; camera.updateProjectionMatrix() }, [camera, size.width])
  return null
}
