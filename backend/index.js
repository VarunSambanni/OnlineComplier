const express = require('express') ;
const app = express() ;
const {generateFile} = require('./generateFile') ;
const {excecuteCpp} = require('./executeFile') ;
const {excecutePy} = require('./executePy') ;
const {executeJs} = require('./executeJs') ;
const fs = require('fs');
const path = require('path') ; 

const cors = require('cors') ;

app.use(express.urlencoded({extended: true})) ;
app.use(express.json()) ;
app.use(cors()) ;

app.get('/', (req, res)=>{
    return res.json({hello: "world!"}) ; 
}) ;

app.post("/run", async (req, res)=> {
    const {language = "cpp", code, input} = req.body ;   
    if (code === undefined)
    {
        return res.status(400).json({success:false, error:"Empty code!"}) ;
    }
    // Need to generate cpp file with content from the req
    console.log("language => ", language) ;
    try {
        const filePath = await generateFile(language, code) ; 
        // run the file and send the response 
        let output ; 
        console.log("input => ", input) ; 
        if (language === "cpp"){
            output = await excecuteCpp(filePath, input) ;
        }
        else if (language === "py"){
            output = await excecutePy(filePath) ; 
        }
        else {
            output = await executeJs(filePath) ;
        }
        console.log("output => ", output) ; 
        return res.json({filePath, output}) ; 
    }
    catch(err) {
        res.status(500).json({err}) ;
    }
});

app.post('/download', async (req, res)=> {
    const {language = 'cpp', code} = req.body ;
    console.log("Post request for download => ", code) ;
    const filePath = await generateFile(language, code) ; 
    var file = fs.createReadStream(filePath) ; 
    var stat = fs.statSync(filePath) ;
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/text');
    res.setHeader('Content-Disposition', `attachment; filename=${'code'}.${language}`);
    file.pipe(res) ;
})

app.listen(5000, () => {
    console.log("Listening on port 5000...") ; 
})