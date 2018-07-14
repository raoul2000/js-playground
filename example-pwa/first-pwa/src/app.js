'use strict';

/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function() {
      console.log('Service Worker Registered');
    });
}
*/

/**
 * render HTML for a single post
 * @param {object} postData data describing a post
 * @return {string} the HTML
 */
function renderPost(postData) {
  return `<div class="post">
    <h2>${postData.title}</h2>
  </div>`;
}

/**
 * renders the list of posts
 * @param {array} postList list of posts
 * @param {HTMLElement} parent the parent element
 */
function renderPostList(postList, parent) {
  parent.innerHtml = postList.map( (postData) => renderPost).join(' ');
}

/**
 * Loads the list of posts
 */
function loadPost() {
  console.log('loading posts...');
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then( (data) => {
    console.log(data);
    renderPostList(data, document.getElementById('post-list'));
  });
}
console.log('starting');
loadPost();
