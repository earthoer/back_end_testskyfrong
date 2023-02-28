const { authJwt } = require("../middleware");
const controller = require("../controllers/library.controllers");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/books", controller.getbook);
  app.post("/api/findbooks", controller.findbook);
  app.post("/api/addbooks",authJwt.verifyToken,controller.addbook)
  app.post("/api/updatebooks",authJwt.verifyToken,controller.updatebook)
  app.post("/api/deletebooks",authJwt.verifyToken,controller.deletebook)
};