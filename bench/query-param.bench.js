const Benchmark = require("benchmark");

var suite = new Benchmark.Suite;
 
const url = "https://www.startribune.com/despite-construction-challenges-southwest-remains-on-track-to-open-in-2027/600196032/?gift=test"
// add tests
suite.add('Url#searchParams.has', function() {
  let obj = new URL(url);
  obj.searchParams.has("gift")
})
.add('String#indexOf', function() {
  url.indexOf('?gift=') > -1 || url.indexOf("?gift=") > -1
})
.add('String#includes', function() {
  url.includes('?gift=') || url.includes("&gift=") > -1;
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });