class Band {
  constructor(name = "no-name") {
    this.id = Math.ceil(Math.random() * 10).toString(30);
    this.name = name;
    this.votes = 0;
  }
}

module.exports = Band;
