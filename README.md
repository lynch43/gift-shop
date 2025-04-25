# eCommerce App - Angular and Ionic

This project is a  eCommerce application developed using Angular and Ionic.
 The app provides a simple, clean user interface
 for browsing products and viewing item details. You can add items to a cart 
 and then view your cart. I also added a Geolocation feature that will determine wether the products should be displayed in
 different countries


## Project Overview

The purpose of this application is to serve as the foundation of an 
eCommerce platform. It demonstrates key features typically found in shopping 
applications such as a home page showcasing products and a dedicated item details page.

This project is built using Visual Studio Code and tested on Windows 10.
It was also built for purpose for an end of year project in Front End Web Development module year 2

Some of the rquirements for said project were

- 

## Features

- A home page that displays a list of available products
- A detailed item page that is accessed when a product is clicked
- Built using Angular for structure and logic, and Ionic for UI components
- Used standalone components in the project
- SCSS for styling. mainly for organisation. Most of this project could have been just done in CSS 

## Technologies Used

- Angular 17+
- Ionic Framework 7
- TypeScript
- SCSS
- Visual Studio Code
- Node.js and npm for package management

## Folder Structure

The core structure of the application is as follows:

INSERT FOLDER STRUCTURE DIAGRAM HERE

## Wireframes 

I just did one for each page. All on mobile.

- link in Readme.md


## API




## Issues Persisting

### Cart Icon
Cart icon does not update when adding bag on item-detail page. I tried a few solutions. that cart is working but its like there is a timing issue

I have put await and async on the addItem Function to no avail.
Also triied a setTimeout

The likely fix would be to call the cart and read it after storage loads. 

### Bounding box to set currency

The inEuroZone if statement does tell you if you are in Ireland or England. Roughly. I used https://boundingbox.klokantech.com/ to Draw around Ireland. You could use it better than I did but really I am just showing that the geolocation is accurate. 

See images in word Doc 3 of them

###

ERROR Error: No available storage method found.
    _driverSet localforage.js:2504

Angular Storage uses localforage as a storage method

I tried installing like 'npm install localforge' to no avail.



