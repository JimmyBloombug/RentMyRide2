class Query {
  query;

  // pass params to query
  defineQuery(params) {
    this.query = params;
  }

  // replace existing params with new ones
  changeQuery(newParams) {
    // new param keys
    let paramKeys = Object.keys(newParams);
    // current query keys
    let queryKeys = Object.keys(this.query);

    // for each new param key...
    paramKeys.forEach((newKeySingle) => {
      // go through current query keys and...
      queryKeys.forEach((oldKeySingle) => {
        //  find matching key to...
        if (newKeySingle == oldKeySingle) {
          //  update with new param
          this.query[oldKeySingle] = newParams[newKeySingle];
        }
      });
    });
  }

  // // return query
  // query() {
  //   return this.query;
  // }
}

module.exports = new Query();
