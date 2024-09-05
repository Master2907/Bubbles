var speed = () => {
    let s = 0;
    while (s < 0.2) {
        s = Math.random()
    }
    return s * 100;
}

// ##############
function Bubble(id, pTop, pLeft, size) {
    let created = document.createElement('div')
    created.style.top = pTop - (size / 2) + 'px'
    created.style.left = pLeft - (size / 2) + 'px'
    setRandomColor()

    // assinging directions randomly
    var direction = {
        x: Math.random() < 0.5 ? -speed() : speed(),
        y: Math.random() < 0.5 ? -speed() : speed(),
    }

    // Changing direction when the edge is hit
    function checkDirection(rect) {
        // check Edge hit in "Y" direction
        if (direction.y > 0 && rect.top + 100 >= window.innerHeight ||
            direction.y < 0 && rect.top <= 0) {
            direction.y = direction.y < 0 ? speed() : -speed();
            setRandomColor()
        }

        // check Edge hit in "X" direction
        if (direction.x > 0 && rect.left + 100 >= window.innerWidth ||
            direction.x < 0 && rect.left <= 0) {
            direction.x = direction.x < 0 ? speed() : -speed();
            setRandomColor()
        }
    }

    // Moving depending on derection X, Y values
    function moveLogo(rect) {
        created.style.top = (rect.top + direction.y) + "px";
        created.style.left = (rect.left + direction.x) + "px";
    }

    // generating and assining random color
    function setRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        created.style.background = color;
    }



    this.draw = function () {
        document.body.append(created);
        var move = setInterval(() => {
            let rect = created.getBoundingClientRect();
            checkDirection(rect);
            moveLogo(rect);
        }, 100)
    }
}

// ####

let amount = 0
document.onclick = (event) => {
    amount++
    let d = new Bubble(amount, event.clientY, event.clientX, 100)
    d.draw()
}
