import express from  'express'
import projectRoute from './app/routes/projectRoute.js'
import taskRoute from './app/routes/taskRoute.js'
import userRoute from './app/routes/userRoute.js'
import commentRoute from './app/routes/coomentRoute.js'
const app = express()

app.use(express.json());

app.use( express.urlencoded({extended : true }) ) 

app.use("/api", projectRoute);
app.use('/api',taskRoute)

app.use('/api',userRoute)

app.use('/api',commentRoute)

let port = 3000

app.listen(port, ()=>{ console.log(`Server running on http://localhost:${port}`) } )    

