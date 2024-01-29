import express, { Application, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import cors from "cors";
import { Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./src/types/indexType";
import IOLib from "./src/libs/io.lib";
import DistrictRoute from "./src/routes/district.route";
import SubdistrictRoute from "./src/routes/subdistrict.route";
import VoterRoute from "./src/routes/voter.route";
import ResponsiblerRoute from "./src/routes/responsibler.route";
import ResponsiblerVoterRoute from "./src/routes/responsibler-voter.route";

class App {
  public app: Application;
  private server: any;
  private io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;

  constructor() {
    this.app = express();
    this.server = require("http").createServer(this.app);
    this.io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(this.server, {
      cors: {
        origin: `*`,
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
    IOLib.configure();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSocket();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: `*` }));
  }

  private initializeRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send(`
      <h1>Running correctly</h1>
    `);
    });

    this.app.use("/districts", DistrictRoute.routes());
    this.app.use("/subDistricts", SubdistrictRoute.routes());
    this.app.use("/voters", VoterRoute.routes());
    this.app.use("/responsiblers", ResponsiblerRoute.routes());
    this.app.use("/responsibler-voters", ResponsiblerVoterRoute.routes());

    this.app.use("/files", IOLib.routes());

    // Routes not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError(404));
    });
  }

  private initializeSocket(): void {
    // All your Socket.io logic here
    // Such as io.use(addUserToSocketDataIfAuthenticated);
    // And the io.on('connection', ...) logic.
  }

  public listen(port: string | number): void {
    this.server.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
    });
  }
}

export default App;
