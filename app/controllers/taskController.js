import DB from "../config/db.js"

export function createTask(req,res){
        
    const {project_id,content,description,due_date} = req.body
   console.log(project_id,content,description,due_date)
    if(!project_id || !content) return res.status(404).json({erro:"Project ID and Content are required"})
         
        DB.run(
            `INSERT INTO tasks (project_id,content,description,due_date) VALUES(?,?,?,?)`,[project_id,content,description,due_date],function(err){
                if(err){
                    return res.status(500).json({err:err.message})
                }
                res.status(201).json({id:this.lastID,project_id,content,description,due_date})
            }
        )
}


export function getAllTasks(req,res){
     DB.all(
        `SELECT * FROM tasks`,[],function(err,data){
            if(err){
                return res.status(500).json({err:err.message})
            }
            res.status(201).json(data)
        }
     )
}

export function updateTask(req,res){
    let {id} = req.params
    let {is_completed} = req.body

    DB.run(
        `UPDATE tasks set is_completed = ? where id = ?`,[is_completed,id],function(err){
            if(err){
                return res.status(500).json({err:err.message})
            }
            if (this.changes === 0) return res.status(404).json({ error: "Task not found" });
            res.status(201).json({message:"updated task successfully"})
        }
    )
}

export function deleteTask(req,res){
    const {id} = req.params

    DB.run(`DELETE FROM tasks WHERE id = ?`,[id],function(err){
        if(err){
            return res.status(400).json({message:err.message})
        }
        res.status(201).json({message:'task deleted successfully'})
    })
}