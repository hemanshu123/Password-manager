import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src)
    if (ref.current.src.includes("icons/eyecross.svg")) {
      ref.current.src = "icons/eye.jpg"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eyecross.svg"
    }
  }

  const savePassword = () => {
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
    console.log([...passwordArray, form])
  }

  const deletePassword = (id) => {
    console.log("Deleting password with id", id)
    let c = confirm("Do you really want to delete this password?")
    if(c){
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
  }

  const editPassword = (id) => {
    console.log("Deleting password with id", id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    // console.log([...passwordArray, form])
  }

  const handelChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="mycontainer">
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-500'>&lt;</span>

          <span>pass</span><span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
        <div className="text-black flex flex-col p-4  gap-6 items-center">
          <input value={form.site} onChange={handelChange} placeholder='Enter website URL' className='rounded-full border border-green-700 w-full p-4 py-1' type="text" name='site' />
          <div className="flex w-full justify-between gap-8">
            <input value={form.username} onChange={handelChange} placeholder='Enter Username' className='rounded-full border border-green-700 w-full p-4 py-1' type="text" name='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handelChange} placeholder='Enter Password' className='rounded-full border border-green-700 w-full p-4 py-1' type="password" name='password' />
              <span className='absolute right-0 top-0 cursor-pointer' onClick={showPassword}><img ref={ref} className='p-1' width={35} src="icons/eye.jpg" alt="eye" /></span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='text-center py-2 border border-white'>
                    <div className="flex justify-center items-center">
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "23px", "height": "23px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/wzwygmng.json"
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white justify-center'>
                    <div className="flex justify-center items-center">
                      <span>{item.username}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          style={{ "width": "23px", "height": "23px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/wzwygmng.json"
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white'>
                    <div className="flex justify-center items-center">
                      <span>{item.password}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          style={{ "width": "23px", "height": "23px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/wzwygmng.json"
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white justify-center'>
                    <span className='cursor-pointer mx-2' onClick={() =>{editPassword(item.id)}}>
                      <script src="https://cdn.lordicon.com/lordicon.js"></script>
                      <lord-icon
                        src="https://cdn.lordicon.com/wuvorxbv.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px"}}>
                      </lord-icon></span>
                      <span className='cursor-pointer mx-2' onClick={() =>{deletePassword(item.id)}}>
                      <script src="https://cdn.lordicon.com/lordicon.js"></script>
                      <lord-icon
                       src="https://cdn.lordicon.com/drxwpfop.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px"}}>
                      </lord-icon></span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}



export default Manager
