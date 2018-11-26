My Neighborhood Map Project

##Introduction
- This is a React framework project showing main attractions in Hong Kong on Google Map. 
It is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and with Google Map APIs.
Since this project is focus on frontend technology, so only a json file is used for storing location data and there is no backend technology used.

##Features
- This web app mainly divided into following parts:

###Map Canva:
- during the map initialization, locations data of attractions will be loaded from a "location.json" as a marker on the map.
- markers when clicked, they will have bouncing animation, highlighted and pop up a info window with location details.
- marker's info window contents show location summary and is retrieved with Wikipedia's api get request.
###Side bar Menu:
- side bar menu "filter button" can filter the attraction location according to the keywords inputed to the text field.
It is case in-sensative and includes space.
###Responsive UI:
- the web application is responsive to to browser size, when the device screen size is small, the side bar menu will collapse and hide, with a hamburger button to toggle it.

##How to run the application
- At command terminal, use `npm install` to install project module dependencies, then use `npm start` to start the react node server. The web application can then be accessed through "https://localhost:3000" in browser.
A Google map api key need to be registered and added to the "Map.js" in order for the Google map service to work.

##Appendix
- This project has used APIs from Google Map and Wikipedia.

Hope you like this project! Thank you!

This project is developed by Vincent Ng @2018 Course Project of Udacity Frontend Web Development nanodegree.





