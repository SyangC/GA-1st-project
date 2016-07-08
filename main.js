console.log("js has loaded")

$ (function() {

// on click of button
  // $(".original").on("click", function() {
  //   console.log("button has been clicked")
  //   $("li").toggleClass('grid');
  //   $("li").toggleClass('shu');
  // });

// this is movement of div based on keypresses
  // var $animation = $('#animation');
  //   $(document).on("keydown", function(e) {
  //     switch(e.key) {
  //       case "a":
  //       case "ArrowLeft":
  //         $animation.css("left", "-=100px");
  //         break;
  //       case "w":
  //       case "ArrowUp":
  //         $animation.css("top", "-=102px");
  //         break;
  //       case "d":
  //       case "ArrowRight":
  //         $animation.css("left", "+=100px");
  //         break;
  //       case "s"key: "value", 
  //       case "ArrowDown":
  //         $animation.css("top", "+=102px");
  //         break;
  //     }
  //   });


  // attempt 2 (woop! this works!)
  var $animation = $('#pcmovement');
  $(document).on("keydown", function(e) {
    switch(e.key) {
      case "a":
      case "ArrowLeft":
        if ($(".shu").attr('id') === "a1" ||
          $(".shu").attr('id') === "b1" ||
          $(".shu").attr('id') === "c1" ||
          $(".shu").attr('id') === "d1" ||
          $(".shu").attr('id') === "e1" ||
          $(".shu").attr('id') === "f1" ||
          $(".shu").attr('id') === "g1" ||
          $(".shu").attr('id') === "h1" ||
          $(".shu").prev().attr('class') !== "grid") {
        } else {
          var originalGrid = $(".shu").next().attr('class')
          $animation.css("left", "-=100px");
          $(".shu").prev().attr("class", 'shuNew');
          $(".shuNew").next().attr('class', 'grid');
          $(".shuNew").attr('class', 'shu');
        }
        break;
      case "w":
      case "ArrowUp":
        if ($(".shu").prevAll().eq(7).attr('class') !== "grid") {
        } else {
          $animation.css("top", "-=102px");
          $(".shu").prevAll().eq(7).attr('class', 'shu');
          $(".shu").nextAll().eq(7).attr('class', 'grid');
        }
        break;
      case "d":
      case "ArrowRight":
        if ($(".shu").attr('id') === "a8" ||
          $(".shu").attr('id') === "b8" ||
          $(".shu").attr('id') === "c8" ||
          $(".shu").attr('id') === "d8" ||
          $(".shu").attr('id') === "e8" ||
          $(".shu").attr('id') === "f8" ||
          $(".shu").attr('id') === "g8" ||
          $(".shu").attr('id') === "h8" || 
          $(".shu").next().attr('class') !== "grid") {
        } else {
          $animation.css("left", "+=100px");
          $(".shu").next().attr('class', 'shuNew');
          $(".shuNew").prev().attr('class', 'grid');
          $(".shuNew").attr('class', 'shu');
        }
        break;
      case "s":
      case "ArrowDown":
        if ($(".shu").nextAll().eq(7).attr('class') !== "grid") {
        } else {
          $animation.css("top", "+=102px");
          $(".shu").nextAll().eq(7).attr('class', 'shu');
          $(".shu").prevAll().eq(7).attr('class', 'grid');
        }
        break;
    }
  });



// create player consturction function
  // var Player = function (name, divClass){
  //   this.name = name;
  //   this.divClass = divClass;
  // }

// var playerCharacter = new Player("Shu", "shu")





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
