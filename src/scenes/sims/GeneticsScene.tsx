import { Arrow } from '../Arrow'
import { Label } from '../Label'

export const GEN_COLORS = { dom: '#66bb6a', rec: '#ffa726', x: '#90caf9', y: '#546e7a', chrom: '#cfd8dc' }

export type CrossKind = 'monohybrid' | 'dihybrid' | 'sex'

interface PairProps {
  x: number
  /** Two allele letters of one gene, e.g. 'Tt'; for the sex chromosomes 'XX' / 'XY'. */
  alleles: string
  len: number
  sex?: boolean
}

/** One homologous chromosome pair: two rods side by side, one allele band on each. */
function ChromPair({ x, alleles, len, sex = false }: PairProps) {
  return (
    <group position={[x, 0, 0]}>
      {[0, 1].map((i) => {
        const a = alleles[i]
        const isY = sex && a === 'Y'
        const l = isY ? len * 0.55 : len
        const dom = a === a.toUpperCase()
        const color = sex ? (isY ? GEN_COLORS.y : GEN_COLORS.x) : GEN_COLORS.chrom
        const band = dom ? GEN_COLORS.dom : GEN_COLORS.rec
        const cx = (i === 0 ? -1 : 1) * 0.2
        return (
          <group key={i} position={[cx, isY ? -(len - l) / 2 : 0, 0]}>
            <mesh>
              <capsuleGeometry args={[0.16, l, 6, 14]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {!sex && (
              <>
                <mesh position={[0, l * 0.12, 0]}>
                  <boxGeometry args={[0.42, 0.2, 0.42]} />
                  <meshStandardMaterial color={band} emissive={band} emissiveIntensity={0.3} />
                </mesh>
                <Label text={a} position={[i === 0 ? -0.38 : 0.38, l * 0.12, 0.3]} size={0.6} color={band} />
              </>
            )}
            {sex && <Label text={a} position={[0, -l / 2 - 0.45, 0.3]} size={0.54} color="#ffffff" />}
          </group>
        )
      })}
    </group>
  )
}

interface GroupProps {
  x: number
  genotype: string
  kind: CrossKind
  title: string
}

/** One individual: one pair per gene (monohybrid 1, dihybrid 2) or the XX / XY pair. */
function Individual({ x, genotype, kind, title }: GroupProps) {
  const sex = kind === 'sex'
  const pairs = sex ? [genotype] : [genotype.slice(0, 2), ...(genotype.length > 2 ? [genotype.slice(2, 4)] : [])]
  const lens = sex ? [1.6] : pairs.length > 1 ? [1.9, 1.3] : [2.1]
  const dx = pairs.length > 1 ? 0.9 : 0
  return (
    <group position={[x, 0, 0]}>
      {pairs.map((p, i) => (
        <ChromPair key={i} x={pairs.length > 1 ? (i === 0 ? -dx : dx) : 0} alleles={p} len={lens[i]} sex={sex} />
      ))}
      <Label text={genotype} position={[0, 1.95, 0.3]} size={0.6} color="#fff59d" />
      <Label text={title} position={[0, -2.15, 0.3]} size={0.55} color="#b3e5fc" />
    </group>
  )
}

interface Props {
  kind: CrossKind
  p1: string
  p2: string
  child: string
}

/** Chromosome pairs of both parents and of the selected child (planar with thick rods: fine in 2D and 3D). */
export function GeneticsScene({ kind, p1, p2, child }: Props) {
  const wide = kind === 'dihybrid'
  const ext = wide ? 1.65 : 0.8 // half-width of one individual incl. allele letters
  const px = wide ? 4.7 : 3.6
  const from = px - ext - 0.05
  const len = px - 2 * ext - 0.1
  return (
    <group position={[0, 0.1, 0]}>
      <Individual x={-px} genotype={p1} kind={kind} title="P1" />
      <Individual x={px} genotype={p2} kind={kind} title="P2" />
      <Individual x={0} genotype={child} kind={kind} title="F1" />
      <Arrow origin={[-from, 0, 0]} dir={[1, 0, 0]} len={len} color="#eceff1" />
      <Arrow origin={[from, 0, 0]} dir={[-1, 0, 0]} len={len} color="#eceff1" />
    </group>
  )
}
