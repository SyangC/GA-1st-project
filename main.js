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
  var selectedWeaponAmmo = 0;
  var selectedWeaponAmmoUsed = 0;
  var selectedWeaponRange = 0;
  var selectedWeaponDamageMax = 0;
  var selectedWeaponDamageMin = 0;
  var currentId = "";
  var selectedWeaponHitChance = 0;
  var selectedWeaponAccuracy = 0;
  var ranges = [[0, 29], [], [0, 1, 2, 27, 28, 29, 30, 31, 58, 59, 60, 89], [0,1,2,3,26,27,28,29,30,31,32,57,58,59,60,61,88,89,90,119],[0,1,2,3,4,25,26,27,28,29,30,31,32,33,56,57,58,59,60,61,62,87,88,89,90,91,118,119,120,149],[],[0,1,2,3,4,5,6,23,24,25,26,27,28,29,30,31,32,33,34,35,54,55,56,57,58,59,60,61,62,63,64,85,86,87,88,89,90,91,92,93,116,117,118,119,120,121,122,147,148,149,150,151,178,179,180,209]];

  // create player consturction function
  

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
  var pOneCha1 = new Player("Alpha", "alpha", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 20, 40, "Pistol", 60, 3, 3, 65, 10, 25, "Sword", 60, 35, 50, 30, 7, 7, 1, 13);


  $("ul").on("click", "li#alpha", function() {
    if (playerTurn%2 !== 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pOneCha1.name);
      $('#health').html(pOneCha1.health + " / " + pOneCha1.healthTotal);
      $('#accuracy').html(pOneCha1.accuracy);
      $('#defense').html(pOneCha1.defense);
      $('#movement').html(pOneCha1.movement + " / " + pOneCha1.movementMax);
      $('#weaponOneName').html(pOneCha1.weaponOne);
      $('#weaponOneAmmo').html(pOneCha1.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha1.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha1.weaponTwoAmmo);
      $('#weaponMelee').html(pOneCha1.weaponMelee);
      $('#attackNumber').html(pOneCha1.attackNumber);
      selectedCharacter = pOneCha1;
      selectedWeapon = "";
      selectedWeaponAmmo = 0;
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pOneCha1.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pOneCha1;
      $('#selectedEnemy').html(pOneCha1.name);
      $('#enemyHealth').html(pOneCha1.health + " / " + pOneCha1.healthTotal);
      if ($("#"+pOneCha1.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  var pOneCha2 = new Player("Beta", "beta", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 20, 40, "Pistol", 60, 3, 3, 65, 10, 25, "Sword", 60, 35, 50, 30, 7, 7, 1, 13);


  $("ul").on("click", "li#beta", function() {
    if (playerTurn%2 !== 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pOneCha2.name)
      $('#health').html(pOneCha2.health + " / " + pOneCha2.healthTotal)
      $('#accuracy ').html(pOneCha2.accuracy)
      $('#defense').html(pOneCha2.defense)
      $('#movement').html(pOneCha2.movement + " / " + pOneCha2.movementMax)
      $('#weaponOneName').html(pOneCha2.weaponOne);
      $('#weaponOneAmmo').html(pOneCha2.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha2.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha2.weaponTwoAmmo);
      $('#weaponMelee').html(pOneCha2.weaponMelee);
      $('#attackNumber').html(pOneCha2.attackNumber);
      selectedCharacter = pOneCha2;
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pOneCha2.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pOneCha2;
      $('#selectedEnemy').html(pOneCha2.name);
      $('#enemyHealth').html(pOneCha2.health + " / " + pOneCha2.healthTotal);
      if ($("#"+pOneCha2.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  var pOneCha3 = new Player("Charlie", "charlie", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 20, 40, "Pistol", 60, 3, 3, 65, 10, 25, "Sword", 60, 35, 50, 30, 7, 7, 1, 13);


  $("ul").on("click", "li#charlie", function() {
    if (playerTurn%2 !== 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pOneCha3.name)
      $('#health').html(pOneCha3.health + " / " + pOneCha3.healthTotal)
      $('#accuracy').html(pOneCha3.accuracy)
      $('#defense').html(pOneCha3.defense)
      $('#movement').html(pOneCha3.movement + " / " + pOneCha3.movementMax)
      $('#weaponOneName').html(pOneCha3.weaponOne);
      $('#weaponOneAmmo').html(pOneCha3.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha3.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha3.weaponTwoAmmo);
      $('#weaponMelee').html(pOneCha3.weaponMelee);
      $('#attackNumber').html(pOneCha3.attackNumber);
      selectedCharacter = pOneCha3;
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pOneCha3.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pOneCha3;
      $('#selectedEnemy').html(pOneCha3.name);
      $('#enemyHealth').html(pOneCha3.health + " / " + pOneCha3.healthTotal);
      if ($("#"+pOneCha3.ideaClass).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  var pOneCha4 = new Player("Delta", "delta", 65, 65, 100, 2, 2, "Sniper Rifle", 15, 1, 7, 100, 60, 80, "Pistol", 60, 3, 3, 65, 10, 25, "Knife", 60, 25, 40, 15, 10, 10, 1, 15);


  $("ul").on("click", "li#delta", function() {
    if (playerTurn%2 !== 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pOneCha4.name)
      $('#health').html(pOneCha4.health + " / " + pOneCha4.healthTotal)
      $('#accuracy').html(pOneCha4.accuracy)
      $('#defense').html(pOneCha4.defense)
      $('#movement').html(pOneCha4.movement + " / " + pOneCha4.movementMax)
      $('#weaponOneName').html(pOneCha4.weaponOne);
      $('#weaponOneAmmo').html(pOneCha4.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha4.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha4.weaponTwoAmmo);
      $('#weaponMelee').html(pOneCha4.weaponMelee);
      $('#attackNumber').html(pOneCha4.attackNumber);
      selectedCharacter = pOneCha4;
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pOneCha4.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pOneCha4;
      $('#selectedEnemy').html(pOneCha4.name);
      $('#enemyHealth').html(pOneCha4.health + " / " + pOneCha4.healthTotal);
      if ($("#"+pOneCha4.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  var pOneCha5 = new Player("Echo", "echo", 150, 150, 60, 2, 2, "Minigun", 210, 15, 3, 50, 70, 80, "Rocket Launcher", 2, 1, 4, 70, 90, 120, "Fists", 40, 30, 40, 60, 4, 4, 1, 5);


  $("ul").on("click", "li#echo", function() {
    if (playerTurn%2 !== 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pOneCha5.name)
      $('#health').html(pOneCha5.health + " / " + pOneCha5.healthTotal)
      $('#accuracy').html(pOneCha5.accuracy)
      $('#defense').html(pOneCha5.defense)
      $('#movement').html(pOneCha5.movement + " / " + pOneCha5.movementMax)
      $('#weaponOneName').html(pOneCha5.weaponOne);
      $('#weaponOneAmmo').html(pOneCha5.weaponOneAmmo);
      $('#weaponTwoName').html(pOneCha5.weaponTwo);
      $('#weaponTwoAmmo').html(pOneCha5.weaponTwoAmmo);
      $('#weaponMelee').html(pOneCha5.weaponMelee);
      $('#attackNumber').html(pOneCha5.attackNumber);
      selectedCharacter = pOneCha5;
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pOneCha5.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pOneCha5;
      $('#selectedEnemy').html(pOneCha5.name);
      $('#enemyHealth').html(pOneCha5.health + " / " + pOneCha5.healthTotal);
      if ($("#"+pOneCha5.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  // Team 2

  var pTwoCha1 = new Player("Foxtrot", "foxtrot", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 20, 40, "Pistol", 60, 3, 3, 65, 10, 25, "Sword", 60, 35, 50, 30, 7, 7, 1, 13);


  $("ul").on("click", "li#foxtrot", function() {
    if (playerTurn%2 === 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pTwoCha1.name);
      $('#health').html(pTwoCha1.health + " / " + pTwoCha1.healthTotal);
      $('#accuracy').html(pTwoCha1.accuracy);
      $('#defense').html(pTwoCha1.defense);
      $('#movement').html(pTwoCha1.movement + " / " + pTwoCha1.movementMax);
      $('#weaponOneName').html(pTwoCha1.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha1.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha1.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha1.weaponTwoAmmo);
      $('#weaponMelee').html(pTwoCha1.weaponMelee);
      $('#attackNumber').html(pTwoCha1.attackNumber);
      selectedCharacter = pTwoCha1;
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pTwoCha1.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pTwoCha1;
      $('#selectedEnemy').html(pTwoCha1.name);
      $('#enemyHealth').html(pTwoCha1.health + " / " + pTwoCha1.healthTotal);
      if ($("#"+pTwoCha1.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  var pTwoCha2 = new Player("Gamma", "gamma", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 20, 40, "Pistol", 60, 3, 3, 65, 10, 25, "Sword", 60, 35, 50, 30, 7, 7, 1, 13);


  $("ul").on("click", "li#gamma", function() {
    if (playerTurn%2 === 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pTwoCha2.name)
      $('#health').html(pTwoCha2.health + " / " + pTwoCha2.healthTotal)
      $('#accuracy').html(pTwoCha2.accuracy)
      $('#defense').html(pTwoCha2.defense)
      $('#movement').html(pTwoCha2.movement + " / " + pTwoCha2.movementMax)
      $('#weaponOneName').html(pTwoCha2.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha2.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha2.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha2.weaponTwoAmmo);
      $('#weaponMelee').html(pTwoCha2.weaponMelee);
      $('#attackNumber').html(pTwoCha2.attackNumber);
      selectedCharacter = pTwoCha2;
      selectedWeapon = "";
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pTwoCha2.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pTwoCha2;
      $('#selectedEnemy').html(pTwoCha2.name);
      $('#enemyHealth').html(pTwoCha2.health + " / " + pTwoCha2.healthTotal);
      if ($("#"+pTwoCha2.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  var pTwoCha3 = new Player("Hotel", "hotel", 100, 100, 80, 2, 2, "Assault Rifle", 30, 3, 5, 75, 20, 40, "Pistol", 60, 3, 3, 65, 10, 25, "Sword", 60, 35, 50, 30, 7, 7, 1, 13);


  $("ul").on("click", "li#hotel", function() {
    if (playerTurn%2 === 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pTwoCha3.name)
      $('#health').html(pTwoCha3.health + " / " + pTwoCha3.healthTotal)
      $('#accuracy').html(pTwoCha3.accuracy)
      $('#defense').html(pTwoCha3.defense)
      $('#movement').html(pTwoCha3.movement + " / " + pTwoCha3.movementMax)
      $('#weaponOneName').html(pTwoCha3.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha3.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha3.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha3.weaponTwoAmmo);
      $('#weaponMelee').html(pTwoCha3.weaponMelee);
      $('#attackNumber').html(pTwoCha3.attackNumber);
      selectedCharacter = pTwoCha3;
      selectedWeapon = "";
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pTwoCha3.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pTwoCha3;
      $('#selectedEnemy').html(pTwoCha3.name);
      $('#enemyHealth').html(pTwoCha3.health + " / " + pTwoCha3.healthTotal);
      if ($("#"+pTwoCha3.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  var pTwoCha4 = new Player("Indigo", "indigo", 65, 65, 100, 2, 2, "Sniper Rifle", 15, 1, 7, 100, 60, 80, "Pistol", 60, 3, 3, 65, 10, 25, "Knife", 60, 25, 40, 15, 10, 10, 1, 15);


  $("ul").on("click", "li#indigo", function() {
    if (playerTurn%2 === 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pTwoCha4.name)
      $('#health').html(pTwoCha4.health + " / " + pTwoCha4.healthTotal)
      $('#accuracy').html(pTwoCha4.accuracy)
      $('#defense').html(pTwoCha4.defense)
      $('#movement').html(pTwoCha4.movement + " / " + pTwoCha4.movementMax)
      $('#weaponOneName').html(pTwoCha4.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha4.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha4.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha4.weaponTwoAmmo);
      $('#weaponMelee').html(pTwoCha4.weaponMelee);
      $('#attackNumber').html(pTwoCha4.attackNumber);
      selectedCharacter = pTwoCha4;
      selectedWeapon = "";
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pTwoCha4.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pTwoCha4;
      $('#selectedEnemy').html(pTwoCha4.name);
      $('#enemyHealth').html(pTwoCha4.health + " / " + pTwoCha4.healthTotal);
      if ($("#"+pTwoCha4.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
    }
  });


  var pTwoCha5 = new Player("Juliett", "juliett", 150, 150, 60, 2, 2, "Minigun", 210, 15, 3, 50, 70, 80, "Rocket Launcher", 2, 1, 4, 70, 90, 120, "Fists", 40, 30, 40, 60, 4, 4, 1, 5);


  $("ul").on("click", "li#juliett", function() {
    if (playerTurn%2 === 0) {
      $(".grid").removeClass("inRange");
      selectedWeapon = "";
      $('#name').html(pTwoCha5.name)
      $('#health').html(pTwoCha5.health + " / " + pTwoCha5.healthTotal)
      $('#accuracy').html(pTwoCha5.accuracy)
      $('#defense').html(pTwoCha5.defense)
      $('#movement').html(pTwoCha5.movement + " / " + pTwoCha5.movementMax)
      $('#weaponOneName').html(pTwoCha5.weaponOne);
      $('#weaponOneAmmo').html(pTwoCha5.weaponOneAmmo);
      $('#weaponTwoName').html(pTwoCha5.weaponTwo);
      $('#weaponTwoAmmo').html(pTwoCha5.weaponTwoAmmo);
      $('#weaponMelee').html(pTwoCha5.weaponMelee);
      $('#attackNumber').html(pTwoCha5.attackNumber);
      selectedCharacter = pTwoCha5;
      selectedWeapon = "";
      selectedWeaponAmmo = "";
      selectedWeaponAmmoUsed = 0;
      weaponDamage = 0;
      $('#infoDisplay').html(pTwoCha5.name + " selected!" + "<br>" + "Use WASD to move" + "</br>" + "Select the weapon then click on the enemy to attack.");
    } else {
      selectedEnemy = pTwoCha5;
      $('#selectedEnemy').html(pTwoCha5.name);
      $('#enemyHealth').html(pTwoCha5.health + " / " + pTwoCha5.healthTotal);
      if ($("#"+pTwoCha5.divId).hasClass("inRange")) {
        attackResolve();
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      } else {
        $('#infoDisplay').html("You are out of range! Move closer to attack.");
        selectedWeapon = "";
        $(".grid").removeClass("inRange");
      }
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


// on click player actions

// attack

  $(".selectWeapon").on("click", function() {
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
    selectedWeaponHitChance = selectedCharacter.accuracy - selectedEnemy.evade;
    if (selectedCharacter.attackNumber > 0) {
      selectedWeaponHitChance = (selectedCharacter.accuracy+selectedWeaponAccuracy)/2 - selectedEnemy.evade;
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
            weaponDamage = (selectedWeaponDamageMin+Math.round(Math.random()*(selectedWeaponDamageMax-selectedWeaponDamageMin)))*1.5;
            setTimeout(function(){
              $('#infoDisplay').html("Dealt the enemy " + weaponDamage + "!");
              $('#selectedEnemy').html(selectedEnemy.name);
              $('#enemyHealth').html(selectedEnemy.health + " / " + selectedEnemy.healthTotal);
            }, 1000);
            selectedEnemy.health = selectedEnemy.health - weaponDamage;
            selectedWeaponAmmo = selectedWeaponAmmo - selectedWeaponAmmoUsed;
            deathCheck();
          } else {
            $('#infoDisplay').html("Hit!");
            weaponDamage = selectedWeaponDamageMin+Math.round(Math.random()*(selectedWeaponDamageMax-selectedWeaponDamageMin));
            setTimeout(function(){
              $('#infoDisplay').html("Dealt the enemy " + weaponDamage + "!");
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
        console.log("this part still works!")
        selectedCharacter.weaponOneAmmo = selectedCharacter.weaponOneAmmo - selectedCharacter.weaponOneAmmoUsed;
        selectedCharacter.attackNumber --;
        $('#attackNumber').html(selectedCharacter.attackNumber);
        $('#weaponOneAmmo').html(selectedWeaponAmmo);        
      } else if (selectedWeapon === selectedCharacter.weaponTwo) {
        selectedCharacter.weaponTwoAmmo = selectedCharacter.weaponTwoAmmo - selectedCharacter.weaponTwoAmmoUsed;
        selectedCharacter.attackNumber --;
        $('#attackNumber').html(selectedCharacter.attackNumber);
        $('#weaponTwoAmmo').html(selectedWeaponAmmo);
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

// switch turn

  $("#endTurn").on("click", function() {
    $(".grid").removeClass("inRange");
    selectedEnemy = "";
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

// on hover




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
