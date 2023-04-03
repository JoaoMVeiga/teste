const circleCanvas = document.getElementById('circle-canvas');
const circleCtx = circleCanvas.getContext('2d');

const circles = [

];

let selectedCircle = null;
let offsetX = 0;
let offsetY = 0;
var altura = 0;

resizeimg()
function resizeimg() {
    // (B1) NEW IMAGE OBJECT & HTML CANVAS
    var img = new Image(),
        canvas = document.getElementById('img'),
        ctx = canvas.getContext("2d");
    img.crossOrigin = "anonymous";

    // (B2) RESIZE ON IMAGE LOAD

    img.onload = () => {
        // rever este metodo assim que possivel de modo a ficar mais ou menos ocmo esta o if do 4:3
        // resuloções tem de ser mais baixas menos o 4:3
        if (img.width == img.height) {
            w = 1024
            h = 1024
            console.log("1:1")
        } else if (((img.width / 16) * 9) == img.height) {
            w = 576
            h = 1024
            console.log("16:9")
        } else if (((img.width / 4) * 3) == img.height || ((img.height / 4) * 3) == img.width) {

            if (((img.height / 4) * 3) == img.width) {
                w = 480
                h = 640
            } else {
                w = 640
                h = 480
            }

            console.log("4:3")

        } else {
            console.log("Sem aspect ratio")
        }

        console.log("IMGheight: " + img.height + " IMGwidth: " + img.width)

        let width = w,
            height = h;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Definir as dimensões do canvas de círculos com base no canvas de fundo
        circleCanvas.width = canvas.width
        circleCanvas.height = canvas.height

    };
    // (B3) GO! 


    //https://hisi.pt/webservice/uploads/
    //http://192.168.0.211/unifitwebmedidas/uploads/
    //http://localhost/unifitwebmedidas/uploads/



    img.src = "1.png"  //+ $("#imgFrente").html()

    setTimeout(function () {
        loadAndPredictFrente()
    }, 1000)

}

function drawCircles() {
    circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
    for (const circle of circles) {
        circleCtx.beginPath();
        circleCtx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        circleCtx.fillStyle = circle.color;
        circleCtx.fill();

        circleCtx.font = '8px Arial';  // set font size and style
        circleCtx.textAlign = 'center'; // center the text horizontally
        circleCtx.textBaseline = 'middle'; // center the text vertically
        circleCtx.fillStyle = 'black'; // set text color to black
        circleCtx.fillText(circle.disc, circle.x, circle.y); // Add text parameter and position
    }
}

function getdistance(numero) {
    for (const circle of circles) {

        if (circle.numero == numero) {

            for (const circle2 of circles) {

                if (circle2.numero == numero && circle2 !== circle) {
                    $("#medida").html(circle2.disc2 + ": "+  (Math.round(190 / altura * distanciaEntrepontos(circle.x, circle2.x, circle.y, circle2.y) * 100) / 100).toFixed(2) + " cm")
                }

            }

        }

    }
}

function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mousePosX = (event.clientX - rect.left) * scaleX;
    const mousePosY = (event.clientY - rect.top) * scaleY;
    return { x: mousePosX, y: mousePosY };
}

function getTouchPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const touchPosX = (event.touches[0].clientX - rect.left) * scaleX;
    const touchPosY = (event.touches[0].clientY - rect.top) * scaleY;
    return { x: touchPosX, y: touchPosY };
}

circleCanvas.addEventListener('mousedown', function (event) {
    const mousePos = getMousePosition(circleCanvas, event);
    for (const circle of circles) {
        const distance = Math.sqrt((circle.x - mousePos.x) ** 2 + (circle.y - mousePos.y) ** 2);
        if (distance <= circle.radius) {
            selectedCircle = circle;
            offsetX = circle.x - mousePos.x;
            offsetY = circle.y - mousePos.y;
            break;
        }
    }
});

