import {useRouter} from 'next/router'


useEffect(()=>{
if(files && files.length>0 && !currentPath){
setCurrentPath(files[0].path)
}
},[files])


useEffect(()=>{
if(currentPath && id){
fetch(`${backend}/api/projects/${id}/file?path=${encodeURIComponent(currentPath)}`).then(r=>r.text()).then(t=>setContent(t))
}
},[currentPath,id])


async function save(){
if(!currentPath || !id) return
await fetch(`${backend}/api/projects/${id}/file`, {method:'PUT', headers:{'Content-Type':'text/plain','x-path':currentPath}, body: content})
alert('Saved')
}


async function build(){
if(!id) return
const res = await fetch(`${backend}/api/projects/${id}/build`, {method:'POST'})
if(res.ok) alert('Build started. Check builds endpoint for status')
}


return (
<div className="p-4">
<h1 className="text-xl">Project: {project?.name}</h1>
<div className="flex gap-4 mt-4">
<div className="w-1/4 border p-2">
<h3 className="font-semibold">Files</h3>
<div className="mt-2">
{files?.map((f: any)=> (
<div key={f.path} className={`p-1 cursor-pointer ${currentPath===f.path? 'bg-gray-200':''}`} onClick={()=>setCurrentPath(f.path)}>{f.path}</div>
))}
</div>
</div>
<div className="flex-1">
<div className="mb-2">
<button className="mr-2 bg-green-600 text-white px-3 py-1 rounded" onClick={save}>Save</button>
<button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={build}>Build</button>
</div>
<div style={{height: '70vh'}}>
<MonacoEditor
language={currentPath?.endsWith('.java')? 'java' : currentPath?.endsWith('.xml') ? 'xml' : 'yaml'}
value={content}
onChange={(value)=> setContent(value || '')}
/>
</div>
</div>
</div>
</div>
)
}
