import Link from 'next/link'
import useSWR from 'swr'


const fetcher = (url: string) => fetch(url).then(r => r.json())


export default function Home(){
const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:8080'
const { data, error } = useSWR(`${backend}/api/projects`, fetcher)


return (
<div className="p-6">
<h1 className="text-2xl font-bold mb-4">Minecraft Online IDE</h1>
<CreateProjectForm />
<h2 className="mt-6 font-semibold">Projects</h2>
<div className="mt-3">
{error && <div>Failed to load</div>}
{data?.length === 0 && <div>No projects yet</div>}
{data?.map((p: any) => (
<div key={p.id} className="p-2 border rounded mb-2">
<Link href={`/project/${p.id}`}><a className="text-blue-600">{p.name}</a></Link>
</div>
))}
</div>
</div>
)
}


function CreateProjectForm(){
async function handleSubmit(e: any){
e.preventDefault()
const name = e.target.name.value
const type = e.target.type.value
const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:8080'
const res = await fetch(`${backend}/api/projects`, {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({name, type})
})
if(res.ok) window.location.reload()
}


return (
<form onSubmit={handleSubmit} className="flex gap-2">
<input name="name" placeholder="Project name" className="border p-1"/>
<select name="type" className="border p-1">
<option value="maven">Maven</option>
<option value="gradle">Gradle</option>
</select>
<button className="bg-blue-600 text-white px-3 rounded">Create</button>
</form>
)
}
