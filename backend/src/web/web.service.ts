import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WebCard, WebCardState, WebConfig } from "./web.entity";
import { hashPassword, issueToken, tokenKey, verifyPassword } from "./web-auth";

const PASSWORD_KEY = "passwordHash";
const HOME_TITLE_KEY = "homeTitle";
const HOME_DESC_KEY = "homeDescription";

@Injectable()
export class WebService {
  constructor(
    @InjectRepository(WebCard)
    private cardsRepo: Repository<WebCard>,
    @InjectRepository(WebConfig)
    private configRepo: Repository<WebConfig>,
    @InjectRepository(WebCardState)
    private cardStateRepo: Repository<WebCardState>
  ) {}

  async login(password: string): Promise<{ token: string }> {
    if (!password || !password.trim()) {
      throw new BadRequestException("Пароль обязателен");
    }
    const hash = await this.getPasswordHashOrInit();
    const ok = verifyPassword(password, hash);
    if (!ok) {
      throw new UnauthorizedException("Неверный пароль");
    }
    return { token: issueToken() };
  }

  async getCardsForToken(
    webToken: string
  ): Promise<Array<WebCard & { state: 0 | 1 | 2 }>> {
    const cards = await this.cardsRepo.find({
      where: { enabled: true },
      order: { order: "ASC", id: "ASC" },
    });

    const tKey = tokenKey(webToken);
    const states = await this.cardStateRepo.find({ where: { tokenKey: tKey } });
    const stateMap = new Map<number, 0 | 1 | 2>();
    for (const s of states) {
      const v = s.state;
      if (v === 1 || v === 2 || v === 0) stateMap.set(s.cardId, v);
    }

    return cards.map((c) => ({ ...c, state: stateMap.get(c.id) ?? 0 }));
  }

  async getHomeForToken(webToken: string): Promise<{
    title: string;
    description: string;
    cards: Array<WebCard & { state: 0 | 1 | 2 }>;
  }> {
    const [title, description, cards] = await Promise.all([
      this.getConfigValue(HOME_TITLE_KEY, "Коллекция карточек"),
      this.getConfigValue(
        HOME_DESC_KEY,
        "Для активации необходимо нажать на карточку"
      ),
      this.getCardsForToken(webToken),
    ]);
    return { title, description, cards };
  }

  async setCardStateForToken(
    webToken: string,
    cardId: number,
    state: 0 | 1 | 2
  ): Promise<{ success: true }> {
    const tKey = tokenKey(webToken);
    const existing = await this.cardStateRepo.findOne({
      where: { tokenKey: tKey, cardId },
    });

    if (existing) {
      existing.state = state;
      await this.cardStateRepo.save(existing);
      return { success: true };
    }

    await this.cardStateRepo.save(
      this.cardStateRepo.create({ tokenKey: tKey, cardId, state })
    );
    return { success: true };
  }

  async adminListCards(): Promise<WebCard[]> {
    return await this.cardsRepo.find({ order: { order: "ASC", id: "ASC" } });
  }

  async adminCreateCard(input: {
    text: string;
    imageUrl?: string | null;
    order?: number;
    enabled?: boolean;
  }): Promise<WebCard> {
    const card = this.cardsRepo.create({
      text: input.text || "",
      imageUrl: input.imageUrl ?? null,
      order: Number.isFinite(input.order as number)
        ? (input.order as number)
        : 0,
      enabled: input.enabled !== false,
    });
    return await this.cardsRepo.save(card);
  }

  async adminUpdateCard(
    id: number,
    input: Partial<{
      text: string;
      imageUrl: string | null;
      order: number;
      enabled: boolean;
    }>
  ): Promise<WebCard> {
    const card = await this.cardsRepo.findOne({ where: { id } });
    if (!card) throw new Error("Карточка не найдена");
    if (input.text !== undefined) card.text = input.text;
    if (input.imageUrl !== undefined) card.imageUrl = input.imageUrl;
    if (input.order !== undefined) card.order = input.order;
    if (input.enabled !== undefined) card.enabled = input.enabled;
    return await this.cardsRepo.save(card);
  }

  async adminDeleteCard(id: number): Promise<{ success: true }> {
    await this.cardsRepo.delete({ id });
    return { success: true };
  }

  async adminSetPassword(password: string): Promise<{ success: true }> {
    const value = hashPassword(password);
    await this.upsertConfig(PASSWORD_KEY, value);
    return { success: true };
  }

  private async getPasswordHashOrInit(): Promise<string> {
    const row = await this.configRepo.findOne({ where: { key: PASSWORD_KEY } });
    if (row?.value) return row.value;

    const initial = process.env.WEB_PASSWORD || "1234";
    const value = hashPassword(initial);
    await this.upsertConfig(PASSWORD_KEY, value);
    return value;
  }

  private async upsertConfig(key: string, value: string): Promise<WebConfig> {
    const existing = await this.configRepo.findOne({ where: { key } });
    if (existing) {
      existing.value = value;
      return await this.configRepo.save(existing);
    }
    const created = this.configRepo.create({ key, value });
    return await this.configRepo.save(created);
  }

  private async getConfigValue(key: string, fallback: string): Promise<string> {
    const row = await this.configRepo.findOne({ where: { key } });
    if (!row) return fallback;
    const v = (row.value || "").trim();
    return v ? v : fallback;
  }
}