circleCanvas.addEventListener('touchstart', function (event) {
    event.preventDefault();
    const touchPos = getTouchPosition(circleCanvas, event);
    for (const circle of circles) {
        const distance = Math.sqrt((circle.x - touchPos.x) ** 2 + (circle.y - touchPos.y) ** 2);
        if (distance <= circle.radius) {
            selectedCircle = circle;
            offsetX = circle.x - touchPos.x;
            offsetY = circle.y - touchPos.y;
            break;
        }
    }
});

circleCanvas.addEventListener('mousemove', function (event) {
    if (selectedCircle !== null) {
        const mousePos = getMousePosition(circleCanvas, event);
        selectedCircle.x = mousePos.x + offsetX;
        selectedCircle.y = mousePos.y + offsetY;
        drawCircles();
    }
});

circleCanvas.addEventListener('touchmove', function (event) {
    event.preventDefault();
    if (selectedCircle !== null) {
        const touchPos = getTouchPosition(circleCanvas, event);
        selectedCircle.x = touchPos.x + offsetX;
        selectedCircle.y = touchPos.y + offsetY;
        getdistance(selectedCircle.numero)
        drawCircles();
    }
});

circleCanvas.addEventListener('mouseup', function (event) {
    selectedCircle = null;
});

circleCanvas.addEventListener('touchend', function (event) {
    selectedCircle = null;
});



async function loadAndPredictFrente() {
    var img = new Image()
    img = document.getElementById("img")
    img.crossOrigin = "anonymous";

    const opacity = 0;
    const flipHorizontal = false;
    const maskBlurAmount = 0;

    var partSegmentation

    var net = await bodyPix.load({
        architecture: 'ResNet50',
        outputStride: 16,
        quantBytes: 1,
    });


    partSegmentation = await net.segmentPersonParts(img, {
        flipHorizontal: false,
        internalResolution: 'full',
        maxDetections: 1,
        segmentationThreshold: 0.7,
        outputStride: 8,

    });
    function checkArr() {
        if (partSegmentation && partSegmentation.data.length > 0) {
            for (var i = 0; i <= partSegmentation.data.length; i++) {

                if (partSegmentation.data[i] == 22 || partSegmentation.data[i] == 23) {
                    partSegmentation.data[i] = 22
                }

                if (partSegmentation.data[i] == 10 || partSegmentation.data[i] == 11) {
                    partSegmentation.data[i] = 10;
                }

                if (partSegmentation.data[i] == 2 || partSegmentation.data[i] == 3 || partSegmentation.data[i] == 6 || partSegmentation.data[i] == 7 || partSegmentation.data[i] == 4 || partSegmentation.data[i] == 5 || partSegmentation.data[i] == 8 || partSegmentation.data[i] == 9) {
                    partSegmentation.data[i] = 11;
                }

                if (partSegmentation.data[i] == 14 || partSegmentation.data[i] == 15 || partSegmentation.data[i] == 18 || partSegmentation.data[i] == 19 || partSegmentation.data[i] == 16 || partSegmentation.data[i] == 17 || partSegmentation.data[i] == 20 || partSegmentation.data[i] == 21) {
                    partSegmentation.data[i] = 23;
                }

                if (partSegmentation.data[i] == 12 || partSegmentation.data[i] == 13) {
                    partSegmentation.data[i] = 13
                }

                if (partSegmentation.data[i] != -1 && partSegmentation.data[i] != 11 && partSegmentation.data[i] != 23 && partSegmentation.data[i] != 13 && partSegmentation.data[i] != 10 && partSegmentation.data[i] != 22) {
                    partSegmentation.data[i] = 0
                }
            }

            console.log(partSegmentation)

            const coloredPartImage = bodyPix.toColoredPartMask(partSegmentation);
            const canvas = document.getElementById('bg-canvas')
            bodyPix.drawMask(canvas, img, coloredPartImage, opacity, maskBlurAmount, flipHorizontal);

            altura = getAltura(partSegmentation)
            get1(partSegmentation)
            get4(partSegmentation)
            get13(partSegmentation)
            get28(partSegmentation)

            drawCircles()


        }
        return true;
    }
    func1 = checkArr();
}







