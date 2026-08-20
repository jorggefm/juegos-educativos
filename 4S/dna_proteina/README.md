# ProteinLab 2.0

Observatorio molecular 3D para recorrer la expresión génica desde el núcleo hasta una estructura proteica experimental.

## Ruta pedagógica

```text
célula → núcleo → locus → gen → transcripción → maduración
→ exportación nuclear → ARNm → ORF/CDS → traducción → proteína
```

Incluye dos casos humanos con un mismo motor:

- **HBB:** 3 exones, hebra negativa, NM_000518.5, estructura 4HHB.
- **CA2:** 7 exones, hebra positiva, NM_000067.3, estructuras 1CA2/3HS4.

Las escenas celulares son modelos didácticos 3D. Las estructuras finales se muestran con Mol* a partir de RCSB PDB. Los metadatos proceden de NCBI/RefSeq y se conservan con su trazabilidad en `scientific-data/`.

## Desarrollo

Requiere Node.js 22 o compatible.

```bash
npm install
npm run dev
```

## Verificación

```bash
npm test
```

El comando comprueba TypeScript, START/STOP, tripletes, correspondencia codón/aminoácido y el build de producción.

## Producción local

```bash
npm run build
npm start
```

La aplicación usa `PORT` cuando Railway lo proporciona y expone `/health`.

## Despliegue

`railway.json` contiene el build y el healthcheck. El flujo acordado es probar primero el build local, publicar después en GitHub y conectar Railway únicamente tras revisar el repositorio.
