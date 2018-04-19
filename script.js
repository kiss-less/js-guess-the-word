//Declaring variables
//The array contains words and descriptions. It is safe to add new words here. Info is taken from https://en.oxforddictionaries.com/explore/weird-and-wonderful-words
var words = [
["alcazar","A Spanish palace or fortress"],
["badmash","Indian a hooligan"],
["bawbee","Scottish a coin of low value"],
["bergschrund","A type of crevasse"],
["bibliopole","A person who buys and sells books, especially rare ones"],
["blatherskite","A person who talks at great length without making much sense"],
["cacoethes","An urge to do something inadvisable"],
["callithumpian","like a discordant band or a noisy parade"],
["catoptromancy","Foretelling the future by means of a mirror"],
["commensalism","An association between two organisms in which one benefits from the relationship and the other derives neither harm nor benefit"],
["cybersquatting","The practice of registering well-known names as Internet domain names, in the hope of reselling them at a profit"],
["deasil","Clockwise or in the direction of the sun's course"],
["deipnosophist","A person skilled in the art of dining and dinner-table conversation"],
["digerati","People with expertise or professional involvement in information technology"],
["dumbsize","To reduce the staff numbers of a company to such low levels that work can no longer be carried out effectively"],
["edacious","Having to do with eating or fond of eating"],
["emacity","Fondness for buying things"],
["entomophagy","The eating of insects, especially by people"],
["eucatastrophe","A happy ending to a story"],
["eurhythmic","In harmonious proportion"],
["exsanguine","Bloodless or anaemic"],
["eyewater","W. Indian tears"],
["flatline","To die"],
["frondeur","A political rebel"],
["futhark","The Scandinavian runic alphabet"],
["gaita","A kind of bagpipe played in northern Spain and Portugal"],
["gnathic","Having to do with the jaws"],
["goodfella","A gangster, especially a member of a Mafia family"],
["habile","Deft or skilful"],
["incrassate","Thickened in form or consistency"],
["ingurgitate","To swallow something greedily"],
["jumentous","Resembling horse's urine"],
["karateka","A person who performs karate"],
["labarum","A banner or flag bearing symbolic motifs"],
["lactarius","A large woodland mushroom with a concave cap, the flesh exuding a white or colored milky fluid when cut"],
["lollygag","To spend time in an aimless or lazy way"],
["macushla","Irish an affectionate form of address"],
["natation","Swimming"],
["noctambulist","A sleepwalker"],
["nugacity","Triviality or frivolity"],
["opsimath","A person who begins to learn or study late in life"],
["paludal","Living or occurring in a marshy habitat"],
["paraph","A flourish after a signature"],
["periapt","An item worn as a charm or amulet"],
["plew","A beaver skin"],
["ragtop","A convertible car with a soft roof"],
["rebirthing","A form of therapy involving controlled breathing and intended to simulate the trauma of being born"],
["saucier","A sauce chef"],
["shamal","A hot, dry north-westerly wind that blows across the Persian Gulf in summer and causes sandstorms"],
["skycap","A porter at an airport"]
];
//Alphabet array
var alphaArr = "abcdefghijklmnopqrstuvwxyz".split('');
//Array with the chosen word and description
var word = pickWord();
//The percentage of characteds to hide
var hidePercentage = 0.8;
//Number of tries. We will set it equal to the amount of the hidden characters later
var tries = 0;
//Attempts
var attempts = 0;
//Helper flags array
var helpers = [1,1];
//Adding the word with hidden chars to the word array
word.push(hideChars(word));

//Functions
//Choosing the word
function pickWord()
{
	var i = rnd(0, words.length - 1);
	return words[i]
}

//Hiding the characters and counting the amount of tries
function hideChars(word)
{
	var i = 0;
	var hidden = word[0].split("");
	var hiddenId = [];
	var charsToHide = Math.floor(hidePercentage*hidden.length-1);
	while (i < charsToHide)
	{
		var rand = rnd(0, hidden.length-1);
		if (hidden[rand] != "_")
		{
			hidden[rand] = "_";
			hiddenId[i] = rand;
			i++;
		}
	}
	tries = i + 2;
	//As the normal sort() works for strings, providing a compare function will help us sorting the int array correctly
	hiddenId.sort(function(a, b){return a - b});
	word.push(hiddenId);
	return hidden;
}

