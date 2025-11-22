// =========================
// GLOBAL VARIABLES
// =========================
let isMuted = false;

// =========================
//  SCENES
// =========================

const scenes = {
  start: {
    text: `<h1>Escape the Flood</h1>
    <p>Can you escape before the flood?</p>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "", 
    fade: true,
    choices: [{ text: "Wake up in your cell", next: "cell" }]
  },
  cell: {
    text: `<h1>You wake up...</h1>
    <br>
    <p>You wake up to the sounds of heavy rain and occasional thunder. The room is damp, dim, and has an inescapable sense of dread.</p>
    <p>You realize that it's a prison cell. You begin to wonder what landed you here, but you notice a small white notebook with words written down on it.</p>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "You read the notebook", next: "notebookView" },
    ]
  },
  
    notebookView: {
    text: `<img src="assets/img/notebook.jpg" class="scene-notebook">`,
    img: "assets/img/start.jpg",
    sound: "assets/sfx/notebook.mp3", 
    fade: true,
    choices: [
      { text: "Close", next: "cellLeft" }
    ]
  },
  
  
  cellLeft: {
    text: `<h1>After reading the list,</h1>
    <br>
    <p>You suddenly have more questions than answers. Who's Jerry? What do you mean, don't die? Who even wrote this?</p>
    <p>After spending a moment to ponder, a drop of cold rain drips onto the notebook, causing the fresh ink to smear off the page.</p>
    <p>Looking around the room a bit more, you see there's a door with a small barred window behind you.</p>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Yell for Jerry", next: "jerryScene" },
      { text: "Look out the window", next: "viewport" },
      { text: "Give up", next: "giveUp" }
    ]
  },
  jerryScene: {
    text: `<h1>Yell for Jerry</h1>
    <br>
    <p>You call out for someone named Jerry. Other than a faint echo, you get no response.</p>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "assets/sfx/hey.mp3", 
    fade: true,
    choices: [
      { text: "Try something else", next: "cellLeft" },
    ]
  },
    giveUp: {
    text: `<h1>You give up - <span class="red-text">Ending 1</span></h1>
    <br>
    <p>You decide to just give up. You decide not to fight anything anymore. All hope is gone, now that you're trapped in a small cell. Nobody is around you as far as you can tell.</p>
    <p>Between thhe blasts of occasional thunder, you hear the rain gain intensity outside. That drip turned into a stream, which turned into a gush of cold, dark water flowing into your cell.</p>
    <p>The water begins to rapidly fill the room, up to the ceiling. You lie in silence, slowly losing the ability to breathe. Your vision fades to black, and slowly, your conscious falls into nothing.</p>
    <h1>You lose.</h1>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Try again?", next: "start" },
    ]
  },
    viewport: {
    text: `<h1>You look out the window...</h1>
    <br>
    <p>You look out the small window in the door. You see a series of cells, each as damp and dank as the one you are stuck in. </p>
    <p>You also notice the fluorescent flickering bulbs in the reflections of the puddles of water on the floor. You don't notice much else until you hear the sound of something shifting in the dark.</p>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "What is that?", next: "whatIsThat" },
    ]
  },
  
    whatIsThat: {
    text: `<h1>What is that?</h1>
    <br>
    <p>You hear a shifting sound in the dark, and notice a shadow slowly moving in your direction. You realize there's a person out there, coming towards your cell. You hear heavy breathing, closer and closer, outside the door.</p>
    <p>A figure approaches the door. You see the man: Disheveled, older, and relatively thin, but breathing heavily and slightly struggling to do so. You notice he's wearing a dull orange jumpsuit. He looks up to you with hazel eyes, and smiles a crooked but relieved smile.</p>
    <p>"Hey there, champ."</p>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Who are you?", next: "jerryQuestionMark" },
    ]
  },
  
    
    jerryQuestionMark: {
    text: `<h1>Who are you?</h1>
    <br>
    <p>The man laughs slightly and says, "Forgot me already, did ya? It's all good. Name's Jerry. How's that head of yours?"</p>
    <p>You don't recall ever meeting this person, nor do you even recall who you are yourself. You feel a drip of something thicker than water come from your head, and realize your head is slightly bleeding. Your head is bandaged, and you begin to feel a twinge of pain radiating from the gash in your head.</p>
    <p>"Better keep an eye on that, buddy." Jerry points out, with slight concern in his expression. He lifts his bandaqed hand up and places what appears to be a rusted skeleton key into your door's keyhole. He unlocks the door.</p>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "assets/sfx/laugh.mp3", 
    fade: true,
    choices: [
      { text: "Push open the door", next: "helpJerry" },
    ]
  },
  
      
    helpJerry: {
    text: `<h1>You open the door</h1>
    <br>
    <p>The door squeaks in agony, barely having ever been used. You're still not sure where you are or how you got here. You turn to Jerry, who is no longer smiling. He kneels down, now seemingly quite pallor. He looks up at you, sweat drops forming on his head.</p>
    <p>"Hey champ, can you go to the lunch room and grab me one of those red bottles of, uh, juice? I'm diabetic and my uh, sugars are low. Hey, yeah, you remember where the cafe is, yeah? Down that hall, towards the guard booth. Yeah, you'll be fine, go on, now." Jerry looks back down, and places his fingertips to his forehead.</p>
    <p>He seems pretty legitimate, and he just helped you out, so you decide to comply. Maybe you'll find out where you are by exploring a bit, as well.</p>
    <br>`,
    img: "assets/img/start.jpg",
    sound: "assets/sfx/door-squeak.mp3", 
    fade: true,
    choices: [
      { text: "Head down the hallway", next: "hallwayMain" },
    ]
  },
  
        
    hallwayMain: {
    text: `<h1>You head towards the hallway</h1>
    <br>
    <p>You turn towards the rusty, moist hallway and come across threee different options. Remember: You are looking for some sort of red juice in the cafe for Jerry.</p> 
    <p>You decide to...</p>
    <br>`,
    img: "assets/img/hall.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Look to your left", next: "hallwayLeft" },
      { text: "Look to your right", next: "hallwayRight" },
      { text: "Move forward", next: "hallwayForward" },
    ]
  },
  
      hallwayLeft: {
    text: `<h1>You look to your left and</h1>
    <br>
    <p>You notice an open cell with a thin but clean bed. The mattress appears to have never been used before. The cell does not appear to be locked.</p>
    <p>You don't need to go in there.</p>
    <br>`,
    img: "assets/img/cell-left.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Back", next: "hallwayMain" },
    ]
  },
  
        hallwayRight: {
    text: `<h1>You look to your right</h1>
    <br>
    <p>You notice a very dark cell to your right. The door appears to be chained shut. You aren't entirely sure if anything or anyone is locked up behind the barred door, but you decide you don't want to find out.</p>
    <p>You don't need to go in there.</p>
    <br>`,
    img: "assets/img/cell-right.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Back", next: "hallwayMain" },
    ]
  },
  
        hallwayForward: {
    text: `<h1>You move forward</h1>
    <br>
    <p>You walk forward swiftly, but gracefully, avoiding multiple puddles forming slowly on the cold concrete ground.</p>
    <p>You eventually come up to what appears to be a dimly lit guard station. You step up to the window and notice a small sign on the counter that says "ring bell" and a small red bell next to the sign.</p>
    <br>`,
    img: "assets/img/guards.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Ring the bell", next: "ringBell" },
    ]
  },
  
          ringBell: {
    text: `<h1>You ring the bell</h1>
    <br>
    <p>The sound of the red bell permeates the empty, wet concrete halls. After what feels like several seconds, you hear a voice coming from the back of the booth.</p>
    <p>"Wha-what do you need!?" The voice appears to be that of an older, thicker male. The voice is slurred and sloshy, as if the person speaking has been drinking too much of something.</p>
    <p>You hesitate, but decide to ask:</p>
    <br>`,
    img: "assets/img/guards.jpg",
    sound: "assets/sfx/bell.wav", 
    fade: true,
    choices: [
      { text: "Where is the cafeteria?", next: "whereCafe" },
    ]
  },
  
            whereCafe: {
    text: `<h1>Where's the cafe?</h1>
    <br>
    <p>*Hic* "You should know, fella!" *Hic* "Jus..Just go down the hall, to the left, go on, shoo!" *Hic*</p>
    <p>The voice increases in inebriation and you decide it's best not to ask any further questions. 
    <br>`,
    img: "assets/img/guards.jpg",
    sound: "assets/sfx/hiccup.mp3",
    fade: true,
    choices: [
      { text: "Go down the hall", next: "cafeteriaMain" },
    ]
  },
  
              cafeteriaMain: {
    text: `<h1>Cafeteria</h1>
    <br>
    <p>You walk into the dreary greyscale cafeteria. There are several cracks in the ceiling and persistent drips of heavy water coming from them.</p>
    <p>You decide to...</p>
    <br>`,
    img: "assets/img/cafeteria.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Pick up juice", next: "juicePickup" },
    ]
  },
  
    juicePickup: {
    text: `<img src="assets/img/juice.jpg" class="scene-notebook">`,
    img: "assets/img/cafeteria.jpg",
    sound: "", 
    fade: true,
    choices: [
      { text: "Okay", next: "cafeteriaMain" },
    ]
  },
  

  
  
};

