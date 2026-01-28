import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WebConfig } from "../web/web.entity";
import { hashPassword, verifyPassword } from "../web/web-auth";
import { issueAdminToken } from "./admin-auth";

const ADMIN_PASSWORD_KEY = "adminPasswordHash";

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(WebConfig)
    private webConfigRepository: Repository<WebConfig>
  ) {}

  async login(password: string): Promise<{ token: string }> {
    if (!password || !password.trim()) {
      throw new BadRequestException("Пароль обязателен");
    }
    const hash = await this.getPasswordHashOrInit();
    const ok = verifyPassword(password, hash);
    if (!ok) throw new UnauthorizedException("Неверный пароль");
    return { token: issueAdminToken() };
  }

  async setPassword(password: string): Promise<{ success: true }> {
    if (!password || !password.trim()) {
      throw new BadRequestException("Пароль обязателен");
    }
    const value = hashPassword(password.trim());
    await this.upsertConfig(ADMIN_PASSWORD_KEY, value);
    return { success: true };
  }

  private async getPasswordHashOrInit(): Promise<string> {
    const row = await this.webConfigRepository.findOne({
      where: { key: ADMIN_PASSWORD_KEY },
    });
    if (row?.value) return row.value;

    const initial = process.env.ADMIN_PASSWORD || "admin";
    const value = hashPassword(initial);
    await this.upsertConfig(ADMIN_PASSWORD_KEY, value);
    return value;
  }

  private async upsertConfig(key: string, value: string): Promise<WebConfig> {
    const existing = await this.webConfigRepository.findOne({ where: { key } });
    if (existing) {
      existing.value = value;
      return await this.webConfigRepository.save(existing);
    }
    return await this.webConfigRepository.save(
      this.webConfigRepository.create({ key, value })
    );
  }
}