//Random rumber generation
function rnd(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Placing the word and inputs to the <p id='field'>
function writeWord()
{
	document.getElementById("field").innerHTML = word[3].join(" ")+"<br><br>("+word[1]+")";
	if (word[0] == word[3].join(""))
	{
		addWinMsg();
	} else
	{
		addInputs();
	}
}

//Unhiding the hidden character and removing its id from the array of hidden ids
function updateWord(letter, letterId, toRemove)
{
	word[3][letterId] = letter;
	word[2].splice(toRemove, 1);
	writeWord();
}

//Clearing the <p id='field'> contains
function clearField()
{
	document.getElementById("field").innerHTML = "";
}

//Adding Win message
function addWinMsg()
{
	document.getElementById("log").innerHTML = "";
	document.getElementById("field").innerHTML += "<br><br><b>Congratulations! You win! You made "+attempts+" attempts! "+tries+" mistakes left!</b><br><a href='https://en.oxforddictionaries.com/definition/"+word[0]+"' target='_blank'>Check the word</a><br><br><button id='reload' onclick='location.reload()'>Exit</button>";
}

//Adding Lose message
function addLoseMsg()
{
	document.getElementById("log").innerHTML = "";
	document.getElementById("field").innerHTML = word[3].join(" ")+"<br><br>("+word[1]+")";
	document.getElementById("field").innerHTML += "<br><br><b>Sorry, no more tries left!</b><br><br><button id='reload' onclick='location.reload()'>Exit</button>";
}

//Adding inputs and helpers
function addInputs()
{
	var alphaList = "";
	var charsList = "";
	var i;
	for (i = 0; i < word[2].length; i++)
	{
		//We want to start the count of the characters from 1, not from zero
		var wordUserFriendly = word[2][i] + 1;
		charsList += "<option>"+wordUserFriendly+"</option>";
	}
	for (i = 0; i < alphaArr.length; i++)
	{
		alphaList += "<option>"+alphaArr[i]+"</option>";
	}
	
	document.getElementById("field").innerHTML += "<br><br><form>Choose a number of the letter you want to guess: <select id='charId'>"+charsList+"</select><br><br>Choose the letter to insert: <select id='alphaId'>"+alphaList+"</select><br><br><input type='button' onclick='compare()' value='Check'></form>";
	if (helpers[0] == 1 && word[2].length > 1)
	{
	document.getElementById("field").innerHTML += "<button id='rndltr' onclick='openRndLtr(\"rndltr\")'>Open a random letter (available till 2 or more letters left)</button>";
	}
	if (helpers[1] == 1)
	{
	document.getElementById("field").innerHTML += " <button id='constorvow' onclick='constOrVow(\"constorvow\")'>Consonant or vowel? (consider y as a vowel)</button>";		
	}
}

//Open a random hidden character
function openRndLtr(id)
{
	helpers[0] = 0;
	destroy(id);
	var rand = rnd(0, word[2].length-1);
	var letter = word[0][word[2][rand]];
	var letterId = word[2][rand];
	var toRemove = rand;
	updateWord(letter, letterId, toRemove);	
}

//Check if one of the hidden characters is a consonant or a vowel
function constOrVow(id)
{
	helpers[1] = 0;
	destroy(id);
	var cons = "bcdfghjklmnpqrstvwxz".split('');
	var vows = "aeiouy".split('');
	var rand = rnd(0, word[2].length-1);
	var letter = word[0][word[2][rand]];
	var numUserFriendly = word[2][rand]+1;
	var cov = "";
	if (cons.indexOf(letter) > -1)
	{
		cov = "consonant";
	} else if (vows.indexOf(letter) > -1)
	{
		cov = "vowel";
	}
	document.getElementById("log").innerHTML = "<b>The letter number "+numUserFriendly+" is a "+cov+"!</b>";
}

//Destroy the element by id
function destroy(id)
{
	var elem = document.getElementById(id);
	elem.parentNode.removeChild(elem);
}

//Comparing what the user chose to the actual character of the chosen word
function compare(){
	attempts += 1;
	document.getElementById("log").innerHTML = '';
	var word2Id = document.getElementById("charId").selectedIndex;
	//Minus one is because we want to be friendly to our users and not to start the count of characters from zero :)
    var charId = document.getElementById("charId").options[document.getElementById("charId").selectedIndex].text - 1;
    var alpha = document.getElementById("alphaId").options[document.getElementById("alphaId").selectedIndex].text;
	if (word[0][charId] == alpha)
	{
		document.getElementById("log").innerHTML = '<font color=green>correct!</font>';
		updateWord(alpha, charId, word2Id);
	} else
	{
		if (tries > 1)
		{
			tries -= 1;
			var charIdUserFriendly = charId+1;
			document.getElementById("log").innerHTML = '<font color=red>Incorrect! The letter number '+charIdUserFriendly+" is not \""+alpha+"\"! Mistakes left: "+tries+"!</font>";
			} else
		{
			addLoseMsg();
		}
	}
}