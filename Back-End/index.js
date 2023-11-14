import http from "node:http"
import path from "node:path"
import fs from "node:fs/promises"
import url from "node:url"
import errorFunc from "./errorRouter.js"

const server = http.createServer(async (req, res) => {
    const method = req.method
    const parsedUrl = url.parse(req.url, true)

    const response = {
        error: null,
        data: null
    }

    const todosPath = path.resolve("data.json")

    if (parsedUrl.pathname == "/todos") {
        if (method === "OPTIONS") {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
            });
            res.end();
            return;
        }
        else if (method == 'GET') {
            const todosData = await fs.readFile(todosPath, "utf-8")
            response.data = {
                todos: todosData
            }
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
                "content-type": "application/json",
                "content-length": Buffer.byteLength(JSON.stringify(todosData))
            })
            res.write(JSON.stringify(todosData))
            res.end()
            return
        } else if (method == "POST") {
            const todosData = await fs.readFile(todosPath, "utf-8")
            const parsedTodosData = JSON.parse(todosData)
            if (parsedUrl.query.todo !== null && parsedUrl.query.comp !== null) {
                const newTodo = {
                    id: parsedTodosData.todos.length + 1 + "",
                    todoName: parsedUrl.query.todo,
                    completed: parsedUrl.query.comp
                }
                parsedTodosData.todos.push(newTodo)
                const stringedTodosData = JSON.stringify(parsedTodosData)
                const writeFile = await fs.writeFile(todosPath, stringedTodosData)
                response.data = {
                    message: "todo added succesfully"
                }
                res.writeHead(200, {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*",
                    "content-type": "application/json",
                    "content-length": Buffer.byteLength(JSON.stringify(response))
                }),
                    res.write(JSON.stringify(response)),
                    res.end()
                return
            }
        } else if (method == "PUT") {
            const todosData = await fs.readFile(todosPath, "utf-8")
            const parsedTodosData = JSON.parse(todosData)
            const selectedTodo = parsedTodosData.todos.find((elem) => elem.id == +parsedUrl.query.id)
            const lastComp = selectedTodo.completed
            selectedTodo.completed = !lastComp
            const stringifiedTodosData = JSON.stringify(parsedTodosData)
            const writeFile = await fs.writeFile(todosPath, stringifiedTodosData)
            response.data = {
                message: "todo updated succesfully"
            }
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
                "contend-type": "application/json",
                "contend-length": Buffer.byteLength(JSON.stringify(response))
            })
            res.write(JSON.stringify(response))
            res.end()
            return
        } else if (method == "DELETE") {
            const todosData = await fs.readFile(todosPath, "utf-8")
            let parsedTodosData = JSON.parse(todosData)
            const selectedTodo = parsedTodosData.todos.find((elem) => elem.id == +parsedUrl.query.id)
            parsedTodosData.todos.splice(selectedTodo.id - 1, 1)
            console.log(parsedTodosData);
            const stringifiedTodosData = JSON.stringify(parsedTodosData)
            const writeFile = await fs.writeFile(todosPath, stringifiedTodosData)
            response.data = {
                message: "todo deleted succesfully"
            }
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
                "contend-type": "application/json",
                "contend-length": Buffer.byteLength(JSON.stringify(response))
            })
            res.write(JSON.stringify(response))
            res.end()
            return
        }
    }

    errorFunc(req, res)
}).listen(4000, () => {
    console.log("Server is listening in port 4000");
})