const commentUpdater = async (event) => {
    event.preventDefault();
  
    // make a hidden div wiht the userId
    const userID = document.querySelector('#userId').dataset.id;
  
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    
  
    if (content && date) {
      
      const response = await fetch(`/api/posts/${lastURLSegment}`, {
        method: 'PUT',
        body: JSON.stringify({
          content,
          date
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
  
  document
    .querySelector('.commentUpdater')
    .addEventListener('submit', commentUpdater);