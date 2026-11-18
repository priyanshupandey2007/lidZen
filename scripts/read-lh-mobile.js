const fs = require('fs');
const lh = JSON.parse(fs.readFileSync('./lighthouse-mobile.json', 'utf8'));
console.log('Mobile Performance Score:', Math.round(lh.categories.performance.score * 100));
console.log('FCP:', lh.audits['first-contentful-paint'].displayValue);
console.log('LCP:', lh.audits['largest-contentful-paint'].displayValue);
console.log('TBT:', lh.audits['total-blocking-time'].displayValue);
console.log('CLS:', lh.audits['cumulative-layout-shift'].displayValue);
console.log('Speed Index:', lh.audits['speed-index'].displayValue);

console.log('\nTop Performance Opportunities / Diagnostics:');
const opps = ['render-blocking-resources', 'unused-javascript', 'unused-css-rules', 'unminified-javascript', 'modern-image-formats', 'uses-optimized-images', 'total-byte-weight', 'dom-size', 'mainthread-work-breakdown', 'bootup-time'];
opps.forEach(o => {
  if (lh.audits[o] && lh.audits[o].score !== null && lh.audits[o].score < 1) {
    console.log(`- ${o}: ${lh.audits[o].title} (score: ${lh.audits[o].score}, display: ${lh.audits[o].displayValue || ''})`);
  }
});
