
$(document).ready(function () {
       // const gamerData = JSON.parse(gamer)
    function comptTime() {
        var timer = 0;
        setInterval(function(){
            
            timer+=1;
            var min = parseInt(timer / 60);
            var second = (parseFloat(timer / 60) - parseInt(timer / 60)).toFixed(2);
            second = second.split('.')[1];
            if(second >= 60) second -= 60;
            if(timer < 60)
                $(".game-time").html(timer + 's');
            else if(timer >= 60) {
                $(".game-time").html(min + 'min:' + second + 's');
            }
            else if(timer >= 3600) {

            }
        }, 1000);
    }

    let canvas = new fabric.Canvas("canvas", {
        height: window.innerHeight,
        width: window.innerWidth,
        fill: "#077",
        selectable:false
    });


    const GameLevel = {
        easy: {
            multiplier: 1,
            speed: "1x"
        },
        medium: {
            multiplier: 2,
            speed: "2x"
        },
        hard: {
            multiplier: 3,
            speed: "4x"
        }
    };

    const GameObjImg = {
        img1: "images/gamer/img-1.png",
        img2: "images/gamer/img-2.png",
        img3: "images/gamer/img-3.png",
        img4: "images/gamer/img-4.png",
        img5: "images/gamer/img-5.png"
    }

    const GameArme = {
        img1: "images/arme/arme.png",
        img2: "images/arme/arme-2.png",
        img3: "images/arme/arme-3.png",
        img4: "images/arme/arme-4.png"
    }

    const Alien = {
        alien1: "images/alien/alien-1.png",
        alien2: "images/alien/alien-2.png",
        alien3: "images/alien/alien-3.png",
        alien4: "images/alien/alien-4.png",
        alien5: "images/alien/alien-5.png",
        alien6: "images/alien/alien-6.png",
        alien7: "images/alien/alien-7.png",
        alien9: "images/alien/alien-9.png",
        alien10: "images/alien/alien-10.png"
    };

    let bg = new Image(), gamerImg = new Image(), gameObj = {}, gameFireImg = new Image(), gameFire = {}, canvas_bg;
    
    function setGameBackgoundImage() {
        bg.onload = function () {
            fabric.Image.fromURL(bg.src, function (image) {
                canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
                    originX: 'center',
                    originY: 'center',
                    scaleX: canvas.get("width") / image.width,
                    scaleY: canvas.get("height") / image.height,
                });
                //image.scaleToHeight();
                image.centerV();
                image.centerH();
                canvas_bg = image;
            })
        };

        bg.src = "images/back/game-bg.png";
    }

    setGameBackgoundImage();

    $("#start").on("click", function () {
        comptTime();
        $(".game-starter").hide();
        $(".game-menu").show();
        initGameRessource();
    });

    let moveSpeed = 50;

    // On déclanche les actions quand l'utilisateurs utilises des touches spécifique de son clavier.
    $(document).on("keydown", function (e) {
        switch (e.originalEvent.code) {
            case 'ArrowUp':
                if (gameObj.top - moveSpeed > 0) gameObj.set("top", gameObj.top - moveSpeed);
                break;
            case 'ArrowDown':
                if (gameObj.top + moveSpeed < canvas.height - gameObj.height) gameObj.set("top", gameObj.top + moveSpeed);
                break;
            case 'ArrowLeft':
                if (gameObj.left - moveSpeed > 0) gameObj.set("left", gameObj.left - moveSpeed);
                break;
            case 'ArrowRight':
                if (gameObj.left + moveSpeed < canvas.width - gameObj.width) gameObj.set("left", gameObj.left + moveSpeed);
                break;
            case 'Space':
                gameFire.top = gameObj.top;
                gameFire.left = gameObj.left + gameObj.width / 2;

                var timer = setInterval(function () {
                    if (gameFire.top > 0) {
                        gameFire.set("top", gameFire.top - moveSpeed - gameFire.height);
                        canvas.sendToBack(gameFire);
                        canvas.calcOffset()
                        canvas.renderAll();
                    }
                    else {
                        gameFire.set("top", -10);
                        clearInterval(timer)
                    }
                }, 10)
                break;

            default:
                break;
        }

        canvas.calcOffset()
        canvas.renderAll();
    });

    function initGameRessource() {
            
        gamerImg.onload = function () {
            fabric.Image.fromURL(gamerImg.src, function (image) {
                image.set("top", canvas.height - image.height);
                image.set("selectable", false);
                canvas.add(image);
                image.centerH();
                gameObj = image;
            });
        };

        gamerImg.src = GameObjImg.img3

        gameFireImg.onload = function () {
            fabric.Image.fromURL(gameFireImg.src, function (image) {
                image.set("top", -5);
                image.set("selectable", false);
                canvas.add(image);
                image.centerH();
                gameFire = image;
            });
        };

        gameFireImg.src = GameArme.img1;

        let alienImg = new Image();
        alienImg.onload = function () {
            fabric.Image.fromURL(alienImg.src, function (image) {
                image.set("top", -5);
                image.set("left", 10);
                image.scaleToHeight(100)
                image.set("selectable", false);
                canvas.add(image);
            });
        };

        alienImg.src = Alien.alien1;
    }
})