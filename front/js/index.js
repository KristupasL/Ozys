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
  .catch(err =>{
    console.log(err);
  })
});



function createPost(feedPosts) {
  let feed = document.getElementById("main-feed")
  feed.innerHTML = ''

  feedPosts.forEach((value, ind) => {
    console.log((value.date));

    let post = document.createElement('div')
    let postAuthorSection = document.createElement('div')
    let postAuthorSectionLogo = document.createElement('img')
    let postAuthorSectionName = document.createElement('span')
    let postAuthorSectionPostDate = document.createElement('span')
    let postPhoto = document.createElement('img')
    let postActionButtons = document.createElement('div')   //mygtuku divas
    let postActionButtonsLike = document.createElement('button')
    let postActionButtonsComment = document.createElement('button')
    let postActionButtonsShare = document.createElement('button')
    let postLikeCount = document.createElement('div')
    let postComments = document.createElement('div')
    let postCommentsList = document.createElement('ul')
    let postCommentsListItem = document.createElement('li')
    let postCommentsListItemAuthorName = document.createElement('span')
    let postCommentsListItemAuthorComment = document.createElement('span')
    let postCommentsListItem2 = document.createElement('li')
    let postCommentsListItem2Username2 = document.createElement('span')
    let postCommentsListItem2Username2Text2 = document.createElement('span')
    let postCommentsListItem3 = document.createElement('li')
    let postCommentsListItem3Username3 = document.createElement('span')
    let postCommentsListItem3Username3Text3 = document.createElement('span')
    let postCreateComment = document.createElement('div')
    let postCreateCommentInput = document.createElement('input')
    let postCreateCommentButton = document.createElement('button')

    post.classList.add('post', 'list-group-item')   //cia klase uzdeta tik del css borderio, kad graziau atrodytu
    postAuthorSection.classList.add('post__author-section')
    postAuthorSectionLogo.classList.add('post__author-section__logo')
    postAuthorSectionName.classList.add('post__author-section__name')
    postAuthorSectionPostDate.classList.add('post__author-section__postDate')
    postActionButtons.classList.add('post__action-buttons')
    postActionButtonsLike.classList.add('post__action-buttons__item')
    postActionButtonsLike.classList.add('like')
    postActionButtonsComment.classList.add('post__action-buttons__item')
    postActionButtonsComment.classList.add('comment')
    postActionButtonsShare.classList.add('post__action-buttons__item')
    postActionButtonsShare.classList.add('share')
    postLikeCount.classList.add('post__like-count')
    postComments.classList.add('post__comments')
    postCommentsList.classList.add('post__comments__list')
    postCommentsListItem.classList.add('post__comments__list__item')
    postCreateComment.classList.add('post__create-comment-section', 'col', 'col-md-8')
    postCreateCommentInput.classList.add('post__create-comment-section__input')
    postCreateCommentButton.classList.add('post__create-comment-section__button')

    postAuthorSectionLogo.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgv1fJtdWd-9_XAxYs5LeMewuX5USnZZ432pPfdmVGd5_9N6hSQ"); //posto autoriaus logo
    postAuthorSectionLogo.setAttribute("height", "50");
    postPhoto.setAttribute("src", value.photo);   //posto autoriaus posto nuotrauka
    postPhoto.setAttribute("width", "100%");
    postActionButtonsLike.setAttribute("id", "likeBtn");

    postAuthorSectionName.textContent = value.creator.userName;   //posto autoriaus userName
    postAuthorSectionPostDate.textContent = value.date;   //posto autoriaus post date
    postActionButtonsLike.innerHTML = '<ion-icon name="heart-empty"></ion-icon>'    //like mygtukas
    postActionButtonsComment.innerHTML = '<ion-icon name="chatbubbles"></ion-icon>'    //comment mygtukas
    postActionButtonsShare.innerHTML = '<ion-icon name="share"></ion-icon>'    //share mygtukas
    postLikeCount.textContent = value.likesCount + ' likes';    //laiku skaicius
    postCommentsListItemAuthorName.innerHTML = value.creator.userName.bold()   //posto autoriaus userName
    postCommentsListItemAuthorComment.textContent = " " + value.title  //posto autoriaus komentaras
    postCommentsListItem2Username2.innerHTML = "John Cena ".bold()   //posto komentatoriaus userName1
    postCommentsListItem2Username2Text2.textContent = "tu ozys"    //posto komentatoriaus komentaras1
    postCommentsListItem3Username3.innerHTML = "Chuck ".bold()   //posto komentatoriaus userName2
    postCommentsListItem3Username3Text3.textContent = "lopas"    //posto komentatoriaus komentaras2
    postCreateCommentButton.textContent = "Post"

    feed.appendChild(post)
    post.appendChild(postAuthorSection)
    postAuthorSection.appendChild(postAuthorSectionLogo)
    postAuthorSection.appendChild(postAuthorSectionName)
    postAuthorSection.appendChild(postAuthorSectionPostDate)
    post.appendChild(postPhoto)
    post.appendChild(postActionButtons)
    postActionButtons.appendChild(postActionButtonsLike)
    postActionButtons.appendChild(postActionButtonsComment)
    postActionButtons.appendChild(postActionButtonsShare)
    post.appendChild(postLikeCount)
    post.appendChild(postComments)
    postComments.appendChild(postCommentsList)
    postCommentsList.appendChild(postCommentsListItem)
    postCommentsList.appendChild(postCommentsListItem2)
    postCommentsList.appendChild(postCommentsListItem3)
    postCommentsListItem.appendChild(postCommentsListItemAuthorName)
    postCommentsListItem.appendChild(postCommentsListItemAuthorComment)
    postCommentsListItem2.appendChild(postCommentsListItem2Username2)
    postCommentsListItem2.appendChild(postCommentsListItem2Username2Text2)
    postCommentsListItem3.appendChild(postCommentsListItem3Username3)
    postCommentsListItem3.appendChild(postCommentsListItem3Username3Text3)
    post.appendChild(postCreateComment)
    postCreateComment.appendChild(postCreateCommentInput)
    postCreateComment.appendChild(postCreateCommentButton)

    postActionButtonsLike.addEventListener('click', function() {
      alert('here');
    })

  })
};
