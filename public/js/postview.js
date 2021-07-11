const delBtn = async (event) => {
    const postDel = event.target;  
    console.log(postDel.dataset.id)
  
   
  
    if (postDel) {
    
    const response = await fetch(`/api/post/${postDel.dataset.id}`, {
      method: 'DELETE',
      
      
    });
  
    if (response.ok) {
       document.location.replace(`/`);
      } else {
        alert('Failed to delete comment');
      }
    }
  };
   if(document.querySelector("#delBtn")) {
    document.querySelector("#delBtn")
    .addEventListener('click', function(event){
        delBtn(event)
   
    });
   }



  const newComm = async (event) => {
    event.preventDefault();
  
    const newComment = document.querySelector('#new-comment').value;
  
    
    let pageURL = window.location.href;
    let lastURL = pageURL.substr(pageURL.lastIndexOf('/') + 1);


    if (newComment) {
      
      const response = await fetch(`/api/comment/${lastURL}`, {
        method: 'POST',
        body: JSON.stringify({
          content:newComment
        }),  
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/postview/${lastURL}`);
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newComm);