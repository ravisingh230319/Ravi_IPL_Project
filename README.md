# IPL Data Project 1
This project is used to transform raw data of IPL to calculate the following stats:-

* Number of matches played per year for all the years in IPL.
* Number of matches won per team per year in IPL.
* Extra runs conceded per team in the year 2016.
* Top 10 economical bowlers in the year 2015.

For the last problem where we have to calculate the top 10 economical bowlers, I have done the assumption that bowlers who played even fewer matches are considered economical if they have a better economy rate than a bowler who played more matches.

	Economy Rate= (Total Runs*6)/No of legal balls

## Running On Your Local Machine
Before running this project make sure Node.js is installed in your system.
Then run the following commands in your terminal:

	git clone https://github.com/ravisingh230319/Ravi_IPL_Project
	cd Ravi_IPL_Project
	npm install
	npm start

You can visit the below file path for output JSON Files:

	.src/
	     .public/
		     .output/
		     
## Note:-
There are 2 more branches other than main branch
* higherOrderFunctions:-To see output see the path location src/public/output
* viewCharts:- highCharts.js is added in file path src/public and index.html is updated. To view the graph run live server where the index.html file is there.


