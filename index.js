import express from 'express'
import { readFile } from 'fs/promises'
const app = express()
const PORT = 8000
const getData=async()=>{
    let data = await readFile(new URL('./fake.json', import.meta.url));
    data=JSON.parse(data)
    return data;
}
app.get('/company', async (req, res) => {
    let data=await getData()
    const html = `
       <ul>
        ${data.map(user => {
            return `<li>${user.company_name}</li>`
    }
    ).join("")}
       </ul>
    `;
    res.send(html)
})
app.get('/api/company', async (req, res) => {
    let data=await getData()
    res.status(200).json(data)
})
app.route('/api/company/:id').get(async(req,res)=>{
    const {id}=req.params;
    let data=await getData()
    data=data.filter(user=>user.id.toString()===id)
    res.status(200).json(...data)
})
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))