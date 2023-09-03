
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { UidContext } from './components/AppContext';
import Profil from './pages/Profil';
import axios from 'axios';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import Home from './pages/Home';
import Trending from './pages/Trending';


function App() {
  const {uid, setUid} = useState(null)
  const dispatch = useDispatch

  useEffect(() => {
    const fetchToken =async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true
    })
    .then((res) => {
      console.log(res);
      setUid(res.data)
    })
    .catch((err) => console.log("Pas de tokens"))
    }
    fetchToken()

    if (uid) dispatch(getUser(uid))
  }, [uid])


  return (
    <div className="App">
      <UidContext.Provider value ={uid}>
      Test
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/profil" element={<Profil/>}/>
        <Route exact path="/trending" element={<Trending/>}/>
      </Routes>
      </UidContext.Provider>
      
    </div>
  );
}

export default App;
