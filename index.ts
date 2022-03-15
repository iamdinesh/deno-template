import {fileExists, existsSync, expandGlobSync, yamlDump, yamlLoad, yaml, sortBy, z} from "./deps"

console.log("inside index.ts");

for(let i=0;i<100;i++) {
  console.log("printing inside loop", i)
}