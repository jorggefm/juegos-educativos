# Expedición Hábitat — 6.º de primaria, Unidad 5, Lección 1

Juego cooperativo para una pantalla principal manejada por el docente con un solo mouse.

## Ejecutar

- Abrir `index.html` con doble clic. Es autocontenido y funciona sin internet.
- Pulsar **Pantalla completa** para proyectarlo en el televisor del aula.
- `index.source.html` y `assets/` son la versión editable.
- Después de editar, ejecutar `node bundle.mjs` para reconstruir `index.html`.

## Secuencia del juego

1. El grupo decide si aterrizaría en un planeta con una primera impresión.
2. Administra cuatro módulos de descenso para ocho planetas. Seguir buscando omite el cuestionario y deja el mundo sin investigar.
3. Al aterrizar, una reentrada animada cambia la órbita por una superficie en primera persona.
4. Clasifica evidencia sobre agua, atmósfera, energía y temperatura y emite un diagnóstico integral.
5. Después de cuatro sobrevuelos, entra en un segundo sector que añade relaciones causales entre condiciones.
6. En el consejo final solo puede elegir entre los mundos investigados o declarar que ninguno es seguro.

No hay competencia, nombres individuales ni puntajes. El producto evaluable es el diagnóstico científico colectivo y la decisión final basada en evidencia.

## Imágenes generadas para el proyecto

- `assets/nereida.webp`: mundo oceánico templado.
- `assets/brasa.webp`: mundo volcánico con exceso de energía.
- `assets/umbral.webp`: mundo sin atmósfera y con temperaturas extremas.
- `assets/cripta.webp`: mundo helado con agua subterránea incierta.
- `assets/marea.webp`: mundo oceánico cuya atmósfera no ofrece protección suficiente.
- `assets/velo.webp`: mundo templado con composición y agua todavía inciertas.
- `assets/boreal.webp`: mundo helado con poca energía disponible.
- `assets/helia.webp`: mundo desértico expuesto a radiación y calor extremos.

Todas las imágenes se guardan dentro del HTML final como datos incrustados para conservar el modo sin conexión.

Cada planeta incluye una superficie general y dos vistas de evidencia (`surface-<planeta>-evidence-a/b.webp`). El juego cambia de paisaje durante los sensores: agua/atmósfera y energía/temperatura. En total se usan ocho órbitas y veinticuatro superficies POV.

## Railway

- `server.mjs` sirve el juego sin dependencias externas.
- `railway.json` ejecuta la compilación autocontenida y publica `index.html`.
- Inicio local equivalente: `npm start`.
