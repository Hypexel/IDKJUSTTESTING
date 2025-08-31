import express from 'express'
app.put('/api/projects/:id/file', (req,res)=>{
const id = req.params.id
const projectPath = path.join(PROJECTS_DIR, id)
const p = req.headers['x-path'] as string
if(!p) return res.status(400).json({error:'missing x-path header'})
const full = path.join(projectPath, p)
fs.writeFileSync(full, req.body)
res.json({ok:true})
})


app.post('/api/projects/:id/build', (req,res)=>{
const id = req.params.id
const projectPath = path.join(PROJECTS_DIR, id)
const meta = JSON.parse(fs.readFileSync(path.join(projectPath,'meta.json'),'utf8'))
const outDir = path.join(ARTIFACTS_DIR, id)
if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true})
// run docker worker
const cmd = `docker run --rm -v ${projectPath}:/project -v ${outDir}:/out --network none worker:latest /project /out ${meta.type}`
exec(cmd, {timeout: 1000 * 60 * 5}, (err, stdout, stderr) =>{
if(err){
console.error(err, stderr)
return res.status(500).json({error: 'build failed', detail: stderr})
}
// find jar
const files = fs.readdirSync(outDir).filter(f=>f.endsWith('.jar'))
if(files.length===0) return res.status(500).json({error:'no artifact'})
res.json({ok:true, artifacts: files})
})
})


app.get('/api/projects/:id/artifacts', (req,res)=>{
const id = req.params.id
const outDir = path.join(ARTIFACTS_DIR, id)
if(!fs.existsSync(outDir)) return res.json([])
const files = fs.readdirSync(outDir).filter(f=>f.endsWith('.jar'))
res.json(files)
})


app.get('/api/projects/:id/artifacts/:name', (req,res)=>{
const id = req.params.id
const name = req.params.name
const outDir = path.join(ARTIFACTS_DIR, id)
const full = path.join(outDir, name)
if(!fs.existsSync(full)) return res.status(404).send('not found')
res.download(full)
})


app.listen(8080, ()=> console.log('Backend listening on 8080'))