// =========================
// AUDIO UTILITIES
// =========================
function startBackgroundAudio() {
  if (isMuted) return;

  const bgAudio = document.getElementById("bg-audio");
  bgAudio.loop = true;
  bgAudio.volume = 0.4;
  bgAudio.play().catch(() => console.warn("Background audio blocked"));

  const thunder = document.getElementById("thunder");
  const minDelay = 30000;
  const maxDelay = 90000;

  function scheduleThunder() {
    if (isMuted) return;
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    setTimeout(() => {
      thunder.currentTime = 0;
      thunder.play().catch(() => {});
      scheduleThunder();
    }, delay);
  }

  scheduleThunder();
}

// Universal play function that respects mute
function playSound(src) {
  if (isMuted || !src) return;
  const sfx = new Audio(src);
  sfx.play().catch(() => {});
}

// =========================
// BLUR TRANSITION
// =========================
function runBlurTransition(callback) {
  const overlay = document.getElementById("blur-overlay");
  if (!overlay) return callback();

  overlay.classList.add("active"); // blur + darken

  setTimeout(() => {
    callback(); // swap content while overlay is active
    overlay.classList.remove("active"); // unblur
  }, 400); // match CSS transition duration
}

// =========================
// SCENE HANDLING
// =========================
function loadScene(sceneName) {
  const scene = scenes[sceneName];
  if (!scene) {
    console.error("Scene not found:", sceneName);
    return;
  }

  const sceneBox = document.getElementById("scene");
  const choicesBox = document.getElementById("choices");
  if (!sceneBox || !choicesBox) return;

  const applyScene = () => {
    // Play optional scene sound
    playSound(scene.sound);

    // Set background
    document.body.style.backgroundImage = `url(${scene.img})`;

    // Set scene text
    const formattedText = scene.text.replace(/<br\s*\/?>/gi, '<span class="small-gap"></span>');
    sceneBox.innerHTML = formattedText;

    // Populate choices
    choicesBox.innerHTML = "";
    if (scene.choices) {
      scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.addEventListener("click", () => loadScene(choice.next));
        choicesBox.appendChild(button);
      });
    }
  };

  if (scene.fade === true) {
    runBlurTransition(applyScene);
  } else {
    applyScene();
  }
}

// =========================
// SPLASH SCREEN HANDLER
// =========================
window.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const playBtn = document.getElementById("splash-play");
  const muteBtn = document.getElementById("splash-mute");
  const gameContainer = document.getElementById("game-container");

  // Play with sound
  playBtn.addEventListener("click", () => {
    isMuted = false;
    startBackgroundAudio();
    loadScene("start");

    splash.style.opacity = "0";
    splash.style.transition = "opacity 0.6s ease";
    setTimeout(() => splash.style.display = "none", 600);
    gameContainer.classList.remove("hidden");
  });

  // Mute
  muteBtn.addEventListener("click", () => {
    isMuted = true;
    loadScene("start");

    splash.style.opacity = "0";
    splash.style.transition = "opacity 0.6s ease";
    setTimeout(() => splash.style.display = "none", 600);
    gameContainer.classList.remove("hidden");
  });
});

// =========================
//  INIT
// =========================
window.addEventListener("load", () => {

});
