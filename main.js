const { app, BrowserWindow, ipcMain } = require('electron')

const mysql = require('mysql2/promise')

console.log('__dirname', __dirname)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + '/preload.js', // Nosso arquivo preload
      contextIsolation: true, // Habilita o isolamento de contexto
    }
  })

  win.loadFile('pages/index.html')
}

 async function conexaoComBanco(){
    var conexao = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'electron_db'
    })

    return conexao
}

ipcMain.handle('criar-usuario', async function (evento, campoNome, campoEmail){
  var conexao = await conexaoComBanco()

  var criarUsuarioSQL = 'INSERT INTO usuarios(nome, email) VALUES(?, ?)'

  var resultado = await conexao.execute(criarUsuarioSQL, [campoNome, campoEmail])

  console.log('resultado', resultado)
})

app.whenReady().then(() => {
  createWindow()
})