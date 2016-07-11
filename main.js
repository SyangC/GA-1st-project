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
  var terrainEffectsEvade = 1;
  var terrainEffectsDefense = 1;
  var terrainEffectsMovement = 1;
  var ranges = [[0, 29], [0, 1, 28,29,30,59], [0, 1, 2, 27, 28, 29, 30, 31, 58, 59, 60, 89], [0,1,2,3,26,27,28,29,30,31,32,57,58,59,60,61,88,89,90,119],[0,1,2,3,4,25,26,27,28,29,30,31,32,33,56,57,58,59,60,61,62,87,88,89,90,91,118,119,120,149],[],[0,1,2,3,4,5,6,23,24,25,26,27,28,29,30,31,32,33,34,35,54,55,56,57,58,59,60,61,62,63,64,85,86,87,88,89,90,91,92,93,116,117,118,119,120,121,122,147,148,149,150,151,178,179,180,209]];

  // create player consturction function
  
  function Terrain (bonusEvade, bonusDefense, bonusMovement) {
    this.bonusEvade = bonusEvade;
    this.bonusDefense = bonusDefense;
    this.bonusMovement = bonusMovement;
  }

  function Player (name, divId, healthTotal, health, accuracy, attackNumber, attackNumberMax, weaponOne, weaponOneAmmo, weaponOneAmmoUsed, weaponOneRange, weaponOneAccuracy, weaponOneDamageMin, weaponOneDamageMax, weaponTwo, weaponTwoAmmo, weaponTwoAmmoUsed, weaponTwoRange, weaponTwoAccuracy, weaponTwoDamageMin, weaponTwoDamageMax, weaponMelee, weaponMeleeAccuracy, weaponMeleeDamageMin, weaponMeleeDamageMax, defense, movement, movementMax, team, evade){
    this.name = name;
    this.divId = divId;
    this.healthTotal = healthTotal;
    this.health = health;
    this.accuracy = accuracy;
    this.attackNumber = attackNumber;
    this.attackNumberMax = attackNumberMax;
    this.weaponOne = weaponOne;
    this.weaponOneAmmo = weaponOneAmmo;
    this.weaponOneAmmoUsed = weaponOneAmmoUsed; 
    this.weaponOneRange = weaponOneRange;
    this.weaponOneAccuracy = weaponOneAccuracy;
    this.weaponOneDamageMin = weaponOneDamageMin;
    this.weaponOneDamageMax = weaponOneDamageMax;
    this.weaponTwo = weaponTwo;
    this.weaponTwoAmmo = weaponTwoAmmo;
    this.weaponTwoAmmoUsed = weaponTwoAmmoUsed;
    this.weaponTwoRange = weaponTwoRange;
    this.weaponTwoAccuracy = weaponTwoAccuracy;
    this.weaponTwoDamageMin = weaponTwoDamageMin;
    this.weaponTwoDamageMax = weaponTwoDamageMax;
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

  // actual players

// Team 1
  var pOneCha1 = new Player("Alpha", "alpha", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 50, 60, "Pistol", 60, 3, 3, 65, 30, 35, "Sword", 60, 35, 40, 12, 7, 7, 1, 13);

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
  }

  var enemySelect = function() {
    $('#selectedEnemy').html(selectedEnemy.name);
    $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal);
    $('.enemyImage').attr("id", selectedEnemy.divId+"Image")
    if ($("#"+selectedEnemy.divId).hasClass("inRange")) {
      terrainEffectsAll()
      attackResolve();
      selectedWeapon = "";
      $(".grid").removeClass("inRange");
    } else {
      $('#infoDisplay').html("You are out of range! Move closer to attack.");
      selectedWeapon = "";
      $(".grid").removeClass("inRange");
    }
    terrainEffectsMovement = 1;
    terrainEffectsDefense = 1;
    terrainEffectsEvade = 1;
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


  var pOneCha2 = new Player("Beta", "beta", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 50, 60, "Pistol", 60, 3, 3, 65, 30, 35, "Sword", 60, 35, 40, 12, 7, 7, 1, 13);


  $("ul").on("click", "li#beta", function() {
    if (playerTurn%2 !== 0) {
      selectedCharacter = pOneCha2;
      playerSelect();
    } else {
      selectedEnemy = pOneCha2;
      enemySelect();
    }
  });


  var pOneCha3 = new Player("Charlie", "charlie", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 50, 60, "Pistol", 60, 3, 3, 65, 30, 35, "Sword", 60, 35, 40, 12, 7, 7, 1, 13);


  $("ul").on("click", "li#charlie", function() {
    if (playerTurn%2 !== 0) {
      selectedCharacter = pOneCha3;
      playerSelect();
    } else {
      selectedEnemy = pOneCha3;
      enemySelect();
    }
  });


  var pOneCha4 = new Player("Delta", "delta", 65, 65, 100, 2, 2, "Sniper Rifle", 15, 1, 7, 100, 65, 75, "Pistol", 60, 3, 3, 65, 30, 35, "Knife", 60, 35, 40, 7, 10, 10, 1, 15);


  $("ul").on("click", "li#delta", function() {
    if (playerTurn%2 !== 0) {
      selectedCharacter = pOneCha4;
      playerSelect();
    } else {
      selectedEnemy = pOneCha4;
      enemySelect();
    }
  });


  var pOneCha5 = new Player("Echo", "echo", 150, 150, 60, 2, 2, "Minigun", 210, 15, 3, 50, 90, 110, "Rocket Launcher", 2, 1, 4, 70, 130, 150, "Fists", 40, 30, 35, 17, 4, 4, 1, 5);


  $("ul").on("click", "li#echo", function() {
    if (playerTurn%2 !== 0) {
      selectedCharacter = pOneCha5;
      playerSelect();
    } else {
      selectedEnemy = pOneCha5
      enemySelect();
    }
  });


  // Team 2

  var pTwoCha1 = new Player("Foxtrot", "foxtrot", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 50, 60, "Pistol", 60, 3, 3, 65, 30, 35, "Sword", 60, 35, 40, 12, 7, 7, 1, 13);


  $("ul").on("click", "li#foxtrot", function() {
    if (playerTurn%2 === 0) {
      selectedCharacter = pTwoCha1;
      playerSelect();
    } else {
      selectedEnemy = pTwoCha1;
      enemySelect();
    }
  });


  var pTwoCha2 = new Player("Gamma", "gamma", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 50, 60, "Pistol", 60, 3, 3, 65, 30, 35, "Sword", 60, 35, 40, 12, 7, 7, 1, 13);


  $("ul").on("click", "li#gamma", function() {
    if (playerTurn%2 === 0) {
      selectedCharacter = pTwoCha2;
      playerSelect();
    } else {
      selectedEnemy = pTwoCha2;
      enemySelect();
    }
  });


  var pTwoCha3 = new Player("Hotel", "hotel", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 20, 40, "Pistol", 60, 3, 3, 65, 10, 25, "Sword", 60, 35, 50, 12, 7, 7, 1, 13);


  $("ul").on("click", "li#hotel", function() {
    if (playerTurn%2 === 0) {
      selectedCharacter = pTwoCha3;
      playerSelect();
    } else {
      selectedEnemy = pTwoCha3;
      enemySelect();
    }
  });


  var pTwoCha4 = new Player("Indigo", "indigo", 65, 65, 100, 2, 2, "Sniper Rifle", 15, 1, 7, 100, 65, 75, "Pistol", 60, 3, 3, 65, 30, 35, "Knife", 60, 35, 40, 7, 10, 10, 1, 15);


  $("ul").on("click", "li#indigo", function() {
    if (playerTurn%2 === 0) {
      selectedCharacter = pTwoCha4;
      playerSelect();
    } else {
      selectedEnemy = pTwoCha4;
      enemySelect();
    }
  });


  var pTwoCha5 = new Player("Juliett", "juliett", 150, 150, 60, 2, 2, "Minigun", 210, 15, 3, 50, 90, 110, "Rocket Launcher", 2, 1, 4, 70, 130, 150, "Fists", 40, 30, 35, 17, 4, 4, 1, 5);


  $("ul").on("click", "li#juliett", function() {
    if (playerTurn%2 === 0) {
      selectedCharacter = pTwoCha5;
      playerSelect();
    } else {
      selectedEnemy = pTwoCha5;
      enemySelect();
    }
  });

