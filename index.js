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
const generateHTML = require("./generateHTML");

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl)
      .then(function (response) {
        // handle success

        const profilePicture = response.data.avatar_url;
        const userName = response.data.name;
        const location = response.data.location;
        const GitHubProfile = response.data.url;
        const userBlog = response.data.blog;
        const userBio = response.data.bio;
        const numberOfRepos = response.data.public_repos;
        const numberFollowers = response.data.followers;
        const numberGitHubStars = response.data.starred_url;
        const numberFollowing = response.data.following;


        const newResume = {

          profilePicture: response.data.avatar_url,
          userName: response.data.name,
          location: response.data.location,
          GitHubProfile: response.data.blog,
          userBlog: response.data.blog,
          userBio: response.data.bio,
          numberOfRepos: response.data.public_repos,
          numberFollowers: response.data.followers,
          numberGitHubStars: response.data.starred_url,
          numberFollowing: response.data.following
        };
        console.log(newResume)
        console.log(generateHTML.generateHTML())
      });

      

  });