var zoomableDiv = document.querySelector('.zoomable-div');
var zoomableContent = document.querySelector('.zoomable-content');
var mouseDown = false;
var mouseX = 0;
var mouseY = 0;
var contentLeft = 0;
var contentTop = 0;
var currentScale = 1;
var lastScale = 1;
var initialDistance;
var initialScale = 1;

var contentWidth = zoomableContent.offsetWidth;
var contentHeight = zoomableContent.offsetHeight;
var contentLeft = zoomableContent.offsetLeft;
var contentTop = zoomableContent.offsetTop;
var mouseX, mouseY;
var isDragging = false;
var pinchStartDistance, pinchStartScale = 1;



// função para lidar com o evento de rolagem
function handleScroll(event) {
    // verifica se o usuário está rolando para cima ou para baixo
    var delta = event.wheelDelta ? event.wheelDelta : -event.detail;

    // aumenta ou diminui a escala da div
    var zoomStep = 0.1;
    if (delta < 0) {
        zoomStep = -0.1;
    }
    var zoomValue = 1;
    var zoomableContent = document.querySelector('.zoomable-content');
    if (zoomableContent) {
        var transformStyle = getComputedStyle(zoomableContent).getPropertyValue('transform');
        if (transformStyle && transformStyle !== 'none') {
            zoomValue = parseFloat(transformStyle.split('(')[1].split(')')[0].split(',')[0]);
        }
        // ajusta o valor de transform-origin de acordo com a posição do mouse
        var rect = zoomableContent.getBoundingClientRect();
        var originX = mouseX / rect.width * 100;
        var originY = mouseY / rect.height * 100;
        zoomableContent.style.transformOrigin = originX + '% ' + originY + '%';
    }
    zoomValue += zoomStep;
    if (zoomValue < 0.1) {
        zoomValue = 0.1;
    }
    if (zoomableContent) {
        zoomableContent.style.transform = 'scale(' + zoomValue + ')';
    }
}




function handleMouseDown(event) {
    mouseDown = true;
    mouseX = event.clientX || event.touches[0].clientX;
    mouseY = event.clientY || event.touches[0].clientY;
    var zoomableContent = document.querySelector('.zoomable-content');
    if (zoomableContent) {
        contentLeft = parseFloat(getComputedStyle(zoomableContent).getPropertyValue('left'));
        contentTop = parseFloat(getComputedStyle(zoomableContent).getPropertyValue('top'));
        // ajuste da posição inicial do mouse/touch
        contentMouseX = mouseX - contentLeft;
        contentMouseY = mouseY - contentTop;
    }
}

function handleMouseMove(event) {
    if (mouseDown) {
        var zoomableContent = document.querySelector('.zoomable-content');
        var deltaX = (event.clientX || event.touches[0].clientX) - contentMouseX;
        var deltaY = (event.clientY || event.touches[0].clientY) - contentMouseY;
        if (zoomableContent) {
            zoomableContent.style.left = deltaX + 'px';
            zoomableContent.style.top = deltaY + 'px';
        }
    }
}

function handleMouseUp(event) {
    mouseDown = false;
}

function touchStartHandler(event) {
    if (event.touches.length == 2) {
        pinchStartDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        pinchStartScale = contentWidth / pinchStartDistance;
    } else if (event.touches.length == 1) {
        mouseX = event.touches[0].clientX - zoomableDiv.offsetLeft;
        mouseY = event.touches[0].clientY - zoomableDiv.offsetTop;
        isDragging = true;
    }
}

function touchEndHandler() {
    isDragging = false;
}


/*
function touchMoveHandler(event) {
    console.log("1click")
    event.preventDefault();
    if (isDragging && event.touches.length == 1) {
        contentLeft += event.touches[0].clientX - zoomableDiv.offsetLeft - mouseX;
        contentTop += event.touches[0].clientY - zoomableDiv.offsetTop - mouseY;
        zoomableContent.style.left = contentLeft + 'px';
        zoomableContent.style.top = contentTop + 'px';
        mouseX = event.touches[0].clientX - zoomableDiv.offsetLeft;
        mouseY = event.touches[0].clientY - zoomableDiv.offsetTop;
    } else if (event.touches.length == 2) {
        console.log("2click")
        var pinchCurrentDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
        );
        var pinchCurrentScale = contentWidth / pinchCurrentDistance;
        var scale = pinchCurrentScale / pinchStartScale;
        zoomableContent.style.transform = 'scale(' + scale + ')';
    }
}*/


