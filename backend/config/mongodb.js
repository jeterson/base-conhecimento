const mongose = require('mongoose')
mongose.connect('mongodb://localhost:knowledge_stats', { useNewUrlParser: true })
.catch(e => {
    const msg = 'Não foi possivel conectar com MongoDB'
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
})
