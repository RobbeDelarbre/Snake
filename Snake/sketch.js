//to do: Voedsel mag niet op plaats van slang komen

let zijde
let slang
let voedsel

const aantalVakjes = 20

function setup() {
    createCanvas(600, 600)
    zijde = width / aantalVakjes
    slang = new Snake()
    voedsel = new Food()
    frameRate(10)
}

function draw() {
    background(0)
    voedsel.teken()
    slang.teken()
    slang.beweeg()
    if (slang.positie[0].x == voedsel.positie.x && slang.positie[0].y == voedsel.positie.y) {
        slang.eetVoedsel()
    }
    fill(255)
    textAlign(RIGHT, TOP)
    textSize(40)
    text(slang.positie.length - 1, width - 5, 5)
    //slang gaat dood
    if (slang.controleerBotsing() || slang.controleerBuitenScherm()) {
        slang = new Snake()
    }
    console.log(slang.controleerBuitenScherm())
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        if (slang.positie.length > 1 && slang.positie[0].x - zijde == slang.positie[1].x && slang.positie[0].y == slang.positie[1].y) {
            console.log("links")
        } else {
            slang.snelheid.x = (-zijde)
            slang.snelheid.y = 0
        }

    } else if (keyCode === RIGHT_ARROW) {
        if (slang.positie.length > 1 && slang.positie[0].x + zijde == slang.positie[1].x) {
            console.log("rechts")
        } else {
            slang.snelheid.y = 0
            slang.snelheid.x = zijde
        }

    } else if (keyCode === UP_ARROW) {
        if (slang.positie.length > 1 && slang.positie[0].y - zijde == slang.positie[1].y) {
            console.log("boven")
        } else {
            slang.snelheid.x = 0
            slang.snelheid.y = (-zijde)
        }

    } else if (keyCode === DOWN_ARROW) {
        if (slang.positie.length > 1 && slang.positie[0].y + zijde == slang.positie[1].y) {
            console.log("onder")
        } else {
            slang.snelheid.x = 0
            slang.snelheid.y = zijde
        }
    }
}

class Snake {
    constructor() {
        this.kleur = color(random(0, 256), random(0, 256), random(0, 256))
        this.positie = new Array()
        this.positie.push(createVector(0, 0))
        this.positie2 = this.positie.slice()
        this.snelheid = createVector(zijde, 0)
        this.zijde = zijde
        this.beweegbool = new Array()
        this.beweegbool.push(true)
    }

    teken() {
        fill(this.kleur)
        for (let i = 0; i < this.positie.length; i++) {
            rect(this.positie[i].x, this.positie[i].y, zijde, zijde)
        }
    }

    beweeg() {
        for (let i = this.positie.length - 1; i > 0; i--) {
            if (!this.beweegbool[i]) {
                this.beweegbool[i] = true
            } else {
                this.positie[i].x = this.positie2[i - 1].x
                this.positie[i].y = this.positie2[i - 1].y
            }
        }
        this.positie2 = this.positie.slice()
        this.positie[0].x += this.snelheid.x
        this.positie[0].y += this.snelheid.y
    }

    controleerBotsing() {
        for (let i = 2; i < this.positie.length; i++) {
            if (this.positie[0].x == this.positie[i].x && this.positie[0].y == this.positie[i].y)
                return true
        }
        return false
    }

    controleerBuitenScherm() {
        if (this.positie[0].x < 0 || this.positie[0].y < 0 || this.positie[0].x > width - zijde || this.positie[0].y > height - zijde) {
            return true
        } else {
            return false
        }
    }

    eetVoedsel() {
        this.positie.push(createVector(this.positie[this.positie.length - 1].x, this.positie[this.positie.length - 1].y))
        this.beweegbool.push(false)
        voedsel = new Food()
    }
}

class Food {
    constructor() {
        do {
            this.positie = createVector(floor(random(aantalVakjes)) * zijde, floor(random(aantalVakjes)) * zijde)
        } while (this.controleerOfDaarSlangIs())
        this.kleur = color(255, 0, 0)
    }

    controleerOfDaarSlangIs(){
        for (let i = 0; i < slang.positie.length; i++){
            if (this.positie.x == slang.positie[i].x && this.positie.y == slang.positie[i].y){
                return true
            }
        }
        return false
    }

    teken() {
        fill(this.kleur)
        rect(this.positie.x, this.positie.y, zijde, zijde)
    }
}