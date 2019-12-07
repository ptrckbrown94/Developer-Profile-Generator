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
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl)
      .then(function (response) {
        // handle success
        console.log(response);
        const repoName = response.data.map(function (repo) {
          return repo.name;
        })

        const repoNameString = repoName.join("/n")

      });

  });