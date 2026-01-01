import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GameState, PointMessage, WelcomeBanner } from "./game.entity";

// Предрассчитанная последовательность кубика (сумма = 90, 34 хода)
// Рассчитано так, чтобы ровно 2 февраля достичь финиша
const DICE_SEQUENCE = [
  3,
  1,
  2,
  2,
  1,
  5,
  3,
  2,
  1,
  4, // Дни 1-10
  2,
  1,
  6,
  1,
  2,
  3,
  5,
  1,
  2,
  3, // Дни 11-20
  1,
  6,
  1,
  5,
  2,
  1,
  3,
  1,
  5,
  2, // Дни 21-30
  2,
  3,
  4,
  4, // Дни 31-34 (скорректировано для суммы 90)
];

const DEFAULT_START_DATE = "2024-12-31T00:00:00";
const TOTAL_POINTS = 90;

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameState)
    private gameStateRepository: Repository<GameState>,
    @InjectRepository(PointMessage)
    private pointMessageRepository: Repository<PointMessage>,
    @InjectRepository(WelcomeBanner)
    private welcomeBannerRepository: Repository<WelcomeBanner>
  ) {}

  async getGameState() {
    let state = await this.gameStateRepository.findOne({ where: { id: 1 } });

    if (!state) {
      // Используем upsert для безопасного создания/обновления
      try {
        await this.gameStateRepository.upsert(
          {
            id: 1,
            currentPosition: 0,
            totalMoves: 0,
            lastMoveDate: null,
            startDate: DEFAULT_START_DATE,
            completedSudokus: "[]",
          },
          ["id"]
        );
        state = await this.gameStateRepository.findOne({ where: { id: 1 } });
      } catch (error) {
        // Если upsert не поддерживается, используем обычный create без id
        state = this.gameStateRepository.create({
          currentPosition: 0,
          totalMoves: 0,
          lastMoveDate: null,
          startDate: DEFAULT_START_DATE,
        });
        state = await this.gameStateRepository.save(state);
        // Если id не равен 1, обновляем его (только для SQLite)
        if (state.id !== 1) {
          await this.gameStateRepository.delete(state.id);
          state.id = 1;
          state = await this.gameStateRepository.save(state);
        }
      }
    }

    // Если startDate не установлена, устанавливаем значение по умолчанию
    if (!state.startDate) {
      state.startDate = DEFAULT_START_DATE;
      await this.gameStateRepository.save(state);
    }

    // Если completedSudokus не установлено, устанавливаем пустой массив
    if (!state.completedSudokus) {
      state.completedSudokus = "[]";
      await this.gameStateRepository.save(state);
    }

    return state;
  }

  async canMakeMove(): Promise<{ canMove: boolean; reason?: string }> {
    const state = await this.getGameState();

    // Проверка стартовой даты
    const startDateStr = state.startDate || DEFAULT_START_DATE;
    const startDate = new Date(startDateStr);
    const now = new Date();

    // Нормализуем даты до начала дня в UTC (убираем время)
    const startDay = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate()
      )
    );
    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    // Если стартовая дата уже прошла, разрешаем игру
    // Если стартовая дата еще не наступила, запрещаем
    if (todayUTC.getTime() < startDay.getTime()) {
      return {
        canMove: false,
        reason: `Игра начнется ${startDay.toLocaleDateString("ru-RU")}`,
      };
    }

    // Проверка одного хода в день
    if (state.lastMoveDate) {
      const lastMove = new Date(state.lastMoveDate);
      // Нормализуем дату последнего хода до начала дня в UTC
      const lastMoveDay = new Date(
        Date.UTC(
          lastMove.getUTCFullYear(),
          lastMove.getUTCMonth(),
          lastMove.getUTCDate()
        )
      );
      // Нормализуем сегодняшнюю дату до начала дня в UTC
      const todayUTC = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      );

      if (todayUTC.getTime() === lastMoveDay.getTime()) {
        return { canMove: false, reason: "Уже был сделан ход сегодня" };
      }
    }

    if (state.currentPosition >= TOTAL_POINTS) {
      return { canMove: false, reason: "Игра завершена!" };
    }

    // Проверка судоку для определенных дней (5, 10, 15, 25, 30)
    const SUDOKU_DAYS = [5, 10, 15, 25, 30];
    const currentDay = state.totalMoves;
    if (SUDOKU_DAYS.includes(currentDay)) {
      const completedSudokus = this.parseCompletedSudokus(
        state.completedSudokus
      );
      if (!completedSudokus.includes(currentDay)) {
        return {
          canMove: false,
          reason: "Сначала нужно решить судоку на этом дне!",
        };
      }
    }

    return { canMove: true };
  }

  private parseCompletedSudokus(completedSudokusStr: string | null): number[] {
    if (!completedSudokusStr) return [];
    try {
      return JSON.parse(completedSudokusStr);
    } catch {
      return [];
    }
  }

  async completeSudoku(day: number): Promise<void> {
    const state = await this.getGameState();
    const completedSudokus = this.parseCompletedSudokus(state.completedSudokus);

    if (!completedSudokus.includes(day)) {
      completedSudokus.push(day);
      state.completedSudokus = JSON.stringify(completedSudokus);
      await this.gameStateRepository.save(state);
    }
  }

  async makeMove(): Promise<{
    diceValue: number;
    newPosition: number;
    message?: string;
    isFinished: boolean;
  }> {
    const canMove = await this.canMakeMove();
    if (!canMove.canMove) {
      throw new Error(canMove.reason || "Нельзя сделать ход");
    }

    const state = await this.getGameState();
    const moveIndex = state.totalMoves;

    if (moveIndex >= DICE_SEQUENCE.length) {
      throw new Error("Все ходы уже сделаны");
    }

    const diceValue = DICE_SEQUENCE[moveIndex];
    const newPosition = Math.min(
      state.currentPosition + diceValue,
      TOTAL_POINTS
    );

    // Обновляем состояние
    state.currentPosition = newPosition;
    state.totalMoves = moveIndex + 1;
    state.lastMoveDate = new Date().toISOString();
    await this.gameStateRepository.save(state);

    // Получаем сообщение для точки
    const message = await this.getPointMessage(newPosition);

    const isFinished = newPosition >= TOTAL_POINTS;

    return {
      diceValue,
      newPosition,
      message: message?.message || `Вы достигли точки ${newPosition}!`,
      isFinished,
    };
  }

  async getPointMessage(pointIndex: number): Promise<PointMessage | null> {
    return await this.pointMessageRepository.findOne({
      where: { pointIndex },
    });
  }

  async getAllMessages(): Promise<PointMessage[]> {
    return await this.pointMessageRepository.find({
      order: { pointIndex: "ASC" },
    });
  }

  // Возвращает список позиций, которые будут посещены в течение всей игры
  getReachablePositions(currentPosition: number, totalMoves: number): number[] {
    const positions: number[] = [currentPosition]; // Текущая позиция уже посещена

    let position = currentPosition;
    for (let i = totalMoves; i < DICE_SEQUENCE.length; i++) {
      const diceValue = DICE_SEQUENCE[i];
      position = Math.min(position + diceValue, TOTAL_POINTS);
      if (!positions.includes(position)) {
        positions.push(position);
      }
    }

    return positions.sort((a, b) => a - b);
  }

  async getWelcomeBanner() {
    let banner = await this.welcomeBannerRepository.findOne({
      where: { id: 1 },
    });

    if (!banner) {
      // Создаем баннер по умолчанию
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

  async markBannerShown(): Promise<void> {
    let banner = await this.welcomeBannerRepository.findOne({
      where: { id: 1 },
    });

    if (!banner) {
      banner = this.welcomeBannerRepository.create({
        id: 1,
        message: "Добро пожаловать в игру!",
        enabled: true,
      });
    }

    banner.lastShownAt = new Date().toISOString();
    await this.welcomeBannerRepository.save(banner);
  }
}
