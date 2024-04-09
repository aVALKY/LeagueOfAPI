import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import './App.css';
import logo from './Assets/logoLeague.png'
import CHALLENGER from './Assets/rank/Challenger.png'


function App() {
const [SearchText, setSearchText] = useState("");
const [playerData, setPlayerData] = useState({});
const [playerRank, setPlayerRank] = useState ({});



const API_KEY ="RGAPI-c525f514-f929-4f77-8d29-5855a8c7ee3b"

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
        <div id="LogoAndTitle">
          <img src={logo}></img>
          <h2 id="titleSearchPlayer">Recherche de joueurs</h2>
        </div>
        <div id="ShearchData">
          <input id="shearchNamePlayer" placeholder='Summoner' type="text" onChange={e => setSearchText(e.target.value)}></input>
          <button id="shearchButoon" onClick={(e) => {searchForPlayer(e)}}>Rechercher</button>
        </div>
      </div>
      <div id="containerInfoPlayer">
        {JSON.stringify(playerData) != '{}' ? 
        
          <>
            <div id="containerPlayerDataOne">
              <div id="containerDataOne">
                <img id="logoPlayer" width="100" height="100" src={"https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/" + playerData.profileIconId +  ".png"}/>
                <div>
                    <p className='dataColor'>{playerData.name}</p>
                    <div className='containerDataLvlRank'>
                      <p className='dataColor'> Niveau : {playerData.summonerLevel} - </p>
                      <p className='dataColor'>{playerRank && playerRank.tier}</p>
                    </div>
                </div>
              </div>
              
              <p className='dataColor'>{playerRank ? <><img id="logoRank" src={"./rank/"+playerRank.tier + ".png"}></img></>:'Unranked'}</p>

            </div>

            <div id="containerPlayerDataTwo">
              
                <div>
                  <p id='winColor'>   WINS   : {playerRank && playerRank.wins}   </p>
                  <p id='looseColor'> LOSSES : {playerRank && playerRank.losses} </p>
                </div>
                <div>
                  <p id="winPourcentage">{playerRank && ((playerRank.wins / (playerRank.wins + playerRank.losses)) * 100).toFixed(1)}% WIN RATE</p>
                </div>

            </div>
          </> 
          : 
          <> <p id="textNoPlayerData">Il n'y a pas de données sur le joueur</p> </>
        }
      </div>
    </div>
  );
}
export default App;
