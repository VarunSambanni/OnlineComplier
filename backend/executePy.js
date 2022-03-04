const {exec} = require('child_process') ;
const fs = require('fs') ;

const excecutePy = (filepath) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing python ${filepath}`);
        exec(` python ${filepath}`, 
        (error, stdout, stderr) => {
            error && reject({error, stderr}) ;
            stderr && reject({stderr}) ;
            resolve(stdout) ; 
        })
    })
}

module.exports = {
    excecutePy 
}