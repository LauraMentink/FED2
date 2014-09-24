// wanneer constructor en wanneer literal? als je meerdere objecten hebt is een een construct object efficienter. 


//Te veel vertrouwen op globale variabelen kan leiden tot botsingen tussen verschillende scripts op dezelfde pagina
//NameSpace, zo zit niet alles in de global scope
// in de globale scope maak je een functie en alles wat in die functie staat kan van buitenaf niet aangeraakt worden.
// als de functie al bestaat roep je hem en anders vul je hem
var app = app || {};


// Self Invoking Anonymous Function
(function (){

	//closure: prive variabele. De inner functie kan nog steeds bij de buitenste functie, maar andersom niet.
	app.controller = {
		init: function () {
		console.log('hoi');
		//methodes
		app.router.init();
		app.sections.init();
		// more init tasks... }
		}
	}

// init groepeert al je functies in 1x, dus je hoeft ze niet apart aan te spreken. object app.router
	app.router = {
		init: function() {
			routie({
				'about': function(){
					//met de console test je of de functie werkt.
					console.log("hoi about");
					// hij kijkt of het #about is en dan doet de css display: block (de functie wordt aangeroepen)
					app.sections.toggle("#about");
					// app is de namespace, sections een object en toggle een methode.
				},
				'movies': function(){
					console.log("hoi movies");
					// hij kijkt of het #movies is en dan doet de css display: block (de functie wordt aangeroepen)
					app.sections.toggle("#movies");
				}
			});
		}
	}


	//geen var, omdat app al een variabele is.
	//app.content is het object
	app.content = {
		//about is een property, properties zijn alle variabelen en functies binnen een object
		about: {
			// alles tussen "" is een string
			title: "About this app",
			description: [
			{
				p: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all."
			},
			{
				p: "I did the same thing to gandhi, he didn't eat for three weeks. bruce... i'm god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i'm god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn't eat for three weeks."
			},
			{
				p: "Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy."
			},
			{
				p: "That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn't eat for three weeks. the man likes to play chess; let's get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. i don't think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world."
			}
			]
		},


// alle content in een array. 		
		movies: {
			title: "Favorite movies",
			moviesContent: 
				[
					{	
						title: "Shawshank Redemption",
						titleReleaseDate: "Release Date: ",
						releaseDate: "14 October 1994",
						description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
						cover: "images/shawshank-redemption.jpg"
					},

					{
						title: "The Godfather",
						titleReleaseDate: "Release Date: ",
						releaseDate: "24 March 1972",
						description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
						cover: "images/the-godfather.jpg"
					},
					
					{
						title: "Pulp Fiction",
						titleReleaseDate: "Release Date: ",
						releaseDate: "14 October 1994",
						description: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
						cover: "images/pulp-fiction.jpg"
					},
					{
						title: "The Dark Knight",
						titleReleaseDate: "Release Date: ",
						releaseDate: "18 July 2008",
						description: "When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.",
						cover: "images/the-dark-knight.jpg"
					}

				]
		}
	}


	app.directives = {
		cover: {
     		src: function(params) {
		   	return this.cover;
    		}
	   	}
	};



	app.sections = {
		init: function(){
			//hier roep je de functies aan
			app.sections.about();
			app.sections.movies();
			app.sections.toggle();
			app.sections.moviesContent();
		},
		about: function(){
			Transparency.render(document.getElementById('about'), app.content.about);
		},
		movies: function(){
			Transparency.render(document.getElementById('movies'), app.content.movies);
		},
		moviesContent: function(){
			Transparency.render(document.getElementsByClassName('moviesContent')[0], app.content.movies.moviesContent, app.directives);
		},

		toggle: function(section){

// Als about is aangeklikt (dus als section gelijk is aan #about in de link), wordt de tekst van
// about weergegeven (getoggeld) en die van movies weggehaald. Zo hou je 1 van de 2 over. 
			if (section == "#about") {
				document.querySelector("#about").classList.toggle('active');
				document.querySelector("#movies").classList.remove('active');
			}

			else if (section == "#movies"){
				document.querySelector("#movies").classList.toggle('active');
				document.querySelector("#about").classList.remove('active');
			}
			
		}
	}


})();

app.controller.init();
// start van het script.




