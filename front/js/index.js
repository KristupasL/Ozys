window.addEventListener('load', () => {
  createPost()

});


function createPost() {
  let feed = document.getElementById("main-feed")
  feed.innerHTML = ''
  let post = document.createElement('div')
  post.classList.add('list-group-item')   //cia klase uzdeta tik del css borderio, kad graziau atrodytu

  let userSection = document.createElement('div')
  userSection.classList.add('userSection')

  let userSectionLogo = document.createElement('img') //cia bus userio logo
  userSectionLogo.classList.add('userSection__logo')
  userSectionLogo.setAttribute("src", "");

  let userSectionName = document.createElement('p') //cia bus userio name
  userSectionName.classList.add('userSection__name')
  userSectionName.textContent = 'username from backend'

  let userSectionPostDate = document.createElement('span') //cia bus userio post date
  userSectionPostDate.classList.add('userSection__postDate')
  userSectionPostDate.textContent = 'post date'


  let photo = document.createElement('img')
  photo.setAttribute("src", "https://www.suru.lt/srwrd/wp-content/uploads/2013/02/ozys.jpg");
  let comments = document.createElement('div')
  comments.textContent = 'komentaras'

  userSection.appendChild(userSectionLogo)
  userSection.appendChild(userSectionName)
  userSection.appendChild(userSectionPostDate)
  post.appendChild(userSection)

  post.appendChild(photo)
  post.appendChild(comments)
  feed.appendChild(post)

}
