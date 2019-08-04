
let plane
let dragging
let draggingPoint

function setup() {
    createCanvas(500, 500)
    plane = new Plane(100, 100)
}

mousePressed = function() {
    let x = map(mouseX, 0, width, -plane.xRange, plane.xRange)
    let y = map(mouseY, height, 0, -plane.yRange, plane.yRange)

    for (let p of plane.points) {
        if (dist(p.x, p.y, x, y) < 3) {
            dragging = true
            draggingPoint = p
            break
        }
    }
    if (!dragging) {
        plane.addPoint(x, y);
    }
}

mouseReleased = function () {
    dragging = false
    draggingPoint = undefined
}

function draw() {
    background(100)
    
    plane.curve = []
    let nPoints = plane.points.length
    // polinomio degree
    let n = nPoints - 1

    for (let t = 0; t <= 1; t += 1/1000) {
        let Px = 0
        let Py = 0

        for (let i = 0; i < nPoints; i++) {

            let Ai_x = plane.points[i].x
            let Ai_y = plane.points[i].y
                
            let Coeff = ft(n) / (ft(i) * ft(n - i))

            let exp1 = n - i

            let expT = i

            Px += Coeff * Math.pow((1 - t), exp1) * Ai_x * Math.pow(t, expT);
            Py += Coeff * Math.pow((1 - t), exp1) * Ai_y * Math.pow(t, expT);
        }
        plane.addCurvePoint(Px, Py)
    }

    let pMouse = mapFromCanvas(mouseX, mouseY)
    
    if (dragging) {
        draggingPoint.color = [255, 0, 0]
        draggingPoint.setX(pMouse[0])
        draggingPoint.setY(pMouse[1])
    } else { // check for hover
        for (let p of plane.points) {
            if (dist(p.x, p.y, pMouse[0], pMouse[1]) < 5) {
                p.color = [255, 255, 255]
            } else {
                p.color = [0, 255, 0]
            }
        }
    }    

    plane.draw()
}

function mapFromCanvas(x, y) {
    return [
        map(x, 0, width, -plane.xRange, plane.xRange), 
        map(y, height, 0, -plane.yRange, plane.yRange)
    ]
    
}

function ft(n) {
    let res = 1
    for (let i = n; i > 1; i--) {
        res *= i
    }
    return res
}