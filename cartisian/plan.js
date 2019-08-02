class Plan {

    /**
     * define the space where the drawing will be made
     * @param {number} xRange the min (-xRange) and max (xRange) for the x axis
     * @param {number} yRange the min (-yRange) and max (yRange) for the x axis
     */
    constructor(xRange, yRange) {
        this.xRange = xRange
        this.yRange = yRange
        this.points = []
        this.lines = []
    }

    addPoint(x, y) {
        this.points.push(new Point(x, y, this.xRange, this.yRange))
    }
    
    addLine(x1, y1, x2, y2) {
        this.lines.push([x1, y1, x2, y2])
    }

    draw() {
        this._drawPlan()
        this._drawPoints()
        this._drawLines()
    }

    _drawPoints() {
        for (let p of this.points) {
            p.draw()
        }
    }

    _drawLines() {
        push()
        for (let l of this.lines) {
            stroke(255)
            // map the values to be added in canvas
            let p1 = this.mapToCanvas(l[0], l[1])
            let p2 = this.mapToCanvas(l[2], l[3])
            line(p1[0], p1[1], p2[0], p2[1])
        }
        pop()
    }

    _drawPlan() {
        push()
        textSize(20);
        fill(0, 255, 0, 150)
        text('-' + this.xRange, 5, height / 2 + 20);
        text(this.xRange, width - 30, height / 2 + 20);
        
        text('0', width/2, height/2 + 20);

        text('-' + this.yRange, width/2 + 10, height-10);
        text(this.yRange, width/2, 30);

        stroke(0, 0, 0, 100)
        line(0, height / 2, width, height / 2) //x axis
        line(width / 2, 0, width / 2, height) //y axis
        pop()
    }

    mapToCanvas(x, y) {
        // map the values to be added in canvas
        return [
            map(x, -this.xRange, this.xRange, 0, width),
            map(y, -this.yRange, this.yRange, height, 0)
        ]
    }
}


class Point {

    constructor(x, y, xRange, yRange) {

        // map the values to be added in canvas
        this.xCanvas = map(x, -xRange, xRange, 0, width)
        this.yCanvas = map(y, -yRange, yRange, height, 0)
        
        this.x = x
        this.y = y

        this.radius = 10
    }

    draw() {
        push()
        fill(0, 255, 0)
        circle(this.xCanvas, this.yCanvas, this.radius)
        pop()
    }

}