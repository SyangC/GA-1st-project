console.log("main.js has loaded")

$ (function() {

  $.fn.extend({
      animateCss: function (animationName) {
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          $(this).addClass('animated ' + animationName).one(animationEnd, function() {
              $(this).removeClass('animated ' + animationName);
          });
      }
  });

  // global variables

  var $animation = $('#pcmovement');
  var selectedCharacter = "";
  var selectedEnemy = "";
  var selectedCharacterCurrentWeapon = "";
  var playerTurn = 1;
  var teamOneRemainingCha = 5;
  var teamTwoRemainingCha = 5;
  var selectedWeapon = "";
  var selectedWeaponAmmo = 0;
  var selectedWeaponAmmoUsed = 0;
  var selectedWeaponRange = 0;
  var selectedWeaponDamageMax = 0;
  var selectedWeaponDamageMin = 0;
  var currentId = "";
  var selectedWeaponHitChance = 0;
  var selectedWeaponAccuracy = 0;
  var selectedWeaponSound = "";
  var selectedTerrain = "";
  var terrainEffectsEvade = 0;
  var terrainEffectsDefense = 0;
  var terrainEffectsMovement = 0;
  var ranges = [[0, 29], [0, 1, 28,29,30,59], [0, 1, 2, 27, 28, 29, 30, 31, 58, 59, 60, 89], [0,1,2,3,26,27,28,29,30,31,32,57,58,59,60,61,88,89,90,119],[0,1,2,3,4,25,26,27,28,29,30,31,32,33,56,57,58,59,60,61,62,87,88,89,90,91,118,119,120,149],[],[0,1,2,3,4,5,6,23,24,25,26,27,28,29,30,31,32,33,34,35,54,55,56,57,58,59,60,61,62,63,64,85,86,87,88,89,90,91,92,93,116,117,118,119,120,121,122,147,148,149,150,151,178,179,180,209]];
  var pOneCha1Name = "Jamril";
  var pOneCha2Name = "Thokk";
  var pOneCha3Name = "Lyxi";
  var pOneCha4Name = "Brindlebrook";
  var pOneCha5Name = "Cade";
  var pTwoCha1Name = "Relaan";
  var pTwoCha2Name = "Rin";
  var pTwoCha3Name = "Vanari";
  var pTwoCha4Name = "Badger";
  var pTwoCha5Name = "Rurik";
  var teamOneColour = "blue";
  var teamTwoColour = "red";
  var pcHealthBar = $("#pcHealthBar")
  var pcHealthBar = $("enemyHealthBar")

  // welcome page character and team cutomisation

  var colourIndex = 0;
  var teamColours = ["red", "blue", "green", "purple", "yellow", "orange"]

  var colourPrev = function() {
    colourIndex++;
    if (colourIndex === teamColours.length) {
        colourIndex = 0;
    }
  }

  var colourNext = function() {
    colourIndex--;
    if (colourIndex === -1) {
        colourIndex = teamColours.length-1;
    }
  }

  var teamOneColourChoice = function () {
    $("#teamOneColourChoice").html(teamColours[colourIndex]);
    $("#teamOneChoice").attr("class", teamColours[colourIndex]);
    teamOneColour = teamColours[colourIndex];
  }

  var teamTwoColourChoice = function () {
    $("#teamTwoColourChoice").html(teamColours[colourIndex]);
    $("#teamTwoChoice").attr("class", teamColours[colourIndex]);
    teamTwoColour = teamColours[colourIndex];
  }

  $("#teamOneColourPrev").on("click", function() {
    colourPrev();
    teamOneColourChoice();
  });

  $("#teamOneColourNext").on("click", function() {
    colourNext();
    teamOneColourChoice();
  });

  $("#teamTwoColourPrev").on("click", function() {
    colourPrev();
    teamTwoColourChoice();
  });

  $("#teamTwoColourNext").on("click", function() {
    colourNext();
    teamTwoColourChoice();
  });

// welcome page transform

  $("#teamsConfirmed").on("click", function() {
    if (teamOneColour === teamTwoColour) {
      $("#homeMenu").animateCss("shake");
    } else {
      pOneCha1Name = $("#pOneCha1Name").val() || pOneCha1Name;
      pOneCha2Name = $("#pOneCha2Name").val() || pOneCha2Name;
      pOneCha3Name = $("#pOneCha3Name").val() || pOneCha3Name;
      pOneCha4Name = $("#pOneCha4Name").val() || pOneCha4Name;
      pOneCha5Name = $("#pOneCha5Name").val() || pOneCha5Name;
      pTwoCha1Name = $("#pTwoCha1Name").val() || pTwoCha1Name;
      pTwoCha2Name = $("#pTwoCha2Name").val() || pTwoCha2Name;
      pTwoCha3Name = $("#pTwoCha3Name").val() || pTwoCha3Name;
      pTwoCha4Name = $("#pTwoCha4Name").val() || pTwoCha4Name;
      pTwoCha5Name = $("#pTwoCha5Name").val() || pTwoCha4Name;
      $(".blue").attr("class", teamOneColour);
      $(".blueSelectWeapon").attr("class", teamOneColour+"SelectWeapon");
      console.log($("#pOneCha1Name").val());
      setTimeout(function(){
        $("#homeMenu").animateCss("fadeOut");
        $("#homeMenu").addClass("invisible");
      }, 500);
      setTimeout(function(){
        $("main").animateCss("fadeIn");
        $("main").removeClass("invisible");
      }, 500);
    }
    // constructor functions

    
    var pOneCha1 = new Player(pOneCha1Name, "alpha", 100, 100, 80, 2, 2, "sound/assault rifle.wav", "Assault Rifle", 30, 3, 5, 75, 50, 60, "sound/handgun.wav", "Pistol", 60, 3, 3, 65, 30, 35, "sound/sword.wav", "Sword", 60, 35, 40, 12, 7, 7, 1, 13);

    var pOneCha2 = new Player(pOneCha2Name, "beta", 100, 100, 80, 2, 2, "sound/assault rifle.wav", "Assault Rifle", 30, 3, 5, 75, 50, 60, "sound/handgun.wav", "Pistol", 60, 3, 3, 65, 30, 35, "sound/sword.wav", "Sword", 60, 35, 40, 12, 7, 7, 1, 13);

    var pOneCha3 = new Player(pOneCha3Name, "charlie", 100, 100, 80, 2, 2, "sound/assault rifle.wav", "Assault Rifle", 30, 3, 5, 75, 50, 60, "sound/handgun.wav", "Pistol", 60, 3, 3, 65, 30, 35, "sound/sword.wav", "Sword", 60, 35, 40, 12, 7, 7, 1, 13);

    var pOneCha4 = new Player(pOneCha4Name, "delta", 65, 65, 100, 2, 2, "sound/sniper rifle.wav", "Sniper Rifle", 15, 1, 7, 100, 65, 75, "sound/handgun.wav", "Pistol", 60, 3, 3, 65, 30, 35, "sound/sword.wav", "Knife", 60, 35, 40, 7, 10, 10, 1, 15);

    var pOneCha5 = new Player(pOneCha5Name, "echo", 150, 150, 60, 2, 2, "sound/minigun.wav", "Minigun", 210, 15, 3, 50, 90, 110, "sound/rocket.wav", "Rocket Launcher", 2, 1, 4, 70, 130, 150, "sound/punch.wav", "Fists", 40, 30, 35, 17, 4, 4, 1, 5);

    var pTwoCha1 = new Player(pTwoCha1Name, "foxtrot", 100, 100, 80, 2, 2, "sound/assault rifle.wav", "Assault Rifle", 30, 3, 5, 75, 50, 60, "sound/handgun.wav", "Pistol", 60, 3, 3, 65, 30, 35, "sound/sword.wav", "Sword", 60, 35, 40, 12, 7, 7, 1, 13);


    var pTwoCha2 = new Player(pTwoCha2Name, "gamma", 100, 100, 80, 2, 2, "sound/assault rifle.wav", "Assault Rifle", 30, 3, 5, 75, 50, 60, "sound/handgun.wav", "Pistol", 60, 3, 3, 65, 30, 35, "sound/sword.wav", "Sword", 60, 35, 40, 12, 7, 7, 1, 13);


    var pTwoCha3 = new Player(pTwoCha3Name, "hotel", 100, 100, 80, 2, 2, "sound/assault rifle.wav", "Assault Rifle", 30, 3, 5, 75, 20, 40, "sound/handgun.wav", "Pistol", 60, 3, 3, 65, 10, 25, "sound/sword.wav", "Sword", 60, 35, 50, 12, 7, 7, 1, 13);

    var pTwoCha4 = new Player(pTwoCha4Name, "indigo", 65, 65, 100, 2, 2, "sound/sniper rifle.wav", "Sniper Rifle", 15, 1, 7, 100, 65, 75, "sound/handgun.wav", "Pistol", 60, 3, 3, 65, 30, 35, "sound/sword.wav", "Knife", 60, 35, 40, 7, 10, 10, 1, 15);

    var pTwoCha5 = new Player(pTwoCha5Name, "juliett", 150, 150, 60, 2, 2, "sound/minigun.wav", "Minigun", 210, 15, 3, 50, 90, 110, "sound/rocket.wav", "Rocket Launcher", 2, 1, 4, 70, 130, 150, "sound/punch.wav", "Fists", 40, 30, 35, 17, 4, 4, 1, 5);

    function Terrain (divClass, bonusEvade, bonusDefense, bonusMovement, sound) {
      this.divClass = divClass
      this.bonusEvade = bonusEvade;
      this.bonusDefense = bonusDefense;
      this.bonusMovement = bonusMovement;
      this.sound = sound;
    }

    function Player (name, divId, healthTotal, health, accuracy, attackNumber, attackNumberMax, weaponOneSound, weaponOne, weaponOneAmmo, weaponOneAmmoUsed, weaponOneRange, weaponOneAccuracy, weaponOneDamageMin, weaponOneDamageMax, weaponTwoSound, weaponTwo, weaponTwoAmmo, weaponTwoAmmoUsed, weaponTwoRange, weaponTwoAccuracy, weaponTwoDamageMin, weaponTwoDamageMax, weaponMeleeSound, weaponMelee, weaponMeleeAccuracy, weaponMeleeDamageMin, weaponMeleeDamageMax, defense, movement, movementMax, team, evade) {
      this.name = name;
      this.divId = divId;
      this.healthTotal = healthTotal;
      this.health = health;
      this.accuracy = accuracy;
      this.attackNumber = attackNumber;
      this.attackNumberMax = attackNumberMax;
      this.weaponOneSound = weaponOneSound;
      this.weaponOne = weaponOne;
      this.weaponOneAmmo = weaponOneAmmo;
      this.weaponOneAmmoUsed = weaponOneAmmoUsed; 
      this.weaponOneRange = weaponOneRange;
      this.weaponOneAccuracy = weaponOneAccuracy;
      this.weaponOneDamageMin = weaponOneDamageMin;
      this.weaponOneDamageMax = weaponOneDamageMax;
      this.weaponTwoSound = weaponTwoSound;
      this.weaponTwo = weaponTwo;
      this.weaponTwoAmmo = weaponTwoAmmo;
      this.weaponTwoAmmoUsed = weaponTwoAmmoUsed;
      this.weaponTwoRange = weaponTwoRange;
      this.weaponTwoAccuracy = weaponTwoAccuracy;
      this.weaponTwoDamageMin = weaponTwoDamageMin;
      this.weaponTwoDamageMax = weaponTwoDamageMax;
      this.weaponMeleeSound = weaponMeleeSound;
      this.weaponMelee = weaponMelee;
      this.weaponMeleeAccuracy = weaponMeleeAccuracy;
      this.weaponMeleeDamageMin = weaponMeleeDamageMin;
      this.weaponMeleeDamageMax = weaponMeleeDamageMax;
      this.defense = defense;
      this.movement = movement;
      this.movementMax = movementMax;
      this.team = team;
      this.evade = evade
    }

    // functions

    var playerSelect = function () {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(selectedCharacter.name);
      $('#health').html(selectedCharacter.health + " / " + selectedCharacter.healthTotal);
      $('#accuracy').html(selectedCharacter.accuracy);
      $('#defense').html(selectedCharacter.defense);
      $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax);
      $('#weaponOneName').html(selectedCharacter.weaponOne);
      $('#weaponOneAmmo').html(selectedCharacter.weaponOneAmmo);
      $('#weaponTwoName').html(selectedCharacter.weaponTwo);
      $('#weaponTwoAmmo').html(selectedCharacter.weaponTwoAmmo);
      $('#weaponMelee').html(selectedCharacter.weaponMelee);
      $('#attackNumber').html(selectedCharacter.attackNumber);
      $('.pcImage').attr("id", selectedCharacter.divId+"Image");
      selectedWeapon = "";
      selectedWeaponAmmo = 0;
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(selectedCharacter.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
      pcHealthBar.value = (100/selectedCharacter.healthTotal*selectedCharacter.health);
    }

    var enemySelect = function() {
      $('#selectedEnemy').html(selectedEnemy.name);
      $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal);
      $('.enemyImage').attr("id", selectedEnemy.divId+"Image")
      enemyHealthBar.value = (100/selectedEnemy.healthTotal*selectedEnemy.health);
      if ($("#"+selectedEnemy.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }

    $("ul").on("click", "li#alpha", function() {
      if (playerTurn%2 !== 0) {
        selectedCharacter = pOneCha1;
        playerSelect();
      } else {
        selectedEnemy = pOneCha1;
        enemySelect();
      }
    });

    $("ul").on("click", "li#beta", function() {
      if (playerTurn%2 !== 0) {
        selectedCharacter = pOneCha2;
        playerSelect();
      } else {
        selectedEnemy = pOneCha2;
        enemySelect();
      }
    });

    $("ul").on("click", "li#charlie", function() {
      if (playerTurn%2 !== 0) {
        selectedCharacter = pOneCha3;
        playerSelect();
      } else {
        selectedEnemy = pOneCha3;
        enemySelect();
      }
    });

    $("ul").on("click", "li#delta", function() {
      if (playerTurn%2 !== 0) {
        selectedCharacter = pOneCha4;
        playerSelect();
      } else {
        selectedEnemy = pOneCha4;
        enemySelect();
      }
    });

    $("ul").on("click", "li#echo", function() {
      if (playerTurn%2 !== 0) {
        selectedCharacter = pOneCha5;
        playerSelect();
      } else {
        selectedEnemy = pOneCha5
        enemySelect();
      }
    });

    $("ul").on("click", "li#foxtrot", function() {
      if (playerTurn%2 === 0) {
        selectedCharacter = pTwoCha1;
        playerSelect();
      } else {
        selectedEnemy = pTwoCha1;
        enemySelect();
      }
    });

    $("ul").on("click", "li#gamma", function() {
      if (playerTurn%2 === 0) {
        selectedCharacter = pTwoCha2;
        playerSelect();
      } else {
        selectedEnemy = pTwoCha2;
        enemySelect();
      }
    });

    $("ul").on("click", "li#hotel", function() {
      if (playerTurn%2 === 0) {
        selectedCharacter = pTwoCha3;
        playerSelect();
      } else {
        selectedEnemy = pTwoCha3;
        enemySelect();
      }
    });

    $("ul").on("click", "li#indigo", function() {
      if (playerTurn%2 === 0) {
        selectedCharacter = pTwoCha4;
        playerSelect();
      } else {
        selectedEnemy = pTwoCha4;
        enemySelect();
      }
    });

    $("ul").on("click", "li#juliett", function() {
      if (playerTurn%2 === 0) {
        selectedCharacter = pTwoCha5;
        playerSelect();
      } else {
        selectedEnemy = pTwoCha5;
        enemySelect();
      }
    });

    // terrain

    var plains = new Terrain ("plains", 0, 0, 0, "sound/plains.wav");
    var forest = new Terrain ("forest", 5, 3, 0, "sound/forest.wav");
    var sand = new Terrain ("sand", -5, 0, -1, "sound/sand.ogg");
    var rock = new Terrain ("rock", -5, 3, -1, "sound/rock.mp3");
    var water = new Terrain ("water", -5, 0, -1, "sound/water.wav");
    var ice = new Terrain ("ice", -3, 0, 0, "sound/ice.wav");

  // player movement

    $(document).on("keydown", function(e) {
      switch(e.key) {
        case "a":
          if ($('#'+selectedCharacter.divId).prev().is(".pc") === true || $('#'+selectedCharacter.divId).is(".left") === true || selectedCharacter.movement === 0) {
          } else if ($('#'+selectedCharacter.divId).prev().is(".sand") || $('#'+selectedCharacter.divId).prev().is(".rock") || $('#'+selectedCharacter.divId).prev().is(".water")) {
            if (selectedCharacter.movement-(2) < 0) {
            } else {
              $(".grid").removeClass("inRange");
              $animation.css("left", "-=100px");
              $("#"+selectedCharacter.divId).prev().attr("id", "new");
              $("#new").next().removeAttr("id");
              $("#new").next().removeClass("pc");
              $("#new").addClass("pc");
              $("#new").attr("id", selectedCharacter.divId);
              terrainStepSound();
              selectedCharacter.movement = selectedCharacter.movement - 2; 
              $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
              if(selectedWeapon !== "") {
                gridHighlightWeaponRange();
              }
            }
          } else {
            $(".grid").removeClass("inRange");
            $animation.css("left", "-=100px");
            $("#"+selectedCharacter.divId).prev().attr("id", "new");
            $("#new").next().removeAttr("id");
            $("#new").next().removeClass("pc");
            $("#new").addClass("pc");
            $("#new").attr("id", selectedCharacter.divId);
            terrainStepSound();
            selectedCharacter.movement--; 
            $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
            if(selectedWeapon !== "") {
              gridHighlightWeaponRange();
            }
          }
          break;
        case "w":
          if ($("#"+selectedCharacter.divId).prevAll().eq(29).is(".pc") === true || selectedCharacter.movement === 0) {
          } else if ($('#'+selectedCharacter.divId).prevAll().eq(29).is(".sand") || $('#'+selectedCharacter.divId).prevAll().eq(29).is(".rock") || $('#'+selectedCharacter.divId).prevAll().eq(29).is(".water")) {
            if (selectedCharacter.movement-(2) < 0) {
            } else {
              $(".grid").removeClass("inRange");
              $animation.css("top", "-=102px");
              $("#"+selectedCharacter.divId).prevAll().eq(29).attr("id", "new");
              $("#new").nextAll().eq(29).removeAttr("id");
              $("#new").nextAll().eq(29).removeClass("pc");
              $("#new").addClass("pc");
              $("#new").attr("id", selectedCharacter.divId);
              terrainStepSound();
              selectedCharacter.movement = selectedCharacter.movement - 2; 
              $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
              if(selectedWeapon !== "") {
                gridHighlightWeaponRange();
              }
            }
          } else {
            $(".grid").removeClass("inRange");
            $animation.css("top", "-=102px");
            $("#"+selectedCharacter.divId).prevAll().eq(29).attr("id", "new");
            $("#new").nextAll().eq(29).removeAttr("id");
            $("#new").nextAll().eq(29).removeClass("pc");
            $("#new").addClass("pc");
            $("#new").attr("id", selectedCharacter.divId);
            terrainStepSound();
            selectedCharacter.movement--; 
            $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
            if(selectedWeapon !== "") {
              gridHighlightWeaponRange();
            }
          }
          break;
        case "d":
          if ($('#'+selectedCharacter.divId).next().is(".pc") === true || $('#'+selectedCharacter.divId).is(".right") === true || selectedCharacter.movement === 0) {
          } else if ($('#'+selectedCharacter.divId).next().is(".sand") || $('#'+selectedCharacter.divId).next().is(".rock") || $('#'+selectedCharacter.divId).next().is(".water")) {
            if (selectedCharacter.movement-(2) < 0) {
            } else {
              $(".grid").removeClass("inRange");
              $animation.css("left", "+=100px");
              $("#"+selectedCharacter.divId).next().attr("id", "new");
              $("#new").prev().removeAttr("id");
              $("#new").prev().removeClass("pc");
              $("#new").addClass("pc");
              $("#new").attr("id", selectedCharacter.divId);
              terrainStepSound();
              selectedCharacter.movement = selectedCharacter.movement - 2; 
              $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
              if(selectedWeapon !== "") {
                gridHighlightWeaponRange();
              }
            }
          } else {
            $(".grid").removeClass("inRange");
            $animation.css("left", "+=100px");
            $("#"+selectedCharacter.divId).next().attr("id", "new");
            $("#new").prev().removeAttr("id");
            $("#new").prev().removeClass("pc");
            $("#new").addClass("pc");
            $("#new").attr("id", selectedCharacter.divId);
            terrainStepSound();
            selectedCharacter.movement--; 
            $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
            if(selectedWeapon !== "") {
              gridHighlightWeaponRange();
            }
          }
          break;
        case "s":
          if ($("#"+selectedCharacter.divId).nextAll().eq(29).is(".pc") === true || selectedCharacter.movement === 0) {
          } else if ($('#'+selectedCharacter.divId).nextAll().eq(29).is(".sand") || $('#'+selectedCharacter.divId).nextAll().eq(29).is(".rock") || $('#'+selectedCharacter.divId).nextAll().eq(29).is(".water")) {
            if (selectedCharacter.movement-(2) < 0) {
            } else {
              $(".grid").removeClass("inRange");
              $animation.css("top", "+=102px");
              $("#"+selectedCharacter.divId).nextAll().eq(29).attr("id", "new");
              $("#new").prevAll().eq(29).removeAttr("id");
              $("#new").prevAll().eq(29).removeClass("pc");
              $("#new").addClass("pc");
              $("#new").attr("id", selectedCharacter.divId);
              terrainStepSound();
              selectedCharacter.movement = selectedCharacter.movement - 2; 
              $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
              if(selectedWeapon !== "") {
                gridHighlightWeaponRange();
              }  
            }
          } else {
            $(".grid").removeClass("inRange");
            $animation.css("top", "+=102px");
            $("#"+selectedCharacter.divId).nextAll().eq(29).attr("id", "new");
            $("#new").prevAll().eq(29).removeAttr("id");
            $("#new").prevAll().eq(29).removeClass("pc");
            $("#new").addClass("pc");
            $("#new").attr("id", selectedCharacter.divId);
            terrainStepSound();
            selectedCharacter.movement--; 
            $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
            if(selectedWeapon !== "") {
              gridHighlightWeaponRange();
            }
          }
          break;
      }
    });

  // attack

    ($("."+teamOneColour+"SelectWeapon")||$("."+teamTwoColour+"SelectWeapon")).on("click", function() {
      if (selectedCharacter !== "") {
        if (this.id === "selectWeaponOne" && selectedCharacter.weaponOneAmmo >0) {
          selectedWeaponSound = new Audio(selectedCharacter.weaponOneSound);
          $(".grid").removeClass("inRange");
          selectedWeaponAccuracy = selectedCharacter.weaponOneAccuracy;
          selectedWeaponRange = selectedCharacter.weaponOneRange;
          gridHighlightWeaponRange();
          selectedWeapon = selectedCharacter.weaponOne;
          selectedWeaponDamageMax = selectedCharacter.weaponOneDamageMax;
          selectedWeaponDamageMin = selectedCharacter.weaponOneDamageMin;
          selectedWeaponAmmo = selectedCharacter.weaponOneAmmo;
          selectedWeaponAmmoUsed = selectedCharacter.weaponOneAmmoUsed;
        } else if (this.id === "selectWeaponOne" && selectedCharacter.weaponOneAmmo <= 0) {
          selectedWeapon = selectedCharacter.weaponOne;
          $('#infoDisplay').html("You are out of Ammo for the " + selectedWeapon + ". Use another weapon");
          selectedWeapon = "";
        }
        if (this.id === "selectWeaponTwo" && selectedCharacter.weaponTwoAmmo >0) {
          selectedWeaponSound = new Audio(selectedCharacter.weaponTwoSound);
          $(".grid").removeClass("inRange");
          selectedWeaponAccuracy = selectedCharacter.weaponTwoAccuracy;
          selectedWeaponRange = selectedCharacter.weaponTwoRange;
          gridHighlightWeaponRange();
          selectedWeapon = selectedCharacter.weaponTwo;
          selectedWeaponDamageMax = selectedCharacter.weaponTwoDamageMax;
          selectedWeaponDamageMin = selectedCharacter.weaponTwoDamageMin;
          selectedWeaponAmmo = selectedCharacter.weaponTwoAmmo;
          selectedWeaponAmmoUsed = selectedCharacter.weaponTwoAmmoUsed;
        } else if (this.id === "selectWeaponTwo" && selectedCharacter.weaponTwoAmmo <= 0) {
          selectedWeapon = selectedCharacter.weaponTwo;
          $('#infoDisplay').html("You are out of Ammo for the " + selectedWeapon + ". Use another weapon");
          selectedWeapon = "";
        }
        if (this.id === "selectWeaponMelee") {
          selectedWeaponSound = new Audio(selectedCharacter.weaponMeleeSound);
          $(".grid").removeClass("inRange");
          selectedWeaponAccuracy = selectedCharacter.weaponMeleeAccuracy;
          selectedWeaponRange = 1;
          gridHighlightWeaponRange();
          selectedWeaponDamageMax = selectedCharacter.weaponMeleeDamageMax;
          selectedWeaponDamageMin = selectedCharacter.weaponMeleeDamageMin;
          selectedWeaponAmmo=1;
          selectedWeaponAmmoUsed=0;
        }
      }
    });

    var attackResolve = function () {
      terrainEffectsAll()
      selectedWeaponHitChance = selectedCharacter.accuracy - (selectedEnemy.evade+terrainEffectsEvade);
      if (selectedCharacter.attackNumber > 0) {
        selectedWeaponHitChance = (selectedCharacter.accuracy+selectedWeaponAccuracy)/2 - (selectedEnemy.evade+terrainEffectsEvade);
        percentage = Math.round(Math.random()*100)
        $('#infoDisplay').html("You have a " + selectedWeaponHitChance + "% chance of hitting the taget.");
        selectedWeaponSound.play();
        setTimeout(function(){
          if (selectedWeaponHitChance < percentage) {
            $('#infoDisplay').html("Missed!");
          selectedWeaponAmmo = selectedWeaponAmmo - selectedWeaponAmmoUsed;
          $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal)
          }
          if (selectedWeaponHitChance>percentage) {
            critChance = Math.random()*100;
            if(critChance > 97) {
              $('#infoDisplay').html("Critical Hit!");
              $('.enemyImage').animateCss('flash');
              weaponDamage = ((selectedWeaponDamageMin+Math.round(Math.random()*(selectedWeaponDamageMax-selectedWeaponDamageMin)))*1.5)-(selectedCharacter.defense+terrainEffectsDefense);
              setTimeout(function() {
                $('#infoDisplay').html("Dealt the enemy " + weaponDamage + " damage!");
                $('#selectedEnemy').html(selectedEnemy.name);
                $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal);
              }, 1000);
              selectedEnemy.health = selectedEnemy.health - weaponDamage;
              enemyHealthBar.value = (100/selectedEnemy.healthTotal*selectedEnemy.health);
              console.log(enemyHealthBar.value);
              selectedWeaponAmmo = selectedWeaponAmmo - selectedWeaponAmmoUsed;
              deathCheck();
            } else {
              $('#infoDisplay').html("Hit!");
              $('.enemyImage').animateCss('flash');
              weaponDamage = (selectedWeaponDamageMin+Math.round(Math.random()*(selectedWeaponDamageMax-selectedWeaponDamageMin)))-(selectedCharacter.defense+terrainEffectsDefense);
              setTimeout(function(){
                $('#infoDisplay').html("Dealt the enemy " + weaponDamage + " damage!");
                $('#selectedEnemy').html(selectedEnemy.name);
                $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal);
              }, 1000);
              selectedEnemy.health = selectedEnemy.health - weaponDamage;
              enemyHealthBar.value = (100/selectedEnemy.healthTotal*selectedEnemy.health);
              console.log(enemyHealthBar.value);
              selectedWeaponAmmo = selectedWeaponAmmo - selectedWeaponAmmoUsed;
              deathCheck();
            }
          }
        }, 1000);
        if (selectedWeapon === selectedCharacter.weaponOne) {
          selectedCharacter.weaponOneAmmo = selectedCharacter.weaponOneAmmo - selectedCharacter.weaponOneAmmoUsed;
          selectedCharacter.attackNumber --;
          $('#attackNumber').html(selectedCharacter.attackNumber);
          $('#weaponOneAmmo').html(selectedCharacter.weaponOneAmmo);        
        } else if (selectedWeapon === selectedCharacter.weaponTwo) {
          selectedCharacter.weaponTwoAmmo = selectedCharacter.weaponTwoAmmo - selectedCharacter.weaponTwoAmmoUsed;
          selectedCharacter.attackNumber --;
          $('#attackNumber').html(selectedCharacter.attackNumber);
          $('#weaponTwoAmmo').html(selectedCharacter.weaponTwoAmmo);
        } else if (selectedWeapon === selectedCharacter.weaponMelee) {
          selectedCharacter.attackNumber --;
          $('#attackNumber').html(selectedCharacter.attackNumber);
        }
      } else {
        $('#infoDisplay').html("You have no more attacks.");
        selectedWeapon = "";
      }
    }

    var deathCheck = function () {
      if (selectedEnemy.health <= 0) {
        $("#"+selectedEnemy.divId).attr('id', 'rip')
        selectedEnemy = "";
        $('.enemyImage').attr("id", "ripImage")
        $('#selectedEnemy').html("Enemy");
        $('#enemyHealth').html("");
        if (playerTurn%2 !== 0) {
          teamTwoRemainingCha --;
          if (teamTwoRemainingCha === 0) {
            victory();
          };
        } else {
          teamOneRemainingCha --;
          if (teamOneRemainingCha === 0) {
            victory();
          };
        }
      }
    }

    var victory = function() {
      if (teamTwoRemainingCha === 0) {
        $("#inforDisplay").html(teamOneColour+" team has won!" + "<br><br><br>" + "...and the " + teamTwoColour+ " team was also there.");
      } else if (teamOneRemainingCha === 0) {
        $("#inforDisplay").html(teamTwoColour+" team has won!" + "<br><br><br>" + "...and the " + teamOneColour+ " team was also there.");
      }
    };

    $("#restart").on("click", function() {
      location.reload();
    })

    var gridHighlightWeaponRange = function () {
      var currentId = $("#"+selectedCharacter.divId);
      var gridWeaponRange = ranges[selectedWeaponRange-1]
      $.each(gridWeaponRange, function(i, value) {
        currentId.nextAll().eq(value).addClass("inRange");
        currentId.prevAll().eq(value).addClass("inRange");
      });
    }

    var terrainStepSound = function () {
      if ($("#"+selectedCharacter.divId).hasClass("plains")) {
        new Audio(plains.sound).play();
      }
      if ($("#"+selectedCharacter.divId).hasClass("rock")) {
        new Audio(rock.sound).play();
      }
      if ($("#"+selectedCharacter.divId).hasClass("ice")) {
        new Audio(ice.sound).play();
      }
      if ($("#"+selectedCharacter.divId).hasClass("forest")) {
        new Audio(forest.sound).play();
      }
      if ($("#"+selectedCharacter.divId).hasClass("water")) {
        new Audio(water.sound).play();
      }
      if ($("#"+selectedCharacter.divId).hasClass("sand")) {
        new Audio(sand.sound).play();
      }
    }

    var terrainEffectsAll = function() {
      if ($("#"+selectedEnemy.divId).hasClass("plains") === true) {
        terrainEffectsDefense = plains.bonusDefense
        terrainEffectsEvade = plains.bonusEvade
        terrainEffectsMovement = plains.bonusMovement
      } else if ($("#"+selectedEnemy.divId).hasClass("forest") === true) {
        terrainEffectsDefense = forest.bonusDefense
        terrainEffectsEvade = forest.bonusEvade
        terrainEffectsMovement = forest.bonusMovement
      } else if ($("#"+selectedEnemy.divId).hasClass("sand") === true) {
        terrainEffectsDefense = sand.bonusDefense
        terrainEffectsEvade = sand.bonusEvade
        terrainEffectsMovement = sand.bonusMovement
      } else if ($("#"+selectedEnemy.divId).hasClass("rock") === true) {
        terrainEffectsDefense = rock.bonusDefense
        terrainEffectsEvade = rock.bonusEvade
        terrainEffectsMovement = rock.bonusMovement
      } else if ($("#"+selectedEnemy.divId).hasClass("water") === true) {
        terrainEffectsDefense = water.bonusDefense
        terrainEffectsEvade = water.bonusEvade
        terrainEffectsMovement = water.bonusMovement
      } else if ($("#"+selectedEnemy.divId).hasClass("ice") === true) {
        terrainEffectsDefense = ice.bonusDefense
        terrainEffectsEvade = ice.bonusEvade
        terrainEffectsMovement = ice.bonusMovement
      }
    }

  // switch turn

    $("#endTurn").on("click", function() {
      $(".grid").removeClass("inRange");
      selectedEnemy = "";
      $('.pcImage').removeAttr("id")
      $('.enemyImage').removeAttr("id")
      $('#selectedEnemy').html("Enemy");
      $('#enemyHealth').html("");
      selectedCharacter = "";
      $('#name').html("");
      $('#health').html("");
      $('#accuracy').html("");
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
        $('main').animateCss('fadeOutDown');
        setTimeout(function(){
          $("."+teamOneColour).attr("class", teamTwoColour);
          $("."+teamOneColour+"SelectWeapon").attr("class", teamTwoColour+"SelectWeapon");
        }, 700);
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
        $('main').animateCss('fadeOutDown');
        setTimeout(function(){
          $("."+teamTwoColour).attr("class", teamOneColour);
          $("."+teamTwoColour+"SelectWeapon").attr("class", teamOneColour+"SelectWeapon");
        }, 700);
      }
    });
  });
});