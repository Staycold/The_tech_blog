const delBtn = async (event) => {
    const commentdel = event.target;  
    console.log(commentdel.dataset.id)
  
    let pageURL = window.location.href;
    let lastURL = pageURL.substr(pageURL.lastIndexOf('/') + 1);
  
  
    if (commentdel) {
    
    const response = await fetch(`/api/comments/${commentdel.dataset.id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        content,
        destination_id: lastURL
      }),  
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
       document.location.replace(`/destinations/${lastURL}`);
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  delBtns = document.querySelectorAll(".delBtn");
  delBtns.forEach(btn=> {
    btn.addEventListener('click', function(event){
      delBtn(event)
    })
  });