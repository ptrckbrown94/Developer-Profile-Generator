/*
color background
 Profile image
 User name
 Links to the following:
   User location via Google Maps
   User GitHub profile
   User blog
 User bio
 Number of public repositories
 Number of followers
 Number of GitHub stars
 Number of users following
*/

/*
save Github username as an object
    key of user name and value of github username
    object with above categories
*/

// I took this code from our inclass activity and Brian helped me write this
//const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML.js");
const fs = require('fs'),
    convertFactory = require('electron-html-to');
 
const conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});


inquirer
  .prompt([{
    message: "Enter your GitHub username",
    name: "username"
    
  },
  {
    message: "Pick a color",
    name: "color_desired"
  
  }])
  .then(function ({username, color_desired}) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl)
      .then(function (response) {
        // handle success
        console.log(response.data)
        const profilePicture = response.data.avatar_url;
        const userName = response.data.name;
        const location = response.data.location;
        const career = response.data.company;
        const gitHubProfile = response.data.url;
        const userBlog = response.data.blog;
        const userBio = response.data.bio;
        const numberOfRepos = response.data.public_repos;
        const numberFollowers = response.data.followers;
        const numberGitHubStars = response.data.starred_url;
        const numberFollowing = response.data.following;

        const color = color_desired; 
        const stars = 12500
        // call a function to calculate  var stars = calculatestars(github)
        const newResume = {

          profilePicture: response.data.avatar_url,
          company: response.data.company,
          userName: response.data.name,
          location: response.data.location,
          gitHubProfile: response.data.blog,
          userBlog: response.data.blog,
          career: response.data.career,
          userBio: response.data.bio,
          numberOfRepos: response.data.public_repos,
          numberFollowers: response.data.followers,
          numberGitHubStars: response.data.starred_url,
          numberFollowing: response.data.following
        };

        // stars api call for repos summary of all stars
        // will use 4 loop, should be in an array
        console.log(newResume)
        console.log("color" + color_desired) 
         console.log(generateHTML({stars,color, ...newResume}))
        const resume = generateHTML({stars, color, ...newResume})
      
        console.log(resume)
        // write to file resume.html
        // convert from html to PDF
        conversion({ html: resume }, function(err, result) {
          if (err) {
            return console.error(err);
          }
         
          console.log(result.numberOfPages);
          console.log(result.logs);
          result.stream.pipe(fs.createWriteStream('./resume.pdf'));
          conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        });

      });

      

  });

  
/**
 * https://github.com/bjrmatos/electron-html-to/issues/459
 * 
 * There is a compatability issue witht the newest versions.
 * 
 * Make sure to use:
 * "electron": "^5.0.12",
 * "electron-html-to": "^2.6.0".
 * 
 */

 
