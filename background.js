const url = window.location.href;

var id;
var index;

if(url[23] == 'c'){
    id = url.slice(31, 35);
    index = url.slice(44, url.length);
}
else{
    id = url.slice(42, 46);
    index = url.slice(47, url.length);
}

const requestURL = `https://codeforces.com/api/contest.standings?contestId=${id}&from=1&count=1`;

fetchData();

async function fetchData(){
    var rating = null;

    try{
        const response = await fetch(requestURL);
        const data = await response.json();
        const problemsList = data.result.problems;

        if(data.status == "OK"){
            for(var i = 0; i < problemsList.length; i++){
                if(problemsList[i].index == index){
                    rating = problemsList[i].rating;
                    break;
                }
            }
        }
        else{
            rating = -1;
        }
    }
    catch(e){
        rating = -1;
    }

    var toInsert;
    if(rating == null){
        toInsert = `
                        <div class="roundbox sidebox" style="">
                            <div class="roundbox-lt">&nbsp;</div>
                            <div class="roundbox-rt">&nbsp;</div>
                            <div class="caption titled">→ CF GetRating
                                <div class="top-links"></div>
                            </div>
                            <div>
                                <div style="margin:1em;font-size:0.8em;color: red;">
                                    Rating not available for this question.
                                </div>
                            </div>
                            <div style="text-align:center;margin-bottom:15px">
                                <a href="https://codeforces.com/contest/${id}/standings" target="_blank"><button>Contest Standings</button></a>
                            </div>
                        </div>
                    `
    }
    else if(rating == -1){
        toInsert = `
                        <div class="roundbox sidebox" style="">
                            <div class="roundbox-lt">&nbsp;</div>
                            <div class="roundbox-rt">&nbsp;</div>
                            <div class="caption titled">→ CF GetRating
                                <div class="top-links"></div>
                            </div>
                            <div>
                                <div style="margin:1em;font-size:0.8em;color: red;">
                                    Codeforces API Error.
                                </div>
                            </div>
                            <div style="text-align:center;margin-bottom:15px">
                                <a href="https://codeforces.com/contest/${id}/standings" target="_blank"><button>Contest Standings</button></a>
                            </div>
                        </div>
                    `
    }
    else{
        toInsert = `
                        <div class="roundbox sidebox" style="">
                            <div class="roundbox-lt">&nbsp;</div>
                            <div class="roundbox-rt">&nbsp;</div>
                            <div class="caption titled">→ CF GetRating
                                <div class="top-links"></div>
                            </div>
                            <div style="padding: 0.5em;margin-bottom: 25px;">
                                <div class="roundbox " style="margin:2px; padding:0 3px 2px 3px; background-color:#f0f0f0;float:left;">
                                    <div class="roundbox-lt">&nbsp;</div>
                                    <div class="roundbox-rt">&nbsp;</div>
                                    <div class="roundbox-lb">&nbsp;</div>
                                    <div class="roundbox-rb">&nbsp;</div>
                                    <span class="tag-box" style="font-size:1.2rem;" title="Difficulty">
                                        *${rating}
                                    </span>
                                </div>
                            </div>
                            <div style="text-align:center;margin-bottom:15px">
                                <a href="https://codeforces.com/contest/${id}/standings" target="_blank"><button>Contest Standings</button></a>
                            </div>
                        </div>
                    `
    }

    document.querySelector("#sidebar").innerHTML += toInsert;
}