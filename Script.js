//async function shortURL() {
    //
//}
// script.js
//document.getElementById('urlForm').addEventListener('submit', function(e) {
    //e.preventDefault();
   // const urlInput = document.getElementById('urlInput').value;
    //if (isValidUrl(urlInput)) {
        //const shortUrl = generateShortUrl(urlInput);
       // document.getElementById('shortUrl').textContent = `Shortened URL: ${shortUrl}`;
   // } else {
       // alert('Please enter a valid URL');
    //}
//});

// script.js
// script.js
document.getElementById('urlForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const urlInput = document.getElementById('urlInput').value;

    const response = await fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: urlInput })
    });

    const data = await response.json();
    document.getElementById('shortUrl').textContent = `Shortened URL: ${data.shortUrl}`;
    document.getElementById('shortUrl').href = data.shortUrl;
});


function isValidUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
}

function generateShortUrl(url) {
    // Replace this with your logic for generating short URLs.
    return `short.ly/${btoa(url).substr(0, 8)}`;
}
