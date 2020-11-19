// CHAMNDO O MODULO APP EXPORTADO DE SRC
const app = require('./src/app');

// TRATATIVA PARA HOSPEDAGEM.
// QUANDO A API ESTIVER HOSPEDADA, A PORTA É GERENCIADA PELO SERVIDOR DE HOSPEDAGEM,
// CASO CONTRÁRIO (LOCALHOST) DEFINO A PORTA 5000
const PORTA = process.env.PORT || 5000;

// INICIA A APLICAÇÃO
app.listen(PORTA, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('API Rodando na porta ' + PORTA);
});