import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("web_cards")
export class WebCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", default: 0 })
  order: number;

  @Column({ type: "text", default: "" })
  text: string;

  @Column({ type: "text", nullable: true })
  imageUrl: string | null;

  @Column({ default: true })
  enabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity("web_config")
export class WebConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: "text" })
  key: string;

  @Column({ type: "text", default: "" })
  value: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
