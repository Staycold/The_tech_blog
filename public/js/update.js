var pageURL = window.location.href;
var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);

const updatePost = async (event) => {
    event.preventDefault();
  const title= document.querySelector('#title').value
  const content= document.querySelector('#content').value
    
    const userID = document.querySelector('#userId').dataset.id;
  
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    
  
    if (content && title) {
      
      const response = await fetch(`/api/post/${lastURLSegment}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
          content
        }),  
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/postview/${lastURLSegment}`);
      } else {
        alert(response.statusText);
      }
    }
  }
  
 if( document.querySelector('.postUpdater')) {
        document.querySelector('.postUpdater')
    .addEventListener('submit', updatePost);
    }
// ====Comment Updater=========
// const commentUpdater = async (event) => {
//     event.preventDefault();
  
//     // make a hidden div wiht the userId
//     const userID = document.querySelector('#userId').dataset.id;
  
//     var pageURL = window.location.href;
//     var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    
  
//     if (content && date) {
      
//       const response = await fetch(`/api/posts/${lastURLSegment}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//           content,
//           date
//         }),  
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace(`/postview/${lastURLSegment}`);
//       } else {
//         alert(response.statusText);
//       }
//     }
//   }
  
//   if(document.querySelector('.commentUpdater')){
//   document.querySelector('.commentUpdater')
//     .addEventListener('submit', commentUpdater);
//   }

  const updateBtn = async (event) => {
    const id = event.target.getAttribute('data-id');
    document.location.replace(`/editpost/${lastURLSegment}`);
  };
  
  if (document.querySelector("#updateBtn")){
  document.querySelector("#updateBtn")
  .addEventListener('click', updateBtn)};
