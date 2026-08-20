import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const genes = ['HBB', 'CA2']
const stops = new Set(['UAA', 'UAG', 'UGA'])

for (const symbol of genes) {
  const file = path.join(root, 'scientific-data', symbol, 'gene.json')
  const record = JSON.parse(await readFile(file, 'utf8'))
  const codons = record.demoCodons
  const aminoAcids = record.demoAminoAcids

  if (record.symbol !== symbol) throw new Error(`${symbol}: símbolo inconsistente`)
  if (!Number.isInteger(record.exonCount) || record.exonCount < 1) throw new Error(`${symbol}: número de exones inválido`)
  if (codons[0] !== 'AUG') throw new Error(`${symbol}: el tramo debe comenzar en AUG`)
  if (!stops.has(codons.at(-1))) throw new Error(`${symbol}: falta un STOP terminal`)
  if (codons.length !== aminoAcids.length + 1) throw new Error(`${symbol}: STOP no debe producir aminoácido`)
  if (!codons.every(codon => /^[ACGU]{3}$/.test(codon))) throw new Error(`${symbol}: codón inválido`)
  if (record.start >= record.end) throw new Error(`${symbol}: intervalo genómico inválido`)
  console.log(`✓ ${symbol}: ${record.exonCount} exones · ${codons.length} codones didácticos · START/STOP válidos`)
}