let lastScaleUpdate = Date.now();

function touchMoveHandler(event) {
    event.preventDefault();

    if (isDragging && event.touches.length == 1) {
        // handle drag
    } else if (event.touches.length == 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];

        // Calculate the midpoint between the two touches
        const midX = (touch1.clientX + touch2.clientX) / 2;
        const midY = (touch1.clientY + touch2.clientY) / 2;

        // Adjust the position of the content so that the midpoint is the center of the zoom
        const offsetX = midX - (zoomableContent.offsetLeft + (zoomableContent.offsetWidth / 2));
        const offsetY = midY - (zoomableContent.offsetTop + (zoomableContent.offsetHeight / 2));
        zoomableContent.style.transformOrigin = `${offsetX}px ${offsetY}px`;

        // Calculate the pinch distance and scale
        const pinchCurrentDistance = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
        );
        const pinchCurrentScale = contentWidth / pinchCurrentDistance;
        const newScale = pinchCurrentScale / pinchStartScale * currentScale;
        const now = Date.now();
        if (now - lastScaleUpdate > 150) {
            // Apply the zoom with a transition
            zoomableContent.style.transition = 'transform 0.3s ease-out';
            zoomableContent.style.transform = `scale(${newScale})`;
            currentScale = newScale;
            lastScaleUpdate = now;
        }
    }
}



function exemploTeste() {
    if (zoomableDiv) {
        zoomableDiv.addEventListener('DOMMouseScroll', handleScroll, false);
        zoomableDiv.addEventListener('mousewheel', handleScroll, false);
        zoomableDiv.addEventListener('mousedown', handleMouseDown);
        zoomableDiv.addEventListener('mousemove', handleMouseMove);
        zoomableDiv.addEventListener('mouseup', handleMouseUp);
        zoomableDiv.addEventListener('touchstart', handleMouseDown);
        zoomableDiv.addEventListener('touchmove', handleMouseMove);
        zoomableDiv.addEventListener('touchend', handleMouseUp);
        zoomableDiv.addEventListener('touchmove', touchMoveHandler);
        zoomableDiv.addEventListener('touchend', touchEndHandler);
        zoomableDiv.addEventListener('touchstart', touchStartHandler);
    }
}

exemploTeste()

var flag = true;

function zoomdisable() {

    if (flag) {

        $("#movimentacao").html("Iniciar (scroll/zoom)")

        flag = false
        zoomableDiv.removeEventListener('DOMMouseScroll', handleScroll, false);
        zoomableDiv.removeEventListener('mousewheel', handleScroll, false);
        zoomableDiv.removeEventListener('mousedown', handleMouseDown);
        zoomableDiv.removeEventListener('mousemove', handleMouseMove);
        zoomableDiv.removeEventListener('mouseup', handleMouseUp);
        zoomableDiv.removeEventListener('touchstart', handleMouseDown);
        zoomableDiv.removeEventListener('touchmove', handleMouseMove);
        zoomableDiv.removeEventListener('touchend', handleMouseUp);
        zoomableDiv.removeEventListener('touchmove', touchMoveHandler);
        zoomableDiv.removeEventListener('touchend', touchEndHandler);
        zoomableDiv.removeEventListener('touchstart', touchStartHandler);


    } else {
        $("#movimentacao").html("Parar (scroll/zoom)")
        flag = true
        exemploTeste()
    }

    $(document).ready(function () {
        $("#zoomable").css("cursor", "default");
        //$("#zoomable").removeClass("cursor");
    });

}

function distanciaEntrepontos(x1, x2, y1, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(x * x + y * y)
}

