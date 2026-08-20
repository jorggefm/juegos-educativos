import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')
const port = Number(process.env.PORT || 3000)

app.disable('x-powered-by')
app.use(express.static(dist, { maxAge: '1y', immutable: true, index: false }))
app.get('/health', (_request, response) => response.json({ status: 'ok', product: 'ProteinLab 2.2' }))
app.get('*path', (_request, response) => response.sendFile(path.join(dist, 'index.html')))
app.listen(port, '0.0.0.0', () => console.log(`ProteinLab escuchando en ${port}`))
