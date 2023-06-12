const http = require('http');
const fs = require('fs');
const readline = require('readline');
const porta = 443;
const funcoes = require('./funcoes')

main();

function main() {
  funcoes.lerHTML();
  funcoes.criarTxt();
  funcoes.readFileByLine('texte.txt');
}