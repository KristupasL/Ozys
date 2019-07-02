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

    let postTitle = document.createElement('div')
    let postTitleAuthorName = document.createElement('span')
    let postTitleAuthorComment = document.createElement('span')

    let postComments = document.createElement('div')
    let postCommentsList = document.createElement('ul')

    let postCreateComment = document.createElement('div')
    let postCreateCommentInput = document.createElement('input')
    let postCreateCommentButton = document.createElement('button')

    //class add section
    post.classList.add('post', 'list-group-item')   //cia klase uzdeta tik del css borderio, kad graziau atrodytu
    postAuthorSection.classList.add('post__author-section')
    postAuthorSectionLogo.classList.add('post__author-section__logo')
    postAuthorSectionName.classList.add('post__author-section__name')
    postAuthorSectionPostDate.classList.add('post__author-section__postDate')
    postActionButtons.classList.add('post__action-buttons')
    postActionButtonsLike.classList.add('post__action-buttons__item', 'like')
    postActionButtonsComment.classList.add('post__action-buttons__item', 'comment')
    postActionButtonsShare.classList.add('post__action-buttons__item', 'share')
    postLikeCount.classList.add('post__like-count')

    postTitle.classList.add('post__title')
    postTitleAuthorName.classList.add('post__title__author')
    postTitleAuthorComment.classList.add('post__title__comment')

    postComments.classList.add('post__comments')
    postCommentsList.classList.add('post__comments__list')


    postCreateComment.classList.add('post__create-comment-section', 'col', 'col-md-8')
    postCreateCommentInput.classList.add('post__create-comment-section__input')
    postCreateCommentButton.classList.add('post__create-comment-section__button')

    // atribute section
    postAuthorSectionLogo.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgv1fJtdWd-9_XAxYs5LeMewuX5USnZZ432pPfdmVGd5_9N6hSQ"); //posto autoriaus logo
    postAuthorSectionLogo.setAttribute("height", "50");
    postPhoto.setAttribute("src", value.photo);   //posto autoriaus posto nuotrauka
    postPhoto.setAttribute("width", "100%");

    // text content section
    postAuthorSectionName.textContent = value.creator.userName;   //posto autoriaus userName
    postAuthorSectionPostDate.textContent = value.date;   //posto autoriaus post date
    postActionButtonsLike.innerHTML = '<ion-icon name="heart-empty"></ion-icon>'    //like mygtukas
    postActionButtonsComment.innerHTML = '<ion-icon name="chatbubbles"></ion-icon>'    //comment mygtukas
    postActionButtonsShare.innerHTML = '<ion-icon name="share"></ion-icon>'    //share mygtukas
    postLikeCount.textContent = value.likesCount + ' likes';    //laiku skaicius

    postTitleAuthorName.innerHTML = value.creator.userName.bold()   //posto autoriaus userName
    postTitleAuthorComment.textContent = " " + value.title  //posto autoriaus komentaras

    postCreateCommentButton.textContent = "Post"


    //append section
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

    post.appendChild(postTitle)
    postTitle.appendChild(postTitleAuthorName)
    postTitle.appendChild(postTitleAuthorComment)



    console.log(value.commentsOnPost);
    value.commentsOnPost.forEach((val, idx) => {
      let postCommentsListItem = document.createElement('li')
      let postCommentsListItemUsername = document.createElement('span')
      let postCommentsListItemUsernameText = document.createElement('span')

      postCommentsListItem.classList.add('post__comments__list__item')

      postCommentsListItemUsername.innerHTML = val.creator.userName.bold()   //posto komentatoriaus userName1
      postCommentsListItemUsernameText.textContent = " " + val.comment    //posto komentatoriaus komentaras1


      postCommentsListItem.appendChild(postCommentsListItemUsername)
      postCommentsListItem.appendChild(postCommentsListItemUsernameText)
      postCommentsList.appendChild(postCommentsListItem)
    })

    postComments.appendChild(postCommentsList)
    post.appendChild(postComments)


    post.appendChild(postCreateComment)
    postCreateComment.appendChild(postCreateCommentInput)
    postCreateComment.appendChild(postCreateCommentButton)

    postActionButtonsLike.addEventListener('click', function() {
      fetch(`http://localhost:3000/api/like/${value._id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        }
      })
      .then(res => {
        getFeedLoad();
      })
      .catch(err =>{
        console.log(err);
      })
    });

    postCreateCommentButton.addEventListener('click', function() {

      fetch('http://localhost:3000/api/comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth': token
        },
        body: JSON.stringify({
          comment: postCreateCommentInput.value,
          post: value._id
        })
      })
      .then(res => {
        getFeedLoad();
      })
      .catch(err =>{
        console.log(err);
      })

    });


  });
};
