function BookmarkGenerator(user) {

    var Chromemarks = chrome.bookmarks,
        rootFolder = 'Twitter-Marks',
        bookmarks = {};

    this.getBookmarkBar = function() {
        return 0;
    };

    this.createFolder = function(folder, pID, cb) {
        if (!folder) folder = rootFolder;
        if (!pID) pID = getBookmarkBar();
        if (!cb) cb = function(){};
        Chromemarks.create({
            parentId: pID,
            title: folder
        }, cb);
    };

    this.createBookmarks = function(data) {
        function createUserMarks(aBTN) {
            function setBookmarks(aBTN) {
                data[user].forEach(function(mark, i, a){
                    Chromemarks.create({
                        parentId: aBTN.id,
                        title: mark.title,
                        url: mark.url
                    });
                });
            }
            for (var user in data) {
                createFolder(user, aBTN.id, setBookmarks);
            }
        }
        Chromemarks.search(rootFolder,
            function(aBTN) {
                bookmarks = data;
                if (aBTN.length) {
                    Chromemarks.removeTree(aBTN[0], function(){
                        createFolder(null, null, createUserMarks);
                    });
                } else {
                    createFolder(null, null, createUserMarks);
                }
            }
        );
    };

    this.getBookmarks = function() {
        return this.bookmarks;
    };

    this.user = user;
}

var TwitterAPI = {

    user: 'say2joe',

    favorites: {/* title, url */},

    API: {
        domain: 'https://api.twitter.com/1.1/',
        favorites: 'favorites/list.json'
    },

    authenticate: function() {
        // placehoder for now.
    },

    createBookmarks: function() {
        var bookmarks = new BookmarkGenerator(this.user);
        bookmarks.createBookmarks(this.favorites);
    },

    filterFavorites: function() {
        var favorites = TwitterAPI.favorites,
            data = JSON.parse(this.response);

        if (data.errors.length) {
            if (data.errors[0].code === 215) {
                TwitterAPI.authenticate();
            }
        }

        data.forEach(function(tweet, i, a){

            var user = tweet.user.name,
                urls = tweet.entities.urls,
                title = tweet.text.substr(0,70);

            urls.forEach(function(url, i, a){
                var folder = favorites[user],
                    bookmark = {
                        title: title, url: url
                    };
                if (!group) {
                    favorites[folder] = [bookmark];
                } else {
                    group.push(bookmark);
                }
            });

        });

        this.createBookmarks();
        data = null;
    },

    getFavorites: function() {
        var req = new XMLHttpRequest(),
            query = '?screen_name=' + this.user,
            url = this.API.domain + this.API.favorites;
        req.open('GET', url + query, true);
        req.onload = this.filterFavorites;
        req.send();
    }

};

var chromeExOAuthConfig = { // Naming convention is Google's.
    'request_url': 'https://api.twitter.com/oauth/request_token',
    'authorize_url': 'https://api.twitter.com/oauth/authorize',
    'access_url': 'https://api.twitter.com/oauth/access_token',
    'consumer_secret': 'anonymous',
    'consumer_key': 'anonymous',
    'app_name': 'Twitter-Marks'
};

document.addEventListener(
    'DOMContentLoaded', function init() {
        TwitterAPI.getFavorites();
    }
);
