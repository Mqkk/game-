import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointMessage, GameState } from '../game/game.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(PointMessage)
    private pointMessageRepository: Repository<PointMessage>,
    @InjectRepository(GameState)
    private gameStateRepository: Repository<GameState>,
  ) {}

  async getAllMessages(): Promise<PointMessage[]> {
    return await this.pointMessageRepository.find({
      order: { pointIndex: 'ASC' },
    });
  }

  async getMessage(pointIndex: number): Promise<PointMessage | null> {
    return await this.pointMessageRepository.findOne({
      where: { pointIndex },
    });
  }

  async createOrUpdateMessage(pointIndex: number, message: string): Promise<PointMessage> {
    let pointMessage = await this.pointMessageRepository.findOne({
      where: { pointIndex },
    });

    if (pointMessage) {
      pointMessage.message = message;
      pointMessage.updatedAt = new Date();
    } else {
      pointMessage = this.pointMessageRepository.create({
        pointIndex,
        message,
      });
    }

    return await this.pointMessageRepository.save(pointMessage);
  }

  async getGameState(): Promise<GameState> {
    let state = await this.gameStateRepository.findOne({ where: { id: 1 } });
    
    if (!state) {
      state = this.gameStateRepository.create({
        id: 1,
        currentPosition: 0,
        totalMoves: 0,
        lastMoveDate: null,
        startDate: '2024-12-31T00:00:00',
      });
      await this.gameStateRepository.save(state);
    }
    
    return state;
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
}

