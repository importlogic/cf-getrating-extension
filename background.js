const url = window.location.href;

var id;
var index;

if(url[23] == 'c'){
    var data = url.slice(31, url.length);
    var dataArray = data.split(/[\/\?]/);
    id = dataArray[0];
    index = dataArray[2];
}
else{
    var data = url.slice(42, url.length);
    var dataArray = data.split(/[\/\?]/);
    id = dataArray[0];
    index = dataArray[1];
}

const requestURL = `https://codeforces.com/api/contest.standings?contestId=${id}&from=1&count=1`;

fetchData();

async function fetchData(){
    var rating = null;
    var tags = null;

    try{
        const response = await fetch(requestURL);
        const data = await response.json();
        const problemsList = data.result.problems;

        if(data.status == "OK"){
            for(var i = 0; i < problemsList.length; i++){
                if(problemsList[i].index == index){
                    rating = problemsList[i].rating;
                    tags = problemsList[i].tags;
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
                        <div style="padding: 0.5em;">
                            <div style="margin-bottom: 5px; font-size:0.8em;color: red;">
                                Rating not available for this question.
                            </div>

                    `

    tags.forEach((tag) => {
        toInsert += `
                        <div class="roundbox hidden" style="margin:2px; padding:0 3px 2px 3px; background-color:#f0f0f0;float:left;">
                            <div class="roundbox-lt">&nbsp;</div>
                            <div class="roundbox-rt">&nbsp;</div>
                            <div class="roundbox-lb">&nbsp;</div>
                            <div class="roundbox-rb">&nbsp;</div>
                            <span class="tag-box" style="font-size:1.2rem;" title="Difficulty">
                                ${tag}
                            </span>
                        </div>
                    `
    });

    toInsert += `
                            <div style="clear:both;text-align:right;font-size:1.1rem;">
                            </div>
                        </div>

                        <div style="text-align:center;">
                            <button onclick='
                                                document.querySelectorAll(".hidden").forEach((item) => {
                                                    item.classList.remove("hidden");
                                                });
                                            ' 
                                     style="margin-bottom:3px; width: 50%;">Show All Tags</button>
                        </div>
                        <div style="text-align:center;">
                            <a href="https://codeforces.com/contest/${id}/standings" target="_blank"><button style="margin-bottom:15px; margin-top: 3px; width: 50%;">Contest Standings</button></a>
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
                            <div style="padding: 0.5em;">
                                <div class="roundbox" style="margin:2px; padding:0 3px 2px 3px; background-color:#f0f0f0;float:left;">
                                    <div class="roundbox-lt">&nbsp;</div>
                                    <div class="roundbox-rt">&nbsp;</div>
                                    <div class="roundbox-lb">&nbsp;</div>
                                    <div class="roundbox-rb">&nbsp;</div>
                                    <span class="tag-box" style="font-size:1.2rem;" title="Difficulty">
                                        *${rating}
                                    </span>
                                </div>

                    `

        tags.forEach((tag) => {
            toInsert += `
                            <div class="roundbox hidden" style="margin:2px; padding:0 3px 2px 3px; background-color:#f0f0f0;float:left;">
                                <div class="roundbox-lt">&nbsp;</div>
                                <div class="roundbox-rt">&nbsp;</div>
                                <div class="roundbox-lb">&nbsp;</div>
                                <div class="roundbox-rb">&nbsp;</div>
                                <span class="tag-box" style="font-size:1.2rem;" title="Difficulty">
                                    ${tag}
                                </span>
                            </div>
                        `
        });

        toInsert += `
                                <div style="clear:both;text-align:right;font-size:1.1rem;">
                                </div>
                            </div>

                            <div style="text-align:center;">
                                <button onclick='
                                                    document.querySelectorAll(".hidden").forEach((item) => {
                                                        item.classList.remove("hidden");
                                                    });
                                                ' 
                                         style="margin-bottom:3px; width: 50%;">Show All Tags</button>
                            </div>
                            <div style="text-align:center;">
                                <a href="https://codeforces.com/contest/${id}/standings" target="_blank"><button style="margin-bottom:15px; margin-top: 3px; width: 50%;">Contest Standings</button></a>
                            </div>

                        </div>
                    `
    }

    const getRatingBox = document.createElement("div");
    getRatingBox.innerHTML = toInsert;
    document.querySelector("#sidebar").appendChild(getRatingBox);
}