function Responder() {
    this.sendFailureMessage = (res, message, code) => {
      let result = {};
      res.setHeader("content-type", "application/json");
      result.success = false;
      res.statusCode = code != null ? code : 206
      result.message = message;
      result.statusCode = code != null ? code : "failure";
      res.send(JSON.stringify(result));
      return;
    };
    this.sendSuccessMessage = (res, message) => {
      let result = {};
      res?.setHeader("content-type", "application/json");
      result.success = true;
      result.message = message;
      res.send(JSON.stringify(result));
      return;
    };
    this.sendSuccessData = (res, message, data) => {
      let result = {};
      res?.setHeader("content-type", "application/json");
      result.success = true;
      result.message = message;
      result.data = data;
      res.send(JSON.stringify(result));
      return;
    };
  }
  module.exports = new Responder();
  