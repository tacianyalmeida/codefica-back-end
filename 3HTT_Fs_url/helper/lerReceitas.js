import fs from "node:fs"
import { callbackify } from "node:util";

const lerDadosReceitas = (callback) => {
    fs.readFile('receitas.json', "utf-8", (err, data) => {
        if (err) {
            callbackify(err)
        } try {
            const receitas = JSON.parse(data)
            callback(null, receitas)
        } catch (error) {
            callback(error)
        }
    })
}

export default lerDadosReceitas;