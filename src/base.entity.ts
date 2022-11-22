import { ID, ObjectType } from "@nestjs/graphql";
import { FilterableField } from "@vizorous/nestjs-query-graphql";
import { Expose } from "class-transformer";
import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { IDExpose } from "./ID";
@ObjectType()
@Entity()
export class BaseEntity {
	@IDExpose(() => ID, { idOptions: { allowedComparisons: ["eq", "in"] } })
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@FilterableField()
	@Expose()
	@CreateDateColumn()
	createdAt: Date;

	@FilterableField()
	@Expose()
	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
