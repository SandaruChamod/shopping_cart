import { AuthService, JwtStrategyService } from "./services";
import { AuthController } from "./controllers";

export const SERVICES =[
  AuthService,
  JwtStrategyService
];

export const CONTROLLERS = [
  AuthController
];
