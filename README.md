# Take Home Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### `Features Implemented

1.1. Write a working program that takes the JSON file as input and normalizes it to generate
a table.

1.3 Built a webpage using using ReactJS to show the
normalized data in a tabular format. 

1.3.1 When application is loaded on launch, using fetch call to fetch the data from
playlist.json and storing it in a two dimensional array called valueArray.

1.3.2 Response received should then be rendered in a tabular view.
### Command used to view in browser `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

1.3.3 Table shows all the items in a batch of 10 rows at a time. Pagination is used in
table view to see all the batches of 10 rows.

1.3.4 Each column of the table is sortable in ascending order. Clicking on the column would toggle the
column in Ascending order.

1.3.5 Click on "Download me" below the table to download all the data shown in a table in CSV format.

1.3.6 Allow user to input song title. Put a button named Get Song and on click on that
button should make a request to backend and fetch a row if there exists on to match the
title user entered.


