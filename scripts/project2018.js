// global variable for the project
var create = document.getElementById('create');
var terrain = document.getElementById('terrain');
var cibles = document.getElementsByClassName('target on');
var remaining = document.getElementById('remaining');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var tenth = document.getElementById('tenth');
var nbtargets = document.getElementById('nbtargets');
var start = document.getElementById('start');
var control = document.getElementById('control');
var niveaux = 1;

// default initial width and heigth for the target
var TARGET_WIDTH = 40;
var TARGET_HEIGHT = 40;

// chrono management
function chrono(){
    if(cibles.length != 0){    //this is the chrono systeme
        if(bol){
            t++;
            if(t>9){
                t=0;
                s++;
            };
        };
        tenth.innerHTML = t;
        seconds.innerHTML = s;
        minutes.innerHTML = m;
        if(s>59){
            m++;
            s=0;
        };
    }
    else{                            //this statment check if the game end or not
        clearInterval(x,10);
        var score = nbtargets.value / ((m*60)+(s)+(t/100));
        score = score.toFixed(2);
        alert("vous avez cliqué sur "+ nbtargets.value +" cibles en "+ m +"min "+s+"secondes "+t+ "tenth");
        alert("votre score est " + score +"C/S");
        index = 0;
        start.firstChild.data = "Démarrer";
        remaining.innerHTML = cibles.length;
        m=0;
        s=0;
        t=0;
        tenth.innerHTML = 0;
        seconds.innerHTML = 00;
        minutes.innerHTML = 0;
    };
};

// value of time in tenth of seconds
var time = 0;

// timer variable 
var chronoTimer = null;
var m=0;
var s=0;
var t=0;
var x;
var bol = true;


// YOUR NAME HERE
// Kamal Ait Omar
// YOUR CODE BELOW

// Proposer plusieurs niveaux de difficultés dans lesquels les dimensions du terrain
// augmentent avec la difficulté  et la taille des cibles diminue avec la difficulté
var facile = document.createElement('button');
var moyen = document.createElement('button');
var difficile = document.createElement('button');
var tresDifficile = document.createElement('button');

facile.setAttribute('id','facile');
moyen.setAttribute('id','moyen');
difficile.setAttribute('id','difficile');
tresDifficile.setAttribute('id','tresDifficile');

facile.style.margin = 5 + "px";
moyen.style.margin = 5 + "px";
difficile.style.margin = 5 + "px";
tresDifficile.style.margin = 5 + "px";

facile.innerHTML = "Facile";
moyen.innerHTML = "Moyen";
difficile.innerHTML = "Difficile";
tresDifficile.innerHTML = "Extrême";

control.appendChild(facile);
control.appendChild(moyen);
control.appendChild(difficile);
control.appendChild(tresDifficile);

facile.addEventListener('click',firstLevel);
function firstLevel(){
    niveaux = 1;
    var before = cibles.length
    for(i=0; i < before ;i++){
        cibles[0].remove()
    };
    terrain.style.height = 400 +'px';
    terrain.style.width = 400 +'px';
};

moyen.addEventListener('click',secondLevel);
function secondLevel(){
    niveaux = 2;
    var before = cibles.length
    for(i=0; i < before ;i++){
        cibles[0].remove()
    };
    terrain.style.height = 400 +'px';
    terrain.style.width = 700 +'px';
};

difficile.addEventListener('click',thirdLevel);
function thirdLevel(){
    niveaux = 3;
    var before = cibles.length
    for(i=0; i < before ;i++){
        cibles[0].remove()
    };
    terrain.style.height = 400 +'px';
    terrain.style.width = 1000 +'px';
};

tresDifficile.addEventListener('click',forthLevel);
function forthLevel(){
    niveaux = 4;
    var before = cibles.length
    for(i=0; i < before ;i++){
        cibles[0].remove()
    };
    terrain.style.height = 400 +'px';
    terrain.style.width = 1300 +'px';
};


// createCible function to add targets to the area 
create.addEventListener('click',createCible);
function createCible(){
    var cible = document.createElement('div');
    cible.setAttribute('id','cible');
    cible.setAttribute('class','target on');
    if(niveaux == 1){
        cible.style.top = Math.random()*360+'px';
        cible.style.left = Math.random()*360+'px';
        cible.style.height = 30 +"px";
        cible.style.width = 30 +"px";
        terrain.appendChild(cible);
    }
    else if(niveaux == 2){
        cible.style.top = Math.random()*360+'px';
        cible.style.left = Math.random()*660+'px';
        cible.style.height = 20 +"px";
        cible.style.width = 20 +"px";
        terrain.appendChild(cible);
    }
    else if(niveaux == 3){
        cible.style.top = Math.random()*360+'px';
        cible.style.left = Math.random()*960+'px';
        cible.style.height = 20 +"px";
        cible.style.width = 20 +"px";
        terrain.appendChild(cible);
    }
    else{
        cible.style.top = Math.random()*360+'px';
        cible.style.left = Math.random()*1260+'px';
        cible.style.height = 15 +"px";
        cible.style.width = 15 +"px";
        terrain.appendChild(cible);
    }
    remaining.innerHTML = cibles.length;
};

// this function for deliting tagrets from the area when they are clicked
document.addEventListener('click',function(e){
    var cibleClicker = e.cible || e.srcElement;
    for(i=0; i <= cibles.length;i++){
        if(cibleClicker == cibles[i]){
            remaining.innerHTML = cibles.length-1;
            cibleClicker.setAttribute('class','target on hit');
            setTimeout(function(){cibleClicker.remove();}, 1000) ;
        };
    };
});


// this function start and end the game
var index = 0;
start.addEventListener('click',startGame);
function startGame(){
    if(index == 0){
        if(nbtargets.value<1 || nbtargets.value>99){
            alert('essayez de donner un nombre entre 1 et 99');
        }
        else{
            var beforeGameStart = cibles.length
            for(i=0; i < beforeGameStart ;i++){
                cibles[0].remove()
            };
            start.firstChild.data = "Stop";
            for(i=0; i<nbtargets.value; i++){
                createCible()
            };
            remaining.innerHTML = cibles.length;
            x = setInterval(chrono,100);
            index = 1;
        };
    }
    else{
        index = 0;
        var current = cibles.length;
        for(i=0; i< current; i+= 1){
            cibles[0].remove();
            remaining.innerHTML = cibles.length;
        };
        start.firstChild.data = "Démarrer";
        alert("vous perdrez votre score actuel");
        remaining.innerHTML = cibles.length;
        clearInterval(x,10);
        m=0;
        s=0;
        t=0;
        tenth.innerHTML = 0;
        seconds.innerHTML = 00;
        minutes.innerHTML = 0;
    } ;
};


