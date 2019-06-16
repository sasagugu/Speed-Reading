var input, arr, html, newHtml, broj, rum, rum2, brRijeci, brMinuta, playing, tekstovi, newStr;
var inputSelector, selectSelecotr, displaySelector, numberSelector, pauseSelector, playSelector, vrijemeSelector, sloverSelector, fasterSelector;
var i = 0;
playing = false;


// Selektori
inputSelector = document.querySelector('.input');
selectSelecotr = document.querySelector('.select');
displaySelector = document.querySelector('.display');
numberSelector = document.querySelector('.number');
pauseSelector = document.querySelector('.pause');
playSelector = document.querySelector('.play');
vrijemeSelector = document.querySelector('.vrijeme');
sloverSelector = document.querySelector('.slover');
fasterSelector = document.querySelector('.faster');


pauseSelector.disabled = true;



// Display Array into HTML (innerHTML on display)
function displayArrIntoHTML () {
	html = "%i%";
	newHtml = html.replace('%i%', arr[i]);	
    displaySelector.innerHTML = newHtml;
};



// Reset Input
function resetInput () {
	i = 0;
	input = inputSelector.value;
	newStr = input.replace(/  +/g, ' ');
	arr = newStr.split(" ");
};



// Input text
inputSelector.addEventListener('change', function () {
	resetInput();
});




// Input number
numberSelector.addEventListener('change', function () {
	broj = parseInt(numberSelector.value);
	rum = Math.round( ( 1 / (broj / 60)) * 1000 );
	rum2 = rum;
	i = i;

	if (parseInt(numberSelector.value) >= 20) {
		sloverSelector.disabled = false;

	};

	brRijeci  = arr.length;
	brMinuta = brRijeci / broj;
	if (brMinuta < 1) {
		vrijemeSelector.innerHTML = "<i class=\"fas fa-clock\"></i> Reading time less than a minute";
	}else{
		vrijemeSelector.innerHTML = "<i class=\"fas fa-clock\"></i> Reading time ~ " + Math.round(brMinuta) + " minutes."
	}

});






// Faster
function faster () {

	if (parseInt(numberSelector.value) < 10000) {

		sloverSelector.disabled = false;

		broj = parseInt(numberSelector.value) + 20;
		rum2 = Math.round( ( 1 / (broj / 60)) * 1000 ); // ovde je rum2 zato sto ce kasnije biti rum = rum2

		brRijeci  = arr.length;
		brMinuta = brRijeci / broj;
		numberSelector.value = parseInt(numberSelector.value) + 20;

		// Vrijeme citanja
		if (brMinuta < 1) {
			vrijemeSelector.innerHTML = "<i class=\"fas fa-clock\"></i> Reading time less than a minute";
		}else{
			vrijemeSelector.innerHTML = "<i class=\"fas fa-clock\"></i> Reading time ~ " + Math.round(brMinuta) + " minutes."
		}

	}else {
		fasterSelector.disabled = true;
	};


};







// Slover
function slover () {

	if (parseInt(numberSelector.value) > 21) {

		broj = parseInt(numberSelector.value) - 20;
		rum2 = Math.round( ( 1 / (broj / 60)) * 1000 ); // ovde je rum2 zato sto ce kasnije biti rum = rum2

		brRijeci  = arr.length;
		brMinuta = brRijeci / broj;
		numberSelector.value = parseInt(numberSelector.value) - 20;

		// Vrijeme citanja
		if (brMinuta < 1) {
			vrijemeSelector.innerHTML = "<i class=\"fas fa-clock\"></i> Reading time less than a minute";
		}else{
			vrijemeSelector.innerHTML = "<i class=\"fas fa-clock\"></i> Reading time ~ " + Math.round(brMinuta) + " minutes."
		}
	}else {
		sloverSelector.disabled = true;
	};


};






// Vrati unazad 10 rijeci
function goback () {
	if (i > 10) {
		i -= 10;
		displayArrIntoHTML();
	};
};


// Idi unapred 10 rijeci
function goforward () {
	if (i < (arr.length - 10)) {
		i += 10;
		displayArrIntoHTML();
	};
};








