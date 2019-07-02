/*listen for form submit*/
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault(); //prevent form from submitting 
    //getting form values
    var siteName = document.querySelector('#siteName').value;
    var siteUrl = document.querySelector('#siteUrl').value;
    //Validate the form
    if (!Validation(siteName, siteUrl)) {
        return false;
    }
    //format of object to be stored in the local Storage
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    //Local Storage Test
    /*localStorage.setItem('items', 'Hello World');
    console.log(localStorage.getItem('items'));
    localStorage.removeItem('items');
    console.log(localStorage.getItem('items'));*/

    //test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //init array
        var bookmarks = [];
        //add items to array
        bookmarks.push(bookmark);
        //set items to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //appending items to array
        bookmarks.push(bookmark);
        //reseting items back to Local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();
    //clears or resets form
    document.querySelector('#myForm').reset();
    //clearance();

}

/*function clearance() {
    var siteName = document.querySelector('#siteName');
    var siteUrl = document.querySelector('#siteUrl');
    siteName.value = '';
    siteUrl.value = '';
}*/
//Delete bookmark
function deleteBookmark(url) {
    //Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1)
        }
    }
    //reseting items back to Local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}
//Displays bookmarks in the page
function fetchBookmarks() {
    //get bookmarks from LS
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResults = document.querySelector('#bookmarksResults');
    //Build output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3 class="d-flex justify-content-between">' + name + '<div >' +
            ' <a class="btn btn-secondary " href="' + url + '" target="_blank">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#" >Delete</a> ' + '</div>' +
            '</h3>' +
            '</div>';
    }
}

function Validation(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill all the fields');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteUrl.match(regex)) {
        alert("Please enter a valid URL");
        return false;
    }

    return true;
}