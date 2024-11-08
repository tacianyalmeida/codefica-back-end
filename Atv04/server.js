import { createServer } from "node:http"
import fs from "node:fs";
import lerDadosPessoas from "./helper/lerDadosPessoas.js";
import { v4 as uuidv4 } from 'uuid'
// import { URLSearchParams } from "node:url";

const PORT = 3333

const server = createServer((req, resp) => {
    const { method, url } = req;
     if (method === 'GET' && url === '/usuarios') {//Listar todos os usuarios cadastrados
        lerDadosPessoas((err, usuarios) => {
            if (err) {
                resp.writeHead(500, { "Content-Type": "application/json" })
                resp.end(JSON.stringify({ message: "Erro ao ler os dados" }))
                return
            }
            resp.writeHead(200, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify(usuarios))
            return
        })

    }else if (method === 'POST' && url === '/usuarios') {//Cadastro na rede social
        let body = ''    
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const novoUsuario = JSON.parse(body)
            lerDadosPessoas((err, usuarios) => {
                if (err) {
                    resp.writeHead(500, { "Content-Type": "application/json" })
                    resp.end(JSON.stringify({ message: "Erro ao ler dados das pessoas" }))
                    return
                }
                console.log(novoUsuario)
                novoUsuario.id = uuidv4()
                usuarios.push(novoUsuario)

                fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 2), (err) => {
                    if (err) {
                        resp.writeHead(500, { "Content-Type": "application/json" })
                        resp.end(JSON.stringify({ message: "Erro ao cadastrar usuario" }))
                        return
                    }
                    resp.writeHead(201, { "Content-Type": "application/json" })
                    resp.end(JSON.stringify(novoUsuario));
                })
                console.log(usuarios)
                return resp.end();
            })

        })


    }
    else if (method === 'POST' && url === '/perfil') {//Criação do perfil

    } else if (method === 'POST' && url === '/login') {//Rota fazer login 

    } else if (method === 'GET' && url.startsWith('/perfil/')) {//Buscar usuario expecifico pelo id 

    } else if (method === 'PUT' && url === '/perfil') {//Atualiza o perfil do usuario

    } else if (method === 'POST' && url.startsWith('/perfil/')) {//Fazer upload de imagem no perfil

    } else if (method === 'GET' && url === '/usuarios') {//Listar todos os usuarios cadastrados
        lerDadosPessoas((err, usuarios) => {
            if (err) {
                resp.writeHead(500, { "Content-Type": "application/json" })
                resp.end(JSON.stringify({ message: "Erro ao ler os dados" }))
                return
            }
            resp.writeHead(200, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify(usuarios))
            return
        })

    }


})

server.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})