function next() {

    localStorage.setItem("teste", "teste3")

    open('page2.html', '_self');

}



function getAltura(partSegmentation) {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    const scaleX = circleCanvas.width / partSegmentation.width;
    const scaleY = circleCanvas.height / partSegmentation.height;

    for (var i = 0; i <= partSegmentation.data.length; i++) {
        if (partSegmentation.data[i] == 0) {
            var x = i % partSegmentation.width;
            var y = Math.floor(i / partSegmentation.width);
            x1 = x * scaleX;
            y1 = y * scaleY;
            break;
        }
    }

    for (var i = partSegmentation.data.length; i >= 0; i--) {
        if (partSegmentation.data[i] == 0 || partSegmentation.data[i] == 22) {
            var x = i % partSegmentation.width;
            var y = Math.floor(i / partSegmentation.width);
            y2 = y * scaleY;
            break;
        }
    }


    circles.push({
        x: x1,
        y: y1,
        radius: 5,
        color: '#228B22',
        numero: 0,
        disc: 0
    },
        {
            x: x1,
            y: y2,
            radius: 5,
            color: '#228B22',
            numero: 0,
            disc: 0
        })
    return distanciaEntrepontos(x1, x2, y1, y2)
}

function get1(partSegmentation) {

    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;

    const scaleX = circleCanvas.width / partSegmentation.width;
    const scaleY = circleCanvas.height / partSegmentation.height;

    for (var i = 0; i < partSegmentation.data.length; i++) {

        if (partSegmentation.data[i] == 0) {

            for (var j = i + (partSegmentation.width * 16); j > 0; j--) {

                if (partSegmentation.data[j] == -1) {
                    var x = j % partSegmentation.width;
                    var y = Math.floor(j / partSegmentation.width);
                    x1 = x * scaleX;
                    y1 = y * scaleY;
                    break
                }

            }

            for (var j = i + (partSegmentation.width * 16); j < partSegmentation.data.length; j++) {

                if (partSegmentation.data[j] == -1) {
                    var x = j % partSegmentation.width;
                    var y = Math.floor(j / partSegmentation.width);
                    x2 = x * scaleX;
                    y2 = y * scaleY;
                    break
                }
            }

            break
        }

    }

    circles.push({
        x: x1,
        y: y1,
        radius: 5,
        color: '#FFD700',
        numero: 1,
        disc: 1,
        disc2: "Contorno da cabeça"
    },
        {
            x: x2,
            y: y2,
            radius: 5,
            color: '#FFD700',
            numero: 1,
            disc: 1,
            disc2: "Contorno da cabeça"
        })

}







function get4(partSegmentation) {

    var x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0, x4 = 0, y4 = 0;

    const scaleX = circleCanvas.width / partSegmentation.width;
    const scaleY = circleCanvas.height / partSegmentation.height;

    for (var i = 0; i < partSegmentation.data.length; i++) {

        if (partSegmentation.data[i] == 0) {
            var x = i % partSegmentation.width;
            var y = Math.floor(i / partSegmentation.width);
            x1 = x * scaleX;
            y1 = y * scaleY;
            break
        }

    }

    for (var i = 0; i < partSegmentation.data.length; i++) {
        var x = i % partSegmentation.width;
        var y = Math.floor(i / partSegmentation.width);
        if (Math.round(distanciaEntrepontos(x1, x, y1, y)) == Math.round((altura / 8) * 3.3) && x == x1 && Math.round(y) >= Math.round(distanciaEntrepontos(x1, x, y1, y))) {
            for (var j = i; j > 0; j--) {

                if (partSegmentation.data[j] == -1) {
                    var x = j % partSegmentation.width;
                    var y = Math.floor(j / partSegmentation.width);
                    x1 = x * scaleX;
                    y1 = y * scaleY;
                    break
                }

            }

            for (var j = i; j < partSegmentation.data.length; j++) {

                if (partSegmentation.data[j] == -1) {
                    var x = j % partSegmentation.width;
                    var y = Math.floor(j / partSegmentation.width);
                    x2 = x * scaleX;
                    y2 = y * scaleY;
                    break

                }

            }

            break

        }
    }

    for (var i = 0; i < partSegmentation.data.length; i++) {

        if (partSegmentation.data[i] == 13 && partSegmentation.data[i + 1] == -1) {
            var x = i % partSegmentation.width;
            var y = Math.floor(i / partSegmentation.width);
            x3 = x * scaleX;
            y3 = y * scaleY;
            break
        }

    }

    for (var i = 0; i < partSegmentation.data.length; i++) {

        if (partSegmentation.data[i] == 13 && partSegmentation.data[i - 1] == -1) {
            var x = i % partSegmentation.width;
            var y = Math.floor(i / partSegmentation.width);
            x4 = x * scaleX;
            y4 = y * scaleY;
            break
        }

    }


    circles.push({
        x: (x1 + x2) / 2,
        y: y1,
        radius: 5,
        color: '#F2f700',
        numero: 4,
        disc: 4,
        disc2: "Comprimento desde o decote até à cinta na frente"
    },
        {
            x: (x1 + x2) / 2,
            y: y3 + 15,
            radius: 5,
            color: '#F2f700',
            numero: 4,
            disc: 4,
            disc2: "Comprimento desde o decote até à cinta na frente"
        })

}


