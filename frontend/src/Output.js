import React from 'react'

export default function Output({output, errMsg}) {
let cnt = 0 ;
  let line = "" ;
  let prev = "" ; 
  return (
    <div className='output' >
        {
          <div style={{border:errMsg.length !== 0 ? '2px solid red' : '2px solid black'}} className="outputWindow">
            { 
              errMsg.length === 0 ? 
              output.map((char) => {
                  if (char == "\n")
                  {
                    prev = '\n' ; 
                    console.log(line);
                    if (line.split(' ').length === line.length)
                    {
                      return <br key = {cnt++}></br>
                    }
                    return <div key ={cnt++}><pre className='line'>{line}</pre>
                            </div> 
                  }
                  else {
                    if (prev == '\n')
                    {
                      line = "" ; 
                      prev = "" ; 
                    }
                    if (char === ' '){
                      line = line + char;
                    }
                    else {
                      line = line + char ;  
                    }
                  }
              }) : errMsg
        }
        </div>
      }
      </div>
  )
}
