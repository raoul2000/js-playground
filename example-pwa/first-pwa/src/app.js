'use strict';

(function () {
  'use strict';

  let app = {
    'ui': {
      'refreshButton': document.getElementById('but-refresh-user-list'),
      'userListContainer': document.getElementById('user-list'),
      'statusMessage': document.getElementById('status-message'),
    }
  };

  app.ui.refreshButton.addEventListener('click', (event) => {
    loadPost();
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function () {
        console.log('Service Worker Registered');
      });
  }

  /**
   * render HTML for a single post
   * @param {object} userData data describing a post
   * @return {string} the HTML
   */
  function renderSingleUser(userData) {
    return `<div class="user">
    <span>${userData.name.title} 
      ${userData.name.first} 
      ${userData.name.last}</span>
  </div>`;
  }

  /**
   * renders the list of posts
   * @param {array} postList list of posts
   * @param {HTMLElement} parent the parent element
   */
  function renderUserList(postList, parent) {
    parent.innerHTML = postList.map(renderSingleUser).join(' ');
  }

  /**
   * Loads the list of users
   */
  function loadPost() {
    console.log('loading users...');

    let userListUrl = 'https://randomuser.me/api/?results=5';

    if ('caches' in window) {
      /*
      * Check if the service worker has already cached this city's weather
      * data. If the service worker has the data, then display the cached
      * data while the app fetches the latest data.
      */
      console.log('trying to load userlist rom CACHE ..');
      caches.match(userListUrl).then(function (response) {
        if (response) {
          console.log('userlist available in CACHE : rendering now ...');
          response.json().then(function updateFromCache(json) {
            renderUserList(json.results, app.ui.userListContainer);
          });
        }
      });
    }

    console.log('trying to get userList from NETWORK');
    fetch(userListUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('userList retrieved from NETWORK : rendering ...');
        renderUserList(data.results, app.ui.userListContainer);
      })
      .catch((error) => {
        console.error('failed to get userList from NETWORK');
        app.ui.statusMessage.textContent = `network not available (${error.message}) : data retrieved from cache`;
      });
  }
})();
