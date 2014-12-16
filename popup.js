var TwitterAPI = {

    user: 'say2joe',

    api: 'https://api.twitter.com/1.1/',

    favorites: 'favorites/list.json'

};

var BookmarkGenerator = {

    getFavorites: function() {
        var req = new XMLHttpRequest();
        req.open("GET", this.searchOnFlickr_, true);
        req.onload = this.showPhotos_.bind(this);
        req.send(null);
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
