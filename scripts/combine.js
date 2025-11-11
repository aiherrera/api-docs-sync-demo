// scripts/combine.js
// Minimal OpenAPI combiner: merges paths & components from multiple service specs into one.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const inputDir = 'specs';
const outputDir = 'build';
const outYaml = path.join(outputDir, 'openapi.yaml');
const outJson = path.join(outputDir, 'openapi.json');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

const base = {
  openapi: '3.0.3',
  info: { title: 'Unified API', version: new Date().toISOString().split('T')[0] },
  servers: [{ url: 'https://api.example.com' }],
  paths: {},
  components: { schemas: {} }
};

for (const file of files) {
  const doc = yaml.load(fs.readFileSync(path.join(inputDir, file), 'utf8'));
  // Merge paths (namespace collisions will overwrite; keep simple for demo)
  Object.assign(base.paths, doc.paths || {});
  // Merge components.schemas
  if (doc.components && doc.components.schemas) {
    Object.assign(base.components.schemas, doc.components.schemas);
  }
}

fs.writeFileSync(outYaml, yaml.dump(base, { lineWidth: 120 }));
fs.writeFileSync(outJson, JSON.stringify(base, null, 2));
console.log(`✅ Combined ${files.length} specs → ${outYaml} & ${outJson}`);
