
let plan

function setup() {
    createCanvas(500, 500)
    plan = new Plan(100, 100)
    /*plan.addPoint(-3, -5);
    plan.addPoint(-5, 3);
    plan.addPoint(4, 8);

    plan.addLine(-3, -5, -5, 3)*/
}

mousePressed = function() {
    let x = map(mouseX, 0, width, -plan.xRange, plan.xRange)
    let y = map(mouseY, height, 0, -plan.yRange, plan.yRange)
    plan.addPoint(x, y);
}

mouseDragged = function() {
    for (let p of this.points) {
        
    }
}

keyPressed = function() {

    if (keyCode != SHIFT) {
        return
    }

    let nPoints = plan.points.length
    // polinomio degree
    let n = nPoints - 1

    for (let t = 0; t <= 1; t += 0.01) {
        let Px = 0
        let Py = 0

        for (let i = 0; i < nPoints; i++) {

            let Ai_x = plan.points[i].x
            let Ai_y = plan.points[i].y

            console.log(Ai_x, Ai_y)
                
            let Coeff = ft(n) / (ft(i) * ft(n - i))
            //console.log('Coeff:', Coeff)

            let exp1 = n - i

            let expT = i

            Px += Coeff * Math.pow((1 - t), exp1) * Ai_x * Math.pow(t, expT);
            Py += Coeff * Math.pow((1 - t), exp1) * Ai_y * Math.pow(t, expT);
        }

        plan.addPoint(Px, Py)
    }
    // Math.pow((1 - t), n) * Ax + 2 * (1 - t) * t * Bx + t*t*Cx;
}

function draw() {
    background(100)
    plan.draw()    
}

function ft(n) {
    let res = 1
    for (let i = n; i > 1; i--) {
        res *= i
    }
    return res
}