# Getting Started with movie_search_engine

### Step 1
Clone `movie_search_engine` this repo and go the project directory
```
https://github.com/muhidhossain/movie_search_engine.git
```
```
cd movie_search_engine
```
### Step 2
Then install all the dependencies
```
npm install
```
### Step 3
Create a `.env` file in the root directory. Copy below code and paste in it then save it.
```
REACT_APP_API_BASE_URL = https://api.themoviedb.org/3/
REACT_APP_API_KEY = <api_key>
```
#### To get an API Key:
1. Create a personal account at: https://www.themoviedb.org/account/signup
2. Once you have created an account, go to:
https://www.themoviedb.org/settings/api to create an API key
- Usage: Personal
- Application Name: Movie_Browser
- Application URL: None
- Application Summary: For learning purpose
### Step 4
Build the project
```
npm run build
```
### Step 5
Install surve
```
npm install -g serve
```
### Finally
Now you can serve the build folder
```
serve -s build
```
# Best parts of the project
### Folder architecture
There are lots of popular folder architecture available. But I like this architecture most. It's well organizied and easy to use.
### Naming convension
I have used a mix style of camel case and snake case. It's easy to think of a new variable name in this style. Otherwise developers waste a lots of time thinking new variable name.
### Using axios
Axios helped me to organize all the API calls at one place. It's easy to manage APIs using axios.
### Using Sass
Sass is a popular CSS extension language. I feel like Sass gives me more flexiability. It could be a biased opinion.
