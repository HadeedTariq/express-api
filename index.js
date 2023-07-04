import express from 'express'
import { readFile } from 'fs/promises'
import serverless from 'serverless-http'
const app=express()
const router=express.Router()
const getData=async()=>{
    let data = await readFile(new URL('./fake.json', import.meta.url));
    data=JSON.parse(data)
    return data;
}
router.get('/',(req,res)=>{
    res.send('Hello world')
})
router.get('/company', async (req, res) => {
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
router.get('/api/company', async (req, res) => {
    let data=await getData()
    res.status(200).json(data)
})
router.route('/api/company/:id').get(async(req,res)=>{
    const {id}=req.params;
    let data=await getData()
    data=data.filter(user=>user.id.toString()===id)
    res.status(200).json(...data)
})
app.use('/.netlify/functions/api',router)
module.exports.handler=serverless(app)