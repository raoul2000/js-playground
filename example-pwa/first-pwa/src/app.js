'use strict';

(function () {

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
    return `
<li class="user-item">
    <div class="avatar">
        <img src="${userData.picture.large}" alt="avatar">
    </div>
    <div class="user-info">
        <div class="title"> ${userData.name.title} ${userData.name.first} ${userData.name.last} </div>
        <ul>
            <li class="email">
                <span class="field-name">email</span>
                <span class="field-value">${userData.email} </span>
            </li>
            <li class="age">
                <span class="field-name">age</span>
                <span class="field-value">${userData.dob.age} </span>
            </li>
        </ul>
    </div>
</li>
`;
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
      console.log('trying to load userlist from CACHE ..');
      caches.match(userListUrl).then(function (response) {
        if (response) {
          console.log('userlist available in CACHE : rendering now ...');
          response.json().then( (json) => {
            renderUserList(json.results, app.ui.userListContainer);
          });
        }
      });
    }

    console.log('trying to get Fresh userList from NETWORK');
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
