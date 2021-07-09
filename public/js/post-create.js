const postCreater = async (event) => {
    event.preventDefault();
  
    const newPost = document.querySelector('#new-post').value;
    const newTitle = document.querySelector('#new-title').value;
  
    if (newPost) {
      
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
          content:newPost,
          title:newTitle
        }),  
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', postCreater);