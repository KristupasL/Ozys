let token

window.addEventListener('load', () => {
    if (!localStorage.getItem('website-x-auth-token')) {
        location.replace("http://localhost:8080/login.html");
    } else {
        token = localStorage.getItem('website-x-auth-token');
    }

    getFeedLoad()

});

function getFeedLoad() {
    fetch('http://localhost:3000/api/feedLoad', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth': token
            }
        })
        .then(res => {
            return res.json();
        })
        .then(feed => {
            console.log(feed);
            createPost(feed);
        })
        .catch((err) => {
            console.log(err);
        })
}

document.getElementById('post').addEventListener('click', function() {
    let postTitle = document.getElementById('createTitle').value;
    let image = document.getElementById('imageUrl').value;

    fetch('http://localhost:3000/api/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth': token
            },
            body: JSON.stringify({
                title: postTitle,
                photo: image
            })
        })
        .then(res => {
            getFeedLoad();
        })
        .catch(err => {
            console.log(err);
        })
});



function createPost(feedPosts) {
    let feed = document.getElementById("main-feed")
    feed.innerHTML = ''

    feedPosts.forEach((value, ind) => {
        console.log((value.date));

        let post = document.createElement('div')
        post.classList.add('post', 'list-group-item') //cia klase uzdeta tik del css borderio, kad graziau atrodytu

        let userSection = document.createElement('div')
        userSection.classList.add('userSection')

        let userSectionLogo = document.createElement('img')
        userSectionLogo.classList.add('userSection__logo')
        userSectionLogo.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgv1fJtdWd-9_XAxYs5LeMewuX5USnZZ432pPfdmVGd5_9N6hSQ"); //cia bus userio logo
        userSectionLogo.setAttribute("height", "50");

        let userSectionName = document.createElement('span')
        userSectionName.classList.add('userSection__name')
        userSectionName.textContent = value.creator.userName //cia bus userio name

        let userSectionPostDate = document.createElement('span')
        userSectionPostDate.classList.add('userSection__postDate')
        userSectionPostDate.textContent = value.date; //cia bus userio post date

        userSection.appendChild(userSectionLogo)
        userSection.appendChild(userSectionName)
        userSection.appendChild(userSectionPostDate)

        let photo = document.createElement('img')
        photo.setAttribute("src", value.photo); //cia yra posto nuotrauka
        photo.setAttribute("width", "100%");

        let actionButtons = document.createElement('div') //mygtuku divas
        actionButtons.classList.add('actionButtons')

        let actionButtonsLike = document.createElement('span')
        actionButtonsLike.classList.add('likeHeart')
        actionButtonsLike.innerHTML = '<ion-icon name="heart-empty"></ion-icon>' //like mygtukas

        let actionButtonsComment = document.createElement('span')
        actionButtonsComment.innerHTML = '<ion-icon name="chatbubbles"></ion-icon>' //comment mygtukas

        let actionButtonsShare = document.createElement('span')
        actionButtonsShare.innerHTML = '<ion-icon name="share"></ion-icon>' //share mygtukas

        actionButtons.appendChild(actionButtonsLike)
        actionButtons.appendChild(actionButtonsComment)
        actionButtons.appendChild(actionButtonsShare)

        let likeCount = document.createElement('div')
        likeCount.classList.add('likeCount')
        likeCount.textContent = value.likesCount + ' likes'; //cia laiku skaicius

        let postDescription = document.createElement('div')
        postDescription.classList.add('postDescription')
        let postDescriptionUl = document.createElement('ul')

        let postDescriptionAuthorLi = document.createElement('li')
        let postDescriptionAuthorName = document.createElement('span')
        postDescriptionAuthorName.innerHTML = "Petras ".bold() //cia posto autoriaus userName
        let postDescriptionAuthorComment = document.createElement('span')
        postDescriptionAuthorComment.textContent = "nebūk ožys" //cia posto autoriaus komentaras

        postDescriptionAuthorLi.appendChild(postDescriptionAuthorName)
        postDescriptionAuthorLi.appendChild(postDescriptionAuthorComment)

        let postDescriptionComment = document.createElement('li')
        let postDescriptionCommentUsername = document.createElement('span')
        postDescriptionCommentUsername.innerHTML = "John Cena ".bold() //cia posto autoriaus userName
        let postDescriptionCommentText = document.createElement('span')
        postDescriptionCommentText.textContent = "tu ozys" //cia posto kometarai
        postDescriptionComment.appendChild(postDescriptionCommentUsername)
        postDescriptionComment.appendChild(postDescriptionCommentText)


        let postDescriptionComment2 = document.createElement('li')
        let postDescriptionCommentUsername2 = document.createElement('span')
        postDescriptionCommentUsername2.innerHTML = "Chuck ".bold() //cia posto autoriaus userName
        let postDescriptionCommentText2 = document.createElement('span')
        postDescriptionCommentText2.textContent = "lopas" //cia posto kometarai
        postDescriptionComment2.appendChild(postDescriptionCommentUsername2)
        postDescriptionComment2.appendChild(postDescriptionCommentText2)


        postDescription.appendChild(postDescriptionUl)
        postDescription.appendChild(postDescriptionAuthorLi)
        postDescription.appendChild(postDescriptionComment)
        postDescription.appendChild(postDescriptionComment2)


        let addComment = document.createElement('div')
        addComment.classList.add('createCommentContainer', 'col', 'col-md-8')

        let commentInput = document.createElement('input')
        // commentInput.style.width: = "100%"

        let commentPostButton = document.createElement('button')
        commentPostButton.classList.add('addComment')
        commentPostButton.textContent = "Post"

        addComment.appendChild(commentInput)
        addComment.appendChild(commentPostButton)


        post.appendChild(userSection)
        post.appendChild(photo)
        post.appendChild(actionButtons)
        post.appendChild(likeCount)
        post.appendChild(postDescription)
        post.appendChild(addComment)
        feed.appendChild(post)
    });
};