const fs = require('fs');

interface RateLimiterConfig {
  records?: any;
  threshold?: number;
  halflife?: number;
}

export class RateLimiter {
  records: any;
  halflife: number;
  threshold: number;
  constructor({
    records = {},
    threshold = 15,
    halflife = 30000,
  }: RateLimiterConfig) {
    this.records = records;
    this.threshold = threshold;
    this.halflife = halflife;
  }

  loadJail = (filename: string) => {
    let ids: string[];
    try {
      const text = fs.readFileSync(filename, 'utf8');
      ids = text.split(/\r?\n/);
    } catch (error) {
      return;
    }

    for (let id of ids) {
      if (id && id[0] != '#') {
        this.arrest(id);
      }
    }
    console.log("Loaded jail '" + filename + "'");
  };

  search = (id: string) => {
    var record = this.records[id];
    if (!record) {
      record = this.records[id] = {
        time: Date.now(),
        score: 0,
      };
    }
    return record;
  };

  frisk = (id: string, deltaScore: number) => {
    var record = this.search(id);
    if (record.arrested) {
      return true;
    }

    record.score *= Math.pow(2, -(Date.now() - record.time) / this.halflife);
    record.score += deltaScore;
    record.time = Date.now();
    if (record.score >= this.threshold * 2) {
      return this.arrest(id);
    }
    if (record.score >= this.threshold) {
      return true;
    }
    return false;
  };

  arrest = (id: string) => {
    const record = this.search(id);
    if (record) {
      record.arrested = true;
    }
  };

  pardon = (id: string) => {
    const record = this.search(id);
    if (record) {
      record.arrested = true;
    }
  };
}

export const Police = new RateLimiter({});