// Play button
function displayFunction () {
	playSelector.disabled = true;
	pauseSelector.disabled = false;
	playing = true;

	function test () {

		if (playing) {
				

				if ( arr == null && numberSelector.value == "") {  // Da li je korisnik samo kliknuo play bez unjetih podataka
					alert('You must enter text and specify the reading speed');
					playSelector.disabled = false;
				}else if (arr == null || arr == "") {
					alert('You must enter text');
					playSelector.disabled = false;				
				}else if (numberSelector.value == "") {
					alert('You must specify the reading speed');
					playSelector.disabled = false;
				}else {

					setTimeout(function () {

						rum = rum2; // Nako sto se izvrsi rekurzija, i ako je prosla rijec imala tacku i zbog toga usporla brzinu, ovde se vraca prosla brzina, zato sto ima kopija ruma u rum2

						// Ako ima tacku, zarez...
						if (arr[i].includes(',') || arr[i].includes('.') || arr[i].includes('...') || arr[i].includes(':') || arr[i].includes('!') || arr[i].includes('?') || arr[i].includes('!?') || arr[i].includes('?!') || arr[i].includes('??') || arr[i].includes('???') || arr[i].includes('!!') || arr[i].includes('!!!') || arr[i].includes('-') || arr[i].includes(';') || arr[i].length > 8) {
							rum += 275; // Usporice rum za taj broj milisekundi
						};

						displayArrIntoHTML();

					    i++;
					    if (i < arr.length) {
					    	test();
					    }else {
					    	i = 0;
							playSelector.disabled = false;
							pauseSelector.disabled = true;
					    	return playing = false;
					      }

					}, rum);

				}

			}
		};
test();
};








// Pause
function pause () {
	pauseSelector.disabled = true;
	playSelector.disabled = false;
	return playing = false;
};


