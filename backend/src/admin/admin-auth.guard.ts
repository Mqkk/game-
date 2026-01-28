import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { verifyAdminToken } from "./admin-auth";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & any>();
    // CORS preflight
    if (req.method === "OPTIONS") return true;
    const header = req.headers?.authorization || req.headers?.Authorization;
    if (typeof header !== "string") {
      throw new UnauthorizedException("Нет авторизации");
    }
    const m = header.match(/^Bearer\s+(.+)$/i);
    if (!m) {
      throw new UnauthorizedException("Неверный формат авторизации");
    }
    const token = m[1];
    if (!verifyAdminToken(token)) {
      throw new UnauthorizedException("Неверный токен");
    }
    return true;
  }
}
