document.addEventListener("DOMContentLoaded", () => {
  const gameBoardElement = document.getElementById('game-board')
  const gameBoard = new GameBoard(gameBoardElement)
  /*let brickNumber = 16
  for(let i = 0; i < brickNumber; i++) {
    const brick = new Brick(gameBoardElement, i + 1)
  }*/
  const brickGrid = new BrickGrid(gameBoardElement)
  document.body.addEventListener("keydown", (event) => {
    if (event.code == 'ArrowLeft') {
      gameBoard.paddle.moveLeft(10)
    } else if (event.code == 'ArrowRight') {
      gameBoard.paddle.moveRight(10)
    }
  })
})

class Paddle {
  constructor(gameBoardElement) {
    this.positionX = 100
    this.rightBorder = gameBoardElement.clientWidth
    this.leftBorder = 0
    this.width = 100
    this.height = 20
    this.bottom = 10
    this.paddle = document.createElement('div')
    const paddle = this.paddle
    paddle.style.width = 100 + 'px'
    paddle.style.height = 20 + 'px'
    paddle.style.borderRadius = '5px'
    paddle.style.backgroundColor = 'blue'
    paddle.style.position = 'absolute'
    paddle.style.left = this.positionX + 'px'
    paddle.style.bottom = this.bottom + 'px'
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

  }
}

class GameBoard {
  constructor(gameBoardElement) {
    this.paddle = new Paddle(gameBoardElement)
    this.ball = new Ball(gameBoardElement)
    window.setInterval(this.update.bind(this), 16.6)
  }

  update() {
    console.log(`paddleX: ${this.paddle.positionX}
    ballX = ${this.ball.position.x}`)
    if (this.ball.position.x + this.ball.velocity.x + this.ball.radius * 2 > 
      this.ball.rightBorder || this.ball.position.x + this.ball.velocity.x < this.ball.leftBorder) {
        this.ball.velocity.x *= -1
    }
    if (this.ball.position.y + this.ball.velocity.y + this.ball.radius * 2 >
      this.ball.topBorder) {
        this.ball.velocity.y *= -1
    } else if (this.ball.position.y + this.ball.velocity.y < this.ball.bottomBorder) {
      //this.ball.velocity.y *= -1
      this.ball.velocity.y = 0
      this.ball.velocity.x = 0
      alert('You lose')
    }
    if(this.ball.position.x > this.paddle.positionX && 
        this.ball.position.x < this.paddle.positionX + this.paddle.width &&
        this.ball.position.y == this.paddle.bottom + this.paddle.height
      ) {
      this.ball.velocity.y *= -1
    }
    this.ball.position.x += this.ball.velocity.x
    this.ball.position.y += this.ball.velocity.y
    this.ball.element.style.left = this.ball.position.x + 'px'
    this.ball.element.style.bottom = this.ball.position.y + 'px'
  }
}

class Brick {
  constructor(gameBoardElement) {
    this.element = document.createElement('div')
    this.width = 50
    this.height = 10
    this.position = {x: 350, y: 10}
    const element = this.element
    element.style.backgroundColor = 'gray'
    element.style.width = this.width + 'px'
    element.style.height = this.height + 'px'
    element.style.position = 'absolute'
    gameBoardElement.appendChild(this.element)
  }
}

class BrickGrid{
  constructor(gameBoardElement) {
    this.prevBrick = null
    this.brickCount = 24
    this.width = Brick.width
    this.height = Brick.height
  }  
  
}