class Player {
  constructor(name, letter, token) {
      this.name = name;
      this.letter = letter;
      this.wins = 0
      this.token = token
      this.id = Date.now()
  }

  increaseWins() {
    this.wins += 1
  }

}