import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { verifyToken } from "./web-auth";

@Injectable()
export class WebAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & any>();
    const header = req.headers?.authorization || req.headers?.Authorization;
    if (typeof header !== "string") return false;
    const m = header.match(/^Bearer\s+(.+)$/i);
    if (!m) return false;
    const token = m[1];
    const ok = verifyToken(token);
    if (ok) req.webToken = token;
    return ok;
  }
}
