const api = require('./src/services/api')
const fs = require('fs')
const sha1 = require('js-sha1')


module.exports = {
    async getData(){
        const response = await api
            .get('generate-data?token=e65d177a5962ee73f469ad21dc3c10a572c5f714')
            .then(resp => resp.data)


        fs.writeFileSync('answer.json', JSON.stringify(response, null, 2), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })
            
        let data = fs.readFileSync('answer.json', (err) => {
            if (err) throw err})
        data = JSON.parse(data)
        let cifra = data.cifrado  
        let decifrado = ""

        for (let i=0; i<cifra.length; i++) {
            if(cifra.charCodeAt(i)>= 'c'.charCodeAt() && cifra.charCodeAt(i) <= 'z'.charCodeAt()){
                decifrado += String.fromCharCode((cifra.charCodeAt(i) - 97 - data.numero_casas) % 26 + 97)
            }else if(cifra.charCodeAt(i) === 'a'.charCodeAt() || cifra.charCodeAt(i) === 'b'.charCodeAt()){
                decifrado += String.fromCharCode((cifra.charCodeAt(i) - 96 + 'z'.charCodeAt() - data.numero_casas))
            }else{
                decifrado += String.fromCharCode(cifra.charCodeAt(i))
            }
        }  
        
        data.decifrado = decifrado
        data.resumo_criptografico = sha1(data.decifrado)

        fs.writeFileSync('answer.json', JSON.stringify(data, null, 2), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })
        
        return JSON.stringify(data, null, 2)
    }
}