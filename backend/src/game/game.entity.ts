import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("game_state")
export class GameState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  currentPosition: number;

  @Column({ default: 0 })
  totalMoves: number;

  @Column({ type: "text", nullable: true })
  lastMoveDate: string;

  @Column({ type: "text", nullable: true })
  startDate: string;

  @Column({ type: "text", nullable: true, default: "[]" })
  completedSudokus: string; // JSON массив номеров больших точек, для которых пройдено судоку

  @CreateDateColumn()
  createdAt: Date;
}

@Entity("point_messages")
export class PointMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pointIndex: number;

  @Column({ type: "text", default: "" })
  message: string;

  @Column({ type: "text", nullable: true })
  imageUrl: string; // URL изображения для сообщения

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity("welcome_banner")
export class WelcomeBanner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", default: "Добро пожаловать в игру!" })
  message: string;

  @Column({ default: true })
  enabled: boolean; // Включен ли показ баннера

  @Column({ type: "text", nullable: true })
  lastShownAt: string; // Дата последнего показа баннера

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
