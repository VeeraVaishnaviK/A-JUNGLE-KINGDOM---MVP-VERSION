/* ==========================================================================
   Studio Ghibli Opening, Password, & Gorilla Scene Script — Story Coordinator
   ========================================================================== */

const initAllGhibliJungle = () => {
  // ==========================================================================
  // --- DOM Element Selectors (Shared & Scene 1) ---
  // ==========================================================================
  const sceneOpening = document.getElementById("scene-opening");
  const scenePassword = document.getElementById("scene-password");
  const sceneGorilla = document.getElementById("scene-gorilla");
  
  const typewriterElement = document.getElementById("typewriter-text");
  const babyPanda = document.getElementById("baby-panda");
  const glowingLetter = document.getElementById("glowing-letter");
  const envelope = glowingLetter.querySelector(".envelope");
  const adventureSign = document.getElementById("adventure-sign");
  const startBtn = document.getElementById("start-btn");
  
  // Scene 1 Panda SVG Facial Layer Selectors
  const eyesSleeping = babyPanda.querySelector(".eyes-sleeping");
  const eyesYawning = babyPanda.querySelector(".eyes-yawning");
  const eyesHappy = babyPanda.querySelector(".eyes-happy");
  const mouthSleeping = babyPanda.querySelector(".mouth-sleeping");
  const mouthYawning = babyPanda.querySelector(".mouth-yawning");
  const mouthHappy = babyPanda.querySelector(".mouth-happy");

  const bird = document.querySelector(".bird-1");

  let welcomeFinished = false;
  let letterOpened = false;

  // ==========================================================================
  // --- DOM Element Selectors (Scene 2) ---
  // ==========================================================================
  const passwordSignboard = document.getElementById("password-signboard");
  const passwordInput = document.getElementById("password-input");
  const passwordForm = document.getElementById("password-form");
  const attemptCounter = document.getElementById("attempt-counter");
  const fallingLeavesContainer = document.getElementById("falling-leaves-container");
  const bloomingFlowersGarden = document.getElementById("blooming-flowers-garden");
  const bambooGates = document.getElementById("bamboo-gates");

  const watchdogPanda = document.getElementById("watchdog-panda");
  const speechBubble = document.getElementById("panda-speech-bubble");
  const speechText = document.getElementById("speech-text");

  // Scene 2 Watchdog Panda SVG Expressions
  const wdEyesStandard = watchdogPanda.querySelector(".eyes-standard");
  const wdEyesSad = watchdogPanda.querySelector(".eyes-sad");
  const wdEyesSniffle = watchdogPanda.querySelector(".eyes-sniffle");
  const wdEyesCrying = watchdogPanda.querySelector(".eyes-crying");
  const wdEyesSuccess = watchdogPanda.querySelector(".eyes-success");

  const wdMouthStandard = watchdogPanda.querySelector(".mouth-standard");
  const wdMouthSad = watchdogPanda.querySelector(".mouth-sad");
  const wdMouthSniffle = watchdogPanda.querySelector(".mouth-sniffle");
  const wdMouthCrying = watchdogPanda.querySelector(".mouth-crying");
  const wdMouthSuccess = watchdogPanda.querySelector(".mouth-success");

  // Game States (Scene 2)
  const TARGET_PASSWORD = "03/06/2006";
  let attemptsRemaining = 3;
  let bubbleTimeout = null;

  // ==========================================================================
  // --- DOM Element Selectors (Scene 3) ---
  // ==========================================================================
  const stoneGate = document.querySelector(".stone-gate-container");
  const blockingVines = document.getElementById("gorilla-blocking-vines");
  const gorillaSpeechText = document.getElementById("gorilla-speech-text");
  const gorillaSpeechWrapper = document.getElementById("gorilla-speech-wrapper");
  const gorillaContainer = document.getElementById("gorilla-container");
  
  const iamRejoBtn = document.getElementById("iam-rejo-btn");
  const notRejoBtn = document.getElementById("not-rejo-btn");
  const gorillaRetryBtn = document.getElementById("gorilla-retry-btn");

  // Scene 3 Gorilla SVG Expressions
  const gorEyesStandard = gorillaContainer.querySelector(".gor-eyes-standard");
  const gorEyesStubborn = gorillaContainer.querySelector(".gor-eyes-stubborn");
  const gorEyesHappy = gorillaContainer.querySelector(".gor-eyes-happy");

  const gorMouthStandard = gorillaContainer.querySelector(".gor-mouth-standard");
  const gorMouthStubborn = gorillaContainer.querySelector(".gor-mouth-stubborn");
  const gorMouthHappy = gorillaContainer.querySelector(".gor-mouth-happy");

  let gorillaBubbleTimeout = null;

  // ==========================================================================
  // --- DOM Element Selectors (Scene 4) ---
  // ==========================================================================
  const sceneSurprise = document.getElementById("scene-surprise");
  const storyBookPage = document.getElementById("story-book-page");
  const surpriseYesBtn = document.getElementById("surprise-yes-btn");
  const surpriseNoBtn = document.getElementById("surprise-no-btn");
  const noBtnLeafContainer = document.getElementById("no-btn-leaf-container");

  const guiltPanda = document.getElementById("guilt-panda");
  const guiltGorilla = document.getElementById("guilt-gorilla");
  const guiltBuffalo = document.getElementById("guilt-buffalo");
  const guiltBoy = document.getElementById("guilt-boy");

  // ==========================================================================
  // --- DOM Element Selectors (Scene 5) ---
  // ==========================================================================
  const sceneBabyRejo = document.getElementById("scene-baby-rejo");
  const nurseryBookPage = document.getElementById("nursery-book-page");
  const nurseryNavigationSign = document.getElementById("nursery-navigation-sign");
  const nextChapterBtn = document.getElementById("next-chapter-btn");

  // ==========================================================================
  // --- DOM Element Selectors (Scene 6) ---
  // ==========================================================================
  const sceneMountain = document.getElementById("scene-mountain");

  // ==========================================================================
  // --- DOM Element Selectors (Scene 7 & Modal) ---
  // ==========================================================================
  const sceneFriendship = document.getElementById("scene-friendship");

  // ==========================================================================
  // 1. General Typewriter Animation Effect
  // ==========================================================================
  function typeWriter(element, text, speed = 80, callback = null) {
    element.textContent = "";
    let i = 0;
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        setTimeout(callback, 500);
      }
    }
    
    type();
  }

  // Type in bubble helper with pop animation (Scene 2)
  function typeInBubble(text, speed = 50) {
    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    speechBubble.classList.remove("hidden");
    typeWriter(speechText, text, speed);
  }

  // Type in bubble helper (Scene 3)
  function typeInGorillaBubble(text, speed = 50) {
    if (gorillaBubbleTimeout) clearTimeout(gorillaBubbleTimeout);
    typeWriter(gorillaSpeechText, text, speed);
  }

  // Start with Scene 1 Typewriter Intro
  typeWriter(typewriterElement, "Welcome Traveler...", 100, () => {
    welcomeFinished = true;
    triggerPandaAwakening();
  });

  // ==========================================================================
  // 2. Micro-Animations: Birb Visual Chirping
  // ==========================================================================
  function triggerBirdChirp() {
    if (bird) {
      bird.classList.add("chirping");
      setTimeout(() => {
        bird.classList.remove("chirping");
      }, 1800);
    }
    const nextChirp = 8000 + Math.random() * 7000;
    setTimeout(triggerBirdChirp, nextChirp);
  }
  
  setTimeout(triggerBirdChirp, 4000);

  // ==========================================================================
  // 3. Baby Panda Waking Up Sequence (Scene 1)
  // ==========================================================================
  function triggerPandaAwakening() {
    babyPanda.classList.remove("state-sleeping");
    babyPanda.classList.add("state-yawning");

    eyesSleeping.classList.add("hidden");
    eyesYawning.classList.remove("hidden");
    mouthSleeping.classList.add("hidden");
    mouthYawning.classList.remove("hidden");

    setTimeout(() => {
      babyPanda.classList.remove("state-yawning");
      
      eyesYawning.classList.add("hidden");
      eyesHappy.classList.remove("hidden");
      mouthYawning.classList.add("hidden");
      mouthHappy.classList.remove("hidden");

      setTimeout(() => {
        spawnMagicalLetter();
      }, 800);

    }, 2000);
  }

  function spawnMagicalLetter() {
    glowingLetter.classList.remove("hidden");
    typeWriter(typewriterElement, "A glowing letter drifts down...", 70);
  }

  glowingLetter.addEventListener("click", () => {
    if (letterOpened) return;
    letterOpened = true;

    envelope.classList.add("open");

    setTimeout(() => {
      typeWriter(typewriterElement, "Happy 20th Birthday Rejo! 🎉", 80);
    }, 400);

    setTimeout(() => {
      babyPanda.className = "panda-container state-joyful";
      
      eyesSleeping.classList.add("hidden");
      eyesYawning.classList.add("hidden");
      eyesHappy.classList.remove("hidden");
      mouthSleeping.classList.add("hidden");
      mouthYawning.classList.add("hidden");
      mouthHappy.classList.remove("hidden");
    }, 600);

    setTimeout(() => {
      adventureSign.classList.remove("hidden");
    }, 1500);
  });

  // ==========================================================================
  // 4. TRANSITION TO SCENE 2: PASSWORD TREEHOUSE (Night)
  // ==========================================================================
  startBtn.addEventListener("click", () => {
    startBtn.style.transform = "scale(0.9)";
    
    setTimeout(() => {
      sceneOpening.classList.remove("active-scene");
      sceneOpening.style.opacity = 0;
      
      setTimeout(() => {
        sceneOpening.classList.add("hidden");
        
        scenePassword.classList.remove("hidden");
        scenePassword.offsetHeight; 
        scenePassword.classList.add("active-scene");

        setTimeout(() => {
          typeInBubble("Halt, traveler! Only Rejo is allowed here... what is my birthday? 🐼", 45);
        }, 1200);

      }, 1000);
    }, 200);
  });

  // ==========================================================================
  // 5. PASSWORD FORM HANDLERS & WRONG PASSWORD ANIMATIONS
  // ==========================================================================
  passwordInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    } else if (value.length > 4) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
    }
    e.target.value = value;
  });

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const entered = passwordInput.value.trim();

    if (entered === TARGET_PASSWORD) {
      triggerSuccessSequence();
    } else {
      triggerIncorrectSequence();
    }
  });

  function triggerIncorrectSequence() {
    window.triggeredDrama = true;
    attemptsRemaining--;
    attemptCounter.textContent = attemptsRemaining;

    passwordSignboard.classList.add("shake-signboard");
    setTimeout(() => {
      passwordSignboard.classList.remove("shake-signboard");
    }, 500);

    passwordInput.value = "";

    if (attemptsRemaining === 2) {
      watchdogPanda.className = "panda-container state-watchdog sad-panda";
      setWatchdogExpression("sad");
      typeInBubble("Aiyo... that's not my birthday.", 50);

    } else if (attemptsRemaining === 1) {
      watchdogPanda.className = "panda-container state-watchdog sniffling-panda";
      setWatchdogExpression("sniffle");
      typeInBubble("Goluk Boluk forgot already? 😢", 55);

    } else if (attemptsRemaining <= 0) {
      watchdogPanda.className = "panda-container state-watchdog crying-panda";
      setWatchdogExpression("crying");
      typeInBubble("Even Eruma Maadu knows this!", 50);
      
      spawnFallingLeaves(16);

      passwordInput.disabled = true;
      passwordForm.querySelector(".enter-btn").disabled = true;
      
      setTimeout(() => {
        watchdogPanda.className = "panda-container state-watchdog";
        setWatchdogExpression("standard");
        
        attemptsRemaining = 3;
        attemptCounter.textContent = attemptsRemaining;
        
        passwordInput.disabled = false;
        passwordForm.querySelector(".enter-btn").disabled = false;
        passwordInput.focus();
        
        typeInBubble("I'll let you try again. Think carefully! 🎋", 50);
      }, 6000);
    }
  }

  function setWatchdogExpression(state) {
    wdEyesStandard.classList.add("hidden");
    wdEyesSad.classList.add("hidden");
    wdEyesSniffle.classList.add("hidden");
    wdEyesCrying.classList.add("hidden");
    wdEyesSuccess.classList.add("hidden");

    wdMouthStandard.classList.add("hidden");
    wdMouthSad.classList.add("hidden");
    wdMouthSniffle.classList.add("hidden");
    wdMouthCrying.classList.add("hidden");
    wdMouthSuccess.classList.add("hidden");

    if (state === "standard") {
      wdEyesStandard.classList.remove("hidden");
      wdMouthStandard.classList.remove("hidden");
    } else if (state === "sad") {
      wdEyesSad.classList.remove("hidden");
      wdMouthSad.classList.remove("hidden");
    } else if (state === "sniffle") {
      wdEyesSniffle.classList.remove("hidden");
      wdMouthSniffle.classList.remove("hidden");
    } else if (state === "crying") {
      wdEyesCrying.classList.remove("hidden");
      wdMouthCrying.classList.remove("hidden");
    } else if (state === "success") {
      wdEyesSuccess.classList.remove("hidden");
      wdMouthSuccess.classList.remove("hidden");
    }
  }

  function spawnFallingLeaves(count) {
    fallingLeavesContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const leaf = document.createElement("div");
      leaf.classList.add("falling-leaf");
      const startX = Math.random() * 100 + "%";
      const delay = Math.random() * 2 + "s";
      const duration = 2.5 + Math.random() * 2.5 + "s";
      const scale = 0.5 + Math.random() * 0.8;
      
      leaf.style.setProperty("--start-x", startX);
      leaf.style.animationDelay = delay;
      leaf.style.animationDuration = duration;
      leaf.style.transform = `scale(${scale})`;
      
      const greenShades = ["#8caa46", "#699238", "#5b842a", "#9cb852"];
      leaf.style.backgroundColor = greenShades[Math.floor(Math.random() * greenShades.length)];
      
      fallingLeavesContainer.appendChild(leaf);
    }
  }

  // SUCCESS SEQUENCE
  function triggerSuccessSequence() {
    passwordInput.disabled = true;
    passwordForm.querySelector(".enter-btn").disabled = true;

    watchdogPanda.className = "panda-container state-joyful";
    setWatchdogExpression("success");
    typeInBubble("Yay! You remembered! Rejo's Kingdom welcomes you! 🌸✨", 40);

    triggerPetalConfetti(45);

    setTimeout(() => {
      triggerFlowerGardenBlooms(12);
    }, 400);

    setTimeout(() => {
      bambooGates.classList.remove("hidden-gates");
      bambooGates.offsetHeight; 
      bambooGates.classList.add("open-gates");
    }, 1200);

    // E. TRANSITION TO SCENE 3: GORILLA GATEKEEPER
    setTimeout(() => {
      scenePassword.classList.add("camera-zoom-transition");
      
      setTimeout(() => {
        // Smoothly fade out Scene 2 & Bamboo gates completely
        scenePassword.classList.remove("active-scene");
        scenePassword.classList.add("hidden");
        bambooGates.classList.add("hidden-gates");
        bambooGates.classList.remove("open-gates");
        
        // Fade in Scene 3
        sceneGorilla.classList.remove("hidden");
        sceneGorilla.offsetHeight;
        sceneGorilla.classList.add("active-scene");

        // F. Trigger Gorilla dialog intro
        setTimeout(() => {
          typeInGorillaBubble("State Your Identity! 🦍", 45);
        }, 800);

      }, 1400);

    }, 2800);
  }

  function triggerPetalConfetti(count) {
    const colors = ["#ffb4b4", "#ffe0b4", "#fbc3bc", "#ffc8d2", "#e2c5ff", "#c5e2ff", "#ffcf54"];
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal-confetti");
      petal.style.left = "50vw";
      petal.style.top = "45vh";
      const angle = Math.random() * Math.PI * 2;
      const distance = 150 + Math.random() * 250;
      const xDist = Math.cos(angle) * distance + "px";
      const yDist = Math.sin(angle) * distance - 80 + "px";
      
      petal.style.setProperty("--x-dist", xDist);
      petal.style.setProperty("--y-dist", yDist);
      petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      petal.style.animationDuration = 2 + Math.random() * 2 + "s";
      petal.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(petal);
      setTimeout(() => { petal.remove(); }, 4000);
    }
  }

  function triggerFlowerGardenBlooms(count) {
    bloomingFlowersGarden.innerHTML = "";
    const flowerColors = ["#ff8a8a", "#ffa4d4", "#ffcd5c", "#7ed8ad", "#a688e8", "#88cbeb"];
    for (let i = 0; i < count; i++) {
      const svgContainer = document.createElement("div");
      svgContainer.classList.add("success-flower");
      const width = 30 + Math.random() * 25;
      const height = 60 + Math.random() * 40;
      const delay = (i * 0.1) + "s";
      svgContainer.style.width = width + "px";
      svgContainer.style.height = height + "px";
      svgContainer.style.animationDelay = delay;

      const fColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      const leafColor = "#699238";
      svgContainer.innerHTML = `
        <svg viewBox="0 0 40 80" width="100%" height="100%">
          <path d="M 20,80 Q ${15 + Math.random()*10},50 20,25" fill="none" stroke="${leafColor}" stroke-width="3" />
          <path d="M 20,60 Q 5,55 10,48 Z" fill="${leafColor}" />
          <path d="M 20,45 Q 35,42 30,35 Z" fill="${leafColor}" />
          <circle cx="20" cy="20" r="10" fill="${fColor}" />
          <circle cx="12" cy="20" r="6" fill="${fColor}" />
          <circle cx="28" cy="20" r="6" fill="${fColor}" />
          <circle cx="20" cy="12" r="6" fill="${fColor}" />
          <circle cx="20" cy="28" r="6" fill="${fColor}" />
          <circle cx="20" cy="20" r="4.5" fill="#fff5cc" />
        </svg>
      `;
      bloomingFlowersGarden.appendChild(svgContainer);
    }
  }


  // ==========================================================================
  // --- SCENE 3: GORILLA GATEKEEPER INTERACTION LOGIC ---
  // ==========================================================================

  // BRANCH A: 😶 NOT REJO (Denied access, gorilla grow blocks, vines lock screen)
  notRejoBtn.addEventListener("click", () => {
    // 1. scowl face expression SVG toggling
    setGorillaExpression("stubborn");

    // 2. dialogue change
    typeInGorillaBubble("This kingdom belongs to Rejo. No entry! 😡", 40);

    // 3. Gorilla grow scale and arms crossing
    gorillaContainer.className = "gorilla-character-container state-grow";

    // 4. Vines overlay slides in offscreen
    blockingVines.classList.add("vines-active");

    // 5. Buttons toggling: hide standard, show try again tablet
    iamRejoBtn.classList.add("hidden");
    notRejoBtn.classList.add("hidden");
    gorillaRetryBtn.classList.remove("hidden");
  });

  // BRANCH B: 🌿 UNDO RETRY BUTTON (Restores standard gatekeeper state)
  gorillaRetryBtn.addEventListener("click", () => {
    // 1. restore standard face
    setGorillaExpression("standard");

    // 2. dialogue resets
    typeInGorillaBubble("State Your Identity! 🦍", 45);

    // 3. Restore scale & idle wobble
    gorillaContainer.className = "gorilla-character-container state-idle";

    // 4. Retract blocking vines
    blockingVines.classList.remove("vines-active");

    // 5. Restore standard button tablets
    iamRejoBtn.classList.remove("hidden");
    notRejoBtn.classList.remove("hidden");
    gorillaRetryBtn.classList.add("hidden");
  });

  // BRANCH C: 😎 I AM REJO (Victory path, happy dance jig, stone gate light portal)
  iamRejoBtn.addEventListener("click", () => {
    // 1. Happy face SVG toggling
    setGorillaExpression("success");

    // 2. Dialogue victory typing
    typeInGorillaBubble("Welcome, Rejo! We have been waiting for you! 🌟🚪", 40);

    // 3. Happy bouncy jig dance & spear shake animations
    gorillaContainer.className = "gorilla-character-container state-dance";

    // 4. Hide all identity tablet buttons
    iamRejoBtn.classList.add("hidden");
    notRejoBtn.classList.add("hidden");
    gorillaRetryBtn.classList.add("hidden");

    // 5. Stone gate portal parts and expands warm golden light
    setTimeout(() => {
      stoneGate.classList.add("active-portal");
      // celebratory flower petals confetti
      triggerPetalConfetti(55);
    }, 1000);

    // 6. Fade out Scene 3 & Parting Gate, Fade in Scene 4
    setTimeout(() => {
      sceneGorilla.classList.remove("active-scene");
      sceneGorilla.style.opacity = 0;
      
      setTimeout(() => {
        sceneGorilla.classList.add("hidden");
        
        sceneSurprise.classList.remove("hidden");
        sceneSurprise.offsetHeight; // Trigger layout reflow
        sceneSurprise.classList.add("active-scene");
        
        // Trigger 3D Book Page turn open
        setTimeout(() => {
          storyBookPage.classList.add("page-turn-active");
        }, 600);
        
      }, 1200);
    }, 2800);
  });

  // ==========================================================================
  // --- SCENE 4: READY FOR SURPRISE CHOICE INTERACTION ---
  // ==========================================================================
  let surpriseNoClicked = false;

  surpriseNoBtn.addEventListener("click", () => {
    window.triggeredDrama = true;
    if (surpriseNoClicked) return;
    surpriseNoClicked = true;

    // Sequentially reveal characters with wailing, workout, trot and quiver actions
    const charactersToReveal = [
      { element: guiltPanda, delay: 0 },
      { element: guiltGorilla, delay: 1800 },
      { element: guiltBuffalo, delay: 3600 },
      { element: guiltBoy, delay: 5400 }
    ];

    charactersToReveal.forEach((char) => {
      setTimeout(() => {
        if (char.element) {
          char.element.classList.remove("hidden-char");
          char.element.classList.add("visible-char");
        }
      }, char.delay);
    });

    // Banishment: NO button shakes in panic, runs away horizontally, shrinks and vanishes
    setTimeout(() => {
      if (noBtnLeafContainer) {
        noBtnLeafContainer.classList.add("run-away");
      }
      
      // Focus more attention on YES by pulsing it even larger
      if (surpriseYesBtn) {
        surpriseYesBtn.style.transform = "scale(1.2)";
      }
    }, 7200); // 5.4s (boy appears) + 1.8s delay = 7.2s
  });

  surpriseYesBtn.addEventListener("click", () => {
    // Mega petals confetti explosion
    triggerPetalConfetti(120);

    // Transition from Scene 4 to Scene 5 after 2 seconds
    setTimeout(() => {
      sceneSurprise.classList.remove("active-scene");
      sceneSurprise.style.opacity = 0;
      
      setTimeout(() => {
        sceneSurprise.classList.add("hidden");
        
        sceneBabyRejo.classList.remove("hidden");
        sceneBabyRejo.offsetHeight; // force layout reflow
        sceneBabyRejo.classList.add("active-scene");
        
        // Trigger 3D Book Page turn open
        setTimeout(() => {
          nurseryBookPage.classList.add("page-turn-active");
        }, 600);
        
        // Swing proceed button signboard down after 3 seconds
        setTimeout(() => {
          nurseryNavigationSign.classList.remove("hidden-sign-btn");
          nurseryNavigationSign.classList.add("visible-sign-btn");
        }, 3000);
        
      }, 1200);
    }, 2000);
  });

  // ==========================================================================
  // --- SCENE 5: CHAPTER 1 NEXT STEP CHOICE ---
  // ==========================================================================
  nextChapterBtn.addEventListener("click", () => {
    triggerPetalConfetti(100);

    setTimeout(() => {
      // Transition from Scene 5 to Scene 6
      sceneBabyRejo.classList.remove("active-scene");
      sceneBabyRejo.style.opacity = 0;

      setTimeout(() => {
        sceneBabyRejo.classList.add("hidden");

        sceneMountain.classList.remove("hidden");
        sceneMountain.offsetHeight; // trigger layout reflow
        sceneMountain.classList.add("active-scene");

        // Initialize Mountain Scroll Climb
        initMountainClimb();
      }, 1000);
    }, 1500);
  });

  // ==========================================================================
  // --- SCENE 6: CHAPTER 2: GORILLA MOUNTAIN CLIMB MECHANICS ---
  // ==========================================================================
  function initMountainClimb() {
    const scroller = document.getElementById("mountain-scroller");
    const trekPath = document.getElementById("mountain-trek-fill");
    const climber = document.getElementById("mountain-climber");
    const progressFill = document.getElementById("progress-leaf-fill");
    const progressIcon = document.querySelector(".progress-icon");
    const percentText = document.getElementById("climb-percent-text");
    const scrollTip = document.getElementById("mountain-scroll-tip");
    const peakSign = document.getElementById("mountain-navigation-sign");
    const peakBtn = document.getElementById("peak-proceed-btn");

    const chk1 = document.getElementById("chk-1");
    const chk2 = document.getElementById("chk-2");
    const chk3 = document.getElementById("chk-3");
    const chk4 = document.getElementById("chk-4");

    const critter1 = document.getElementById("peeking-critter-1");
    const critter2 = document.getElementById("peeking-critter-2");
    const critter3 = document.getElementById("peeking-critter-3");

    // Fetch SVG Winding Path Length dynamically
    const pathLength = trekPath.getTotalLength();
    
    // Initial SVG Stroke configuration
    trekPath.style.strokeDasharray = pathLength;
    trekPath.style.strokeDashoffset = pathLength;

    // Reset Climber position at START coordinates (0% along the winding pathway)
    const startPt = trekPath.getPointAtLength(0);
    climber.style.left = `${startPt.x}px`;
    climber.style.top = `${startPt.y}px`;

    // Footprints checklist mapping
    const footprints = [];
    for (let i = 1; i <= 19; i++) {
      footprints.push(document.getElementById(`footprint-${i}`));
    }

    let climberDebounceTimer = null;

    // Set initial scroll position to the bottom of the container (since we climb UP by scrolling UP)
    setTimeout(() => {
      scroller.scrollTop = scroller.scrollHeight - scroller.clientHeight;
    }, 100);

    // 1. Core Scroll Event Handler on the mountain container
    scroller.addEventListener("scroll", () => {
      const scrollTop = scroller.scrollTop;
      const scrollHeight = scroller.scrollHeight;
      const clientHeight = scroller.clientHeight;

      // Compute visual scroll percentage (0.0 to 1.0) - scroll up to climb
      const maxScroll = scrollHeight - clientHeight;
      const pct = maxScroll > 0 ? 1 - (scrollTop / maxScroll) : 0;

      // Progress Leaf Tracker updates
      const pctRounded = Math.min(Math.round(pct * 100), 100);
      percentText.textContent = pctRounded;
      progressFill.style.width = `${pctRounded}%`;
      progressIcon.style.left = `${pctRounded}%`;

      // Fade out scroll tip once traveler begins walking
      const scrolledDist = maxScroll - scrollTop;
      if (scrolledDist > 25) {
        scrollTip.classList.add("fade-out");
      } else {
        scrollTip.classList.remove("fade-out");
      }

      // Draw SVG Path progressively
      const drawLen = pathLength * pct;
      trekPath.style.strokeDashoffset = pathLength - drawLen;

      // Position Climber avatar on the SVG coordinates matching scroll progression
      const currentPt = trekPath.getPointAtLength(pct * pathLength);
      climber.style.left = `${currentPt.x}px`;
      climber.style.top = `${currentPt.y}px`;

      // Emit walking clouds / dust animation dynamically while moving
      climber.classList.add("climbing");
      clearTimeout(climberDebounceTimer);
      climberDebounceTimer = setTimeout(() => {
        climber.classList.remove("climbing");
      }, 150); // debounce duration for inactivity

      // Fade in footprints behind climber as vertical ascent matches target percentages
      footprints.forEach((print, idx) => {
        if (print) {
          const targetPct = (idx + 1) / 20;
          if (pct >= targetPct) {
            print.classList.add("active-print");
          } else {
            print.classList.remove("active-print");
          }
        }
      });

      // Reveal Critters & Unlock Checkpoint achievements at designated heights
      
      // Critter 1 (Bird): peeks at 10%
      if (pct >= 0.10) { critter1.classList.add("peek-in"); } 
      else { critter1.classList.remove("peek-in"); }

      // Checkpoint 1 (🍕 Snack Hunter): unlocks at 18% scroll
      if (pct >= 0.18) {
        if (chk1.classList.contains("locked-chk")) {
          chk1.classList.remove("locked-chk");
          chk1.classList.add("unlocked-chk");
          triggerStampUnlockConfetti(chk1);
        }
      } else {
        chk1.classList.remove("unlocked-chk");
        chk1.classList.add("locked-chk");
      }

      // Critter 2 (Gorilla): peeks at 35%
      if (pct >= 0.35) { critter2.classList.add("peek-in"); }
      else { critter2.classList.remove("peek-in"); }

      // Checkpoint 2 (😴 Sleeper): unlocks at 44% scroll
      if (pct >= 0.44) {
        if (chk2.classList.contains("locked-chk")) {
          chk2.classList.remove("locked-chk");
          chk2.classList.add("unlocked-chk");
          triggerStampUnlockConfetti(chk2);
        }
      } else {
        chk2.classList.remove("unlocked-chk");
        chk2.classList.add("locked-chk");
      }

      // Critter 3 (Soot Sprite): peeks at 60%
      if (pct >= 0.60) { critter3.classList.add("peek-in"); }
      else { critter3.classList.remove("peek-in"); }

      // Checkpoint 3 (🎭 Drama): unlocks at 68% scroll
      if (pct >= 0.68) {
        if (chk3.classList.contains("locked-chk")) {
          chk3.classList.remove("locked-chk");
          chk3.classList.add("unlocked-chk");
          triggerStampUnlockConfetti(chk3);
        }
      } else {
        chk3.classList.remove("unlocked-chk");
        chk3.classList.add("locked-chk");
      }

      // Checkpoint 4 (🍔 Goluk Boluk): unlocks at 90% scroll
      if (pct >= 0.90) {
        if (chk4.classList.contains("locked-chk")) {
          chk4.classList.remove("locked-chk");
          chk4.classList.add("unlocked-chk");
          triggerStampUnlockConfetti(chk4);
        }
      } else {
        chk4.classList.remove("unlocked-chk");
        chk4.classList.add("locked-chk");
      }

      // 100% Summit Peak Reached: show majestic wooden signboard proceed button
      if (pct >= 0.98) {
        peakSign.classList.remove("hidden-sign-btn");
        peakSign.classList.add("visible-sign-btn");
      } else {
        peakSign.classList.remove("visible-sign-btn");
        peakSign.classList.add("hidden-sign-btn");
      }
    });

    // 2. stamp-smash micro-confetti particle effect
    function triggerStampUnlockConfetti(checkpointElement) {
      triggerPetalConfetti(25); // splash ambient forest leaves
      // Play brief animation vibration
      checkpointElement.style.animation = "none";
      checkpointElement.offsetHeight; // reflow trigger
      checkpointElement.style.animation = "checkpointSwing 1s ease-in-out";
    }

    // 3. Wires Peak Proceed button to transition to Scene 7: Friendship Forest
    peakBtn.addEventListener("click", () => {
      triggerPetalConfetti(120);
      
      setTimeout(() => {
        // Transition from Scene 6 to Scene 7
        sceneMountain.classList.remove("active-scene");
        sceneMountain.style.opacity = 0;

        setTimeout(() => {
          sceneMountain.classList.add("hidden");

          sceneFriendship.classList.remove("hidden");
          sceneFriendship.offsetHeight; // force reflow
          sceneFriendship.classList.add("active-scene");

          // Initialize Chapter 3: Friendship Forest Garden
          initFriendshipForest();
        }, 1000);
      }, 1500);
    });
  }

  // ==========================================================================
  // --- SCENE 7: CHAPTER 3: FRIENDSHIP FOREST MECHANICS ---
  // ==========================================================================
  function initFriendshipForest() {
    if (window.friendshipForestInitialized) return;
    window.friendshipForestInitialized = true;

    const memoryModal = document.getElementById("memory-card-modal");
    const modalDoodle = document.getElementById("modal-doodle");
    const modalCaption = document.getElementById("modal-caption-text");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalOverlay = memoryModal.querySelector(".modal-overlay");

    const closingText = document.getElementById("friendship-closing-text");
    const closingSign = document.getElementById("friendship-navigation-sign");
    const celebrateBtn = document.getElementById("celebrate-btn");

    const memoryTriggers = document.querySelectorAll(".memory-trigger");
    const viewedMemories = window.friendshipViewedMemories || new Set();
    window.friendshipViewedMemories = viewedMemories;

    // Map memory types to full handwritten story narratives and original jpegs display tags
    const memoryData = {
      first_selfie: {
        doodle: `<img src="assets/rs9.jpeg" class="modal-big-photo" alt="Our 1st Selfie" />`,
        caption: "<strong>Our Very First Selfie 📸❤️</strong><br><br>The historical archive where it all began—our very first selfie together! Looking back, we were a little shy but had the warmest smiles, entirely unaware of the beautiful, chaotic, and magical journey of friendship that lay ahead of us. This simple picture holds the spark of a thousand memories.<br><br><em>\"Every beautiful story has a small, simple beginning.\"</em>"
      },
      pondy: {
        doodle: `<img src="assets/rs4.jpeg" class="modal-big-photo" alt="Pondy Trip" />`,
        caption: "<strong>Pondy Trip (Boat Ride) ⛵🌊</strong><br><br>The serene boat ride during our memorable trip to Pondicherry. Drifting along the calm waters, wind in our hair, and endless banter under the golden sun. The ocean felt vast that day, but our shared laughter made it feel like our own cozy little harbor.<br><br><em>\"A good friend is like a calm harbor in a vast, stormy sea.\"</em>"
      },
      delhi: {
        doodle: `<img src="assets/rs5.jpeg" class="modal-big-photo" alt="Delhi Trip" />`,
        caption: "<strong>Delhi Trip Flight Together ✈️☁️</strong><br><br>Our first flight together on our grand Delhi adventure! Tucked into our tiny airplane seats, looking out of the window at the fluffy sea of clouds, and giggling nervously during takeoff. Soaring high above, we realized our friendship was embarking on its highest flight.<br><br><em>\"It doesn't matter where you're going, it's who you travel with.\"</em>"
      },
      pongal: {
        doodle: `<img src="assets/rs3.jpeg" class="modal-big-photo" alt="Pongal Celeb" />`,
        caption: "<strong>Pongal Celebration 🌾✨</strong><br><br>Celebrating the beautiful Pongal festival together in vibrant traditional gear, surrounded by warm smiles and sweet sugarcane. Laughing over the boiling milk and sharing the sweet pot, it was a day filled with gratitude, warmth, and joint blessings.<br><br><em>\"Some friendships are like sweet Pongal—warm, nourishing, and bringing joy to the heart.\"</em>"
      },
      cafe: {
        doodle: `<img src="assets/rs6.jpeg" class="modal-big-photo" alt="Cafe Selfie" />`,
        caption: "<strong>Cafe Mirror Selfie ☕🤳</strong><br><br>Snapping a silly mirror selfie at our favorite cozy cafe. Surrounded by the rich aroma of fresh coffee and sweet pastries, we spent hours talking about everything and nothing. These simple cafe mirror clicks capture the essence of our everyday fun.<br><br><em>\"A selfie is just a moment, but a coffee date with a best friend is a lifelong memory.\"</em>"
      },
      candid: {
        doodle: `<img src="assets/rs7.jpeg" class="modal-big-photo" alt="Candid Pic" />`,
        caption: "<strong>A Pure Candid Moment 🍃✨</strong><br><br>A beautiful candid photo capturing a moment of pure, unscripted happiness. Unaware of the camera, just laughing from the bottom of our hearts. It's the silent, unposed moments like these that show the true comfort and comfort of our bond.<br><br><em>\"The most beautiful moments are the ones we never planned to capture.\"</em>"
      },
      hospital: {
        doodle: `<img src="assets/rs8.jpeg" class="modal-big-photo" alt="Hospital Care" />`,
        caption: "<strong>Hospital Care & Shield ❤️🏥</strong><br><br>When times got tough and health failed, you stood by me like a protective shield. Hospitalized and weak, you were the one who stayed, cared for me, and brought light to the gloomy ward. Your care and dedication proved that you are more than a friend—you are family.<br><br><em>\"A friend is someone who walks in when the rest of the world walks out.\"</em>"
      },
      growing: {
        doodle: `<img src="assets/rs10.jpeg" class="modal-big-photo" alt="Growing Together" />`,
        caption: "<strong>Growing Side by Side 🌳🌸</strong><br><br>From silly childlike teenagers to walking together into our twenties. We've weathered storms, celebrated milestones, and grown side-by-side. Watching each other evolve while keeping our bond completely unchanged is the ultimate blessing.<br><br><em>\"Growing apart doesn't change the fact that for a long time we grew side by side.\"</em>"
      }
    };

    // Tracks sparkle timer so we can clear it when necessary
    let sparkleInterval = null;

    // Helper to dynamically spawn golden sparkles around the celebrate button
    function spawnSparkle() {
      if (!closingSign.classList.contains("unlocked-state")) return;
      const sparkle = document.createElement("div");
      sparkle.classList.add("celebrate-sparkle");
      sparkle.textContent = ["✨", "🌟", "🌸", "🌿"][Math.floor(Math.random() * 4)];
      
      // Compute random boundaries around the button board
      const board = closingSign.querySelector(".wooden-board");
      if (!board) return;
      const rect = board.getBoundingClientRect();
      const relativeLeft = Math.random() * rect.width;
      const relativeTop = Math.random() * rect.height;
      
      sparkle.style.left = `${relativeLeft}px`;
      sparkle.style.top = `${relativeTop}px`;
      
      // Random drift coordinates
      const xDrift = (Math.random() - 0.5) * 80;
      const yDrift = -30 - Math.random() * 50;
      sparkle.style.setProperty("--x", `${xDrift}px`);
      sparkle.style.setProperty("--y", `${yDrift}px`);
      
      board.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 1600);
    }

    // 1. Expose robust global APIs for inline HTML click triggers (infallible navigation)
    window.showMemoryModal = function(memoryType) {
      const data = memoryData[memoryType];
      if (data) {
        // Trigger petal splash
        triggerPetalConfetti(20);

        // Populate worn paper story modal elements
        modalDoodle.innerHTML = data.doodle;
        modalCaption.innerHTML = data.caption;

        // Slide and flip modal open
        memoryModal.classList.remove("hidden-modal");
        memoryModal.offsetHeight; // trigger reflow
        memoryModal.classList.add("visible-modal");

        // Add to viewed memory checklist
        const originalSize = viewedMemories.size;
        viewedMemories.add(memoryType);

        // If a new memory was explored, update progress count!
        if (viewedMemories.size > originalSize && viewedMemories.size < 8) {
          const btnText = celebrateBtn.querySelector(".btn-text");
          if (btnText) {
            btnText.textContent = `Explore 8 Memories! (${viewedMemories.size}/8)`;
          }
        }

        // Once all 8 stories have been explored, unlock the dedicated closing signboards!
        if (viewedMemories.size === 8 && originalSize < 8) {
          // Unlock!
          setTimeout(() => {
            // Confetti unlock blast
            triggerPetalConfetti(60);

            // Update button classes
            closingSign.classList.remove("locked-state");
            closingSign.classList.add("unlocked-state");

            // Update button text and icon
            const btnLeaf = celebrateBtn.querySelector(".btn-leaf");
            const btnText = celebrateBtn.querySelector(".btn-text");
            if (btnLeaf) btnLeaf.textContent = "🌿";
            if (btnText) btnText.textContent = "Celebrate Rejo's Birthday! 🎂🎉";

            // Fade in emotional signature plaque
            closingText.classList.remove("hidden-closing");
            closingText.classList.add("visible-closing");

            // Start magical sparkling interval
            if (sparkleInterval) clearInterval(sparkleInterval);
            sparkleInterval = setInterval(spawnSparkle, 550);

          }, 800);
        }
      }
    };

    window.closeMemoryModal = function() {
      memoryModal.classList.remove("visible-modal");
      setTimeout(() => {
        memoryModal.classList.add("hidden-modal");
      }, 500); // match transition
    };

    // 3. Wires final celebratory complete button signboard
    let isWarningFlashed = false;
    celebrateBtn.addEventListener("click", () => {
      if (viewedMemories.size < 8) {
        // Locked warning interaction
        if (isWarningFlashed) return;
        isWarningFlashed = true;

        closingSign.classList.add("locked-shake");
        
        const btnLeaf = celebrateBtn.querySelector(".btn-leaf");
        const btnText = celebrateBtn.querySelector(".btn-text");
        const prevLeaf = btnLeaf ? btnLeaf.textContent : "🔒";

        if (btnLeaf) btnLeaf.textContent = "⚠️";
        if (btnText) btnText.textContent = "Click all 8 Polaroids! 🎋";

        setTimeout(() => {
          closingSign.classList.remove("locked-shake");
          if (btnLeaf) btnLeaf.textContent = prevLeaf;
          if (btnText) btnText.textContent = `Explore 8 Memories! (${viewedMemories.size}/8)`;
          isWarningFlashed = false;
        }, 1500);

        return;
      }

      // Unlocked celebration flow
      triggerPetalConfetti(150);
      
      setTimeout(() => {
        alert("✨🌿 CONGRATULATIONS TRAVELER! 🌿✨\n\nYou have fully unlocked the Ghibli Friendship Forest! 🎉🎂🌸\n\nNow, a secret Ghibli Playhouse has opened! Let's play some cute mini-games to unlock ultimate Ghibli achievements!");
        
        // Transition from Scene 7 to Scene 9 (Playhouse Room)
        const sceneGames = document.getElementById("scene-games");
        if (sceneGames) {
          sceneFriendship.classList.remove("active-scene");
          sceneFriendship.style.opacity = 0;

          setTimeout(() => {
            sceneFriendship.classList.add("hidden");

            sceneGames.classList.remove("hidden");
            sceneGames.offsetHeight; // force reflow
            sceneGames.style.opacity = 1;
            sceneGames.classList.add("active-scene");

            initPlayhouseSystem();
          }, 1000);
        }
      }, 300);
    });
  }

  // Helper to switch gorilla facial paths
  function setGorillaExpression(state) {
    gorEyesStandard.classList.add("hidden");
    gorEyesStubborn.classList.add("hidden");
    gorEyesHappy.classList.add("hidden");

    gorMouthStandard.classList.add("hidden");
    gorMouthStubborn.classList.add("hidden");
    gorMouthHappy.classList.add("hidden");

    if (state === "standard") {
      gorEyesStandard.classList.remove("hidden");
      gorMouthStandard.classList.remove("hidden");
    } else if (state === "stubborn") {
      gorEyesStubborn.classList.remove("hidden");
      gorMouthStubborn.classList.remove("hidden");
    } else if (state === "success") {
      gorEyesHappy.classList.remove("hidden");
      gorMouthHappy.classList.remove("hidden");
    }
  }

  // ==========================================================================
  // --- SCENE 8: SECRET DETECTIVE OFFICE SYSTEM ---
  // ==========================================================================

  const secretDetectiveBtn = document.getElementById("secret-detective-btn");
  const sceneDetective = document.getElementById("scene-detective");
  const detBackBtn = document.getElementById("det-back-btn");

  if (secretDetectiveBtn && sceneDetective) {
    secretDetectiveBtn.addEventListener("click", () => {
      // Transition from Scene 7 (Friendship Forest) to Scene 8 (Detective Office)
      triggerPetalConfetti(80);

      setTimeout(() => {
        sceneFriendship.classList.remove("active-scene");
        sceneFriendship.style.opacity = 0;

        setTimeout(() => {
          sceneFriendship.classList.add("hidden");

          sceneDetective.classList.remove("hidden");
          sceneDetective.offsetHeight; // force reflow
          sceneDetective.style.opacity = 1;
          sceneDetective.classList.add("active-scene");

          // Initialize Chapter 8: Secret Detective Office
          initDetectiveOffice();
        }, 1000);
      }, 800);
    });
  }

  if (detBackBtn && sceneDetective) {
    detBackBtn.addEventListener("click", () => {
      triggerPetalConfetti(60);

      setTimeout(() => {
        sceneDetective.classList.remove("active-scene");
        sceneDetective.style.opacity = 0;

        setTimeout(() => {
          sceneDetective.classList.add("hidden");

          sceneFriendship.classList.remove("hidden");
          sceneFriendship.style.opacity = 1;
          sceneFriendship.offsetHeight; // force reflow
          sceneFriendship.classList.add("active-scene");
        }, 1000);
      }, 800);
    });
  }

  function initDetectiveOffice() {
    const caseModal = document.getElementById("case-file-modal");
    const caseDoodle = document.getElementById("case-modal-doodle");
    const caseTitle = document.getElementById("case-modal-title");
    const caseCaption = document.getElementById("case-modal-caption-text");
    const caseCloseBtn = document.getElementById("case-modal-close-btn");
    const caseOverlay = caseModal ? caseModal.querySelector(".modal-overlay") : null;

    const folderTriggers = document.querySelectorAll(".folder-trigger");
    const humsContainer = document.getElementById("detective-hums");

    // Case dossiers mapping: accusations, titles, and custom SVG doodles
    const casesData = {
      goluk: {
        title: "CASE REPORT #041",
        stats: "🍕 FOOD CRIMES DIVISION",
        doodle: `<img src="assets/goluk_case.jpeg" class="modal-big-photo" alt="Food Crimes" />`,
        caption: `"ACCUSED OF SNACK HOMICIDE!"<br><br>Detailed case reports suggest the subject ordered a massive double-cheese pizza under the pretense of 'sharing with friends.' Upon arrival at the cozy treehouse kitchen, the subject barricaded the door and systematically consumed all 8 slices, leaving only crumbs and empty promises of calorie tracking.`
      },
      eruma: {
        title: "CASE REPORT #099",
        stats: "😴 SLEEP INSURGENCY DEPT",
        doodle: `<img src="assets/eruma_case.jpeg" class="modal-big-photo" alt="Sleep Crimes" />`,
        caption: `"CHAMPION SLEEPER ACQUITTED!"<br><br>The eruma maadu (water buffalo) files indicate extreme levels of horizontal hibernation. The suspect is documented sleeping through multiple alarm systems, Ghibli forest thunder storms, and heavy tea kettle whistlings. Sleep level: Over 9000. Guilty of professional sleeping!`
      },
      memes: {
        title: "CASE REPORT #404",
        stats: "🗂️ DIGITAL CONTRABAND",
        doodle: `<img src="assets/meme_case.jpeg" class="modal-big-photo" alt="Meme Crimes" />`,
        caption: `"UNAUTHORIZED MEME ACCUMULATION!"<br><br>Raids on the suspect's device cache uncovered a colossal, top-secret hoard of round panda reactions stickers, fuzzy soot sprite expressions, and extremely chaotic chats screenshots. The volume of reaction hoarding exceeds regional safety limits, posing a hazard of extreme laughter.`
      },
      suspicious: {
        title: "CASE REPORT #777",
        stats: "⚠️ DANGEROUS CUTE FORCE",
        doodle: `<img src="assets/suspicious_case.jpeg" class="modal-big-photo" alt="Cute Crimes" />`,
        caption: `"CRITICAL GHIBLI VIBE OVERLOAD!"<br><br>The detective agency reports abnormally high frequencies of warm feelings, cozy wiggles, and cute panda hugs emanating from the suspect. High-intensity smiles and extreme Ghibli storybook appreciation are verified. The suspect is ordered to proceed directly to cake eating!`
      }
    };

    // Tracks humming notes spawning interval
    let humInterval = null;

    // Helper to dynamically spawn floating notes
    function spawnHumNote() {
      if (!humsContainer) return;
      
      // Check if Detective Office is active
      const sceneDetective = document.getElementById("scene-detective");
      if (!sceneDetective || sceneDetective.classList.contains("hidden")) return;

      const note = document.createElement("div");
      note.classList.add("hum-note");
      note.textContent = ["♫", "♪", "🎶", "✨", "🎵"][Math.floor(Math.random() * 5)];

      // Random float offsets
      const dx = (Math.random() - 0.5) * 60;
      const dy = -40 - Math.random() * 60;
      note.style.setProperty("--dx", `${dx}px`);
      note.style.setProperty("--dy", `${dy}px`);

      // Spawn at a random position near the mouth
      note.style.left = `${30 + Math.random() * 20}px`;
      note.style.top = `${25 + Math.random() * 15}px`;

      humsContainer.appendChild(note);

      setTimeout(() => {
        note.remove();
      }, 2500);
    }

    // Start notes spawning interval
    if (humsContainer) {
      humInterval = setInterval(spawnHumNote, 1600);
    }

    // 1. Folders click triggers case dossier details modal
    folderTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const caseType = trigger.getAttribute("data-case");
        const caseData = casesData[caseType];

        if (caseData && caseModal) {
          triggerPetalConfetti(25);

          if (caseDoodle) caseDoodle.innerHTML = caseData.doodle;
          if (caseTitle) caseTitle.textContent = caseData.title;
          if (caseCaption) caseCaption.innerHTML = caseData.caption;

          const statsLabel = caseModal.querySelector(".log-stars");
          if (statsLabel) {
            statsLabel.textContent = caseData.stats;
          }

          // Open dossier modal
          caseModal.classList.remove("hidden-modal");
          caseModal.offsetHeight;
          caseModal.classList.add("visible-modal");
        }
      });
    });

    // 2. Close dossier modal
    function closeDossierModal() {
      if (caseModal) {
        caseModal.classList.remove("visible-modal");
        setTimeout(() => {
          caseModal.classList.add("hidden-modal");
        }, 500);
      }
    }

    if (caseCloseBtn) caseCloseBtn.addEventListener("click", closeDossierModal);
    if (caseOverlay) caseOverlay.addEventListener("click", closeDossierModal);

    // Keep active humInterval cleared if detective office exits
    const sceneDetective = document.getElementById("scene-detective");
    if (sceneDetective) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class" && sceneDetective.classList.contains("hidden")) {
            clearInterval(humInterval);
            observer.disconnect();
          }
        });
      });
      observer.observe(sceneDetective, { attributes: true });
    }
  }

  // ==========================================================================
  // --- SCENE 9: GHIBLI PLAYHOUSE MINI-GAMES SYSTEM ---
  // ==========================================================================

  // 1. Procedural Web Audio API Cartoon Sound Synthesizer
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playMunch() {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
      
      gainNode.gain.setValueAtTime(0.18, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) { console.log("Audio Error:", e); }
  }

  function playClack() {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) { console.log("Audio Error:", e); }
  }

  function playJump() {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.28);
      
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch (e) { console.log("Audio Error:", e); }
  }

  function playWin() {
    try {
      const ctx = getAudioContext();
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.35);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.35);
      });
    } catch (e) { console.log("Audio Error:", e); }
  }

  function playLose() {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.55);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.55);
    } catch (e) { console.log("Audio Error:", e); }
  }

  // 2. Playhouse Main Control System
  window.initPlayhouseSystem = function() {
    const playhouseHub = document.getElementById("playhouse-hub");
    const playhouseBackBtn = document.getElementById("playhouse-back-btn");
    
    // Select selectors
    const selectG1 = document.getElementById("select-game-1");
    const selectG2 = document.getElementById("select-game-2");
    const selectG3 = document.getElementById("select-game-3");

    // Viewports
    const viewports = {
      1: document.getElementById("game-viewport-1"),
      2: document.getElementById("game-viewport-2"),
      3: document.getElementById("game-viewport-3")
    };

    // Return to chapter 3 Garden click handler
    if (playhouseBackBtn) {
      playhouseBackBtn.addEventListener("click", () => {
        triggerPetalConfetti(60);
        const sceneGames = document.getElementById("scene-games");
        
        setTimeout(() => {
          sceneGames.classList.remove("active-scene");
          sceneGames.style.opacity = 0;

          setTimeout(() => {
            sceneGames.classList.add("hidden");

            sceneFriendship.classList.remove("hidden");
            sceneFriendship.style.opacity = 1;
            sceneFriendship.offsetHeight; // force reflow
            sceneFriendship.classList.add("active-scene");
          }, 1000);
        }, 800);
      });
    }

    // Go to Achievement Tree click handler
    const gotoTreeBtn = document.getElementById("playhouse-goto-tree-btn");
    const sceneGames = document.getElementById("scene-games");
    const sceneAchievements = document.getElementById("scene-achievements");

    if (gotoTreeBtn) {
      gotoTreeBtn.addEventListener("click", () => {
        playClack();
        triggerPetalConfetti(60);

        setTimeout(() => {
          sceneGames.classList.remove("active-scene");
          sceneGames.style.opacity = 0;

          setTimeout(() => {
            sceneGames.classList.add("hidden");

            sceneAchievements.classList.remove("hidden");
            sceneAchievements.offsetHeight; // force reflow
            sceneAchievements.style.opacity = 1;
            sceneAchievements.classList.add("active-scene");

            // Initialize Achievement Tree
            if (window.initAchievementsSystem) {
              window.initAchievementsSystem();
            }
          }, 1000);
        }, 800);
      });
    }

    // Go to Final Chapter (Scene 11) click handler
    const gotoFinalBtn = document.getElementById("playhouse-goto-final-btn");
    const sceneFinal = document.getElementById("scene-final");
    const sceneCinema = document.getElementById("scene-cinema");

    if (gotoFinalBtn) {
      gotoFinalBtn.addEventListener("click", () => {
        playClack();
        triggerPetalConfetti(80);

        setTimeout(() => {
          sceneGames.classList.remove("active-scene");
          sceneGames.style.opacity = 0;

          setTimeout(() => {
            sceneGames.classList.add("hidden");

            if (!window.cinemaViewed) {
              // First viewing: Trigger cinematic pre-finale bridge video!
              if (sceneCinema) {
                sceneCinema.classList.remove("hidden");
                sceneCinema.offsetHeight; // force reflow
                sceneCinema.style.opacity = 1;
                sceneCinema.classList.add("active-scene");

                if (window.initCinematicSequence) {
                  window.initCinematicSequence();
                }
              }
            } else {
              // Substantive viewing: Direct to celebration plaque!
              if (sceneFinal) {
                sceneFinal.classList.remove("hidden");
                sceneFinal.offsetHeight; // force reflow
                sceneFinal.style.opacity = 1;
                sceneFinal.classList.add("active-scene");

                if (window.initFinalEndingSystem) {
                  window.initFinalEndingSystem();
                }
              }
            }
          }, 1000);
        }, 800);
      });
    }

    // Bind Hub selectors to trigger Game frames
    if (selectG1) {
      selectG1.addEventListener("click", () => {
        getAudioContext(); // warm context
        playClack();
        playhouseHub.classList.add("hidden");
        viewports[1].classList.remove("hidden");
        document.getElementById("g1-instructions").classList.remove("hidden");
      });
    }

    if (selectG2) {
      selectG2.addEventListener("click", () => {
        getAudioContext();
        playClack();
        playhouseHub.classList.add("hidden");
        viewports[2].classList.remove("hidden");
        document.getElementById("g2-instructions").classList.remove("hidden");
      });
    }

    if (selectG3) {
      selectG3.addEventListener("click", () => {
        getAudioContext();
        playClack();
        playhouseHub.classList.add("hidden");
        viewports[3].classList.remove("hidden");
        document.getElementById("g3-instructions").classList.remove("hidden");
      });
    }

    // Leave Games (Back to Hub) click bindings
    const leaveGameBtns = document.querySelectorAll(".btn-leave-game");
    leaveGameBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        playClack();
        
        // Stop all active games core loops
        exitAllGames();

        // Restore hub layout
        playhouseHub.classList.remove("hidden");
        viewports[1].classList.add("hidden");
        viewports[2].classList.add("hidden");
        viewports[3].classList.add("hidden");
      });
    });

    // ------------------------------------------------------------------------
    // --- GAME 1 MECHANICS: FEED GOLUK BOLUK ---
    // ------------------------------------------------------------------------
    let game1Active = false;
    let game1Score = 0;
    let game1FoodInterval = null;
    let game1AnimationId = null;
    let spawnedFoods = [];

    const startG1Btn = document.getElementById("start-g1-btn");
    // ------------------------------------------------------------------------
    // --- GAME 1 INTERACTIVE LOGIC: CURSOR MOVEMENT & COLLISION EATING ---
    // ------------------------------------------------------------------------
    const g1Canvas = document.getElementById("g1-canvas-area");
    if (g1Canvas) {
      window.addEventListener("pointermove", (e) => {
        if (!game1Active) return;
        const rect = g1Canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        const boy = document.getElementById("g1-boy-character");
        const canvasWidth = g1Canvas.clientWidth;
        const boyWidth = boy ? boy.offsetWidth : 130;
        
        // Map cursor coordinate to relative canvas coordinates
        const relativeX = (x / rect.width) * canvasWidth;
        let newLeft = relativeX - (boyWidth / 2);
        
        // Clamp between 0 and canvasWidth - boyWidth
        newLeft = Math.max(0, Math.min(canvasWidth - boyWidth, newLeft));
        
        if (boy) {
          boy.style.left = `${newLeft}px`;
        }
      });
    }

    if (startG1Btn) {
      startG1Btn.addEventListener("click", () => {
        playClack();
        startGame1();
      });
    }

    function startGame1() {
      game1Score = 0;
      updateG1Score();
      spawnedFoods.forEach(f => f.element.remove());
      spawnedFoods = [];
      game1Active = true;
      document.getElementById("g1-instructions").classList.add("hidden");
      document.getElementById("g1-victory-card").classList.add("hidden");
      
      const boy = document.getElementById("g1-boy-character");
      if (boy) {
        boy.classList.remove("chewing");
        boy.style.transform = "scale(1)";
        // Center the boy at start
        const canvasWidth = g1Canvas ? g1Canvas.clientWidth : 780;
        const boyWidth = boy.offsetWidth || 130;
        boy.style.left = `${(canvasWidth - boyWidth) / 2}px`;
      }

      // Reset mouth standard
      const mouthStd = document.querySelector(".chubby-boy-rig .mouth-standard");
      const mouthOpen = document.querySelector(".chubby-boy-rig .mouth-open");
      if (mouthStd) mouthStd.classList.remove("hidden");
      if (mouthOpen) mouthOpen.classList.add("hidden");

      game1FoodInterval = setInterval(spawnFood, 1100);
      game1AnimationId = requestAnimationFrame(updateFoods);
    }

    // Centered catch helper for both pointer taps and automated collisions
    function catchFood(foodObj) {
      if (foodObj.clicked || !game1Active) return;
      foodObj.clicked = true;
      
      playMunch();
      
      const mouthStd = document.querySelector(".chubby-boy-rig .mouth-standard");
      const mouthOpen = document.querySelector(".chubby-boy-rig .mouth-open");
      if (mouthStd) mouthStd.classList.add("hidden");
      if (mouthOpen) mouthOpen.classList.remove("hidden");
      
      const boy = document.getElementById("g1-boy-character");
      if (boy) boy.classList.add("chewing");

      const el = foodObj.element;
      el.classList.add("food-fly-mouth");
      if (boy) {
        const targetLeft = boy.offsetLeft + (boy.offsetWidth / 2) - 25; // 25 is half of food width
        const targetTop = boy.offsetTop + 45; // mouth coordinates
        el.style.left = `${targetLeft}px`;
        el.style.top = `${targetTop}px`;
      } else {
        el.style.left = "390px";
        el.style.top = "410px";
      }
      el.style.transform = "scale(0.2) rotate(360deg)";
      el.style.opacity = "0.2";

      setTimeout(() => {
        el.remove();
        if (mouthStd) mouthStd.classList.remove("hidden");
        if (mouthOpen) mouthOpen.classList.add("hidden");
        if (boy) boy.classList.remove("chewing");
      }, 450);

      game1Score++;
      window.game1Score = game1Score;
      updateG1Score();

      if (game1Score >= 20) {
        triggerGame1Win();
      }
    }

    function spawnFood() {
      if (!game1Active) return;
      const el = document.createElement("div");
      el.classList.add("falling-food-item");
      el.textContent = ["🍕", "🍔", "🍟", "🍦", "🍩", "🍰"][Math.floor(Math.random() * 6)];
      
      const canvasWidth = g1Canvas ? g1Canvas.clientWidth : 780;
      el.style.left = `${20 + Math.random() * (canvasWidth - 80)}px`;
      el.style.top = "0px";
      
      const foodObj = {
        element: el,
        x: parseFloat(el.style.left),
        y: 0,
        speed: 1.6 + Math.random() * 2.4,
        clicked: false
      };

      el.addEventListener("pointerdown", () => {
        catchFood(foodObj);
      });

      document.getElementById("g1-canvas-area").appendChild(el);
      spawnedFoods.push(foodObj);
    }

    function updateFoods() {
      if (!game1Active) return;
      
      const boy = document.getElementById("g1-boy-character");
      const boyLeft = boy ? boy.offsetLeft : 325;
      const boyWidth = boy ? boy.offsetWidth : 130;
      const boyTop = boy ? boy.offsetTop : 330;
      const boyHeight = boy ? boy.offsetHeight : 130;
      
      for (let i = spawnedFoods.length - 1; i >= 0; i--) {
        const f = spawnedFoods[i];
        if (!f.clicked) {
          f.y += f.speed;
          f.element.style.top = `${f.y}px`;

          // Automatic collision eating: if food center is horizontally inside the boy
          // and the bottom of the food overlaps with the top of the boy's head
          const foodCenterX = f.x + 25; // 25 is half of 50px food width
          
          if (f.y + 50 > boyTop && f.y < boyTop + (boyHeight / 2) && foodCenterX > boyLeft && foodCenterX < boyLeft + boyWidth) {
            catchFood(f);
            spawnedFoods.splice(i, 1); // remove from active physics checks immediately
          } else if (f.y > 450) {
            f.element.remove();
            spawnedFoods.splice(i, 1);
          }
        }
      }

      game1AnimationId = requestAnimationFrame(updateFoods);
    }

    function triggerGame1Win() {
      game1Active = false;
      clearInterval(game1FoodInterval);
      cancelAnimationFrame(game1AnimationId);

      playWin();
      triggerPetalConfetti(120);

      const boy = document.getElementById("g1-boy-character");
      boy.classList.add("chewing");
      boy.style.transform = "scale(1.35) rotate(4deg)";

      setTimeout(() => {
        document.getElementById("g1-victory-card").classList.remove("hidden");
      }, 1200);
    }

    function updateG1Score() {
      document.getElementById("g1-score").textContent = game1Score;
    }

    // ------------------------------------------------------------------------
    // --- GAME 2 MECHANICS: SAVE BABY PANDA ---
    // ------------------------------------------------------------------------
    let game2Active = false;
    let game2Score = 0;
    let game2BambooInterval = null;
    let game2AnimationId = null;
    let spawnedBamboos = [];

    const startG2Btn = document.getElementById("start-g2-btn");
    if (startG2Btn) {
      startG2Btn.addEventListener("click", () => {
        playClack();
        startGame2();
      });
    }

    function startGame2() {
      game2Score = 0;
      updateG2Score();
      spawnedBamboos.forEach(b => b.element.remove());
      spawnedBamboos = [];
      game2Active = true;
      document.getElementById("g2-instructions").classList.add("hidden");
      document.getElementById("g2-victory-card").classList.add("hidden");
      document.getElementById("g2-panda-character").classList.add("hidden");
      document.getElementById("g2-panda-character").style.left = "calc(50% - 70px)";
      
      const heartsCont = document.getElementById("g2-hearts-container");
      if (heartsCont) heartsCont.innerHTML = "";

      game2BambooInterval = setInterval(spawnBamboo, 1200);
      game2AnimationId = requestAnimationFrame(updateBamboos);
    }

    function spawnBamboo() {
      if (!game2Active) return;
      const el = document.createElement("div");
      el.classList.add("bamboo-stalk-item");
      el.textContent = "🎋";
      el.style.left = "-40px";
      el.style.top = `${30 + Math.random() * (350 - 60)}px`;
      
      const bambooObj = {
        element: el,
        x: -40,
        y: parseFloat(el.style.top),
        speed: 1.8 + Math.random() * 2.8,
        clicked: false
      };

      el.addEventListener("pointerdown", () => {
        if (bambooObj.clicked || !game2Active) return;
        bambooObj.clicked = true;

        playClack();

        el.style.transform = "scale(1.4) rotate(45deg)";
        el.style.opacity = "0";
        el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        
        setTimeout(() => { el.remove(); }, 300);

        game2Score++;
        window.game2Score = game2Score;
        updateG2Score();

        if (game2Score >= 20) {
          triggerGame2Win();
        }
      });

      document.getElementById("g2-canvas-area").appendChild(el);
      spawnedBamboos.push(bambooObj);
    }

    function updateBamboos() {
      if (!game2Active) return;
      
      for (let i = spawnedBamboos.length - 1; i >= 0; i--) {
        const b = spawnedBamboos[i];
        if (!b.clicked) {
          b.x += b.speed;
          b.element.style.left = `${b.x}px`;

          if (b.x > 800) {
            b.element.remove();
            spawnedBamboos.splice(i, 1);
          }
        }
      }

      game2AnimationId = requestAnimationFrame(updateBamboos);
    }

    function triggerGame2Win() {
      game2Active = false;
      clearInterval(game2BambooInterval);
      cancelAnimationFrame(game2AnimationId);

      playWin();
      triggerPetalConfetti(120);

      const panda = document.getElementById("g2-panda-character");
      panda.classList.remove("hidden");
      panda.style.left = "-100px";
      panda.style.transition = "left 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      
      setTimeout(() => {
        panda.style.left = "calc(50% - 70px)";
        
        setTimeout(() => {
          spawnHuggingHearts();
        }, 1200);

      }, 100);

      setTimeout(() => {
        document.getElementById("g2-victory-card").classList.remove("hidden");
      }, 3500);
    }

    function spawnHuggingHearts() {
      const container = document.getElementById("g2-hearts-container");
      if (!container) return;
      
      let count = 0;
      const heartInterval = setInterval(() => {
        if (count >= 15) {
          clearInterval(heartInterval);
          return;
        }
        
        const h = document.createElement("div");
        h.classList.add("heart-sparks");
        h.textContent = ["❤️", "💖", "🌸", "💕"][Math.floor(Math.random() * 4)];
        
        const dx = (Math.random() - 0.5) * 140;
        const dy = -80 - Math.random() * 100;
        const dr = (Math.random() - 0.5) * 60;
        
        h.style.setProperty("--dx", `${dx}px`);
        h.style.setProperty("--dy", `${dy}px`);
        h.style.setProperty("--dr", `${dr}deg`);
        
        h.style.left = `${40 + Math.random() * 60}px`;
        h.style.top = "20px";
        
        container.appendChild(h);
        
        setTimeout(() => { h.remove(); }, 2000);
        count++;
      }, 150);
    }

    function updateG2Score() {
      document.getElementById("g2-score").textContent = game2Score;
    }

    // ------------------------------------------------------------------------
    // --- GAME 3 MECHANICS: ERUMA MAADU RACE ---
    // ------------------------------------------------------------------------
    let game3Active = false;
    let game3Score = 0;
    let game3ObstacleInterval = null;
    let game3AnimationId = null;
    let spawnedObstacles = [];
    
    let bufY = 0;
    let bufVelocityY = 0;
    const gravity = 0.48;
    const jumpStrength = 11.5;
    const buffaloLeft = 78; 
    const buffaloWidth = 85;
    const buffaloHeight = 65;
    
    let obstaclesCleared = 0;
    let cakeSpawned = false;
    let cakeElement = null;

    const startG3Btn = document.getElementById("start-g3-btn");
    if (startG3Btn) {
      startG3Btn.addEventListener("click", () => {
        playClack();
        startGame3();
      });
    }

    // Jumping handler on clicking the canvas track area
    const g3Canvas = document.getElementById("g3-canvas-area");
    if (g3Canvas) {
      g3Canvas.addEventListener("pointerdown", (e) => {
        // Prevent click if leave game button clicked
        if (e.target.classList.contains("game-back-btn") || !game3Active) return;
        
        if (bufY === 0) {
          bufVelocityY = jumpStrength;
          playJump();
        }
      });
    }

    function startGame3() {
      game3Score = 0;
      obstaclesCleared = 0;
      cakeSpawned = false;
      if (cakeElement) { cakeElement.remove(); cakeElement = null; }
      
      updateG3Score();
      spawnedObstacles.forEach(o => o.element.remove());
      spawnedObstacles = [];
      
      game3Active = true;
      bufY = 0;
      bufVelocityY = 0;
      
      const bufRig = document.getElementById("g3-buffalo-character");
      bufRig.style.bottom = "40px";
      bufRig.classList.add("trotting");
      
      document.querySelector(".racing-buffalo-svg .buf-eyes-happy").classList.remove("hidden");
      document.querySelector(".racing-buffalo-svg .buf-eyes-dizzy").classList.add("hidden");

      document.getElementById("g3-instructions").classList.add("hidden");
      document.getElementById("g3-victory-card").classList.add("hidden");
      document.getElementById("g3-canvas-area").classList.add("racing-active");

      game3ObstacleInterval = setInterval(spawnObstacle, 1600 + Math.random() * 800);
      game3AnimationId = requestAnimationFrame(updateGame3Frame);
    }

    function spawnObstacle() {
      if (!game3Active) return;
      if (obstaclesCleared >= 15) {
        clearInterval(game3ObstacleInterval);
        spawnVictoryCake();
        return;
      }

      const el = document.createElement("div");
      el.classList.add("race-obstacle");
      el.textContent = ["🏺", "🐔", "🪵", "🧱"][Math.floor(Math.random() * 4)];
      el.style.left = "780px";
      
      const obsObj = {
        element: el,
        x: 780,
        width: 32,
        height: 38,
        cleared: false
      };

      document.getElementById("obstacles-container").appendChild(el);
      spawnedObstacles.push(obsObj);
    }

    function spawnVictoryCake() {
      cakeSpawned = true;
      const el = document.createElement("div");
      el.classList.add("race-obstacle");
      el.textContent = "🎂";
      el.style.fontSize = "3.2rem";
      el.style.bottom = "44px";
      el.style.left = "780px";
      
      cakeElement = el;
      document.getElementById("obstacles-container").appendChild(el);
    }

    function updateGame3Frame() {
      if (!game3Active) return;

      bufVelocityY -= gravity;
      bufY += bufVelocityY;
      if (bufY <= 0) {
        bufY = 0;
        bufVelocityY = 0;
      }
      
      const bufRig = document.getElementById("g3-buffalo-character");
      bufRig.style.bottom = `${40 + bufY}px`;

      // Move standard obstacles
      for (let i = spawnedObstacles.length - 1; i >= 0; i--) {
        const o = spawnedObstacles[i];
        o.x -= 5.5; 
        o.element.style.left = `${o.x}px`;

        if (!o.cleared && o.x < buffaloLeft) {
          o.cleared = true;
          obstaclesCleared++;
          window.game3Score = obstaclesCleared;
          updateG3Score();
        }

        if (checkCollision(buffaloLeft, 40 + bufY, buffaloWidth, buffaloHeight, o.x, 44, o.width, o.height)) {
          triggerGame3Crash();
          return;
        }

        if (o.x < -50) {
          o.element.remove();
          spawnedObstacles.splice(i, 1);
        }
      }

      // Move giant cake
      if (cakeSpawned && cakeElement) {
        let cakeX = parseFloat(cakeElement.style.left || 780);
        cakeX -= 4.5;
        cakeElement.style.left = `${cakeX}px`;

        if (checkCollision(buffaloLeft, 40 + bufY, buffaloWidth, buffaloHeight, cakeX, 44, 48, 48)) {
          triggerGame3Win();
          return;
        }
      }

      game3AnimationId = requestAnimationFrame(updateGame3Frame);
    }

    function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
      return (
        x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2
      );
    }

    function triggerGame3Crash() {
      game3Active = false;
      clearInterval(game3ObstacleInterval);
      cancelAnimationFrame(game3AnimationId);

      playLose();

      document.querySelector(".racing-buffalo-svg .buf-eyes-happy").classList.add("hidden");
      document.querySelector(".racing-buffalo-svg .buf-eyes-dizzy").classList.remove("hidden");
      
      const bufRig = document.getElementById("g3-buffalo-character");
      bufRig.classList.remove("trotting");
      document.getElementById("g3-canvas-area").classList.remove("racing-active");

      const canvas = document.getElementById("g3-canvas-area");
      canvas.style.transform = "translateX(5px)";
      setTimeout(() => { 
        canvas.style.transform = "translateX(-5px)";
        setTimeout(() => { canvas.style.transform = "translateX(0px)"; }, 80);
      }, 80);

      setTimeout(() => {
        document.getElementById("g3-instructions").classList.remove("hidden");
        spawnedObstacles.forEach(o => o.element.remove());
        spawnedObstacles = [];
        if (cakeElement) { cakeElement.remove(); cakeElement = null; }
      }, 1500);
    }

    function triggerGame3Win() {
      game3Active = false;
      clearInterval(game3ObstacleInterval);
      cancelAnimationFrame(game3AnimationId);

      playWin();
      triggerPetalConfetti(120);

      document.getElementById("g3-canvas-area").classList.remove("racing-active");
      const bufRig = document.getElementById("g3-buffalo-character");
      bufRig.classList.remove("trotting");

      if (cakeElement) {
        cakeElement.style.transform = "scale(1.8) rotate(360deg)";
        cakeElement.style.opacity = "0";
        cakeElement.style.transition = "all 0.5s ease";
      }

      setTimeout(() => {
        document.getElementById("g3-victory-card").classList.remove("hidden");
      }, 1000);
    }

    function updateG3Score() {
      document.getElementById("g3-score").textContent = obstaclesCleared;
    }

    // ------------------------------------------------------------------------
    // --- SHUTDOWN & CLEANUP UTILITY ---
    // ------------------------------------------------------------------------
    function exitAllGames() {
      // Game 1 cleanup
      game1Active = false;
      clearInterval(game1FoodInterval);
      cancelAnimationFrame(game1AnimationId);
      spawnedFoods.forEach(f => f.element.remove());
      spawnedFoods = [];

      // Game 2 cleanup
      game2Active = false;
      clearInterval(game2BambooInterval);
      cancelAnimationFrame(game2AnimationId);
      spawnedBamboos.forEach(b => b.element.remove());
      spawnedBamboos = [];
      const heartsCont = document.getElementById("g2-hearts-container");
      if (heartsCont) heartsCont.innerHTML = "";

      // Game 3 cleanup
      game3Active = false;
      clearInterval(game3ObstacleInterval);
      cancelAnimationFrame(game3AnimationId);
      spawnedObstacles.forEach(o => o.element.remove());
      spawnedObstacles = [];
      if (cakeElement) { cakeElement.remove(); cakeElement = null; }
      const bufRig = document.getElementById("g3-buffalo-character");
      if (bufRig) bufRig.classList.remove("trotting");
      const canvas = document.getElementById("g3-canvas-area");
      if (canvas) canvas.classList.remove("racing-active");
    }
  }

  // ==========================================================================
  // --- SCENE 10: CHAPTER 5: ACHIEVEMENT TREE MECHANICS ---
  // ==========================================================================
  window.initAchievementsSystem = function() {
    const sceneAchievements = document.getElementById("scene-achievements");
    const sceneGames = document.getElementById("scene-games");
    const achievementsBackBtn = document.getElementById("achievements-back-btn");

    const medallionModal = document.getElementById("medallion-modal");
    const modalClose = document.getElementById("medallion-modal-close");
    const modalGlowBadge = document.getElementById("modal-glow-badge");
    const modalTitle = document.getElementById("modal-badge-title");
    const modalDesc = document.getElementById("modal-badge-desc");
    const modalStatus = document.getElementById("modal-badge-status");

    // Initialize or update global achievements state
    if (!window.achievementsState) {
      window.achievementsState = {
        panda: false,
        gorilla: true, // Auto unlocked since they reached the peak to play games
        buffalo: false,
        friend: false,
        goluk: false,
        snack: false,
        legend: true,  // Auto unlocked since they unlocked the password and clearing
        drama: false
      };
    }

    // Real-time dynamic game validations
    if (window.game2Score >= 20) window.achievementsState.panda = true;
    if (window.game3Score >= 15) window.achievementsState.buffalo = true;
    if (window.friendshipViewedMemories && window.friendshipViewedMemories.size >= 8) {
      window.achievementsState.friend = true;
    }
    if (window.game1Score >= 20) window.achievementsState.goluk = true;
    if (window.game1Score >= 10) window.achievementsState.snack = true;
    if (window.triggeredDrama) window.achievementsState.drama = true;

    // Apply locked/unlocked classes to DOM medallion fruits
    const badges = document.querySelectorAll(".medallion-badge");
    badges.forEach(badge => {
      const id = badge.id.replace("badge-", "");
      const isUnlocked = window.achievementsState[id];

      if (isUnlocked) {
        badge.classList.remove("locked-badge");
        badge.classList.add("unlocked-badge");
      } else {
        badge.classList.remove("unlocked-badge");
        badge.classList.add("locked-badge");
      }
    });

    // Medallion Click Handlers (cloned to refresh event listeners clean)
    badges.forEach(badge => {
      const newBadge = badge.cloneNode(true);
      badge.parentNode.replaceChild(newBadge, badge);

      newBadge.addEventListener("click", () => {
        const id = newBadge.id.replace("badge-", "");
        const isUnlocked = window.achievementsState[id];
        const title = newBadge.getAttribute("data-title");
        const desc = newBadge.getAttribute("data-desc");
        const emoji = newBadge.getAttribute("data-icon");

        playClack();

        // Organic Ghibli wobbly spin/fly transition
        newBadge.classList.add("badge-spin-fly");

        setTimeout(() => {
          // Open details wood modal
          modalTitle.textContent = title;
          modalDesc.innerHTML = desc;
          modalGlowBadge.textContent = isUnlocked ? emoji : "🔒";

          if (isUnlocked) {
            modalStatus.textContent = "UNLOCKED 💮";
            modalStatus.className = "badge-status-stamp";
            playWin();
          } else {
            modalStatus.textContent = "LOCKED 🔒";
            modalStatus.className = "badge-status-stamp locked-stamp";
            playLose();
          }

          medallionModal.classList.remove("hidden");
          setTimeout(() => {
            medallionModal.classList.add("active-modal");
          }, 50);

        }, 400);

        // Reset badge spin position
        setTimeout(() => {
          newBadge.classList.remove("badge-spin-fly");
        }, 1200);
      });
    });

    // Close wood modal
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        playClack();
        medallionModal.classList.remove("active-modal");
        setTimeout(() => {
          medallionModal.classList.add("hidden");
        }, 400);
      });
    }

    // Return to Playhouse sign click
    if (achievementsBackBtn) {
      achievementsBackBtn.addEventListener("click", () => {
        playClack();
        triggerPetalConfetti(60);

        setTimeout(() => {
          sceneAchievements.classList.remove("active-scene");
          sceneAchievements.style.opacity = 0;

          setTimeout(() => {
            sceneAchievements.classList.add("hidden");

            sceneGames.classList.remove("hidden");
            sceneGames.offsetHeight; // force reflow
            sceneGames.style.opacity = 1;
            sceneGames.classList.add("active-scene");
          }, 1000);
        }, 800);
      });
    }

    // Spawn floating amber/lime forest fireflies
    spawnTreeFireflies();
  };

  function spawnTreeFireflies() {
    const hub = document.getElementById("achievements-hub");
    if (!hub) return;

    const existing = hub.querySelectorAll(".tree-firefly");
    existing.forEach(f => f.remove());

    const colors = ["rgba(255,235,59,0.7)", "rgba(139,195,74,0.6)", "rgba(255,207,84,0.65)"];

    for (let i = 0; i < 22; i++) {
      const f = document.createElement("div");
      f.classList.add("tree-firefly");
      f.style.position = "absolute";
      f.style.width = `${4 + Math.random() * 4}px`;
      f.style.height = f.style.width;
      f.style.borderRadius = "50%";
      f.style.background = colors[Math.floor(Math.random() * colors.length)];
      f.style.pointerEvents = "none";
      f.style.zIndex = "8";
      
      const x = Math.random() * 100;
      const y = 15 + Math.random() * 70;
      f.style.left = `${x}vw`;
      f.style.top = `${y}vh`;

      const delay = Math.random() * -10;
      const duration = 8 + Math.random() * 8;
      f.style.animation = `ghibliFloatLocked ${duration}s ease-in-out ${delay}s infinite alternate`;
      f.style.filter = "blur(1px)";
      f.style.boxShadow = `0 0 8px ${f.style.background}`;

      hub.appendChild(f);
    }
  }

  // ==========================================================================
  // --- PRE-FINALE CINEMATIC SEQUENCE ---
  // ==========================================================================
  window.cinemaViewed = false;
  window.cinemaTimeouts = null;

  let cinemaAudioInterval = null;
  let cinemaGainNode = null;
  let cinemaOscillators = [];
  let cinemaFireflyInterval = null;
  let cinemaLanternInterval = null;

  function playCinemaSoundtrack() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      cinemaGainNode = ctx.createGain();
      cinemaGainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      cinemaGainNode.connect(ctx.destination);
      
      // Beautiful chord progression (Fmaj7 - G - Em7 - Am7)
      const chords = [
        [174.61, 220.00, 261.63, 329.63, 440.00], // Fmaj7
        [196.00, 246.94, 293.66, 392.00, 493.88], // G
        [164.81, 196.00, 246.94, 293.66, 392.00], // Em7
        [220.00, 261.63, 329.63, 392.00, 523.25]  // Am7
      ];
      
      let noteIndex = 0;
      let chordIndex = 0;
      let startTime = Date.now();
      
      cinemaAudioInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        
        let volume = 0.03;
        if (elapsed < 10) {
          volume = 0.03 + (elapsed / 10) * 0.12;
        } else if (elapsed < 15.5) {
          volume = 0.15 - ((elapsed - 10) / 5.5) * 0.07;
        } else {
          volume = Math.max(0.001, 0.08 - ((elapsed - 15.5) / 3) * 0.08);
        }
        
        cinemaGainNode.gain.setValueAtTime(volume, ctx.currentTime);
        
        const chord = chords[chordIndex];
        let noteFreq = chord[noteIndex % chord.length];
        
        if (elapsed >= 10 && elapsed < 14) {
          if (noteIndex % 2 === 0) {
            noteFreq = noteFreq * 2;
          }
        }
        
        playPianoNote(ctx, cinemaGainNode, noteFreq);
        
        noteIndex++;
        if (noteIndex % 8 === 0) {
          chordIndex = (chordIndex + 1) % chords.length;
        }
      }, 200);
    } catch (e) {
      console.log("Cinema soundtrack error:", e);
    }
  }

  function playPianoNote(ctx, destinationGain, freq) {
    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      osc1.type = "sine";
      osc2.type = "triangle";
      
      osc1.frequency.setValueAtTime(freq, ctx.currentTime);
      osc2.frequency.setValueAtTime(freq * 1.002, ctx.currentTime);
      
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.01);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      
      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(destinationGain);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + 1.3);
      osc2.stop(ctx.currentTime + 1.3);
      
      cinemaOscillators.push(osc1, osc2);
      if (cinemaOscillators.length > 50) {
        cinemaOscillators.shift();
        cinemaOscillators.shift();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function stopCinemaSoundtrack() {
    if (cinemaAudioInterval) {
      clearInterval(cinemaAudioInterval);
      cinemaAudioInterval = null;
    }
    if (cinemaGainNode) {
      try {
        const ctx = getAudioContext();
        cinemaGainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      } catch (e) {}
    }
    cinemaOscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    cinemaOscillators = [];
  }

  function spawnCinemaFireflies() {
    const container = document.getElementById("cinema-fireflies-container");
    if (!container) return;
    container.innerHTML = "";
    
    for (let i = 0; i < 20; i++) {
      createCinemaFirefly(container, true);
    }
    
    cinemaFireflyInterval = setInterval(() => {
      createCinemaFirefly(container, false);
    }, 400);
  }

  function createCinemaFirefly(container, initial) {
    if (container.children.length > 40) {
      container.children[0].remove();
    }
    const f = document.createElement("div");
    f.style.position = "absolute";
    f.style.width = `${3 + Math.random() * 4}px`;
    f.style.height = f.style.width;
    f.style.borderRadius = "50%";
    f.style.background = "rgba(255, 235, 120, 0.8)";
    f.style.pointerEvents = "none";
    f.style.filter = "blur(0.5px)";
    f.style.boxShadow = "0 0 6px rgba(255, 235, 120, 0.9)";
    
    const left = Math.random() * 100;
    const top = initial ? (20 + Math.random() * 60) : 90;
    
    f.style.left = `${left}%`;
    f.style.top = `${top}%`;
    
    const duration = 6 + Math.random() * 6;
    const drift = -30 - Math.random() * 40;
    
    f.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 0 },
      { opacity: 0.8, offset: 0.2 },
      { opacity: 0.8, offset: 0.8 },
      { transform: `translate(${(Math.random() - 0.5) * 40}px, ${drift}vh) scale(1)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    
    container.appendChild(f);
  }

  function spawnCinemaSkyLanterns() {
    const container = document.getElementById("cinema-lanterns-container");
    if (!container) return;
    container.innerHTML = "";
    
    for (let i = 0; i < 6; i++) {
      createCinemaLantern(container, true);
    }
    
    cinemaLanternInterval = setInterval(() => {
      createCinemaLantern(container, false);
    }, 2800);
  }

  function createCinemaLantern(container, initial) {
    if (container.children.length > 15) {
      container.children[0].remove();
    }
    
    const l = document.createElement("div");
    l.classList.add("cinema-sky-lantern");
    l.style.position = "absolute";
    l.style.width = `${14 + Math.random() * 12}px`;
    l.style.height = `${22 + Math.random() * 14}px`;
    l.style.background = "linear-gradient(to top, rgba(255,100,50,0.95), rgba(255,210,120,0.95))";
    l.style.borderRadius = "8px 8px 3px 3px";
    l.style.boxShadow = "0 0 12px rgba(255,140,50,0.8)";
    l.style.pointerEvents = "none";
    l.style.zIndex = "4";
    l.style.opacity = "0";
    
    const glow = document.createElement("div");
    glow.style.position = "absolute";
    glow.style.bottom = "2px";
    glow.style.left = "25%";
    glow.style.width = "50%";
    glow.style.height = "30%";
    glow.style.background = "#fffb8f";
    glow.style.borderRadius = "50%";
    glow.style.filter = "blur(1.5px)";
    l.appendChild(glow);
    
    const left = Math.random() * 90 + 5;
    const top = initial ? (10 + Math.random() * 60) : 95;
    
    l.style.left = `${left}%`;
    l.style.top = `${top}%`;
    
    const duration = 12 + Math.random() * 10;
    const driftX = (Math.random() - 0.3) * 150;
    
    l.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 0 },
      { opacity: 0.9, offset: 0.15 },
      { opacity: 0.9, offset: 0.8 },
      { transform: `translate(${driftX}px, -110vh) scale(0.85) rotate(${(Math.random() - 0.5) * 20}deg)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    
    container.appendChild(l);
  }

  function amplifyCinemaGlow() {
    const lanterns = document.querySelectorAll("#cinema-lanterns-container .cinema-sky-lantern");
    lanterns.forEach(l => {
      l.style.transition = "box-shadow 1.5s ease, transform 1.5s ease, filter 1.5s ease";
      l.style.boxShadow = "0 0 24px rgba(255, 180, 50, 0.95), 0 0 45px rgba(255, 220, 100, 0.8)";
      l.style.transform = "scale(1.25)";
    });
    
    const fireflies = document.querySelectorAll("#cinema-fireflies-container div");
    fireflies.forEach(f => {
      f.style.transition = "box-shadow 1.5s ease, transform 1.5s ease, background 1.5s ease";
      f.style.boxShadow = "0 0 15px rgba(255, 235, 120, 1), 0 0 25px rgba(255, 255, 250, 0.95)";
      f.style.background = "rgba(255, 255, 255, 0.95)";
      f.style.transform = "scale(1.5)";
    });
  }

  function spawnClimaxSparkles() {
    const frame = document.getElementById("cinema-particle-flare");
    if (!frame) return;
    
    const particlePool = ["✨", "🌟", "💖", "🌸", "💕", "💛", "💫", "✨", "⭐"];
    const totalParticles = 75;
    
    for (let i = 0; i < totalParticles; i++) {
      setTimeout(() => {
        const p = document.createElement("div");
        p.classList.add("cinema-sparkle");
        p.textContent = particlePool[Math.floor(Math.random() * particlePool.length)];
        
        p.style.left = `${40 + Math.random() * 20}%`;
        p.style.top = `${40 + Math.random() * 20}%`;
        
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 250;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;
        
        p.style.setProperty("--dx", `${dx}px`);
        p.style.setProperty("--dy", `${dy}px`);
        p.style.setProperty("--scale", `${0.6 + Math.random() * 1.0}`);
        p.style.setProperty("--rot", `${Math.random() * 360}deg`);
        
        frame.appendChild(p);
        
        setTimeout(() => {
          p.remove();
        }, 2100);
      }, i * 25);
    }
  }

  window.initCinematicSequence = function() {
    const video = document.getElementById("cinema-video");
    const flashOverlay = document.getElementById("cinema-flash-overlay");
    const sub1 = document.getElementById("cinema-line-1");
    const sub2 = document.getElementById("cinema-line-2");
    const sub3 = document.getElementById("cinema-line-3");
    const sceneCinema = document.getElementById("scene-cinema");
    const sceneFinal = document.getElementById("scene-final");
    
    if (flashOverlay) {
      flashOverlay.classList.remove("flashing");
    }
    if (sub1) sub1.classList.remove("visible-sub");
    if (sub2) sub2.classList.remove("visible-sub");
    if (sub3) sub3.classList.remove("visible-sub");
    
    spawnCinemaFireflies();
    spawnCinemaSkyLanterns();
    
    if (video) {
      video.currentTime = 0;
      video.play().catch(err => {
        console.log("Video play failed or interrupted:", err);
      });
    }
    
    playCinemaSoundtrack();
    
    const t1 = setTimeout(() => {
      if (sub1) sub1.classList.add("visible-sub");
    }, 1800);
    
    const t2 = setTimeout(() => {
      if (sub1) sub1.classList.remove("visible-sub");
    }, 5400);
    
    const t3 = setTimeout(() => {
      if (sub2) sub2.classList.add("visible-sub");
    }, 6200);
    
    const t4 = setTimeout(() => {
      if (sub2) sub2.classList.remove("visible-sub");
    }, 9600);
    
    const t5 = setTimeout(() => {
      spawnClimaxSparkles();
      amplifyCinemaGlow();
    }, 10000);
    
    const t6 = setTimeout(() => {
      if (sub3) sub3.classList.add("visible-sub");
    }, 10400);
    
    const t7 = setTimeout(() => {
      if (sub3) sub3.classList.remove("visible-sub");
    }, 15000);
    
    const t8 = setTimeout(() => {
      if (flashOverlay) {
        flashOverlay.classList.add("flashing");
      }
    }, 15500);
    
    const t9 = setTimeout(() => {
      window.cinemaViewed = true;
      
      stopCinemaSoundtrack();
      if (cinemaFireflyInterval) clearInterval(cinemaFireflyInterval);
      if (cinemaLanternInterval) clearInterval(cinemaLanternInterval);
      
      if (sceneCinema) {
        sceneCinema.classList.remove("active-scene");
        sceneCinema.style.opacity = 0;
        sceneCinema.classList.add("hidden");
      }
      
      if (sceneFinal) {
        sceneFinal.classList.remove("hidden");
        sceneFinal.offsetHeight;
        sceneFinal.style.opacity = 1;
        sceneFinal.classList.add("active-scene");
        
        if (window.initFinalEndingSystem) {
          window.initFinalEndingSystem();
        }
      }
    }, 18500);
    
    window.cinemaTimeouts = [t1, t2, t3, t4, t5, t6, t7, t8, t9];
  };

  // ==========================================================================
  // --- SCENE 11: FINAL CHAPTER: LANTERN FESTIVAL Ending ---
  // ==========================================================================
  let finalLanternInterval = null;
  let finalFireflyInterval = null;
  let finalSkitTimeout = null;

  window.initFinalEndingSystem = function() {
    const sceneFinal = document.getElementById("scene-final");
    const letterScroll = document.getElementById("final-letter-scroll");
    const typingContainer = document.getElementById("typing-lines-container");
    const celebrationCard = document.getElementById("final-celebration-card");
    const replayBtn = document.getElementById("final-replay-btn");

    // Clean old states
    letterScroll.classList.remove("hidden");
    letterScroll.style.opacity = "1";
    celebrationCard.classList.add("hidden");
    celebrationCard.style.opacity = "0";
    typingContainer.innerHTML = "";

    // Start Spawners
    spawnFinalSkyLanterns();
    spawnFinalFireflies();

    // 1. Text lines typing cascade
    const textLines = [
      "We grew up.",
      "We laughed.",
      "We fought.",
      "We made memories.",
      "But through everything...",
      "You remained my best friend. ❤️"
    ];

    textLines.forEach((text, i) => {
      const el = document.createElement("div");
      el.classList.add("typing-line");
      el.innerHTML = text;
      typingContainer.appendChild(el);

      setTimeout(() => {
        el.classList.add("visible-line");
        playClack(); // typewriter clack sound effect
      }, i * 1800 + 500);
    });

    // 2. Transition from Scroll to Grand Birthday Plaque
    setTimeout(() => {
      letterScroll.style.opacity = "0";
      
      setTimeout(() => {
        letterScroll.classList.add("hidden");
        
        // Unhide Birthday celebration Card
        celebrationCard.classList.remove("hidden");
        celebrationCard.offsetHeight; // force reflow
        celebrationCard.style.opacity = "1";
        
        // Trigger winning arpeggio & confetti shower
        playWin();
        triggerPetalConfetti(150);

        // Start Skit loops and hugging sparks!
        runJungleSkit();
        startHuggingHeartsLoop();

      }, 1000);

    }, textLines.length * 1800 + 2000);

    // 3. Replay button handler
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        playClack();
        triggerPetalConfetti(120);

        // Stop all endings loops
        clearInterval(finalLanternInterval);
        clearInterval(finalFireflyInterval);
        clearTimeout(finalSkitTimeout);

        // Reset and stop pre-finale cinema states
        window.cinemaViewed = false;
        if (window.cinemaTimeouts) {
          window.cinemaTimeouts.forEach(t => clearTimeout(t));
          window.cinemaTimeouts = null;
        }
        stopCinemaSoundtrack();
        if (cinemaFireflyInterval) {
          clearInterval(cinemaFireflyInterval);
          cinemaFireflyInterval = null;
        }
        if (cinemaLanternInterval) {
          clearInterval(cinemaLanternInterval);
          cinemaLanternInterval = null;
        }

        setTimeout(() => {
          // Fade final scene out
          sceneFinal.classList.remove("active-scene");
          sceneFinal.style.opacity = "0";

          setTimeout(() => {
            sceneFinal.classList.add("hidden");

            // Reset all games and achievements states
            window.game1Score = 0;
            window.game2Score = 0;
            window.game3Score = 0;
            window.friendshipViewedMemories = new Set();
            window.triggeredDrama = false;
            window.achievementsState = {
              panda: false,
              gorilla: true,
              buffalo: false,
              friend: false,
              goluk: false,
              snack: false,
              legend: true,
              drama: false
            };

            // Restart from Scene 1 (Ghibli Opening)
            if (sceneOpening) {
              sceneOpening.classList.remove("hidden");
              sceneOpening.offsetHeight;
              sceneOpening.style.opacity = "1";
              sceneOpening.classList.add("active-scene");
              
              // Reset opening scene states
              letterOpened = false;
              welcomeFinished = false;
              attemptsRemaining = 3;

              // Reset attempts counter
              if (attemptCounter) {
                attemptCounter.textContent = "3 attempts remaining";
              }

              // Reset letter & envelope elements
              if (glowingLetter) glowingLetter.classList.add("hidden");
              if (envelope) envelope.classList.remove("open");
              if (adventureSign) adventureSign.classList.add("hidden");
              if (typewriterElement) typewriterElement.textContent = "";

              // Reset baby panda to sleeping state
              if (babyPanda) {
                babyPanda.className = "panda-container state-sleeping";
                eyesSleeping.classList.remove("hidden");
                eyesYawning.classList.add("hidden");
                eyesHappy.classList.add("hidden");
                mouthSleeping.classList.remove("hidden");
                mouthYawning.classList.add("hidden");
                mouthHappy.classList.add("hidden");
              }

              // Restart the beautiful Ghibli typewriter intro
              typeWriter(typewriterElement, "Welcome Traveler...", 100, () => {
                welcomeFinished = true;
                triggerPandaAwakening();
              });
            }
          }, 1000);
        }, 800);
      });
    }
  };

  // Drifting Sky Lanterns loop
  function spawnFinalSkyLanterns() {
    const cont = document.getElementById("sky-lanterns-container");
    if (!cont) return;

    cont.innerHTML = "";
    clearInterval(finalLanternInterval);

    // Initial burst
    for (let i = 0; i < 8; i++) {
      createLantern(cont, true);
    }

    finalLanternInterval = setInterval(() => {
      createLantern(cont, false);
    }, 1500);
  }

  function createLantern(container, randomY) {
    const l = document.createElement("div");
    l.classList.add("floating-sky-lantern");
    
    const x = Math.random() * 95;
    l.style.left = `${x}vw`;

    if (randomY) {
      const y = Math.random() * 80;
      l.style.top = `${y}vh`;
      // Start already floating
      l.style.animation = `lanternFloat ${10 + Math.random() * 6}s linear infinite`;
      l.style.animationDelay = `-${Math.random() * 8}s`;
    } else {
      l.style.bottom = "-40px";
      const duration = 10 + Math.random() * 6;
      l.style.animationDuration = `${duration}s`;
      l.style.setProperty("--sway", `${(Math.random() - 0.5) * 140}px`);
    }

    container.appendChild(l);
    
    // Auto remove after animation completes
    if (!randomY) {
      setTimeout(() => { l.remove(); }, 16000);
    }
  }

  // Floating Moonlight Fireflies
  function spawnFinalFireflies() {
    const cont = document.getElementById("final-fireflies-container");
    if (!cont) return;

    cont.innerHTML = "";
    clearInterval(finalFireflyInterval);

    const colors = ["rgba(255,235,59,0.75)", "rgba(139,195,74,0.65)", "rgba(255,207,84,0.7)"];

    for (let i = 0; i < 25; i++) {
      const f = document.createElement("div");
      f.style.position = "absolute";
      f.style.width = `${4 + Math.random() * 5}px`;
      f.style.height = f.style.width;
      f.style.borderRadius = "50%";
      f.style.background = colors[Math.floor(Math.random() * colors.length)];
      f.style.pointerEvents = "none";
      f.style.zIndex = "6";
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      f.style.left = `${x}vw`;
      f.style.top = `${y}vh`;

      const delay = Math.random() * -10;
      const duration = 8 + Math.random() * 10;
      f.style.animation = `ghibliFloatLocked ${duration}s ease-in-out ${delay}s infinite alternate`;
      f.style.filter = "blur(1px)";
      f.style.boxShadow = `0 0 8px ${f.style.background}`;

      cont.appendChild(f);
    }
  }

  // Cute final skits loops
  function runJungleSkit() {
    const panda = document.getElementById("skit-panda");
    const gorilla = document.getElementById("skit-gorilla");
    const buffalo = document.getElementById("skit-buffalo");
    const boy = document.getElementById("skit-boy");
    const table = document.getElementById("skit-table");

    if (!panda || !gorilla || !buffalo || !boy) return;

    // Reset positions and elements with clean responsive percentage bases
    panda.style.transition = "none";
    gorilla.style.transition = "none";
    panda.style.left = "8%";
    gorilla.style.left = "22%";
    panda.textContent = "🐼";
    gorilla.textContent = "🦍";
    buffalo.textContent = "🐃";
    boy.textContent = "👦";
    table.textContent = "🎂";
    buffalo.classList.remove("buffalo-jig");
    boy.classList.remove("boy-happy-wiggle");

    // Skit Loop Trigger
    finalSkitTimeout = setTimeout(() => {
      // 1. Panda steals cake and runs past center!
      panda.textContent = "🐼🎂"; // carrying cake!
      table.textContent = "";    // empty table!
      
      panda.style.transition = "left 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      panda.style.left = "65%"; // runs to 65% width

      setTimeout(() => {
        // 2. Gorilla gets angry and chases panda!
        gorilla.textContent = "🦍💢";
        gorilla.style.transition = "left 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        gorilla.style.left = "55%"; // chases right behind panda

        // Buffalo thumps/dances in wobbly jig!
        buffalo.classList.add("buffalo-jig");

        setTimeout(() => {
          // 3. Boy chews cake slice happily!
          boy.textContent = "👦🍰";
          boy.classList.add("boy-happy-wiggle");

          // 4. Panda and Gorilla run off-screen together
          panda.style.transition = "left 1.8s ease-in";
          panda.style.left = "135%";

          setTimeout(() => {
            gorilla.style.transition = "left 1.8s ease-in";
            gorilla.style.left = "135%";


            // Restart skit sequence loop after 5 seconds of peace
            setTimeout(runJungleSkit, 5000);
          }, 300);

        }, 2200);

      }, 1000);

    }, 1500);
  }

  // Floating hearts arpeggios for hugging cutscene
  function startHuggingHeartsLoop() {
    const cont = document.getElementById("hug-hearts-float");
    if (!cont) return;

    cont.innerHTML = "";
    
    setInterval(() => {
      const h = document.createElement("div");
      h.classList.add("heart-sparks");
      h.textContent = ["❤️", "💖", "🌸", "💕"][Math.floor(Math.random() * 4)];
      
      const dx = (Math.random() - 0.5) * 160;
      const dy = -100 - Math.random() * 120;
      const dr = (Math.random() - 0.5) * 60;
      
      h.style.setProperty("--dx", `${dx}px`);
      h.style.setProperty("--dy", `${dy}px`);
      h.style.setProperty("--dr", `${dr}deg`);
      
      h.style.left = `${100 + Math.random() * 80}px`;
      h.style.bottom = "20px";
      h.style.fontSize = "1.6rem";
      
      cont.appendChild(h);
      
      setTimeout(() => { h.remove(); }, 2000);
    }, 350);
  }

  // Initialize Chapter 3 immediately on DOM load to ensure Polaroids are interactive
  initFriendshipForest();

};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllGhibliJungle);
} else {
  initAllGhibliJungle();
}