// player movement

  $(document).on("keydown", function(e) {
    switch(e.key) {
      case "a":
        if ($('#'+selectedCharacter.divId).prev().is(".pc") === true || $('#'+selectedCharacter.divId).is(".left") === true || selectedCharacter.movement === 0) {
        } else {
          $(".grid").removeClass("inRange");
          $animation.css("left", "-=100px");
          $("#"+selectedCharacter.divId).prev().attr("id", "new");
          $("#new").next().removeAttr("id");
          $("#new").next().removeClass("pc");
          $("#new").addClass("pc");
          $("#new").attr("id", selectedCharacter.divId);
          selectedCharacter.movement--; 
          $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
          if(selectedWeapon !== "") {
            gridHighlightWeaponRange();
          }
        }
        break;
      case "w":
        if ($("#"+selectedCharacter.divId).prevAll().eq(29).is(".pc") === true || selectedCharacter.movement === 0) {
        } else {
          $(".grid").removeClass("inRange");
          $animation.css("top", "-=102px");
          $("#"+selectedCharacter.divId).prevAll().eq(29).attr("id", "new");
          $("#new").nextAll().eq(29).removeAttr("id");
          $("#new").nextAll().eq(29).removeClass("pc");
          $("#new").addClass("pc");
          $("#new").attr("id", selectedCharacter.divId);
          selectedCharacter.movement--; 
          $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
          if(selectedWeapon !== "") {
            gridHighlightWeaponRange();
          }
        }
        break;
      case "d":
        if ($('#'+selectedCharacter.divId).next().is(".pc") === true || $('#'+selectedCharacter.divId).is(".right") === true || selectedCharacter.movement === 0) {
        } else {
          $(".grid").removeClass("inRange");
          $animation.css("left", "+=100px");
          $("#"+selectedCharacter.divId).next().attr("id", "new");
          $("#new").prev().removeAttr("id");
          $("#new").prev().removeClass("pc");
          $("#new").addClass("pc");
          $("#new").attr("id", selectedCharacter.divId);
          selectedCharacter.movement--; 
          $('#movement').html(selectedCharacter.movement + " / " + selectedCharacter.movementMax)
          if(selectedWeapon !== "") {
            gridHighlightWeaponRange();
          }
        }
        break;
      case "s":
        if ($("#"+selectedCharacter.divId).nextAll().eq(29).is(".pc") === true || selectedCharacter.movement === 0) {
        } else {
          $(".grid").removeClass("inRange");
          $animation.css("top", "+=102px");
          $("#"+selectedCharacter.divId).nextAll().eq(29).attr("id", "new");
          $("#new").prevAll().eq(29).removeAttr("id");
          $("#new").prevAll().eq(29).removeClass("pc");
          $("#new").addClass("pc");
          $("#new").attr("id", selectedCharacter.divId);
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

  ($(".selectWeaponBlue")||$(".selectWeaponRed")).on("click", function() {
    if (selectedCharacter !== "") {
      if (this.id === "selectWeaponOne" && selectedCharacter.weaponOneAmmo >0) {
        $(".grid").removeClass("inRange");
        selectedWeaponAccuracy = selectedCharacter.weaponOneAccuracy;
        selectedWeaponRange = selectedCharacter.weaponOneRange;
        gridHighlightWeaponRange();
        selectedWeapon = selectedCharacter.weaponOne;
        selectedWeaponDamageMax = selectedCharacter.weaponOneDamageMax;
        selectedWeaponDamageMin = selectedCharacter.weaponOneDamageMin;
        selectedWeaponAmmo = selectedCharacter.weaponOneAmmo;
        selectedWeaponAmmoUsed = selectedCharacter.weaponOneAmmoUsed;
      } else if (this.id === "selectWeaponOne" && selectedCharacter.weaponOneAmmo <= 0) {        selectedWeapon = selectedCharacter.weaponOne;
        $('#infoDisplay').html("You are out of Ammo for the " + selectedWeapon + ". Use another weapon");
        selectedWeapon = "";
      }
      if (this.id === "selectWeaponTwo" && selectedCharacter.weaponTwoAmmo >0) {
        $(".grid").removeClass("inRange");
        selectedWeaponAccuracy = selectedCharacter.weaponTwoAccuracy;
        selectedWeaponRange = selectedCharacter.weaponTwoRange;
        gridHighlightWeaponRange();
        selectedWeapon = selectedCharacter.weaponTwo;
        selectedWeaponDamageMax = selectedCharacter.weaponTwoDamageMax;
        selectedWeaponDamageMin = selectedCharacter.weaponTwoDamageMin;
        selectedWeaponAmmo = selectedCharacter.weaponTwoAmmo;
        selectedWeaponAmmoUsed = selectedCharacter.weaponTwoAmmoUsed;
      } else if (this.id === "selectWeaponTwo" && selectedCharacter.weaponTwoAmmo <= 0) {        selectedWeapon = selectedCharacter.weaponTwo;
        $('#infoDisplay').html("You are out of Ammo for the " + selectedWeapon + ". Use another weapon");
        selectedWeapon = "";
      }
      if (this.id === "selectWeaponMelee") {
        $(".grid").removeClass("inRange");
        selectedWeaponAccuracy = selectedCharacter.weaponMeleeAccuracy;
        selectedWeaponRange = 1;
        gridHighlightWeaponRange();
        selectedWeaponDamageMax = selectedCharacter.weaponTwoDamageMax;
        selectedWeaponDamageMin = selectedCharacter.weaponTwoDamageMin;
        selectedWeaponAmmo = 1;
        selectedWeaponAmmoUsed = 0;
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
      setTimeout(function(){
        if (selectedWeaponHitChance < percentage) {
          $('#infoDisplay').html("Missed!");
        selectedWeaponAmmo = selectedWeaponAmmo - selectedWeaponAmmoUsed;
        $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal)
        }
        if (selectedWeaponHitChance>percentage) {
          if(selectedWeaponHitChance >= (selectedCharacter.accuracy)*0.97) {
            $('#infoDisplay').html("Critical Hit!");
            weaponDamage = ((selectedWeaponDamageMin+Math.round(Math.random()*(selectedWeaponDamageMax-selectedWeaponDamageMin)))*1.5)-(selectedCharacter.defense+terrainEffectsDefense);
            setTimeout(function() {
              $('.enemyImage').animateCss('flash');
              $('#infoDisplay').html("Dealt the enemy " + weaponDamage + " damage!");
              $('#selectedEnemy').html(selectedEnemy.name);
              $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal);
            }, 1000);
            selectedEnemy.health = selectedEnemy.health - weaponDamage;
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
            selectedWeaponAmmo = selectedWeaponAmmo - selectedWeaponAmmoUsed;
            deathCheck();
          }
        }
      }, 1000);
      if (selectedWeapon === selectedCharacter.weaponOne) {
        console.log(selectedCharacter.weaponOneAmmo);
        console.log(selectedCharacter.weaponOneAmmoUsed);
        selectedCharacter.weaponOneAmmo = selectedCharacter.weaponOneAmmo - selectedCharacter.weaponOneAmmoUsed;
        selectedCharacter.attackNumber --;
        console.log(selectedCharacter.attackNumber);
        $('#attackNumber').html(selectedCharacter.attackNumber);
        $('#weaponOneAmmo').html(selectedCharacter.weaponOneAmmo);        
      } else if (selectedWeapon === selectedCharacter.weaponTwo) {
        console.log(selectedCharacter.weaponOneAmmo);
        console.log(selectedCharacter.weaponOneAmmoUsed);
        selectedCharacter.weaponTwoAmmo = selectedCharacter.weaponTwoAmmo - selectedCharacter.weaponTwoAmmoUsed;
        selectedCharacter.attackNumber --;
        console.log(selectedCharacter.attackNumber);
        $('#attackNumber').html(selectedCharacter.attackNumber);
        $('#weaponTwoAmmo').html(selectedCharacter.weaponOneAmmo);
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
          alert("Team One has won!")
        }
      } else {
        teamOneRemainingCha --;
        if (teamOneRemainingCha === 0) {
          alert("Team Two has won!")
        }
      }
    }
  }

  var gridHighlightWeaponRange = function () {
    var currentId = $("#"+selectedCharacter.divId);
    var gridWeaponRange = ranges[selectedWeaponRange-1]
    $.each(gridWeaponRange, function(i, value) {
      currentId.nextAll().eq(value).addClass("inRange");
      currentId.prevAll().eq(value).addClass("inRange");
    });
  }

  var plains = new Terrain (1, 1, 1);
  var forest = new Terrain (5, 3, 1);
  var sand = new Terrain (-5, 1, -1);
  var rock = new Terrain (-5, 3, -1);
  var water = new Terrain (-5, 1, -1);
  var ice = new Terrain (-3, 1, 1);

  var terrainEffectsAll = function() {
    if ($("#"+selectedEnemy.divId).hasClass("plains") === true) {
      terrainEffectsDefense = plains.bonusDefense
      terrainEffectsEvade = plains.bonusEvade
      terrainEffectsMovement = plains.bonusMovement
      console.log(terrainEffectsDefense)
      console.log(terrainEffectsEvade)
    } else if ($("#"+selectedEnemy.divId).hasClass("forest") === true) {
      terrainEffectsDefense = forest.bonusDefense
      terrainEffectsEvade = forest.bonusEvade
      terrainEffectsMovement = plains.bonusMovement
      console.log(terrainEffectsDefense)
      console.log(terrainEffectsEvade)
    } else if ($("#"+selectedEnemy.divId).hasClass("sand") === true) {
      terrainEffectsDefense = sand.bonusDefense
      terrainEffectsEvade = sand.bonusEvade
      terrainEffectsMovement = plains.bonusMovement
      console.log(terrainEffectsDefense)
      console.log(terrainEffectsEvade)
    } else if ($("#"+selectedEnemy.divId).hasClass("rock") === true) {
      terrainEffectsDefense = rock.bonusDefense
      terrainEffectsEvade = rock.bonusEvade
      terrainEffectsMovement = plains.bonusMovement
      console.log(terrainEffectsDefense)
      console.log(terrainEffectsEvade)
    } else if ($("#"+selectedEnemy.divId).hasClass("water") === true) {
      terrainEffectsDefense = water.bonusDefense
      terrainEffectsEvade = water.bonusEvade
      terrainEffectsMovement = plains.bonusMovement
      console.log(terrainEffectsDefense)
      console.log(terrainEffectsEvade)
    } else if ($("#"+selectedEnemy.divId).hasClass("ice") === true) {
      terrainEffectsDefense = ice.bonusDefense
      terrainEffectsEvade = ice.bonusEvade
      terrainEffectsMovement = plains.bonusMovement
      console.log(terrainEffectsDefense)
      console.log(terrainEffectsEvade)
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
      $('main').animateCss('flip');
      setTimeout(function(){
        $(".blue").attr("class", "red");
        $(".selectWeaponBlue").attr("class", "selectWeaponRed");
      }, 800);
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
      $('main').animateCss('flip');
      setTimeout(function(){
        $(".red").attr("class", "blue");
        $(".selectWeaponRed").attr("class", "selectWeaponBlue");
      }, 800);
    }
  });

// on hover











//  welcome page







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
