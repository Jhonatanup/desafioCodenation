const api = require('./src/services/api')
const fs = require('fs')
// var data = fs.readFileSync('answer.json')
// console.log(JSON.parse(data))

module.exports = {
    async getData(){
        const response = await api
            .get('generate-data?token=e65d177a5962ee73f469ad21dc3c10a572c5f714')
            .then(resp => resp.data)

        fs.writeFileSync('answer.json', JSON.stringify(response, null, 2), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          })
            
        return JSON.stringify(response, null, 2)
    }
}