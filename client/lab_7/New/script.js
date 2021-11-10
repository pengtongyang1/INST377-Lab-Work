async function windowActions() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    
    const categories = []; 

    const request = await fetch(endpoint)
    .then(blob => blob.json())
    .then(data => categories.push(...data))

    

    function findMatches(wordToMatch, categories) {
    return categories.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.category.match(regex) || place.name.match(regex) || place.city.match(regex) || place.zip.match(regex)
    });
}   
       

    function displayMatches(event) {
    const matchArray = findMatches(event.target.value, categories);
    const html = matchArray.slice(0, 5).map(place => { 
        const regex = new RegExp(event.target.value, 'gi')
        return ` 
            <li>
                <span class ="name">${place.name}</span>
            </li>  
                <span class ="category">${place.category}</span>
                <br><i><span class ="address_line_1">${place.address_line_1}</span></i>
                <br><i><span class ="city">${place.city}</span></i>
                <br><i><span class ="zip">${place.zip}</span></i>
                <br>
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