function get13(partSegmentation) {

    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;

    var x1 = ((partSegmentation["allPoses"][0]["keypoints"][14]["position"]["x"] + partSegmentation["allPoses"][0]["keypoints"][16]["position"]["x"]) / 2)
    var y1 = ((partSegmentation["allPoses"][0]["keypoints"][14]["position"]["y"] + partSegmentation["allPoses"][0]["keypoints"][16]["position"]["y"]) / 2)

    const scaleX = circleCanvas.width / partSegmentation.width;
    const scaleY = circleCanvas.height / partSegmentation.height;

    for (var i = partSegmentation.data.length; i > 0; i--) {

        var x = i % partSegmentation.width;
        var y = Math.floor(i / partSegmentation.width);

        if ((partSegmentation.data[i] == 23 && distanciaEntrepontos(x, partSegmentation["allPoses"][0]["keypoints"][16]["position"]["x"], y, partSegmentation["allPoses"][0]["keypoints"][16]["position"]["y"]) < 25)) {

            for (var j = i - w * 10; j < partSegmentation.data.length; j++) {

                if (partSegmentation.data[j + 1] == -1) {
                    var x = j % partSegmentation.width;
                    var y = Math.floor(j / partSegmentation.width);
                    x2 = x * scaleX;
                    y2 = y * scaleY;
                    break
                }

            }

            break
        }
    }

    for (var i = partSegmentation.data.length; i > 0; i--) {
        if (partSegmentation.data[i] == 13 && partSegmentation.data[i + 5] != 23 && partSegmentation.data[i - 5] != 23) {
            var x = i % partSegmentation.width;
            var y = Math.floor(i / partSegmentation.width);
            x2 = x * scaleX;
            y2 = y * scaleY;
            break
        }
    }

    circles.push({
        x: x1,
        y: y1,
        radius: 5,
        color: '#8B008B',
        numero: 13,
        disc: 13,
        disc2: "Entre pernas (desde o gancho até ao tornozelo)"
    },
        {
            x: x2,
            y: y2,
            radius: 5,
            color: '#8B008B',
            numero: 13,
            disc: 13,
            disc2: "Entre pernas (desde o gancho até ao tornozelo)"
        })


}


