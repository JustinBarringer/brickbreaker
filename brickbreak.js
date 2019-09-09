document.addEventListener("DOMContentLoaded", () => {
  const gameBoardElement = document.getElementById('game-board')
  const settingsElement = document.getElementById('setting-panel')
  const gameBoard = new GameBoard(gameBoardElement)
  const settingPanel = new SettingsPanel(settingsElement)
  /*let brickNumber = 16
  for(let i = 0; i < brickNumber; i++) {
    const brick = new Brick(gameBoardElement, i + 1)
  }*/
  document.body.addEventListener("keydown", (event) => {
    if (event.code == 'ArrowLeft') {
      gameBoard.paddle.moveLeft(10)
    } else if (event.code == 'ArrowRight') {
      gameBoard.paddle.moveRight(10)
    }
  })
  document.getElementById('reset-btn').addEventListener("click", (event) => {
    gameBoard.ball.element.style = 'none'
    gameBoard.ball = new Ball(gameBoardElement)
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
    this.display = 'block'

    this.element = document.createElement('div')
    const element = this.element
    element.style.display = this.display
    element.style.borderRadius = this.radius + 'px'
    element.style.borderColor = 'green'
    element.style.borderWidth = this.radius + 'px'
    element.style.borderStyle = 'solid'
    element.style.position = 'absolute'
    element.style.left = this.position.x + 'px'
    element.style.bottom = this.position.y + 'px'
    gameBoardElement.appendChild(element)

  }

  delete() {

  }
}

class GameBoard {
  constructor(gameBoardElement) {
    this.paddle = new Paddle(gameBoardElement)
    this.ball = new Ball(gameBoardElement)
    this.brickGrid = new BrickGrid(gameBoardElement)
    window.setInterval(this.update.bind(this), 16.6)
  }

  update() {
    console.log(`paddleX: ${this.paddle.positionX}
    ballX = ${this.ball.position.x}
    ball display = ${this.ball.display}`)
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
      //alert('You lose')

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
    this.position = {x: 10, y: 350}


    const element = this.element
    element.style.backgroundColor = 'gray'
    element.style.width = this.width + 'px'
    element.style.height = this.height + 'px'
    element.style.left = this.position.x + 'px'
    element.style.bottom = this.position.y + 'px'
    element.style.position = 'absolute'
    gameBoardElement.appendChild(this.element)
  }
}

class BrickGrid {
  constructor(gameBoardElement) {
    this.brickCount = 6
    for (let i = 0; i < this.brickCount; i++) {
      this.brick = new Brick(gameBoardElement)
      this.brick.position.x += 60    
    }
    this.bricksPerRow = Math.floor(gameBoardElement.clientWidth / this.brick.width)
  }


}

class SettingsPanel {
  constructor(settingsElement) {
    this.position = {x: 10, y: 100}
    this.width = 200
    this.height = 200
    this.settings = document.createElement('div')
    this.reset = document.createElement('button')
    this.resetText = document.createTextNode('Reset')
    const settings = this.settings
    const reset = this.reset

    settings.style.backgroundColor = 'lightgray'
    settings.style.width = this.width + 'px'
    settings.style.height = this.height + 'px'
    settings.style.position = 'fixed'
    settings.style.left = '20px'
    settings.style.bottom = '20px'

    reset.style.width = '150px'
    reset.style.height = '20px'

    settingsElement.appendChild(settings)
    settings.appendChild(this.reset)
    reset.appendChild(this.resetText)
    reset.id = 'reset-btn'
  }
}