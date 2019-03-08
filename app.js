// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container'),
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };
  
  
	const ampRoot = document.querySelector('#amproot');
	const url = "https://tehflatch.github.io/nolo/amp.html" + pid;
	
	(window.AMP = window.AMP || []).push(function(AMP) {
			  // AMP is now available.
			  // Use our fetchDocument method to get the doc
		fetchDocument(url).then(function(doc) {
		  // Let AMP take over and render the page
		  var ampedDoc = AMP.attachShadowDoc(ampRoot, doc, url);
		});
	});
	
	function fetchDocument(url) {

	  // unfortunately fetch() does not support retrieving documents,
	  // so we have to resort to good old XMLHttpRequest.
	  var xhr = new XMLHttpRequest();

	  return new Promise(function(resolve, reject) {
		xhr.open('GET', url, true);
		xhr.responseType = 'document';
		xhr.setRequestHeader('Accept', 'text/html');
		xhr.onload = function() {
		  // .responseXML contains a ready-to-use Document object
		  resolve(xhr.responseXML);
		};
		xhr.send();
	  });
	}
	
  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