function get28(partSegmentation) {

    var j1, j2
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;

    const scaleX = circleCanvas.width / partSegmentation.width;
    const scaleY = circleCanvas.height / partSegmentation.height;


    for (var i = 0; i < partSegmentation.data.length; i++) {
        var x = i % partSegmentation.width;
        var y = Math.floor(i / partSegmentation.width);
        if (partSegmentation.data[i] == 11 && distanciaEntrepontos(x, partSegmentation["allPoses"][0]["keypoints"][6]["position"]["x"], y, partSegmentation["allPoses"][0]["keypoints"][6]["position"]["y"]) < 40) {

            for (var j = i; j > 0; j--) {

                if (partSegmentation.data[j - 1] == -1 && partSegmentation.data[j] != -1 && partSegmentation.data[j - 5] == -1) {
                    x = j % partSegmentation.width;
                    y = Math.floor(j / partSegmentation.width);
                    x += 6
                    x1 = x * scaleX
                    y1 = y * scaleY;
                    j1 = j



                    break
                }

            }
            break
        }
    }

    for (var i = 0; i < partSegmentation.data.length; i++) {
        var x = i % partSegmentation.width;
        var y = Math.floor(i / partSegmentation.width);
        if (partSegmentation.data[i] == 11 && distanciaEntrepontos(x, partSegmentation["allPoses"][0]["keypoints"][5]["position"]["x"], y, partSegmentation["allPoses"][0]["keypoints"][5]["position"]["y"]) < 40) {

            for (var j = i; j < partSegmentation.data.length; j++) {

                if (partSegmentation.data[j - 1] != -1 && partSegmentation.data[j] != -1 && partSegmentation.data[j + 1] == -1) {
                    x = j % partSegmentation.width;
                    y = Math.floor(j / partSegmentation.width);
                    x - 6
                    x2 = x * scaleX
                    y2 = y * scaleY;
                    j2 = j

                    break
                }

            }
            break
        }
    }

    if (y1 < y2) {
        for (j1; j1 < partSegmentation.data.length; j1++) {
            if (partSegmentation.data[j1 + 1] == -1 && partSegmentation.data[j1 + 5] == -1 && partSegmentation.data[j1] != -1) {
                var x = j1 % partSegmentation.width;
                var y = Math.floor(j1 / partSegmentation.width);
                x -= 6
                x2 = x * scaleX
                y2 = y * scaleY;
                break
            }
        }
        //y1 = y2
    } else {
        for (j2; j2 > 0; j2--) {
            if (partSegmentation.data[j2 - 1] == -1 && partSegmentation.data[j2 - 5] == -1 && partSegmentation.data[j2] != -1) {
                var x = j2 % partSegmentation.width;
                var y = Math.floor(j2 / partSegmentation.width);
                x += 6
                x1 = x * scaleX
                y1 = y * scaleY;
                break
            }
        }
        //y2 = y1
    }


    circles.push({
        x: x1 - 6,
        y: y1,
        radius: 5,
        color: '#ADD8E6',
        numero: 28,
        disc: 28,
        disc2: "Ombro a ombro"
    },
        {
            x: x2 + 6,
            y: y2,
            radius: 5,
            color: '#ADD8E6',
            numero: 28,
            disc: 28,
            disc2: "Ombro a ombro"
        })

}


function registaMedidas() {

    var numerosUsados = [];
    var numerosConta = [];

    circles.forEach((circle, index) => {

        circles.forEach((circle2, index2) => {

            console.log(numerosUsados[numerosUsados.length - 1])
            if (circle.numero == circle2.numero && circle.numero != numerosUsados[numerosUsados.length - 1] && (index != index2)) {
                console.log(circle2.numero)
                numerosUsados.push(circle2.numero)

                numerosConta.push({ valor: Math.round(190 / altura * distanciaEntrepontos(circle.x, circle2.x, circle.y, circle2.y) * 100) / 100, idMedida: circle.numero })

                return false;
            }

        })

    })

    console.log(numerosConta)




    for (var i = 0; i < numerosConta.length; i++) {

        let dados = new FormData()

        dados.append('op', 1);
        dados.append('user', $('#iduser').text());
        dados.append('valor', numerosConta[i]["valor"]);
        dados.append('idMedida', numerosConta[i]["idMedida"])
        dados.append('novoRegisto', $('#novoRegisto').text());


        $.ajax({
            url: "assets/model/modelMedidas.php",
            method: "POST",
            data: dados,
            cache: false,
            processData: false,
            contentType: false,
            dataType: "html"
        })

    }


    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);







}
