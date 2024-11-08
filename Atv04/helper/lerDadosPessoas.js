import fs from 'node:fs'

const lerDadosPessoas = (callback)=>{
    fs.readFile('usuarios.json', 'utf-8', (err, data)=>{
    if(err){
        callback(err)
    }try{
        const usuarios = JSON.parse(data)
        callback(null, usuarios)
    }catch (error){
     callback(error)
    }


    })
}
export default lerDadosPessoas; 