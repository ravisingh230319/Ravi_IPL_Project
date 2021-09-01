// This function used to count the number of matches played per year for all the years in IPL.
function totalMatchesPlayedPerYear(matches) {
    let results = {};

    results = matches
        .map((match) => match.season)
        .reduce((season, year) => {
            year in season ? season[year] += 1 : season[year] = 1;
            return season;
        }, {});

    return results;
}

//This function used to count the number of matches won per team per year in IPL.
function noOfMatchesWonPerTeamPerYear(matches) {
    let results = {};
    let matchesWonPerTeam = {};

    matches
        .filter((match) => match.winner != "")
        .forEach((match) => {
            if (!results.hasOwnProperty(match.season)) {
                matchesWonPerTeam = {};
            } else {
                if (matchesWonPerTeam.hasOwnProperty(match.winner)) {
                    matchesWonPerTeam[match.winner] += 1;
                } else {
                    matchesWonPerTeam[match.winner] = 1;
                }
            }
            results[match.season] = matchesWonPerTeam;
        });
                  
    return results;
}

//This function used to count the extra runs conceded per team in the year 2016.
function extraRunsConcededPerTeam2016(deliveries, matches) {
    let results = {};

    matches
        .filter(match => match.season == 2016)
        .map(match=>match.id)
        .forEach(matchId=>{
            deliveries
            .forEach((delivery) => {
                if (delivery.match_id == matchId) {
                    if (delivery.bowling_team in results) {
                        results[delivery.bowling_team] += Number(delivery.extra_runs);
                    } else {
                        results[delivery.bowling_team] = Number(delivery.extra_runs);
                    }
                }
            });
        })   
    
    return results;
}

//This function used to get the top 10 economical bowlers in the year 2015.
function top10EconomicalBowlers2015(deliveries, matches) {
    let results = {};
    let economyOfBowler = {};
    let ball = {};

    matches
        .filter((match) => match.season == 2015)
        .map((match) => match.id)
        .forEach((matchId) => {
            deliveries.forEach((delivery) => {
                let wideBall = delivery.wide_runs;
                let noBall = delivery.noball_runs;

                if (delivery.match_id == matchId) {
                    if (delivery.bowler in economyOfBowler) {
                        economyOfBowler[delivery.bowler] += Number(delivery.total_runs);
                    } else {
                        economyOfBowler[delivery.bowler] = Number(delivery.total_runs);
                    }

                    if (!ball.hasOwnProperty(delivery.bowler)) {
                        if (wideBall == 0 && noBall == 0) {
                            ball[delivery.bowler] = 1;
                        } else {
                            ball[delivery.bowler] = 0;
                        }
                    } else {
                        if (wideBall == 0 && noBall == 0) {
                            ball[delivery.bowler] += 1;
                        }
                    }
                }
            });
        });

    let sortedEconomy = ball;

    Object.keys(sortedEconomy)
        .map(key => {
        sortedEconomy[key] = ((economyOfBowler[key] * 6) / sortedEconomy[key]).toFixed(2);
        });
        
    results = Object.fromEntries(Object.entries(sortedEconomy)
        .sort((x, y) => x[1] - y[1])
        .slice(0,10));    
    
    return results;
}

module.exports = {
    totalMatchesPlayedPerYear,
    noOfMatchesWonPerTeamPerYear,
    extraRunsConcededPerTeam2016,
    top10EconomicalBowlers2015,
};