tekstovi = ["1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50", " Jedan mladić koji je živeo i radio daleko od svog rodnog mesta uželeo se da vidi svoj zavičaj, i rešio se da se vrati kući i obiđe svoj dom. Vraćajući se kući, posle nekoliko dana putovanja naiđe tako na obalu jedne ogromne reke. Znao je da je njegov dom sa druge strane reke, ali nije znao kako da pređe na drugu obalu. Hodao je satima nizvodno, ali nije uspevao da nađe niti most niti kakvog skeledžiju. Zatim se vratio odakle je krenuo, pa pošao uzvodno, ali ni tamo mosta nije bilo. Polako je počelo da pada veče, mladić već umoran od pešačenja sedeo je na jednom kamenu već razmišljajući da li da odustane od svog putovanja, kada na drugoj obali reke ugleda budističkog monaha. -Molim vas, možete li mi reći kako da pređem na drugu stranu! -viknu mladić. Monah se začas zamisli pa mu odgovori: -Sinko, ali ti si već na drugoj strani!", "Jedan ostareli zemljoradnik više nije imao snage da radi u polju. Sav teret poslova pao je na njegovog sina, koji je čitave dane provodio radeći, a predveče vraćajući se kući, zaticao bi svog ostarelog oca kako sedi na klupi ispred kuće. \"Više nije ni od kakve korist\" -razmišljao je njegov sin -\"ništa više ne radi, i postao mi je teret\". I jednoga dana, isfrustriran zbog svega, sin napravi drveni sanduk, dovuče ga do klupe ispred kuće, i naredi svom ocu da uđe u njega. Bez i jedne reči, otac uđe u drveni sanduk, sin zatvori poklopac i odvuče ga do jedne strme litice, izvan sela. Dok se spremao da gurne sanduk sa litice u provaliju, začu lupanje iz sanduka. Otvorivši poklopac, zatekao je oca kako mirno leži unutra. \"Šta si hteo?\" -upita ga sin. \"Pa, znam da nameravaš da me se otarasiš, ali te ipak savetujem da preko litice baciš samo mene i zadržiš sanduk, znaš - može zatrebati i tvojim sinovima jednoga dana.\" -odgovori mu starac.", "Ovo što ću vam ispričati odigralo se u Rusiji. Gde tačno u Rusiji nije mi poznato, jer se desilo odavno a Rusija je velika zemlja pa je to sad teško odrediti, ali najvažnije jeste da se odigralo. ne znam Dakle, u jednom mestu negde u Rusiji živeo je i radio jedan pravoslavni sveštenik koji se razlikovao od većine sveštenaika kako hrišćanske tako i drugih religija - bio je istinski religiozan. Još od kako se školovao za sveštenički poziv zanimalo ga je da pronađe odgovore na neka od najzagonetnijih pitanja našeg postojanja: Ko smo mi? Šta radimo na ovoj zemlji i kuda to idemo? Nakon dvadesetak i nešto godina razmišljanja i odgonetavanja, došao je do jednostavnog odgovora: -\"Ne znam. Čitav život sam posvetio tome da pronadjem odgovore i zato sada moram biti iskren prema sebi i reći da stvarno ne znam.\" Sledećeg jutra dok je išao ka crkvi kako bi održao jutarnju molitvu, na jednoj raskrsnici presrete ga jedan kozak - policajac: -\"Stoj!\" -viknu kozak koji beše tog jutra naročito neraspoložen, valjda zato što ga je žena nešto iznervirala -\"Ko si ti i kuda si krenuo?\" Sveštenik se malo zamisli, i u svetlu svojih sinoćnjih otkrovenja odgovori: -\"Ne znam.\" -\"Ne znaš?!\" - iznenadi se kozak - \"svako jutro gledam te kako prolaziš ovuda, kako ideš u crkvu i vraćaš se nazad, svako jutro događa se isto, i ti meni kažeš da ne znaš! Sa mnom si našao da se šegačiš?! E, kada je tako, sada ćeš provesti dan iza rešetaka da se malo opametiš. Uhapšen si!\" - i povede sveštenika ka stanici. Sveštenik bez reči pođe s njim, uđoše u stanicu, kozak otključa vrata ćelije gde su bivali zatvarani neposlušni građani, sveštenik mirno uđe unutra i u trenutku kada se kozak spremao da za njim zatvori vrata sveštenik progovori: -\"Eto vidiš da nisam zanao gde sam jutros krenuo.\"", "He was one of the most unfortunate people in the world. The whole village was tired of him; he was always gloomy, he constantly complained and was always in a bad mood.  The longer he lived, the more bile he was becoming and the more poisonous were his words. People avoided him, because his misfortune became contagious. It was even unnatural and insulting to be happy next to him.  He created the feeling of unhappiness in others.  But one day, when he turned eighty years old, an incredible thing happened. Instantly everyone started hearing the rumour:         “An Old Man is happy today, he doesn’t complain about anything, smiles, and even his face is freshened up.”     The whole village gathered together. The old man was asked:  Villager: What happened to you?         “Nothing special. Eighty years I’ve been chasing happiness, and it was useless. And then I decided to live without happiness and just enjoy life. That’s why I’m happy now.” – An Old Man", "People have been coming to the wise man, complaining about the same problems every time. One day he told them a joke and everyone roared in laughter.  After a couple of minutes, he told them the same joke and only a few of them smiled.  When he told the same joke for the third time no one laughed anymore.  The wise man smiled and said:         “You can’t laugh at the same joke over and over. So why are you always crying about the same problem?”", "A salt seller used to carry the salt bag on his donkey to the market every day.  On the way they had to cross a stream. One day the donkey suddenly tumbled down the stream and the salt bag also fell into the water. The salt dissolved in the water and hence the bag became very light to carry. The donkey was happy.  Then the donkey started to play the same trick every day.  The salt seller came to understand the trick and decided to teach a lesson to it. The next day he loaded a cotton bag on the donkey.  Again it played the same trick hoping that the cotton bag would be still become lighter.  But the dampened cotton became very heavy to carry and the donkey suffered. It learnt a lesson. It didn’t play the trick anymore after that day, and the seller was happy.", "A story tells that two friends were walking through the desert. During some point of the journey they had an argument, and one friend slapped the other one in the face.  The one who got slapped was hurt, but without saying anything, wrote in the sand;         “Today my best friend slapped me in the face.”     They kept on walking until they found an oasis, where they decided to take a bath. The one who had been slapped got stuck in the mire and started drowning, but the friend saved him. After he recovered from the near drowning, he wrote on a stone;         “Today my best friend saved my life.”     The friend who had slapped and saved his best friend asked him;         “After I hurt you, you wrote in the sand and now, you write on a stone, why?”     The other friend replied;         “When someone hurts us we should write it down in sand where winds of forgiveness can erase it away. But, when someone does something good for us, we must engrave it in stone where no wind can ever erase it.”", "It was an incredibly hot day, and a lion was feeling very hungry.  He came out of his den and searched here and there. He could find only a small hare. He caught the hare with some hesitation. “This hare can’t fill my stomach” thought the lion.  As the lion was about to kill the hare, a deer ran that way. The lion became greedy. He thought;         “Instead of eating this small hare, let me eat the big deer.”     He let the hare go and went behind the deer. But the deer had vanished into the forest. The lion now felt sorry for letting the hare off.", "Vijay and Raju were friends. On a holiday they went walking into a forest, enjoying the beauty of nature. Suddenly they saw a bear coming at them. They became frightened.  Raju, who knew all about climbing trees, ran up to a tree and climbed up quickly. He didn’t think of Vijay. Vijay had no idea how to climb the tree.  Vijay thought for a second. He’d heard animals don’t prefer dead bodies, so he fell to the ground and held his breath. The bear sniffed him and thought he was dead. So, it went on its way.  Raju asked Vijay;         “What did the bear whisper into your ears?”     Vijay replied, “The bear asked me to keep away from friends like you” …and went on his way.", "Once upon a time a daughter complained to her father that her life was miserable and that she didn’t know how she was going to make it.  She was tired of fighting and struggling all the time. It seemed just as one problem was solved, another one soon followed.  Her father, a chef, took her to the kitchen. He filled three pots with water and placed each on a high fire.  Once the three pots began to boil, he placed potatoes in one pot, eggs in the second pot and ground coffee beans in the third pot. He then let them sit and boil, without saying a word to his daughter.  The daughter, moaned and impatiently waited, wondering what he was doing. After twenty minutes he turned off the burners.  He took the potatoes out of the pot and placed them in a bowl. He pulled the eggs out and placed them in a bowl. He then ladled the coffee out and placed it in a cup.     Turning to her, he asked. “Daughter, what do you see?”  “Potatoes, eggs and coffee,” she hastily replied.  “Look closer” he said, “and touch the potatoes.” She did and noted that they were soft.  He then asked her to take an egg and break it. After pulling off the shell, she observed the hard-boiled egg.  Finally, he asked her to sip the coffee. Its rich aroma brought a smile to her face.  “Father, what does this mean?” she asked.     He then explained that the potatoes, the eggs and coffee beans had each faced the same adversity-the boiling water. However, each one reacted differently. The potato went in strong, hard and unrelenting, but in boiling water, it became soft and weak.  The egg was fragile, with the thin outer shell protecting its liquid interior until it was put in the boiling water. Then the inside of the egg became hard.  However, the ground coffee beans were unique. After they were exposed to the boiling water, they changed the water and created something new.  “Which one are you?” he asked his daughter.         “When adversity knocks on your door, how do you respond? Are you a potato, an egg, or a coffee bean?”", "One afternoon a fox was walking through the forest and spotted a bunch of grapes hanging from over a lofty branch.  “Just the thing to quench my thirst,” he thought.  Taking a few steps back, the fox jumped and just missed the hanging grapes. Again the fox took a few paces back and tried to reach them but still failed.  Finally, giving up, the fox turned up his nose and said, “They’re probably sour anyway,” and proceeded to walk away.", "A slave, ill-treated by his master, runs away to the forest. There he comes across a lion in pain because of a thorn in his paw. The slave bravely goes forward and removes the thorn gently.  The lion without hurting him goes away.  Some days later, the slave’s master comes hunting to the forest and catches many animals and cages them. The slave is spotted by the masters’ men who catch him and bring him to the cruel master.  The master asks for the slave to be thrown into the lion’s cage.  The slave is awaiting his death in the cage when he realizes that it is the same lion that he had helped. The slave rescued the lion and all other caged animals."];


