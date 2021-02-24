class Query {
  query;

  // pass params to query
  defineQuery(params) {
    this.query = params;
  }

  // replace existing params with new ones
  changeQuery(newParams) {
    let keys = Object.keys(newParams);
    keys.forEach((el1) => {
      Object.keys(this.query).forEach((el2) => {
        if (el1 == el2) {
          this.query[el2] = newParams[el1];
        }
      });
    });
  }

  // return query
  query() {
    return this.query;
  }
}

module.exports = new Query();
