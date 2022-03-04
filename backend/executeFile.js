const {exec} = require('child_process') ;
const fs = require('fs') ;
const path = require('path') ; 
const outputPath = path.join(__dirname, "outputs") ;

if (!fs.existsSync(outputPath)) 
{
    fs.mkdirSync(outputPath, {recursive: true}) ;
}
const excecuteCpp = (filepath, input) => {
    const fileId = path.basename(filepath).split('.')[0] ;
    const outPath = path.join(outputPath, `${fileId}.exe`) ;
    console.log("outpath ", outPath) ; 
    return new Promise((resolve, reject) => {
        console.log(`Executing g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${fileId}.exe `);
        exec(` g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${fileId}.exe `, 
        (error, stdout, stderr) => {
            error && reject({error, stderr}) ;
            stderr && reject({stderr}) ;
            resolve(stdout) ; 
        })
    })
}

module.exports = {
    excecuteCpp 
}