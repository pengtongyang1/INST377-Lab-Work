async function windowActions() {
    const endpoint = '/api/album';
    
    const categories = []; 

    const request = await fetch(endpoint)
    .then(blob => blob.json())
    .then(data => categories.push(...data))

    

    function findMatches(wordToMatch, categories) {
    return categories.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.album_name.match(regex)
    });
}   
       

    function displayMatches(event) {
    const matchArray = findMatches(event.target.value, categories);
    const html = matchArray.slice(0, 5).map(place => { 
        const regex = new RegExp(event.target.value, 'gi')
        return ` 
            <li>
           
                <span class ="category">${place.album_name}</span>
            </li>  
            `;
        }).join('');
        suggestions.innerHTML = html;
    }

        
    
   
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}

window.onload = windowActions;
