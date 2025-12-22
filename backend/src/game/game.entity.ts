import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('game_state')
export class GameState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  currentPosition: number;

  @Column({ default: 0 })
  totalMoves: number;

  @Column({ type: 'text', nullable: true })
  lastMoveDate: string;

  @Column({ type: 'text', nullable: true })
  startDate: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('point_messages')
export class PointMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pointIndex: number;

  @Column({ type: 'text', default: '' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

