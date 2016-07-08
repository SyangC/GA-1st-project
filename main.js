console.log("js has loaded")

$ (function() {

  var selectedCharacter = "";
  // create player consturction function
    function Player (name, divClass, healthTotal, health, attack, defense, movement, movementMax){
      this.name = name;
      this.divClass = divClass;
      this.healthTotal = healthTotal;
      this.health = health;
      this.attack = attack;
      this.defense = defense;
      this.movement = movement;
      this.movementMax = movementMax;
    }



// actual players
    var pOneCha1 = new Player("Shu", "shu", 100, 100, 15, 15, 5, 5);

    $("ul").on("click", "li.shu", function() {
      $('#name').html(pOneCha1.name)
      $('#health').html(pOneCha1.health + " / " + pOneCha1.healthTotal)
      $('#attack').html(pOneCha1.attack)
      $('#defense').html(pOneCha1.defense)
      $('#movement').html(pOneCha1.movement + " / " + pOneCha1.movementMax)
      selectedCharacter = pOneCha1;
      console.log(selectedCharacter);
    });

    var pOneCha2 = new Player("Alpha", "alpha", 70, 70, 30, 5, 8, 8);

    $("ul").on("click", "li.alpha", function() {
      $('#name').html(pOneCha2.name)
      $('#health').html(pOneCha2.health + " / " + pOneCha2.healthTotal)
      $('#attack').html(pOneCha2.attack)
      $('#defense').html(pOneCha2.defense)
      $('#movement').html(pOneCha2.movement + " / " + pOneCha2.movementMax)
      selectedCharacter = pOneCha2;
      console.log(selectedCharacter);
    });

    var pTwoCha1 = new Player("Beta", "beta", 150, 150, 10, 40, 2, 2);

    $("ul").on("click", "li.beta", function() {
      $('#name').html(pTwoCha1.name)
      $('#health').html(pTwoCha1.health + " / " + pTwoCha1.healthTotal)
      $('#attack').html(pTwoCha1.attack)
      $('#defense').html(pTwoCha1.defense)
      $('#movement').html(pTwoCha1.movement + " / " + pTwoCha1.movementMax)
      selectedCharacter = pTwoCha1;
      console.log(selectedCharacter);
    });


  // attempt 2 (woop! this works!)
  var $animation = $('#pcmovement');
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







// attack
  // pOneCha3.health = pOneCha3.health-15;






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
