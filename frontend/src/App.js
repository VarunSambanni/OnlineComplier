import './index.css';
import './App.css';
import React, {useState} from 'react'
import axios from 'axios'
import { Button, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import CodeEditor from '@uiw/react-textarea-code-editor';
// import CodeMirror from 'react-codemirror' ; 
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css'
import 'codemirror/mode/python/python'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike.js'
import ToolBar from './ToolBar';
import Output from './Output';

function App() {

  const [code, setCode] = useState("#include <bits/stdc++.h>\nusing namespace std;\nint main()\n{\n  return 0;\n}") ; 
  const [input, setInput] = useState('') ; 
  const [output, setOutput] = useState([]); 
  const [language, setLanguage] = useState('cpp') ;
  const [executing, setExecuting] = useState(false) ; 
  const [errMsg, setErrMsg] = useState('') ; 
  const [theme, setTheme] = useState('light')
  let cnt = 0 ;
  let line = "" ;
  let prev = "" ; 

  const handleLanguageChange = (e) => {
    if (e.target.value === 'cpp')
    {
      setCode("#include <bits/stdc++.h>\nusing namespace std;\nint main()\n{\n  return 0;\n}") ; 
    }
    else if (e.target.value === 'py')
    {
      setCode('print("Hello World")\n') ; 
    }
    else 
    {
      setCode('console.log("Hello World");') ;
    }
    setLanguage(e.target.value) ;
  }

  const handleSubmit = async () => {
    setExecuting(true) ; 
    setErrMsg('') ; 
    setOutput([]);
    const payload = {
      language: language,
      code : code,
      input: input
    } ; 
    try {
      const {data} = await axios.post('http://localhost:5000/run', payload) ;
      setErrMsg('') ;
      const temp = [...data.output] ;
      setOutput(temp) ;
      console.log(output) ; 
    }
    catch ({response}){
      console.log(response) ; 
      if (response)
      {
        const err = response.data.err.stderr ; 
        console.log(err) ; 
        setErrMsg(err) ;
      }
      else 
      {
        window.alert("Error connecting to the server") ; 
      }
    }
    setExecuting(false) ; 
  }
  return (
    <div className="App">
      <h1 className='center'>Online code compiler</h1>
      <br/>
      <ToolBar code={code} setCode={setCode} language={language} handleLanguageChange={handleLanguageChange} theme={theme} setTheme={setTheme}></ToolBar>
      <br/>
      <br/>
        
    <CodeMirror
      value={code}
      options={{
        theme: theme === 'light' ? 'eclipse' : 'material',
        mode: language === 'py' ? 'python' : language === 'js' ? 'javascript' : 'text/x-c++src',
        lineNumbers: true,
        styleActiveLine: true
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value);
      }}
      onChange={(editor, data, value) => {
      }}
    />
      {/*
      <CodeEditor
      className='editor'
      value={code}
      language={language === 'py' ? "python" : language === 'js' ? "jsx" : 'cpp'}
      placeholder="Start Typing..."
      onChange= {(e) => {setCode(e.target.value)}}
      padding={15}
      style={{
        height: '35em',
        maxHeight: '40em',
        width: '110em',
        maxWidth: '105em',
        alignSelf: 'center',
        overflow: 'auto',
        fontSize: 14,
        backgroundColor: "#f7f7f7",
        margin: 'auto',
        border: '2px solid black',
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  */} 
      { /*<textarea id="textbox" rows="20" cols="75" value={code} onChange= {(e) => {setCode(e.target.value)}}></textarea> */} 
      <br />
      <div className='center'>
      {!executing ? <Button className="submit-btn center" style ={{backgroundColor: '#005cb8', margin: "1em", transition: "all 0.4s"}} onClick={handleSubmit}>Submit</Button>: <Spinner  animation="border"/>}
      </div>
      <Output output={output} errMsg={errMsg}/>
      <footer></footer>
    </div>
  );
}

export default App;
