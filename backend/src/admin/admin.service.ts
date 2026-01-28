import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  PointMessage,
  GameState,
  WelcomeBanner,
  PointQuestion,
} from "../game/game.entity";
import { WebCard, WebConfig } from "../web/web.entity";
import { hashPassword } from "../web/web-auth";

const WEB_PASSWORD_KEY = "passwordHash";
const WEB_HOME_TITLE_KEY = "homeTitle";
const WEB_HOME_DESC_KEY = "homeDescription";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(PointMessage)
    private pointMessageRepository: Repository<PointMessage>,
    @InjectRepository(GameState)
    private gameStateRepository: Repository<GameState>,
    @InjectRepository(WelcomeBanner)
    private welcomeBannerRepository: Repository<WelcomeBanner>,
    @InjectRepository(PointQuestion)
    private pointQuestionRepository: Repository<PointQuestion>,
    @InjectRepository(WebCard)
    private webCardRepository: Repository<WebCard>,
    @InjectRepository(WebConfig)
    private webConfigRepository: Repository<WebConfig>
  ) {}

  async getAllMessages(): Promise<PointMessage[]> {
    return await this.pointMessageRepository.find({
      order: { pointIndex: "ASC" },
    });
  }

  async getMessage(pointIndex: number): Promise<PointMessage | null> {
    return await this.pointMessageRepository.findOne({
      where: { pointIndex },
    });
  }

  async createOrUpdateMessage(
    pointIndex: number,
    message: string,
    imageUrl?: string
  ): Promise<PointMessage> {
    let pointMessage = await this.pointMessageRepository.findOne({
      where: { pointIndex },
    });

    if (pointMessage) {
      pointMessage.message = message;
      if (imageUrl !== undefined) {
        pointMessage.imageUrl = imageUrl || null;
      }
      // updatedAt обновляется автоматически через @UpdateDateColumn()
    } else {
      pointMessage = this.pointMessageRepository.create({
        pointIndex,
        message,
        imageUrl: imageUrl || null,
      });
    }

    return await this.pointMessageRepository.save(pointMessage);
  }

  async getGameState(): Promise<
    GameState & {
      reachablePositions?: number[];
      positionToDay?: Record<number, number>;
    }
  > {
    let state = await this.gameStateRepository.findOne({ where: { id: 1 } });

    if (!state) {
      state = this.gameStateRepository.create({
        id: 1,
        currentPosition: 0,
        totalMoves: 0,
        lastMoveDate: null,
        startDate: "2024-12-31T00:00:00",
      });
      await this.gameStateRepository.save(state);
    }

    // Рассчитываем достижимые позиции
    const reachablePositions = this.getReachablePositions(
      state.currentPosition,
      state.totalMoves
    );

    // Рассчитываем мапу позиция -> день для определения, нужен ли вопрос
    const positionToDayMap = this.getPositionToDayMap(
      state.currentPosition,
      state.totalMoves
    );
    const positionToDay: Record<number, number> = {};
    positionToDayMap.forEach((day, position) => {
      positionToDay[position] = day;
    });

    return { ...state, reachablePositions, positionToDay };
  }

  // Возвращает список позиций, которые будут посещены в течение всей игры
  private getReachablePositions(
    currentPosition: number,
    totalMoves: number
  ): number[] {
    const DICE_SEQUENCE = [
      3, 1, 2, 2, 1, 5, 3, 2, 1, 4, 2, 1, 6, 1, 2, 3, 5, 1, 2, 3, 1, 6, 1, 5, 2,
      1, 3, 1, 5, 2, 2, 3, 4, 4,
    ];
    const TOTAL_POINTS = 90;

    const positions: Set<number> = new Set();
    positions.add(currentPosition); // Текущая позиция уже посещена

    let position = currentPosition;
    for (let i = totalMoves; i < DICE_SEQUENCE.length; i++) {
      const diceValue = DICE_SEQUENCE[i];
      position = Math.min(position + diceValue, TOTAL_POINTS);
      positions.add(position);
    }

    return Array.from(positions).sort((a, b) => a - b);
  }

  // Возвращает мапу позиция -> день (totalMoves), на который игрок попадет на эту позицию
  getPositionToDayMap(
    currentPosition: number,
    totalMoves: number
  ): Map<number, number> {
    const DICE_SEQUENCE = [
      3, 1, 2, 2, 1, 5, 3, 2, 1, 4, 2, 1, 6, 1, 2, 3, 5, 1, 2, 3, 1, 6, 1, 5, 2,
      1, 3, 1, 5, 2, 2, 3, 4, 4,
    ];
    const TOTAL_POINTS = 90;

    const positionToDay = new Map<number, number>();

    // Текущая позиция уже посещена на текущий день
    if (currentPosition > 0) {
      positionToDay.set(currentPosition, totalMoves);
    }

    let position = currentPosition;
    for (let i = totalMoves; i < DICE_SEQUENCE.length; i++) {
      const diceValue = DICE_SEQUENCE[i];
      position = Math.min(position + diceValue, TOTAL_POINTS);
      const day = i + 1; // День = индекс + 1 (так как totalMoves увеличивается после хода)
      positionToDay.set(position, day);
    }

    return positionToDay;
  }

  async updateStartDate(startDate: string): Promise<GameState> {
    let state = await this.gameStateRepository.findOne({ where: { id: 1 } });

    if (!state) {
      state = this.gameStateRepository.create({
        id: 1,
        currentPosition: 0,
        totalMoves: 0,
        lastMoveDate: null,
        startDate,
      });
    } else {
      state.startDate = startDate;
    }

    return await this.gameStateRepository.save(state);
  }

  async getWelcomeBanner(): Promise<WelcomeBanner> {
    let banner = await this.welcomeBannerRepository.findOne({
      where: { id: 1 },
    });

    if (!banner) {
      banner = this.welcomeBannerRepository.create({
        id: 1,
        message: "Добро пожаловать в игру!",
        enabled: true,
        lastShownAt: null,
      });
      banner = await this.welcomeBannerRepository.save(banner);
    }

    return banner;
  }

  async updateWelcomeBanner(
    message: string,
    enabled: boolean
  ): Promise<WelcomeBanner> {
    let banner = await this.welcomeBannerRepository.findOne({
      where: { id: 1 },
    });

    if (!banner) {
      banner = this.welcomeBannerRepository.create({
        id: 1,
        message,
        enabled,
        lastShownAt: null,
      });
    } else {
      banner.message = message;
      banner.enabled = enabled;
    }

    return await this.welcomeBannerRepository.save(banner);
  }

  async getAllQuestions(): Promise<PointQuestion[]> {
    return await this.pointQuestionRepository.find({
      order: { pointIndex: "ASC" },
    });
  }

  async getQuestion(pointIndex: number): Promise<PointQuestion | null> {
    return await this.pointQuestionRepository.findOne({
      where: { pointIndex },
    });
  }

  async createOrUpdateQuestion(
    pointIndex: number,
    question: string,
    answer: string
  ): Promise<PointQuestion> {
    let pointQuestion = await this.pointQuestionRepository.findOne({
      where: { pointIndex },
    });

    if (pointQuestion) {
      pointQuestion.question = question;
      pointQuestion.answer = answer;
      pointQuestion.updatedAt = new Date();
    } else {
      pointQuestion = this.pointQuestionRepository.create({
        pointIndex,
        question,
        answer,
      });
    }

    return await this.pointQuestionRepository.save(pointQuestion);
  }

  // -----------------------
  // Web (Next.js PWA) admin
  // -----------------------

  async getWebCards(): Promise<WebCard[]> {
    return await this.webCardRepository.find({
      order: { order: "ASC", id: "ASC" },
    });
  }

  async createWebCard(input: {
    text: string;
    imageUrl?: string | null;
    order?: number;
    enabled?: boolean;
  }): Promise<WebCard> {
    const card = this.webCardRepository.create({
      text: input.text || "",
      imageUrl: input.imageUrl ?? null,
      order: Number.isFinite(input.order as number)
        ? (input.order as number)
        : 0,
      enabled: input.enabled !== false,
    });
    return await this.webCardRepository.save(card);
  }

  async updateWebCard(
    id: number,
    input: Partial<{
      text: string;
      imageUrl: string | null;
      order: number;
      enabled: boolean;
    }>
  ): Promise<WebCard> {
    const card = await this.webCardRepository.findOne({ where: { id } });
    if (!card) throw new NotFoundException("Карточка не найдена");
    if (input.text !== undefined) card.text = input.text;
    if (input.imageUrl !== undefined) card.imageUrl = input.imageUrl;
    if (input.order !== undefined) card.order = input.order;
    if (input.enabled !== undefined) card.enabled = input.enabled;
    return await this.webCardRepository.save(card);
  }

  async deleteWebCard(id: number): Promise<{ success: true }> {
    await this.webCardRepository.delete({ id });
    return { success: true };
  }

  async setWebPassword(password: string): Promise<{ success: true }> {
    if (!password || !password.trim()) {
      throw new BadRequestException("Пароль обязателен");
    }
    const value = hashPassword(password);
    const existing = await this.webConfigRepository.findOne({
      where: { key: WEB_PASSWORD_KEY },
    });
    if (existing) {
      existing.value = value;
      await this.webConfigRepository.save(existing);
    } else {
      await this.webConfigRepository.save(
        this.webConfigRepository.create({ key: WEB_PASSWORD_KEY, value })
      );
    }
    return { success: true };
  }

  async getWebHome(): Promise<{ title: string; description: string }> {
    const [t, d] = await Promise.all([
      this.webConfigRepository.findOne({ where: { key: WEB_HOME_TITLE_KEY } }),
      this.webConfigRepository.findOne({ where: { key: WEB_HOME_DESC_KEY } }),
    ]);
    return {
      title: t?.value || "",
      description: d?.value || "",
    };
  }

  async setWebHome(input: {
    title?: string;
    description?: string;
  }): Promise<{ success: true }> {
    await Promise.all([
      input.title !== undefined
        ? this.upsertWebConfig(WEB_HOME_TITLE_KEY, input.title)
        : Promise.resolve(null),
      input.description !== undefined
        ? this.upsertWebConfig(WEB_HOME_DESC_KEY, input.description)
        : Promise.resolve(null),
    ]);
    return { success: true };
  }

  private async upsertWebConfig(
    key: string,
    value: string
  ): Promise<WebConfig> {
    const existing = await this.webConfigRepository.findOne({ where: { key } });
    if (existing) {
      existing.value = value ?? "";
      return await this.webConfigRepository.save(existing);
    }
    const created = this.webConfigRepository.create({
      key,
      value: value ?? "",
    });
    return await this.webConfigRepository.save(created);
  }
}
