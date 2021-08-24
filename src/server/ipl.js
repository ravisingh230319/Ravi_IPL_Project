// This function used to count the number of matches played per year for all the years in IPL.
function totalMatchesPlayedPerYear(matches) {
    let results = {};

    for (let index = 0; index < matches.length; index += 1) {
        if (!results.hasOwnProperty(matches[index].season)) {
            results[matches[index].season] = 1;
        } 
        else {
            results[matches[index].season] += 1;
        }
    }
    return results;
}

//This function used to count the number of matches won per team per year in IPL.
function noOfMatchesWonPerTeamPerYear(matches) {
    let results = {};
    let matchesWonPerTeam = {};

    for (let index = 0; index < matches.length; index += 1) {
        if (!results.hasOwnProperty(matches[index].season)) {
            matchesWonPerTeam = {};
        } 
        else {
            if (!matchesWonPerTeam.hasOwnProperty(matches[index].winner)) {
            matchesWonPerTeam[matches[index].winner] = 1; 
            } 
            else {
            matchesWonPerTeam[matches[index].winner] += 1;
            }    
        }
        results[matches[index].season] = matchesWonPerTeam;
    }
    return results;
}

//This function used to count the extra runs conceded per team in the year 2016.
function extraRunsConcededPerTeam2016(deliveries, matches) {
    let results = {};
    let yearId = 0;

    for (let outerIndex = 0; outerIndex < matches.length; outerIndex += 1) {
        if (matches[outerIndex].season == 2016) {
            yearId = matches[outerIndex].id;
        }
        else {
            yearId = 0;
        }

        for (let innerIndex = 0; innerIndex < deliveries.length; innerIndex += 1) {
            if (deliveries[innerIndex].match_id == yearId) {
                if (!results.hasOwnProperty(deliveries[innerIndex].bowling_team)) {
                    results[deliveries[innerIndex].bowling_team] = Number(deliveries[innerIndex].extra_runs);
                } 
                else {
                    results[deliveries[innerIndex].bowling_team] += Number(deliveries[innerIndex].extra_runs);
                }
            }
        }
    }
    return results;
}

//This function used to get the top 10 economical bowlers in the year 2015.
function top10EconomicalBowlers2015(deliveries, matches) {
    let yearId = 0;
    let counter = 0;
    let results = {};
    let economyOfBowler = {};
    let ball={};
     
    for (let outerIndex = 0; outerIndex < matches.length; outerIndex += 1) {
        if (matches[outerIndex].season == 2015) {
            yearId = matches[outerIndex].id;
        }
        else {
            yearId = 0;
        }
        
        for (let innerIndex = 0; innerIndex < deliveries.length; innerIndex += 1) {
            let wideBall = deliveries[innerIndex].wide_runs;
            let noBall = deliveries[innerIndex].noball_runs;

            if (deliveries[innerIndex].match_id == yearId) {
                if (!economyOfBowler.hasOwnProperty(deliveries[innerIndex].bowler)) {
                    economyOfBowler[deliveries[innerIndex].bowler] = Number(deliveries[innerIndex].total_runs);
                } 
                else {
                    economyOfBowler[deliveries[innerIndex].bowler] += Number(deliveries[innerIndex].total_runs);

                }

                if(!ball.hasOwnProperty(deliveries[innerIndex].bowler)){
                    if(wideBall == 0 && noBall == 0){
                        ball[deliveries[innerIndex].bowler] = 1;
                    }
                    else {
                        ball[deliveries[innerIndex].bowler] = 0;
                    }
                }
                else
                {
                    if(wideBall == 0 && noBall == 0){
                        ball[deliveries[innerIndex].bowler] += 1;
                        }
                }
            }
        }
    }

    let sortedEconomy = ball;

    for(let key in sortedEconomy, economyOfBowler)
    {
        sortedEconomy[key] = (economyOfBowler[key] * 6)/ sortedEconomy[key];
    }
    
    // In sorting the below line puts all the NaN values in order after sorting
    sortedEconomy = Object.fromEntries(Object.entries(sortedEconomy).sort((x, y)=>x[1]-y[1]));
    
    for (let bowlerName in sortedEconomy) {
        if (counter > 10) {
            break;
        } 
        else {
            if(!results.hasOwnProperty(bowlerName))
            {
                results[bowlerName] = Number(sortedEconomy[bowlerName].toFixed(2));
                counter += 1;
            }
        }
    }
    return results;
}

module.exports = { totalMatchesPlayedPerYear,
                   noOfMatchesWonPerTeamPerYear,
                   extraRunsConcededPerTeam2016,
                   top10EconomicalBowlers2015
};

