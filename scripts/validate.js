// scripts/validate.js
// Tiny validator: ensure every operation has operationId & description
const fs = require('fs');
const path = require('path');

const spec = JSON.parse(fs.readFileSync('build/openapi.json', 'utf8'));
let ok = true;

for (const [p, item] of Object.entries(spec.paths || {})) {
  for (const method of ['get','post','put','patch','delete','options','head']) {
    if (!item[method]) continue;
    const op = item[method];
    const missing = [];
    if (!op.operationId) missing.push('operationId');
    if (!op.description && !op.summary) missing.push('description/summary');
    if (missing.length) {
      console.error(`❌ ${method.toUpperCase()} ${p} missing: ${missing.join(', ')}`);
      ok = false;
    }
  }
}

if (!ok) {
  console.error('✖ Validation failed');
  process.exit(1);
}
console.log('✅ Validation passed');
