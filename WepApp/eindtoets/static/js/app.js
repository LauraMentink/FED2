/*1. Begin met laden van de data, die checkt of het in de localstorage staat, wanneer dit niet het geval is, haal het op met een AJAX request
2. De router (Routie) wordt aangemaakt
3. De router match de hash(url) met een method op de controller
4. De controller method zorgt ervoor dat de juiste data aan de template engine(Transparency) wordt geleverd, met de juiste directives
5. De template engine rendert de data in de DOM */

/* Begin anonymous self invoking function begint vanzelf, en komt niet in de globale scope */
(function () {
    var app = app || {};
    /* object */
    app.router = {
    	/* init is een methode */
        init: function () {
        	/* Een functie die onderdeel is van een object noemen we een methode. Het kan iets doen met de eigenschappen van het object.
               init functie maak je routie methodes aan, routie is een functie die je aanroept, parameter is alles wat erin zit */
            routie({
            	/* about is een methode */
                'about': function () {
                    /* routie kijkt naar wat er achter de # staat. Hij kijkt of het #about is en dan doet de css display: block (de functie wordt aangeroepen)*/
                    console.log("about");
                    app.controller.about();
                },
                'movies': function (){
                    console.log("movies");
                    app.controller.movies();
				},
				'movies/genre/:genre': function (genre) {
                /* parameter genre is gebruikt omdat je allemaal aparte genres hebt, deze wordt dan ingevuld met het genre dat je aanklikt in de URL.
                dus als je het genre Horror aanklikt, komt er in de url movies/genre/horror te staan, hij filtert alles met het genre horror. */
                    console.log("movies filtered by: " + genre);
                    app.controller.moviesByGenre(genre);
                },

				/* Hij haalt id van dennistel vandaan, en haalt zo de informatie op voor de detailpagina (filter) */
				'movies/:id': function(id) {
					console.log("details of movie: " + id);
					app.controller.movieDetail(id);
				},
			});
        }
    }

    /*geen var, omdat app al een variabele is.
    app.content is het object */
    app.content = {
        /* about is een property, properties zijn alle variabelen en functies binnen een object */
		about: {
			/* alles tussen "" is een string, title is name en "" is de value. gezamenlijk heet het property */
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
		}

	},




	app.hideAllSections = function() {
		/* Eerst wordt de functie aangemaakt hideAllSections, deze verbergt alle sections. Deze wordt aangeroepen bij app.controller bij oa movies en about.
		Vind alle elementen met class 'section', het is een voorgeprogrammeerde loop vanuit underscore die door alle sections loopt.
		 2 parameters _.each(lijst die je wilt doorlopen, functie voor wat je met elk item wil doen)
		 el is een parameter, (el would be the element that received the click event) */
		_.each(document.getElementsByClassName("section"), function(el) {
			el.classList.remove('active');
		});
	};

	app.directives = {
		/* haalt plaatjes op */
		cover: {
			src: function(params) {
				return this.cover;
			}
		},

		/* Genereer een url naar detail pagina */
		readMore: {
			href: function(params) {
				return '#movies/' + this.id;
			}
		},

		actors:{

		url_character: {
            href: function() {
                return this.url_character;
            }
		},

		url_photo: {
			src: function(params) {
				return this.url_photo;
			}
		},

		url_profile: {
            href: function() {
                return this.url_profile;
            }
		}
	},

		reviewScore: {
			text: function(params, data) {
                /* Tel alle scores van de reviews bij elkaar op */
                var sum = _.reduce(this.reviews, function(memo, review) {
                    return memo + review.score;
                }, 0);

                /* Telt het aantal reviews */
                var len = this.reviews.length;

                /* Geef de gemiddelde score van de reviews terug */
                return (sum / len);
			}
		}
	};

	app.controller = { 

		about: function() {
			/* Verberg eerst alle sections */
			app.hideAllSections();
			/* Maak about section weer actief, wanneer routie about achter de # ziet staan. 
			Voegt active toe aan de sections met class about */
			document.getElementById('about').classList.add('active');
			Transparency.render(document.getElementById('about'), app.content.about); 
		},

		movies: function() {
			app.hideAllSections();
			document.getElementById('movies').classList.add('active');

			/* Haal movies uit de local storage */
			var movies = JSON.parse(localStorage.getItem('movieData'));

			Transparency.render(document.getElementById('movies'), movies, app.directives); 
		}, 

		moviesByGenre: function(genre) {
			app.hideAllSections();
			document.getElementById('movies').classList.add('active');

			/* Haal movies uit de local storage */
			var movies = JSON.parse(localStorage.getItem('movieData'));

			/* Filter de movies op genre */
			var filteredMovies = _.filter(movies, function(movie) {
				/* Loop door de genres */
				for(var i=0; i<movie.genres.length; i++) {
					/* Wanneer er een genre is gematchd */
					if(movie.genres[i] === genre) return true;
				}
				return false;
			});

			Transparency.render(document.getElementById('movies'), filteredMovies, app.directives); 
		},

		movieDetail: function(id) {
			app.hideAllSections();
			var movies = JSON.parse(localStorage.getItem('movieData'));
			
			/* Het ID was een string maar het moet een integer zijn om te kunnen matchen */
			id = parseInt(id);		

			/* kijkt door de lijst heen van movies */
			var movie = _.findWhere(movies, {id: id});
			console.log(movie);
			document.getElementById('detail').classList.add('active');
			Transparency.render(document.getElementById('detail'), movie, app.directives); 

		}
	};

			/*callback als parameter wordt uitgevoerd wanneer de data is opgehaald*/
	app.load = function(localStorageKey, url, callback) {

		/* Stel uit om de lader te illustreren */
		setTimeout(function() {

			/* Wanneer het al in de local storage staat 
			 hoeft het niet nog een keer opgehaald te worden */
			if(localStorage.getItem(localStorageKey)) {
				/* Voer meteen de callback uit*/
				callback();

				return;
			} else {	

				/* Haal de data op via AJAX van het type json */
				app.xhr.trigger('GET', url, function(data) {

					console.log('Data from data object', JSON.parse(data));
					/* Plaats de data in local storage*/
					localStorage.setItem(localStorageKey, data);

					/* Nadat alle data is opgehaald
					 voer de callback uit*/
					callback();
				}, "JSON");
			}
			/* hij laadt nu 1,5 sec.*/
		}, 1500);

	}

	/* Ajax request method */
	app.xhr = {
		trigger: function (type, url, success, data) {
			var req = new XMLHttpRequest;
			req.open(type, url, true);

			req.setRequestHeader('Content-type','application/json');

			type === 'POST' ? req.send(data) : req.send(null);

			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200 || req.status === 201) {
						success(req.responseText);
					}
				}
			}
		}
	};



	/*slider*/
	var elem = document.getElementById('mySwipe');
		window.mySwipe = Swipe(elem, {
   			auto: 3000
	});



	/*loader*/

	var circle = new ProgressBar.Circle('#loader', {
    	color: '#FCB03C'
	});
	circle.animate(1);




	/*Header Nav-container*/
	function init() {
	    window.addEventListener('scroll', function(e){
	        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
	            shrinkOn = 300,
	            header = document.querySelector("#nav-container");
	        if (distanceY > shrinkOn) {
	            classie.add(header,"smaller");
	        } else {
	            if (classie.has(header,"smaller")) {
	                classie.remove(header,"smaller");
	            }
	        }
	    });
	}
	window.onload = init();
	



	/* Laad de data */
	app.load('movieData', 'http://dennistel.nl/movies', function() {
		/* Als de data geladen is, start de applicatie */
		app.router.init();

		/* Verberg de lader */
		document.getElementById("loader").classList.remove("loading");
	});


})();