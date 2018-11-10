let red_bar = document.getElementById('team_red');
let blue_bar = document.getElementById('team_blue');

let data;
let score;
let index = 0;

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
                console.log(score[index])
                // attach.innerHTML = score;

                let red_data; 
                let blue_data; 
                if ( index === score.length ) {
                    red_data = score[score.length - 1]
                    blue_data = 100 - red_data;
                } else {
                    red_data = score[index++]
                    blue_data = 100 - red_data;
                }

                red_bar.setAttribute("style", "width: "+red_data+"%");
                blue_bar.setAttribute("style", "width: " + blue_data + "%");
                red_bar.setAttribute("aria-valuenow", red_data);
                blue_bar.setAttribute("aria-valuenow", blue_data);
                red_bar.innerHTML = red_data+"%";
                blue_bar.innerHTML = blue_data+"%";
            }
        }
    }
//  console.log(score);
    httpRequest.open('GET', '/dataGet', true);
    httpRequest.send();
}
