function BookmarkGenerator(XHR, user) {

    var data = { /* XHR JSON response */ },
        bookmarks = { /* URL Bookmarks */ };

    this.createBookmarks = function(event) {
        data = JSON.parse(XHR.responseText);
        data[i].user.name
        data.forEach(function(v, i, a){
            if ()
        });
    };

    this.user = user;
}

var TwitterAPI = {

    user: 'say2joe',

    favorites: 'favorites/list.json',

    api: 'https://api.twitter.com/1.1/',

    getFavorites: function() {
        var req = new XMLHttpRequest(),
            query = '?screen_name=' + this.user,
            marks = new BookmarkGenerator(req, this.user);
        req.open("GET", this.api + this.favorites + query, true);
        req.onload = marks.createBookmarks;
        req.send(null);
    }

};

var BookmarkGeneratorBlah = {

    getFavorites: function() {

    },

    /**
    * Handle the 'onload' event of our kitten XHR request, generated in
    * 'requestKittens', by generating 'img' elements, and stuffing them into
    * the document for display.
    *
    * @param {ProgressEvent} e The XHR ProgressEvent.
    * @private
    */
    showPhotos_: function (e) {
        var kittens = e.target.responseXML.querySelectorAll('photo');
        for (var i = 0; i < kittens.length; i++) {
            var img = document.createElement('img');
            img.src = this.constructKittenURL_(kittens[i]);
            img.setAttribute('alt', kittens[i].getAttribute('title'));
            document.body.appendChild(img);
        }
    },

    /**
    * Given a photo, construct a URL using the method outlined at
    * http://www.flickr.com/services/api/misc.urlKittenl
    *
    * @param {DOMElement} A kitten.
    * @return {string} The kitten's URL.
    * @private
    */
    constructKittenURL_: function (photo) {
        return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
    }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
    kittenGenerator.requestKittens();
});
