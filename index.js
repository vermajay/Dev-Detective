//variables and constants
const root = document.documentElement.style;                        //important
const userImage = document.querySelector("[user-image]");
const userName = document.querySelector("[user-name]");
const joinDate = document.querySelector("[user-joinDate]");
const userTag = document.querySelector("[user-tag]");
const userAbout = document.querySelector("[user-about]");
const repoNum = document.querySelector("[repos-number]");
const followersNum = document.querySelector("[followers-number]");
const followingNum = document.querySelector("[following-number]");
const userLocation = document.querySelector("[location]");
const userWebsite = document.querySelector("[website]");
const userTwitter = document.querySelector("[twitter]");
const userCompany = document.querySelector("[company]");
const searchErr = document.querySelector("[searchError]");
const crossBtn = document.querySelector("[cross]");
const modeText = document.querySelector("[mode-text]");
const modeImage = document.querySelector("[mode-image]");
const modeButton = document.querySelector("[mode-button]");
const searchForm = document.querySelector("[data-searchForm]");
const searchInput = document.querySelector("[data-searchInput]");
const formContainer = document.querySelector(".form-container");
const userContainer = document.querySelector(".userInfo-container");
const wrapper = document.querySelector(".wrapper");
const stats = document.querySelector(".user-stats");


//initial configuration
var darkMode;

function init(){

    darkMode = "false";

    const value = localStorage.getItem("dark-mode");
    if(value == null){
        localStorage.setItem("dark-mode", darkMode);
        lightModeProperties();
    }
    else if(value == "true"){
        darkModeProperties();
    }
    else if(value == "false"){
        lightModeProperties();
    }
    
    fetchUserInfo("vermajay");
}
init();



//event listeners
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    if(searchInput.value == "") return;

    fetchUserInfo(searchInput.value);
})

crossBtn.addEventListener("click", ()=>{
    searchErr.classList.remove("active");
    searchInput.value = "";
})

searchInput.addEventListener("keydown", ()=>{
    searchErr.classList.remove("active");
})

modeButton.addEventListener("click", ()=>{
    if(darkMode == "true") darkModeProperties();
    else lightModeProperties();
});



//functions
function lightModeProperties(){
    modeText.innerText = "DARK";
    modeImage.src = "assets/images/moon-icon.svg";
    wrapper.classList.remove("dark");
    formContainer.classList.remove("dark");
    userContainer.classList.remove("dark");
    stats.classList.remove("dark");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    localStorage.setItem("dark-mode", false);
    darkMode = "true";
}
function darkModeProperties(){
    modeText.innerText = "LIGHT";
    modeImage.src = "assets/images/sun-icon.svg";
    wrapper.classList.add("dark");
    formContainer.classList.add("dark");
    userContainer.classList.add("dark");
    stats.classList.add("dark");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    localStorage.setItem("dark-mode", true);
    darkMode = "false";
}

async function fetchUserInfo(user){
    //make API call
    try{
        const response = await fetch(`https://api.github.com/users/${user}`);
        const data = await response.json();

        if(data?.message == "Not Found"){
            searchErr.classList.add("active");
            return;
        }
        renderUserInfo(data);
    }
    catch(err){

    }
}

function renderUserInfo(data){

    searchErr.classList.remove("active");
    userContainer.style.display = "flex";

    userImage.src = data?.avatar_url;
    userName.innerText = data?.name;
    joinDate.innerText = dateReader(data?.created_at);
    userTag.innerText = `@${data?.login}`;
    userTag.href = `https://github.com/${data?.login}`;
    userAbout.innerText = data?.bio;
    repoNum.innerText = data?.public_repos;
    followersNum.innerText = data?.followers;
    followingNum.innerText = data?.following;
    userLocation.innerText = (data?.location) ? data?.location : "Not Available";
    userWebsite.innerText = (data?.blog) ? data?.blog : "Not Available";
    userWebsite.href = (data?.blog) ? `https://${data?.blog}` : "#";  
    userTwitter.innerText = (data?.twitter_username) ? data?.twitter_username : "Not Available";
    userTwitter.href = (data?.twitter_username) ? `https://twitter.com/${data?.twitter_username}` : "#";
    userCompany.innerText = (data?.company) ? data?.company : "Not Available";
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function dateReader(date){
    let newDate = date.slice(0,10);
    let partsDate = newDate.split('-');
    let month = months[partsDate[1] - 1];
    return `Joined ${partsDate[2]} ${month} ${partsDate[0]}`;
}