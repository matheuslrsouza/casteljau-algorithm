
let plane
let dragging
let draggingPoint

function setup() {
    createCanvas(500, 500)
    frameRate(20)
    plane = new Plane(100, 100)

    let x1 = -50
    let y1 = f(x1)

    let x2 = 50
    let y2 = f(x2)

    //plane.addLine(x1, y1, x2, y2)

    x1 = -10
    y1 = fPer(x1)

    x2 = 10
    y2 = fPer(x2)
    //plane.addLine(x1, y1, x2, y2)
}

function f(x) {
    return 0
}

function fPer(x, y, m) {
    let m2 = y/x
    let b = y - m2 * x
    console.log(m, m2, x, b)
    return m2 * x + b
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
    plane.lines = []
    let nPoints = plane.points.length
    // Degree of the polynomial
    let n = nPoints - 1

    if (nPoints > 1) {

        for (let t = 0; t <= 1; t += 1/300) {
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
        if (plane.curve.length > 300) {

            let offset = 5
            let step = Math.PI / (plane.curve.length / offset)
            let paramTheta = Math.PI
            
            for (let i = 0; i < plane.curve.length - offset; i+=offset) {
                let p1 = new Point(plane.curve[2 + i].x, plane.curve[2 + i].y, plane.xRange, plane.yRange, [255,0,0])
                let p2 = new Point(plane.curve[0 + i].x, plane.curve[0 + i].y, plane.xRange, plane.yRange, [255,0,0])
    
                let m = (p2.y - p1.y) / (p2.x - p1.x)
    
                let mPx = (p1.x + p2.x) / 2
                let mPy = (p1.y + p2.y) / 2
    
                // p1.draw()
                // p2.draw()
    
                let m2 = -1/m
                let b2 = mPy - m2 * mPx

                let curveProportion = Math.sin(paramTheta) * 8
                if (paramTheta >= Math.PI/2) {
                    curveProportion = ((Math.sin(paramTheta) + Math.sin(Math.PI/2)) / 2) * 8
                }

                let theta = Math.atan(m2)


                let ya = mPy + sin(theta) * curveProportion
                let xa = mPx + cos(theta) * curveProportion
                // let pTest = new Point(xa, ya, plane.xRange, plane.yRange, [0,0,255])
                // pTest.draw()

                let yb = mPy + sin(theta + Math.PI) * curveProportion
                let xb = mPx + cos(theta + Math.PI) * curveProportion
                // let pTest2 = new Point(xb, yb, plane.xRange, plane.yRange, [0,0,255])
                // pTest2.draw()

                paramTheta -= step

    
                // let proportion = m2 >= 1 ? 1/m2 : 1
                // let xSk1 = mPx - proportion * 20
                // let xSk2 = mPx + proportion * 20
                
                // let ya = m2 * xSk1 + b2
                // let yb = m2 * xSk2 + b2
    
                // console.log(m2, "dist: " + Math.sqrt(Math.pow(ya - yb, 2) + Math.pow(xSk1 - xSk2, 2)))
    
                plane.addLine(xa, ya, xb, yb)
            }
            
        }
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