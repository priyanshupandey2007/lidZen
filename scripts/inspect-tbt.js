const fs = require('fs');
const lh = JSON.parse(fs.readFileSync('./lighthouse-mobile.json', 'utf8'));

console.log('Main thread work items:');
const mt = lh.audits['mainthread-work-breakdown'];
if (mt && mt.details && mt.details.items) {
  mt.details.items.forEach(it => {
    console.log(`  ${it.groupLabel || it.group}: ${Math.round(it.duration)}ms`);
  });
}

console.log('\nBootup time items:');
const bt = lh.audits['bootup-time'];
if (bt && bt.details && bt.details.items) {
  bt.details.items.forEach(it => {
    console.log(`  ${it.url}: total=${Math.round(it.total)}ms, scripting=${Math.round(it.scripting)}ms`);
  });
}

console.log('\nLong tasks:');
const lt = lh.audits['long-tasks'];
if (lt && lt.details && lt.details.items) {
  lt.details.items.slice(0, 10).forEach(it => {
    console.log(`  duration=${Math.round(it.duration)}ms, start=${Math.round(it.startTime)}ms`);
  });
}
