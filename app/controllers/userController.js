import DB from "../config/db.js"


export function createUser(req,res){
    const {name,email} = req.body

    if(!name) return res.status(400).json({error:'user name is required'});
    DB.run(
        "INSERT INTO users (name,email) VALUES (?,?)",
        [name,email],
        function(err){
            if(err) return res.status(500).json({err:err.message})
                res.status(201).json({id:this.lastID,name,email})
        }
    )

}

export function getAllUsers(req,res){
    DB.all(
        'SELECT * FROM users',[],
        function(err,user_table){
            if(err) return res.status(500).json({err:err.message})
                res.status(200).json(user_table)
        }
    )
}

export function getUserById(req,res){
    const {id} = req.params
    
    DB.get(
        'SELECT * FROM users WHERE id=?',[id],
        function(err,row){
            if(err) return res.status(500).json({err:err.message})
                res.status(200).json(row)
        }
    )
}


export function deleteUser(req,res){
    const {id} = req.params

    if(!id) return res.status(400).json({error:'user id is required'})

    DB.run(
        'DELETE FROM users WHERE id = ?',[id],
        function(err){
            if(err) return res.status(500).json({error:err.message})
                res.status(200).json({message:`User with id ${id} is deleted`})
        }
    )
}


export function deleteAllUsers(req, res) {
    DB.run(
        'DELETE FROM users',
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.status(200).json({ message: 'All users deleted successfully' });
        }
    );
}

