import React, { useState } from "react";
import { register, loginWithGithub } from '../api/firebase';
import { uploadImage } from "../api/cloudinary";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email:'', password:'', name:'', photo:''});
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  const handleSubmit = e => {
    e.preventDefault();
    register(userInfo);
    navigate('/signIn');
  }
  const handleGithub = e => {
    loginWithGithub();
    navigate(-1);
  }
  const handleUpload = e => {
      e.target.files && uploadImage(e.target.files[0]).then(url => setUserInfo({...userInfo, ['photo']: url}))
      setFile(e.target.files[0])
  }

  return (
    <div style={{margin: '20px'}}>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />
        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />
        <input type="text" name='name' value={userInfo.name} placeholder="이름"
          onChange={handleChange} /><br />
        <input type="file" accept="image/*" name='file' onChange={handleUpload} /><br />
        <button onClick={handleSubmit}>사용자 등록</button>
      </form><br />
      <span>계정이 있으신가요?</span>
      <Link to='/signIn'>로그인</Link><br /> <br/>
      <button onClick={handleGithub}>깃허브 로그인</button>
      {file && (<img src={URL.createObjectURL(file)} alt='photo' height={200}/>)}
    </div>
  )
}