import http from 'http'
 http.createServer((req, res) => {
    res.end('oi, tudo bem???')
 }).listen(3000)
 console.log("servidor rodando")