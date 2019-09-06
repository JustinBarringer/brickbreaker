document.addEventListener("DOMContentLoaded", () => {
  const gameBoardElement = document.getElementById('game-board')
  const paddle = new Paddle(gameBoardElement)
  const ball = new Ball(gameBoardElement)
  let brickNumber = 16
  for(let i = 0; i < brickNumber; i++) {
    const brick = new Brick(gameBoardElement, i + 1)
  }

  document.body.addEventListener("keydown", (event) => {
    if (event.code == 'ArrowLeft') {
      paddle.moveLeft(10)
    } else if (event.code == 'ArrowRight') {
      paddle.moveRight(10)
    }
  })
})

class Paddle {
  constructor(gameBoardElement) {
    this.positionX = 100
    this.rightBorder = gameBoardElement.clientWidth
    this.leftBorder = 0
    this.width = 100
    this.paddle = document.createElement('div')
    const paddle = this.paddle
    paddle.style.width = 100 + 'px'
    paddle.style.height = '20px'
    paddle.style.borderRadius = '5px'
    paddle.style.backgroundColor = 'blue'
    paddle.style.position = 'absolute'
    paddle.style.left = this.positionX + 'px'
    paddle.style.bottom = '10px'
    gameBoardElement.appendChild(paddle)
  }

  toString() {
    return `position = ${this.positionX}
    width = ${this.width}
    Right Border = ${this.rightBorder}
    Left Border = ${this.leftBorder}
    `
  }

  moveLeft(velocity) {
    this.move(-velocity)
  }

  moveRight(velocity) {
    this.move(velocity)
  }

  move(velocity) {
    console.log(this.toString(),velocity)
    if (this.positionX + this.width + velocity > this.rightBorder) {
      this.positionX = this.rightBorder - this.width
    } else if (this.positionX + velocity < this.leftBorder) {
      this.positionX = this.leftBorder
    } else {
      this.positionX += velocity
    }
    
    this.paddle.style.left = this.positionX + 'px'
  }
}

class Ball {
  constructor(gameBoardElement, num) {
    this.position = {x: 0, y: 200}
    this.radius = 4
    this.rightBorder = gameBoardElement.clientWidth
    this.leftBorder = 0
    this.velocity = {x: 3, y: 2}
    this.topBorder = gameBoardElement.clientHeight
    this.bottomBorder = 0

    this.element = document.createElement('div')
    const element = this.element
    element.style.borderRadius = this.radius + 'px'
    element.style.borderColor = 'green'
    element.style.borderWidth = this.radius + 'px'
    element.style.borderStyle = 'solid'
    element.style.position = 'absolute'
    element.style.left = this.position.x + 'px'
    element.style.bottom = this.position.y + 'px'
    gameBoardElement.appendChild(element)

    window.setInterval(this.update.bind(this), 16.6)
  }


  update() {
    if (this.position.x + this.velocity.x + this.radius * 2 > 
      this.rightBorder || this.position.x + this.velocity.x < this.leftBorder) {
        this.velocity.x *= -1
    }
    if (this.position.y + this.velocity.y + this.radius * 2 >
      this.topBorder) {
        this.velocity.y *= -1
    } else if (this.position.y + this.velocity.y < this.bottomBorder) {
      this.velocity.y *= -1
      /*this.velocity.y = 0
      this.velocity.x = 0
      alert('You lose')*/
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.element.style.left = this.position.x + 'px'
    this.element.style.bottom = this.position.y + 'px'
  }
}

class GameBoard {
  constructor() {

  }
}

class Brick {
  constructor(gameBoardElement, num) {
    this.position = {x: (60 * num) - 50, y: 375}
    this.element = document.createElement('div')
    const element = this.element
    if (num % 6 == 0) {
      this.position.y -= 30
      this.position.x = (60 * (num - 6)) - 50
    }

    element.style.backgroundColor = 'gray'
    element.style.width = '50px'
    element.style.height = '10px'
    element.style.position = 'absolute'
    element.style.left = this.position.x + 'px'
    element.style.bottom = this.position.y + 'px'
    gameBoardElement.appendChild(this.element)
  }
}