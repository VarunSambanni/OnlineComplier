import React, {useState} from 'react'
import { ListGroup, Button, Toast } from 'react-bootstrap'
import {AiFillSave, AiFillCopy, AiOutlineDownload} from 'react-icons/ai'
import {FiRefreshCw} from'react-icons/fi'
import {MdRestorePage, MdOutlineLightMode, MdOutlineDarkMode} from 'react-icons/md'
import {BsFillCloudUploadFill} from 'react-icons/bs'


export default function ToolBar({code, setCode, language, handleLanguageChange, theme, setTheme}) {
    const [alert, setAlert] = useState() ; 
    const handleCopy = (e) =>{
        navigator.clipboard.writeText(code) ; 
        setAlert('Code copied to clipboard') ;
        setTimeout(()=> setAlert(null), 2000) ;
    }

    const handleSave = (e) => {
        localStorage.setItem('code', JSON.stringify(code)) ; 
        setAlert('Saved to local storage') ;
        setTimeout(()=> setAlert(null), 2000) ;
    }

    const handleRestore = (e) => {
        setCode(JSON.parse(localStorage.getItem('code'))) ;
        setAlert('Restored from local storage') ;
        setTimeout(()=> setAlert(null), 2000) ;
    }

    const handleClear = (e) => {
        setCode('') ;
        setAlert('Cleared') ;
        setTimeout(()=> setAlert(null), 2000) ;
    }
    
    const handleThemeChange = (e) => {
        theme === 'light' ? setTheme('dark') : setTheme('light') ;
    }

    const handleFile = (e) => {
        const content = e.target.result ;
        setCode(content) ;
        console.log('File content ', content) ; 
    }

    const handleUpload = (file) => {
        let fileData = new FileReader() ;
        fileData.onloadend = handleFile ;
        fileData.readAsText(file) ;
    }

    return (
    <>
    <ListGroup variant='flush' className='d-flex flex-row-reverse justify-content-end' style={{backgroundColor:'#cfe9ff'}}>
        <ListGroup.Item className='border-0 align-self-center' style={{backgroundColor:'#cfe9ff', marginLeft: 'auto'}}>
            <select className='select-box' value = {language} onChange={handleLanguageChange}>
            <option value={"cpp"}>C++</option>
            <option value={"py"}>Python</option>
            <option value={"js"}>JavaScript</option>
            </select>
        </ListGroup.Item>
        <ListGroup.Item className='border-0 align-self-center' style={{backgroundColor:'#cfe9ff', marginLeft: '40em'}}>
            <Button onClick = {handleThemeChange} className='fw-bold' style ={{
                fontSize: '1em',
                color: theme === 'light' ? 'black' : 'white',
                backgroundColor: theme === 'light' ? 'white' : 'black'}} 
            >
                {theme === 'light' ? <MdOutlineLightMode/> : <MdOutlineDarkMode/>}
            </Button>
        </ListGroup.Item>
        <ListGroup.Item className='border-0 align-self-center' style={{backgroundColor:'#cfe9ff'}}>
            <input id='files' type='file'style={{display:'none', border:'2px solid black'}} onChange={e => handleUpload(e.target.files[0])}></input>
            <Button><label for='files'><BsFillCloudUploadFill/> Upload</label></Button>
        </ListGroup.Item>
         <ListGroup.Item className='border-0 align-self-center' style={{backgroundColor:'#cfe9ff'}}>
             <form method='POST' action='http://localhost:5000/download' >
            <Button className='' type='submit' value={code}><AiOutlineDownload/> Download</Button>
            <textarea type='text' style={{visibility: 'hidden', position: 'fixed'}} name='code' value={code}></textarea>
            <input type='text' style={{visibility: 'hidden', position:'fixed'}} name='language' value={language}></input>
            </form>
        </ListGroup.Item>
        <ListGroup.Item className='border-0 align-self-center' style={{backgroundColor:'#cfe9ff'}}>
            <Button onClick = {handleClear}><FiRefreshCw/> Clear</Button>
        </ListGroup.Item>
        <ListGroup.Item className='border-0 align-self-center' style={{backgroundColor:'#cfe9ff'}}>
            <Button variant='primary' onClick = {handleCopy}><AiFillCopy/> Copy</Button>
        </ListGroup.Item>
        <ListGroup.Item className='border-0 align-self-center' style={{backgroundColor:'#cfe9ff'}}>
            <Button onClick={handleRestore}><MdRestorePage/> Restore</Button>
        </ListGroup.Item>
        <ListGroup.Item className='align-self-center'style={{backgroundColor:'#cfe9ff'}}>
            <Button onClick = {handleSave}><AiFillSave/> Save</Button>
        </ListGroup.Item>
    </ListGroup>
    <br/>
    {alert && <Toast className='toast-alert' 
    style=
        {{  position: 'fixed',
            zIndex:'1',
            backgroundColor:'#e3e3e3',
            height: '40px',
            transform: '',
            color: 'black', 
            width:'15em', 
            border:'1px solid black'}} >
    <Toast.Body style={{textAlign: 'center'}}>     
    {alert}
    </Toast.Body>
    </Toast>}
    </>
    )
}
