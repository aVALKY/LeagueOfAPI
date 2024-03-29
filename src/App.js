import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import logo from './logo.svg';
import './App.css';


function App() {
const [SearchText, setSearchText] = useState("");
const [playerData, setPlayerData] = useState({});
const API_KEY ="RGAPI-348637b2-be89-4132-89a1-b6bbf0c27132"

function searchForPlayer (event){
  var APIcall = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ SearchText + "?api_key=" + API_KEY;
  
  axios.get(APIcall).then(function (response) {
    // ça fonctionne
    setPlayerData(response.data);
  }).catch(function (error){
    // il y a une erreur
    console.log(error);
    setPlayerData({});
  });
}

  return (
    <div className="App">
      <div className="container">
        <h2>League of Legends Recherche de joueurs</h2>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={(e) => {searchForPlayer(e)}}>Rechercher</button>
      </div>
      {JSON.stringify(playerData) != '{}' ? 
        <> <p>Il y a des données sur le joueur</p> </> 
        : 
        <> <p>Il n'y a pas de données sur le joueur</p> </>
      }
    </div>
  );
}

export default App;
