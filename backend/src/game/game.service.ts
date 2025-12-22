import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GameState, PointMessage } from "./game.entity";

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
    private pointMessageRepository: Repository<PointMessage>
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

    return state;
  }

  async canMakeMove(): Promise<{ canMove: boolean; reason?: string }> {
    const state = await this.getGameState();

    // Проверка стартовой даты
    const startDateStr = state.startDate || DEFAULT_START_DATE;
    const startDate = new Date(startDateStr);
    const now = new Date();
    
    // Нормализуем даты до начала дня (убираем время)
    // Используем текущий год для стартовой даты, если она в прошлом году
    const currentYear = now.getFullYear();
    const startYear = startDate.getFullYear();
    const effectiveStartYear = startYear < currentYear ? currentYear : startYear;
    
    const startDay = new Date(
      effectiveStartYear,
      startDate.getMonth(),
      startDate.getDate()
    );
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Логирование для отладки
    console.log('Проверка стартовой даты:', {
      startDate: startDateStr,
      startDay: startDay.toISOString(),
      today: today.toISOString(),
      comparison: today.getTime() < startDay.getTime(),
      effectiveStartYear,
    });

    if (today.getTime() < startDay.getTime()) {
      return {
        canMove: false,
        reason: `Игра начнется ${startDay.toLocaleDateString("ru-RU")}`,
      };
    }

    // Проверка одного хода в день

    if (state.lastMoveDate) {
      const lastMove = new Date(state.lastMoveDate);
      const lastMoveDay = new Date(
        lastMove.getFullYear(),
        lastMove.getMonth(),
        lastMove.getDate()
      );

      if (today.getTime() === lastMoveDay.getTime()) {
        return { canMove: false, reason: "Уже был сделан ход сегодня" };
      }
    }

    if (state.currentPosition >= TOTAL_POINTS) {
      return { canMove: false, reason: "Игра завершена!" };
    }

    return { canMove: true };
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
}
