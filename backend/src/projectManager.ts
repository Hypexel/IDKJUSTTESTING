import fs from 'fs'
import path from 'path'


const TEMPLATES_DIR = path.join(__dirname, 'templates')


export function copyTemplateToProject(type:string, dest:string){
const src = path.join(TEMPLATES_DIR, type)
if(!fs.existsSync(src)) throw new Error('template not found')
copyRecursive(src, dest)
}


function copyRecursive(src:string, dest:string){
const stat = fs.statSync(src)
if(stat.isDirectory()){
if(!fs.existsSync(dest)) fs.mkdirSync(dest)
for(const f of fs.readdirSync(src)){
copyRecursive(path.join(src,f), path.join(dest,f))
}
}else{
const parent = path.dirname(dest)
if(!fs.existsSync(parent)) fs.mkdirSync(parent, {recursive:true})
fs.copyFileSync(src, dest)
}
}


export function listFilesRecursive(dir:string, base=''){
let out: {path:string}[] = []
for(const f of fs.readdirSync(dir)){
const full = path.join(dir,f)
const rel = path.join(base, f)
if(fs.statSync(full).isDirectory()){
out = out.concat(listFilesRecursive(full, rel))
}else{
out.push({path: rel})
}
}
return out
}
