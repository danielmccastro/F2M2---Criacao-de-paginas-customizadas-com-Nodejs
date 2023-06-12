const http = require('http');
const fs = require('fs');
const readline = require('readline');
const porta = 443;

exports.lerHTML = function() {
  const servidor = http.createServer((req, res) => {
    fs.readFile('pagina.html', (err, arquivo) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(arquivo);
      res.end();
    })
  })
  servidor.listen(porta, () => { console.log('Servidor rodando') })
}

exports.readFileByLine = async function(file) {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    console.log(line);
  }
}

exports.criarTxt = function() {
  fs.appendFile('texte.txt', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis condimentum eros. Nulla facilisi. Sed elit risus, volutpat venenatis facilisis. ', (err) => {
    if (err) throw err;
    console.log('Arquivo criado!');
  })
}