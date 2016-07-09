console.log("main.js has loaded")

$ (function() {

  var $animation = $('#pcmovement');
  var selectedCharacter = "";
  var selectedEnemy = "";
  var selectedCharacterCurrentWeapon = "";
  var playerTurn = 1;
  var teamOneRemainingCha = 5;
  var teamTwoRemainingCha = 5;
  var selectedWeapon = "";

  // create player consturction function
  
  function Player (name, divClass, healthTotal, health, attack, attackNumber, attackNumberMax, weaponOne, weaponOneAmmo, weaponOneRange, weaponTwo, weaponTwoAmmo, weaponTwoRange, weaponMelee, defense, movement, movementMax, team){
    this.name = name;
    this.divClass = divClass;
    this.healthTotal = healthTotal;
    this.health = health;
    this.attack = attack;
    this.attackNumber = attackNumber;
    this.attackNumberMax = attackNumberMax;
    this.weaponOne = weaponOne;
    this.weaponOneAmmo = weaponOneAmmo;
    this.weaponOneRange = weaponOneRange;
    this.weaponTwo = weaponTwo;
    this.weaponTwoAmmo = weaponTwoAmmo;
    this.weaponTwoRange = weaponTwoRange;
    this.weaponMelee = weaponMelee;
    this.defense = defense;
    this.movement = movement;
    this.movementMax = movementMax;
    this.team = team
  }

  // actual players

// Team 1
  var pOneCha1 = new Player("Alpha", "alpha", 100, 100, 47, 2, 2, "Assault Rifle", 30, 4, "Pistol", 60, 2, "Sword", 30, 7, 7, 1);


  $("ul").on("click", "li.alpha", function() {
    if (playerTurn%2 !== 0) {
      $('#name').html(pOneCha1.name);
      $('#health').html(pOneCha1.health + " / " + pOneCha1.healthTotal);
      $('#attack').html(pOneCha1.attack);
      $('#defense').html(pOneCha1.defense);
      $('#movement').html(pOneCha1.movement + " / " + pOneCha1.movementMax);
      $('#weaponOneName').html(pOneCha1.weaponOne);
      $('#weaponOneAmmo').html(pOneCha1.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha1.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha1.weaponTwoAmmo);
      $('#attackNumber').html(pOneCha1.attackNumber);
      selectedCharacter = pOneCha1;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pOneCha1
      $('#selectedEnemy').html(pOneCha1.name);
      $('#enemyHealth').html(pOneCha1.health + " / " + pOneCha1.healthTotal);
    }
  });


  var pOneCha2 = new Player("Beta", "beta", 65, 65, 73, 2, 2, "Sniper Rifle", 15, 7, "Pistol", 60, 2, "Knife", 15, 10, 10, 1);


  $("ul").on("click", "li.beta", function() {
    if (playerTurn%2 !== 0) {
      $('#name').html(pOneCha2.name)
      $('#health').html(pOneCha2.health + " / " + pOneCha2.healthTotal)
      $('#attack').html(pOneCha2.attack)
      $('#defense').html(pOneCha2.defense)
      $('#movement').html(pOneCha2.movement + " / " + pOneCha2.movementMax)
      $('#weaponOneName').html(pOneCha2.weaponOne);
      $('#weaponOneAmmo').html(pOneCha2.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha2.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha2.weaponTwoAmmo);
      $('#attackNumber').html(pOneCha2.attackNumber);
      selectedCharacter = pOneCha2;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pOneCha2
      $('#selectedEnemy').html(pOneCha2.name);
      $('#enemyHealth').html(pOneCha2.health + " / " + pOneCha2.healthTotal);
    }
  });


  var pOneCha3 = new Player("Charlie", "charlie", 150, 150, 40, 2, 2, "Minigun", 200, 3, "Rocket Launcher", 2, 4, "Fists", 60, 4, 4, 1);


  $("ul").on("click", "li.charlie", function() {
    if (playerTurn%2 !== 0) {
      $('#name').html(pOneCha3.name)
      $('#health').html(pOneCha3.health + " / " + pOneCha3.healthTotal)
      $('#attack').html(pOneCha3.attack)
      $('#defense').html(pOneCha3.defense)
      $('#movement').html(pOneCha3.movement + " / " + pOneCha3.movementMax)
      $('#weaponOneName').html(pOneCha3.weaponOne);
      $('#weaponOneAmmo').html(pOneCha3.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha3.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha3.weaponTwoAmmo);
      $('#attackNumber').html(pOneCha3.attackNumber);
      selectedCharacter = pOneCha3;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pOneCha3
      $('#selectedEnemy').html(pOneCha3.name);
      $('#enemyHealth').html(pOneCha3.health + " / " + pOneCha3.healthTotal);
    }
  });


  var pOneCha4 = new Player("Delta", "delta", 65, 65, 73, 2, 2, "Sniper Rifle", 15, 7, "Pistol", 60, 2, "Knife", 15, 10, 10, 1);


  $("ul").on("click", "li.delta", function() {
    if (playerTurn%2 !== 0) {
      $('#name').html(pOneCha4.name)
      $('#health').html(pOneCha4.health + " / " + pOneCha4.healthTotal)
      $('#attack').html(pOneCha4.attack)
      $('#defense').html(pOneCha4.defense)
      $('#movement').html(pOneCha4.movement + " / " + pOneCha4.movementMax)
      $('#weaponOneName').html(pOneCha4.weaponOne);
      $('#weaponOneAmmo').html(pOneCha4.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha4.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha4.weaponTwoAmmo);
      $('#attackNumber').html(pOneCha4.attackNumber);
      selectedCharacter = pOneCha4;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pOneCha4
      $('#selectedEnemy').html(pOneCha4.name);
      $('#enemyHealth').html(pOneCha4.health + " / " + pOneCha4.healthTotal);
    }
  });


  var pOneCha5 = new Player("Echo", "echo", 150, 150, 40, 2, 2, "Minigun", 200, 3, "Rocket Launcher", 2, 4, "Fists", 60, 4, 4, 1);


  $("ul").on("click", "li.echo", function() {
    if (playerTurn%2 !== 0) {
      $('#name').html(pOneCha5.name)
      $('#health').html(pOneCha5.health + " / " + pOneCha5.healthTotal)
      $('#attack').html(pOneCha5.attack)
      $('#defense').html(pOneCha5.defense)
      $('#movement').html(pOneCha5.movement + " / " + pOneCha5.movementMax)
      $('#weaponOneName').html(pOneCha5.weaponOne);
      $('#weaponOneAmmo').html(pOneCha5.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha5.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha5.weaponTwoAmmo);
      $('#attackNumber').html(pOneCha5.attackNumber);
      selectedCharacter = pOneCha5;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pOneCha5
      $('#selectedEnemy').html(pOneCha5.name);
      $('#enemyHealth').html(pOneCha5.health + " / " + pOneCha5.healthTotal);
    }
  });


  // Team 2

  var pTwoCha1 = new Player("Foxtrot", "foxtrot", 100, 100, 47, 2, 2, "Assault Rifle", 30, 5, "Pistol", 60, 2, "Sword", 30, 7, 7, 2);


  $("ul").on("click", "li.foxtrot", function() {
    if (playerTurn%2 === 0) {
      $('#name').html(pTwoCha1.name);
      $('#health').html(pTwoCha1.health + " / " + pTwoCha1.healthTotal);
      $('#attack').html(pTwoCha1.attack);
      $('#defense').html(pTwoCha1.defense);
      $('#movement').html(pTwoCha1.movement + " / " + pTwoCha1.movementMax);
      $('#weaponOneName').html(pTwoCha1.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha1.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha1.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha1.weaponTwoAmmo);
      $('#attackNumber').html(pTwoCha1.attackNumber);
      selectedCharacter = pTwoCha1;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pTwoCha1
      $('#selectedEnemy').html(pTwoCha1.name);
      $('#enemyHealth').html(pTwoCha1.health + " / " + pTwoCha1.healthTotal);
    }
  });


  var pTwoCha2 = new Player("Gamma", "gamma", 65, 65, 73, 2, 2, "Sniper Rifle", 15, 7, "Pistol", 60, 2, "Knife", 15, 10, 10, 2);


  $("ul").on("click", "li.gamma", function() {
    if (playerTurn%2 === 0) {
      $('#name').html(pTwoCha2.name)
      $('#health').html(pTwoCha2.health + " / " + pTwoCha2.healthTotal)
      $('#attack').html(pTwoCha2.attack)
      $('#defense').html(pTwoCha2.defense)
      $('#movement').html(pTwoCha2.movement + " / " + pTwoCha2.movementMax)
      $('#weaponOneName').html(pTwoCha2.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha2.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha2.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha2.weaponTwoAmmo);
      $('#attackNumber').html(pTwoCha2.attackNumber);
      selectedCharacter = pTwoCha2;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pTwoCha2
      $('#selectedEnemy').html(pTwoCha2.name);
      $('#enemyHealth').html(pTwoCha2.health + " / " + pTwoCha2.healthTotal);
    }
  });


  var pTwoCha3 = new Player("Hotel", "hotel", 150, 150, 40, 2, 2, "Minigun", 200, 3, "Rocket Launcher", 2, 4, "Fists", 60, 4, 4, 2);


  $("ul").on("click", "li.hotel", function() {
    if (playerTurn%2 === 0) {
      $('#name').html(pTwoCha3.name)
      $('#health').html(pTwoCha3.health + " / " + pTwoCha3.healthTotal)
      $('#attack').html(pTwoCha3.attack)
      $('#defense').html(pTwoCha3.defense)
      $('#movement').html(pTwoCha3.movement + " / " + pTwoCha3.movementMax)
      $('#weaponOneName').html(pTwoCha3.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha3.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha3.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha3.weaponTwoAmmo);
      $('#attackNumber').html(pTwoCha3.attackNumber);
      selectedCharacter = pTwoCha3;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pTwoCha3
      $('#selectedEnemy').html(pTwoCha3.name);
      $('#enemyHealth').html(pTwoCha3.health + " / " + pTwoCha3.healthTotal);
    }
  });


  var pTwoCha4 = new Player("Indigo", "indigo", 65, 65, 73, 2, 2, "Sniper Rifle", 15, 7, "Pistol", 60, 2, "Knife", 15, 10, 10, 2);


  $("ul").on("click", "li.indigo", function() {
    if (playerTurn%2 === 0) {
      $('#name').html(pTwoCha4.name)
      $('#health').html(pTwoCha4.health + " / " + pTwoCha4.healthTotal)
      $('#attack').html(pTwoCha4.attack)
      $('#defense').html(pTwoCha4.defense)
      $('#movement').html(pTwoCha4.movement + " / " + pTwoCha4.movementMax)
      $('#weaponOneName').html(pTwoCha4.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha4.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha4.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha4.weaponTwoAmmo);
      $('#attackNumber').html(pTwoCha4.attackNumber);
      selectedCharacter = pTwoCha4;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pTwoCha4
      $('#selectedEnemy').html(pTwoCha4.name);
      $('#enemyHealth').html(pTwoCha4.health + " / " + pTwoCha4.healthTotal);
    }
  });


  var pTwoCha5 = new Player("Juliett", "juliett", 150, 150, 40, 2, 2, "Minigun", 200, 3, "Rocket Launcher", 2, 4, "Fists", 60, 4, 4, 2);


  $("ul").on("click", "li.juliett", function() {
    if (playerTurn%2 === 0) {
      $('#name').html(pTwoCha5.name)
      $('#health').html(pTwoCha5.health + " / " + pTwoCha5.healthTotal)
      $('#attack').html(pTwoCha5.attack)
      $('#defense').html(pTwoCha5.defense)
      $('#movement').html(pTwoCha5.movement + " / " + pTwoCha5.movementMax)
      $('#weaponOneName').html(pTwoCha5.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha5.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha5.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha5.weaponTwoAmmo);
      $('#attackNumber').html(pTwoCha5.attackNumber);
      selectedCharacter = pTwoCha5;
      console.log(selectedCharacter);
    } else {
      selectedEnemy = pTwoCha5
      $('#selectedEnemy').html(pTwoCha5.name);
      $('#enemyHealth').html(pTwoCha5.health + " / " + pTwoCha5.healthTotal);
    }
  });

// player movement

  $(document).on("keydown", function(e) {
    switch(e.key) {
      case "a":
      case "ArrowLeft":
        if ($("."+selectedCharacter.divClass).attr('id') === "a1" ||
          $("."+selectedCharacter.divClass).attr('id') === "b1" ||
          $("."+selectedCharacter.divClass).attr('id') === "c1" ||
          $("."+selectedCharacter.divClass).attr('id') === "d1" ||
          $("."+selectedCharacter.divClass).attr('id') === "e1" ||
          $("."+selectedCharacter.divClass).attr('id') === "f1" ||
          $("."+selectedCharacter.divClass).attr('id') === "g1" ||
          $("."+selectedCharacter.divClass).attr('id') === "h1" ||
          $("."+selectedCharacter.divClass).prev().attr('class') !== "grid" || selectedCharacter.movement === 0) {
        } else {
          $animation.css("left", "-=100px");
          $("."+selectedCharacter.divClass).prev().attr("class", 'new');
          $(".new").next().attr('class', 'grid');
          $(".new").attr('class', selectedCharacter.divClass);
          selectedCharacter.movement--; 
          console.log(selectedCharacter.movement)
          $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
        }
        break;
      case "w":
      case "ArrowUp":
        if ($("."+selectedCharacter.divClass).prevAll().eq(7).attr('class') !== "grid" || selectedCharacter.movement === 0) {
        } else {
          $animation.css("top", "-=102px");
          $("."+selectedCharacter.divClass).prevAll().eq(7).attr('class', selectedCharacter.divClass);
          $("."+selectedCharacter.divClass).nextAll().eq(7).attr('class', 'grid');
          selectedCharacter.movement--; 
          console.log(selectedCharacter.movement)
          $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
        }
        break;
      case "d":
      case "ArrowRight":
        if ($("."+selectedCharacter.divClass).attr('id') === "a8" ||
          $("."+selectedCharacter.divClass).attr('id') === "b8" ||
          $("."+selectedCharacter.divClass).attr('id') === "c8" ||
          $("."+selectedCharacter.divClass).attr('id') === "d8" ||
          $("."+selectedCharacter.divClass).attr('id') === "e8" ||
          $("."+selectedCharacter.divClass).attr('id') === "f8" ||
          $("."+selectedCharacter.divClass).attr('id') === "g8" ||
          $("."+selectedCharacter.divClass).attr('id') === "h8" || 
          $("."+selectedCharacter.divClass).next().attr('class') !== "grid" || selectedCharacter.movement === 0) {
        } else {
          $animation.css("left", "+=100px");
          $("."+selectedCharacter.divClass).next().attr('class', 'new');
          $(".new").prev().attr('class', 'grid');
          $(".new").attr('class', selectedCharacter.divClass);
          selectedCharacter.movement--; 
          console.log(selectedCharacter.movement)
          $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
        }
        break;
      case "s":
      case "ArrowDown":
        if ($("."+selectedCharacter.divClass).nextAll().eq(7).attr('class') !== "grid" || selectedCharacter.movement === 0) {
        } else {
          $animation.css("top", "+=102px");
          $("."+selectedCharacter.divClass).nextAll().eq(7).attr('class', selectedCharacter.divClass);
          $("."+selectedCharacter.divClass).prevAll().eq(7).attr('class', 'grid');
          selectedCharacter.movement--; 
          console.log(selectedCharacter.movement)
          $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
        }
        break;
    }
  });


// select weapon

  $(".selectWeapon").on("click", function() {
    if (this.id === "selectWeaponOne") {
      selectedWeapon = selectedCharacter.weaponOne;
    } else if (this.id === "selectWeaponTwo") {
      selectedWeapon = selectedCharacter.weaponTwo;
    } else {
      selectedWeapon = selectedCharacter.weaponMelee;
    }
    console.log("you've clicked on " + selectedWeapon + "!");
  });
// attack and win condition

  $("#attackButton").on("click", function() {
    if (selectedCharacter.attackNumber > 0) {
      console.log("you've clicked attack!")
      selectedEnemy.health = selectedEnemy.health-30;
      console.log(selectedEnemy.health);
      selectedCharacter.attackNumber --;
      $('#attackNumber').html(selectedCharacter.attackNumber);
      $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal)
    } else {
      console.log("you have no more attacks")      
    }
    if (selectedEnemy.health <= 0) {
      $("."+selectedEnemy.divClass).attr('class', 'grid rip')
      selectedEnemy = "";
      $('#selectedEnemy').html("Enemy");
      $('#enemyHealth').html("");
      if (playerTurn%2 !== 0) {
        teamTwoRemainingCha --;
        if (teamTwoRemainingCha === 0) {
          alert("Team One has won!")
        }
      } else {
        teamOneRemainingCha --;
        if (teamOneRemainingCha === 0) {
          alert("Team Two has won!")
        }
      }
    }
  });

// attack range





// switch turn

  $("#endTurn").on("click", function() {
    selectedEnemy = "";
    $('#selectedEnemy').html("Enemy");
    $('#enemyHealth').html("");
    selectedCharacter = "";
    $('#name').html("");
    $('#health').html("");
    $('#attack').html("");
    $('#defense').html("");
    $('#movement').html("");
    $('#weaponOneName').html("Weapon 1");
    $('#weaponOneAmmo').html("");        
    $('#weaponTwoName').html("Weapon 2");
    $('#weaponTwoAmmo').html("");
    $('#attackNumber').html("");
    if (playerTurn%2 !== 0) {
      pOneCha1.movement = pOneCha1.movementMax;
      pOneCha1.attackNumber = pOneCha1.attackNumberMax;
      pOneCha2.movement = pOneCha2.movementMax;
      pOneCha2.attackNumber = pOneCha2.attackNumberMax;
      pOneCha3.movement = pOneCha3.movementMax;
      pOneCha3.attackNumber = pOneCha3.attackNumberMax;
      pOneCha4.movement = pOneCha4.movementMax;
      pOneCha4.attackNumber = pOneCha4.attackNumberMax;
      pOneCha5.movement = pOneCha5.movementMax;
      pOneCha5.attackNumber = pOneCha5.attackNumberMax;
      playerTurn ++;
    } else {
      pTwoCha1.movement = pTwoCha1.movementMax;
      pTwoCha1.attackNumber = pTwoCha1.attackNumberMax;
      pTwoCha2.movement = pTwoCha2.movementMax;
      pTwoCha2.attackNumber = pTwoCha2.attackNumberMax;
      pTwoCha3.movement = pTwoCha3.movementMax;
      pTwoCha3.attackNumber = pTwoCha3.attackNumberMax;
      pTwoCha4.movement = pTwoCha4.movementMax;
      pTwoCha4.attackNumber = pTwoCha4.attackNumberMax;
      pTwoCha5.movement = pTwoCha5.movementMax;
      pTwoCha5.attackNumber = pTwoCha5.attackNumberMax;
      playerTurn ++;
    }
  });


});

// 1 - create game board
// need a large grid board - create a 4x4 grid to test game in the beginning. Will be easy to increase size
// (non-priority)create a random number generator to be able to change the terrain of the map

// 2 create player element
// constructor function for pc pieces
// see how player movement works on board. Most likely on arrow key press down, with animation and changing div boxes of the original div and the destination div
// will set a variable to each grid as having a pc there or not. This is to prevent other pcs entering the same space.

// 3 create all player stats parameters (i.e. health)
// We will need some attributes for pcs, with the player needing a health bar.

// 4 create different player actions (attack/dodge...etc).
// This can have some animations, but this is optional based on how much time I have.
// This then will need to see how the actions can affect the other pc character

// 5 create switching user turns
// If I have time (doubtful) then an AI might be a good idea
// 6 create win functions

// 7 create user interface (i.e. menu) and the rest of the styling
