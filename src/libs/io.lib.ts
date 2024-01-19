import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { errorResponse } from "../utils/responses.util";

class IOLib {
  static uploadFolders = "./";
  static multer: multer.Multer;
  static maxSize = 5 * 1000 * 1000;

  static router = express.Router();

  static routes() {
    this.router.use("/", express.static(IOLib.uploadFolders));
    this.router.get("/download/:filename", (req: Request, res: Response) => {
      const { filename } = req.params;
      console.log("Filename: ", filename);

      const file = `${this.uploadFolders}/${filename}`;
      res.download(file, filename as string); // 'filename.ext' is the name the user will see when downloading
    });

    return this.router;
  }

  static delete(fileName: string) {
    fs.unlinkSync(`${this.uploadFolders}/${fileName}`);
  }

  static configure() {
    if (!fs.existsSync(this.uploadFolders)) {
      fs.mkdirSync(this.uploadFolders);
    }
    const storage = multer.diskStorage({
      destination: function (_, __, cb) {
        cb(null, `${IOLib.uploadFolders}`); // This is where your uploaded files will be stored
      },
      filename: function (_, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    this.multer = multer({
      storage,
      limits: {
        fileSize: this.maxSize,
      },
    });
  }

  static uploader(upload: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let error = undefined;
      try {
        const promise = new Promise((resolve) => {
          upload(req, res, function (err: any) {
            if (!!err) {
              // An unknown error occurred when uploading.
              error = err;
              return resolve("Values");
            } else {
              // Everything went fine.
              next();
            }
          });
        });
        await promise;

        if (!!error) throw error;
      } catch (error) {
        console.log("ERROR: ", error);

        if (
          (error + "")
            .toLowerCase()
            .includes("MulterError: File too large".toLowerCase())
        ) {
          res.json(errorResponse("400|FILE_TOO_LARGE"));
          return;
        }
        if (
          (error + "")
            .toLowerCase()
            .includes("no such file or directory".toLowerCase())
        ) {
          res.json(errorResponse("500|FOLDER_DIRECTORY_NOT_EXIST"));
          return;
        }
        res.json(errorResponse(`500|${error}`));
      }
    };
  }

  static uploadSingleMiddleware(fileKey: string) {
    const upload = this.multer.single(fileKey);

    return this.uploader(upload);
  }

  static uploadArrayMiddleware(fileKey: string) {
    const upload = this.multer.array(fileKey);

    return this.uploader(upload);
  }
}

export default IOLib;
