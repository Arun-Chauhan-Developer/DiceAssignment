# Dice Assignment
- In this app, you can search on the basis of query which was provided by the git hub api.
- When we run the app, we have seen a search box, a search button, and a dropdown which contains some fields for sorting the data
- Initially search button and dropdown is disabled because we don't put any input in the search box.
- After putting some input, search button and dropdown is enabled.
- Click on search button which call the api https://api.github.com/search/repositories?q=tetris
- 'tetris' is represent the search box input in this api.
- After getting the response from the api, data is rendered in the format of card which contains avatar image, repo name, stars, language, and description of repo.
- After getting the data from the api, you can sort the data as per the given options.