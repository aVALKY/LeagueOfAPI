import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import logo from './logo.svg';
import './App.css';


function App() {
const [SearchText, setSearchText] = useState("");
const [playerData, setPlayerData] = useState({});
const [playerRank, setPlayerRank] = useState ({});

const API_KEY ="RGAPI-348637b2-be89-4132-89a1-b6bbf0c27132"

function searchForPlayer (event){
  var APIcall = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ SearchText + "?api_key=" + API_KEY;
  
  axios.get(APIcall).then(function (response) {
    // ça fonctionne*
    setPlayerData(response.data)
    axios.get("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"+ response.data.id + "?api_key=" + API_KEY).then(function (resp){
      setPlayerRank(resp.data[0])
    })
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
        <> <p> Pseudo : {playerData.name}</p>
           <img width="100" height="100" src={"https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/" + playerData.profileIconId +  ".png"}/>
           <p>Niveau : {playerData.summonerLevel}</p>
           <p>Rank : {playerRank.tier}</p>
        </> 
        : 
        <> <p>Il n'y a pas de données sur le joueur</p> </>
      }
    </div>
  );
}

export default App;
