import DB from "../config/db.js"

export function projectCreation(name, color, is_favorite) {

  return new Promise((resolve, reject) => {
    let query =
      "INSERT INTO projects (name, color, is_favorite) VALUES (?, ?, ?)"

    DB.run(query, [name, color, is_favorite ? 1 : 0], function(err){
      if (err) {
        return reject(new Error('Project Creation is Failed'))
      }
      resolve({ id: this.lastID, name, color, is_favorite })
    })
  })
}

export function getProjectsAll() {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM projects"

    DB.all(query, (err, data) => {
      if (err) {
        return reject(new Error("Unable to fetch the comments"))
      }
      resolve(data)
    })
  })
}

export function projectById(id){
    return new Promise((resolve,reject)=>{
        let query = 'SELECT * FROM projects WHERE id = ?'

        DB.get(query,[id],function(err,data){
            if(err){
                return reject(new Error('unable to get the project'))
            }
            resolve(data)
        })
    })
}

export function projectDeleting(id){
    return new Promise((resolve,reject)=>{
        let query = "DELETE FROM projects WHERE id = ?"

        DB.run(query,[id],function (err){
            if(err){
                return reject(new Error('unable to delete the project'))
            }
            resolve({message:`Project with id ${id} Deleted Successfully`})
        })
    })
}

export function allProjectsDelete(){
    return new Promise((resolve,reject)=>{
        let query = 'DELETE FROM projects'

        DB.run(query,(err)=>{
            if(err){
                return reject(new Error('Deleting Projects Failed'))
            }
            resolve({message:'All Projects Deleted Successfully'})
        })
    })
}



