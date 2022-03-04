const {exec} = require('child_process') ;
const fs = require('fs') ;

const executeJs = (filepath) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing node ${filepath}`);
        exec(` node ${filepath}`, 
        (error, stdout, stderr) => {
            error && reject({error, stderr}) ;
            stderr && reject({stderr}) ;
            resolve(stdout) ; 
        })
    })
}

module.exports = {
    executeJs 
}