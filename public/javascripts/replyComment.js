

// function revealReply() {
//     console.log('Hi it works! :)')
//     // const textbox = document.getElementById('replybody');
//     // if (textbox.style.display === 'none') {
//     //     textbox.style.display === 'block';
//     // }
//     // else {
//     //     textbox.style.display === 'none';
//     // }
// };



const button = document.querySelector('#reply')
button.addEventListener('click', () => {
    const div = document.querySelector('#replybody')
    if(div.style.display === 'none') {
        
        div.style.display = 'block';
        button.innerText = 'Hide'
    }
    else {
        div.style.display ='none'
        button.innerText = 'Reply'  
        
    }
});