const APIURL = 'https://api.github.com/users/'

const card = document.getElementById('card')
const form = document.getElementById('form')
const search = document.getElementById('search')



async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createCard(data)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }
}


const createCard = (user) => {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p class='bio'>${user.bio}</p>` : `<p class='no-data bio'>This profile has no bio<p>`
    const userLocation = user.location ? `<a href="https://www.google.com/maps/place/${user.location}" class="link"><i class="fas fa-map-marker-alt link-icon"></i>${user.location}</a>` : `<p class='link'><i class="fas fa-map-marker-alt link-icon"></i>No data to display</p>`
    const userBlog = user.blog ? `<a href="${user.blog}" class="link"><i class="fas fa-blog link-icon"></i>${user.blog.slice(8)}</a>` : `<p class='link'><i class="fas fa-blog link-icon"></i>No data to display</p>`
    const userTwitter = user.twitter_username ? `<a href="https://twitter.com/${user.twitter_username}" class="link"><i class="fab fa-twitter link-icon"></i>${user.twitter_username}</a>` : `<p class='link'><i class="fab fa-twitter link-icon"></i>No data to display</p>`
    const userDate = new Date(user.created_at)
    const userLogin = `<a href="https://github.com/${user.login}" class="link"><i class="fas fa-link link-icon"></i>${user.html_url.slice(8)}</a>`
    

    card.innerHTML = `
    <div class="image-container">
            <img src="${user.avatar_url}" alt='user_avatar' class="avatar"/>
        </div>
        <div class="user-section">

            <div class='user-info'>
                <div>
                    <h2>${userID}</h2>
                    <h4>${user.login}</h4>
                </div>
                <div class='joined'>
                    <p>Joined ${userDate.toISOString().split('T')[0]}</p>
                </div>
            </div>

            ${userBio}
            <div class='user-counts'>
                <div class='item'>
                    <span>Repos</span>
                    <span class='item-value'>${user.public_repos}</span>
                </div>
                <div class='item'>
                    <span>Followers</span>
                    <span class='item-value'>${user.followers}</span>
                </div>
                <div class='item'>
                    <span>Following</span>
                    <span class='item-value'>${user.following}</span>
                </div>
            </div>

            <div class="user-links">
                <div>
                    ${userLocation}
                    ${userLogin}
                </div>
                <div>
                    ${userBlog}
                    ${userTwitter}
                </div>
            </div>
        </div>
    `
}

function createErrorCard(msg) {
    card.innerHTML = `
        <div>
            <h1>${msg}</h1>
        </div>
    `
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    card.style.display = 'flex'

    const user = search.value

    if(user) {
        getUser(user)
        

        search.value = ''
    }
})