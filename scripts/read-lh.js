const fs = require('fs');
const lh = JSON.parse(fs.readFileSync('./lighthouse-desktop.json', 'utf8'));
console.log('Categories:');
for (let c in lh.categories) {
  console.log(`  ${c}: ${Math.round(lh.categories[c].score * 100)}`);
}
console.log('\nFailed Accessibility Audits:');
for (let id in lh.audits) {
  const audit = lh.audits[id];
  if (lh.categories.accessibility.auditRefs.some(r => r.id === id) && audit.score !== null && audit.score < 1) {
    console.log(`- ${id}: ${audit.title} (score: ${audit.score})`);
    if (audit.details && audit.details.items) {
      audit.details.items.forEach(it => {
        console.log(`    Node: ${it.node ? it.node.snippet : ''}`);
        console.log(`    Explanation: ${it.node ? it.node.explanation : ''}`);
      });
    }
  }
}
