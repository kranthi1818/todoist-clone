
import DB from "./app/config/db.js"

const runAsync = (sqlQuery, params = []) => {
    return new Promise((resolve, reject) => {
      DB.run(sqlQuery, params, function (err) {
        if (err) reject(err)
        else resolve()
      })
    })
  }
  
  let execAsync = (sqlQuery) => {
    return new Promise((resolve, reject) => {
      DB.exec(sqlQuery, function (err) {
        if (err) reject(err)
        else resolve()
      })
    })
  }
  
  let generateUsers = (count) => {
    let users = []
    for (let i = 1; i <= count; i++) {
      users.push({
        name: `user-${i}`,
        email: `fakeUser${i}@gmail.com`,
      })
    }
    return users
  }
  
  async function insertUsers(users, batchSize = 50) {

    for (let i = 0; i < users.length; i += batchSize) {

      let batch = users.slice(i, i + batchSize)
  
      try {
        await execAsync("BEGIN TRANSACTION")
  
        let insertData = batch.map((records) => {
          return runAsync(`INSERT INTO users (name,email) VALUES(?,?)`, [
            records.name,
            records.email,
          ])
        })
  
        await Promise.all(insertData)
  
        await execAsync("COMMIT")

      } catch (error) {

        await execAsync("ROLLBACK")

        console.log("Error inserting User Data" + error)
      }
    }
  }

  async function generateAndInsertProjects(
    Totalprojects,
    userCount,
    batchSize = 10000
  ) {
      console.time("projects")
    for (let i = 1; i <= Totalprojects; i += batchSize) {
      const projectBatch = [];
      const endIndex = Math.min(i + batchSize - 1, Totalprojects);
  
      for (let j = i; j <= endIndex; j++) {
          projectBatch.push({
              name: `Project ${j}`,
              user_id: Math.floor(Math.random() * userCount) + 1,
              color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
              is_favorite: Math.random() < 0.2 ? 1 : 0,
          });
      }
  
      try {
        await execAsync("BEGIN TRANSACTION")
  
        const stmt = DB.prepare("INSERT INTO projects (name, user_id, color, is_favorite) VALUES (?, ?, ?, ?)");  
              for (const project of projectBatch) {
                  stmt.run(project.name, project.user_id, project.color, project.is_favorite);
              }

        await execAsync("COMMIT")

        console.log(`Inserted Projects ${i} to ${endIndex}`)

      } catch (error) {

        await execAsync("ROLLBACK")

        console.log("error inserting Project batch")

      }
    }

    console.timeEnd("projects")

  }
  
  async function generateAndInsertTasks(totalTasks,tasksPerProject,batchSize=1000000) {
    
                let totalProjects = Math.ceil(totalTasks / tasksPerProject)
                let projectsPerBatch = Math.ceil( batchSize / tasksPerProject)

                const dueDates = [
                    '2025-03-12', '2025-03-15', '2025-03-20', 
                    '2025-04-01', '2025-04-15', '2025-05-01'
                ];


                console.time("tasks")

                
                for(let i = 1; i<= totalProjects; i += projectsPerBatch){
                    const start = i
                    const end = Math.min(i+projectsPerBatch,totalProjects)

                    const batch = []

                    for(let projectId = start;projectId < end;projectId++){
                        for(let task = 0;task < tasksPerProject; task++){
                            batch.push({

                                project_id:projectId,

                                content:`project${projectId}_task${task}`,
                                description:`This is Task${task} from ${projectId} `,
                                due_date: dueDates[Math.floor(Math.random() * dueDates.length)],
                                is_completed: Math.random() < 0.5 ? 1 : 0
                            })
                           console.log(`${projectId}`,`project${projectId}_task${task}`,`This is Task${task} from ${projectId} `,)
                        }
                    }
             
                    try {
                        await execAsync("BEGIN TRANSACTION")
                        
                     let   stmt = DB.prepare("INSERT INTO tasks (content,description,due_date,is_completed,project_id) VALUES (?, ?, ?, ?, ?)");  
                              for (const task of batch) {
                                stmt.run(task.content,task.description,task.due_date,task.is_completed,task.project_id);
                              }
                             

                        stmt.finalize()     
                        await execAsync("COMMIT")
                       
                      } catch (error) {
                        await execAsync("ROLLBACK")
                        console.log("Error inserting Tasks batch")
                      }
                }
                console.timeEnd("tasks")  

            }        
  
  async function uploadData() {
    try {
      let user_count = 100
      let project_count = 1000000
      let task_count = 10000000
      let task_per_project = 10
  
      let users = generateUsers(user_count)

      await insertUsers(users, 50)
  
      await generateAndInsertProjects(project_count, user_count, 50000)
  
  
      await generateAndInsertTasks(task_count,task_per_project,100000)

    } catch (error) {

      console.log("Error uploading data to database", error)

    }
  }
  
  uploadData()

    .then(() => {

      console.log("data uploaded successfully")
      
    })

    .catch((err) => {

      console.log("data failed to upload", err)

    })
  