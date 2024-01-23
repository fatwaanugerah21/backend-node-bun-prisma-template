import express, { Router } from "express";
import BookController from "../controllers/book.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import IOLib from "../libs/io.lib";

class BookRoute {
  static router = express.Router();

  static routes(): Router {
    this.router.post(
      "/",
      AuthMiddleware.mustLogin,
      IOLib.uploadArrayMiddleware("files"),
      BookController.create
    );
    this.router.get(
      "/continue-reading",
      AuthMiddleware.mustLogin,
      BookController.getContinueReading
    );
    this.router.get("/", BookController.getAll);
    this.router.get("/:id", BookController.getById);
    this.router.put(
      "/:id",
      AuthMiddleware.mustLogin,
      IOLib.uploadArrayMiddleware("files"),
      BookController.update
    );
    this.router.delete("/:id", AuthMiddleware.mustLogin, BookController.delete);

    return this.router;
  }
}

export default BookRoute;