// Tekstovi
selectSelecotr.addEventListener('change', function () {
	switch (selectSelecotr.value) {
		case 'na-drugoj-strani':
			inputSelector.value = tekstovi[1];
			resetInput();
			break;
		case 'drevni-sanduk':
			inputSelector.value = tekstovi[2];
			resetInput();
			break;
		case 'ne-znam':
			inputSelector.value = tekstovi[3];
			resetInput();
			break;
		case 'An-Old-Man-Lived-in-the-Village':
			inputSelector.value = tekstovi[4];
			resetInput();
			break;
		case 'The-Wise-Man':
			inputSelector.value = tekstovi[5];
			resetInput();
			break;
		case 'The-Foolish-Donkey':
			inputSelector.value = tekstovi[6];
			resetInput();
			break;
		case 'Having-A-Best-Friend':
			inputSelector.value = tekstovi[7];
			resetInput();
			break;
		case 'The-Greedy-Lion':
			inputSelector.value = tekstovi[8];
			resetInput();
			break;
		case 'Two-Friends-&-The-Bear':
			inputSelector.value = tekstovi[9];
			resetInput();
			break;
		case 'The-Fox-&-The-Grapes':
			inputSelector.value = tekstovi[10];
			resetInput();
			break;
		case 'The-Lion-&-The-Poor-Slave':
			inputSelector.value = tekstovi[11];
			resetInput();
			break;
		case 'The-Foolish-Donkey':
			inputSelector.value = tekstovi[12];
			resetInput();
			break;
	}
});


