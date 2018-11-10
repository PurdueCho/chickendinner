let red_bar = document.getElementById('team_red');
let blue_bar = document.getElementById('team_blue');
let redTag = document.getElementById('red');
let blueTag = document.getElementById('blue');
let match = document.getElementById('match');
let redLogo = document.getElementById('red_logo');
let blueLogo = document.getElementById('blue_logo');
let kill = document.getElementById('item-info');
let _tower = document.getElementById('tower-info');


let data;
let score;
let index = 0;
let _index = 0;

let getData = function () {
    const attach = document.getElementById('root');

    let httpRequest;
    if (window.XMLHttpRequest) { //Chrome, Safari..
        httpRequest = new XMLHttpRequest();
    }

    httpRequest.onreadystatechange = function () {
        
        if (httpRequest.readyState === 4) {
            /* 서버에 대한 요청 응답 처리 상태 : readyState */
            if (httpRequest.status === 200) {
                data = httpRequest.responseText;
                score = JSON.parse(data).log;
                // console.log(score[index])
                let killT = JSON.parse(data).killLogT;
                let killL = JSON.parse(data).killLog;
                let tower = JSON.parse(data).towerLog;
                //console.log(killT, killL)
                // attach.innerHTML = score;
                
                let red_data; 
                let blue_data;
                let k_index;
                let hell = Math.floor(killT[_index]);
                //console.log(hell)

                // if ( hell === index ) {

                // }

                if (killT[index] != null && killL[index] != null) {
                    let cardTitle = document.createElement('span');
                    cardTitle.classList.add('card-title');
                    cardTitle.innerHTML = "Time: " + Math.floor(killT[index]) + " mins";
                    let cardDesc = document.createElement('p');
                    let killIcone = document.createElement('img');
                    killIcone.setAttribute("src", "./assets/img/kill.png");
                    killIcone.setAttribute("alt", "Kill");
                    killIcone.setAttribute("style", "width: 20px");
                    cardDesc.innerHTML = killL[index][0] + " -> " + killL[index][1];
                    kill.appendChild(cardTitle);
                    kill.appendChild(killIcone);
                    kill.appendChild(cardDesc);
                }

                if (tower[index] != null) {
                    let name;
                    let lane;
                    let type;
                    let icons = document.createElement('img');
                    if (tower[index][0] == "rTowers" || tower[index][0] == "rInhibs") {
                        icons.setAttribute("src", "./assets/img/blueT.png");
                        icons.setAttribute("alt", "Blue team");
                        icons.setAttribute("style", "width: 20px");
                        name = "Lost Blue "
                    } else if (tower[index][0] == "bTowers" || tower[index][0] == "bInhibs") {
                        icons.setAttribute("src", "./assets/img/redT.png");
                        icons.setAttribute("alt", "Red Team");
                        icons.setAttribute("style", "width: 20px");
                        name = "Lost Red "
                    }
                    if (tower[index][2] == "TOP_LANE") {
                        lane = "Top "
                    } else if (tower[index][2] == "MID_LANE") {
                        lane = "Mid "
                    } else if (tower[index][2] == "BOT_LANE") {
                        lane = "Bot "
                    }
                    if (tower[index][3] == "OUTER_TURRET") {
                        type = "Outer "
                    } else if (tower[index][3] == "INNER_TURRET") {
                        type = "INNER "
                    } else if (tower[index][3] == "NEXUS_TURRET") {
                        type = "NEXUS "
                    } else if (tower[index][3] == "BASE_TURRET") {
                        type = "BASE "
                    } else if (tower[index][3] == "INHIBITOR") {
                        type = "INHIBITOR "
                    }

                    let cardTitle = document.createElement('span');
                    cardTitle.classList.add('card-title');
                    cardTitle.innerHTML = "Time: " + Math.floor(tower[index][1]) + " mins";
                    let cardDesc = document.createElement('p');
                    
                    cardDesc.innerHTML = name + lane + type + "Tower";
                    _tower.appendChild(cardTitle);
                    _tower.appendChild(icons);
                    _tower.appendChild(cardDesc);
                }
                
                if ( index === score.length ) {
                    red_data = Math.floor(score[score.length - 1]*100);
                    blue_data = 100 - red_data;
                } else {
                    red_data = Math.floor(score[index++] * 100);
                    blue_data = 100 - red_data;
                }

                red_bar.setAttribute("style", "width: "+red_data+"%");
                blue_bar.setAttribute("style", "width: " + blue_data + "%");
                red_bar.setAttribute("aria-valuenow", red_data);
                blue_bar.setAttribute("aria-valuenow", blue_data);
                red_bar.innerHTML = red_data+"%";
                blue_bar.innerHTML = blue_data+"%";
                redTag.innerHTML = JSON.parse(data).redTeamTag;
                blueTag.innerHTML = JSON.parse(data).blueTeamTag;
                match.innerHTML = JSON.parse(data).match;
                redLogo.setAttribute("src", "./assets/img/"+JSON.parse(data).redTeamTag+".png");
                blueLogo.setAttribute("src", "./assets/img/" + JSON.parse(data).blueTeamTag + ".png");
            }
        }
    }
//  console.log(score);
    httpRequest.open('GET', '/dataGet', true);
    httpRequest.send();
}

function showData(data) {
    let cardTitle = document.createElement('span');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = data.name;
    let cardDesc = document.createElement('p');
    cardDesc.innerHTML = data.description;
    itemContainer.appendChild(cardTitle);
    itemContainer.appendChild(cardDesc);
}
