const { dir } = require('console');
const fs = require('fs') ;
const path = require('path')
const {v4: uuid} = require('uuid') ; 

const dirCodes = path.join(__dirname, "codes") ; 

if (!fs.existsSync(dirCodes))
{
    fs.mkdirSync(dirCodes, {recursive: true}) ; 
}

const generateFile = async (format, code) => {
    const fileId = uuid() ;
    const filename = `${fileId}.${format}` ;
    const filePath = path.join(dirCodes, filename) ;
    try {
        await fs.writeFileSync(filePath, code) ;
    }
    catch (err)
    {
        console.log("Error in generating file ", err) ; 
    }
    return filePath ;  
}; 

module.exports = {
    generateFile
} ; 