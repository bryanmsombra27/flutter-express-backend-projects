const Band = require("./Band");

class Bands {
  constructor() {
    this.bands = [];
  }

  addBand(band = new Band()) {
    this.bands.push(band);
  }

  getBands() {
    return this.bands;
  }

  deleteBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  voteBand(id) {
    this.bands = this.bands.map((item) => {
      if (item.id == id) {
        item = {
          ...item,
          votes: item.votes + 1,
        };
      }

      return item;
    });
  }
}

module.exports = Bands;
