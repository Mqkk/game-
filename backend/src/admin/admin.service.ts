import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PointMessage, GameState, WelcomeBanner } from "../game/game.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(PointMessage)
    private pointMessageRepository: Repository<PointMessage>,
    @InjectRepository(GameState)
    private gameStateRepository: Repository<GameState>,
    @InjectRepository(WelcomeBanner)
    private welcomeBannerRepository: Repository<WelcomeBanner>
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

  async getGameState(): Promise<GameState & { reachablePositions?: number[] }> {
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

    return { ...state, reachablePositions };
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
}
