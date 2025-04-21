
import DB from "../config/db.js"


export function createUserInDB(name, email) {
    return new Promise((resolve, reject) => {
      DB.run(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email],
        function (err) {
          if (err) return reject(err);
  
          resolve({ id: this.lastID, name, email });
        }
      );
    });
  }
  
  export function getAllUsersFromDB() {
    return new Promise((resolve, reject) => {
      DB.all('SELECT * FROM users', [], function (err, users) {
        if (err) return reject(err);
        resolve(users);
      });
    });
  }

  export function getUserByIdFromDB(id) {
    return new Promise((resolve, reject) => {
      DB.get('SELECT * FROM users WHERE id = ?', [id], function (err, row) {
        if (err) return reject(err);
  
        if (!row) return reject(new Error(`User with id ${id} not found`));
  
        resolve(row);
      });
    });
  }

  export function deleteUserByIdFromDB(id) {
    return new Promise((resolve, reject) => {
      DB.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
  
        if (this.changes === 0) {
          return reject(new Error(`User with id ${id} not found`));
        }
  
        resolve({ message: `User with id ${id} is deleted` });
      });
    });
  }


  export function deleteAllUsersFromDB() {
    return new Promise((resolve, reject) => {
      DB.run('DELETE FROM users', function (err) {
        if (err) return reject(err);
  
        resolve({ message: 'All users deleted successfully' });
      });
    });
  }