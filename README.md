# Nest Query Utils

### by [_Vizorous_](https://github.com/vizorous)

---

## Install

```bash
npm install @vizorous/nest-query-utils
yarn add @vizorous/nest-query-utils
pnpm add @vizorous/nest-query-utils
```

## @CF

- CF is a custom decorator which stands for Column Field.
- It combines [@Column](https://typeorm.io/entities#entity-columns) (TypeORM), [@Field](https://docs.nestjs.com/graphql/resolvers#code-first-resolver) (NestJS) and [@Expose](https://github.com/typestack/class-transformer#exposing-getters-and-method-return-values) (Class Transformer) decorators.

- Can be utilized to easily define a column in a TypeORM entity and expose it in a GraphQL schema.

  ```typescript
  import { CF } from "@vizorous/nest-query-utils";
  import { ObjectType } from "@nestjs/graphql";
  import { Entity } from "typeorm";
  @ObjectType()
  @Entity()
  export class User {
  	@CF()
  	name: string;

  	@CF({ nullable: true })
  	phone?: string;
  }
  ```

## @CFF()

- CFF is a custom decorator which stands for Column Filterable Field.
- It combines [@Column](https://typeorm.io/entities#entity-columns) (TypeORM), [@FilterableField](https://tripss.github.io/nestjs-query/docs/graphql/dtos#filterablefield) (Nestjs Query) and [@Expose](https://github.com/typestack/class-transformer#exposing-getters-and-method-return-values) (Class Transformer) decorators.
    <!-- - _Note: CFF is using a customized version of FilterableField, it might not work properly with the base version from @nestjs-query or @ptc-org fork. You must use @vizorous fork._ -->

- Can be utilized to easily define a column in a TypeORM entity and expose a filterable field it in a GraphQL schema.

  ```typescript
  import { CF } from "@vizorous/nest-query-utils";
  import { ObjectType } from "@nestjs/graphql";
  import { Entity } from "typeorm";

  @ObjectType()
  @Entity()
  export class User {
  	@CFF({ fieldOptions: { allowedComparisons: ["in", "is", "like"] } })
  	name: string;

  	@CF({ nullable: true })
  	phone?: string;
  }
  ```

## BaseEntity

- BaseEntity is a custom class which can be used to extend TypeORM entities. It contains;
  - `id` column using `uuid` type
  - `createdAt` column using `Date` type
  - `updatedAt` column using `Date` type
  - `deletedAt` column using `Date` type
- This is useful for creating entities with common fields.

  ```typescript
  import { CF } from "@vizorous/nest-query-utils";
  import { BaseEntity } from "@vizorous/nest-query-utils";
  import { ObjectType } from "@nestjs/graphql";
  import { Entity } from "typeorm";

  @ObjectType()
  @Entity()
  export class User extends BaseEntity {
  	@CFF()
  	name: string;

  	@CF({ nullable: true })
  	phone?: string;
  }
  ```

## CreateType

- Creates a DTO class for creation with unnecessary fields such as createdAt, updatedAt, etc. omitted. You can omit other fields as well by passing a list of fields to omit to omitKeys.
  ```typescript
  @InputType()
  export class CreateTodo extends CreateType(Todo, [
  	"done",
  	"subTasks",
  	"category",
  ]) {
  	//you can add more custom fields here
  }
  ```

## UpdateType

- Creates a DTO class for update with unnecessary fields omitted AND required fields set. You can omit other fields as well by passing a list of fields to omit to omitKeys.

  ```typescript
  @InputType()
  export class UpdateTodo extends UpdateType(Todo, ["category"], ["done"]) {
  	//you can add more custom fields here
  }
  ```

## @IDExpose()

- Combination of [@IDField](https://tripss.github.io/nestjs-query/docs/graphql/dtos#idfield) and @Expose decorators.

```typescript
import { IDExpose } from "@vizorous/nest-query-utils";
import { ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
@Keyset()
export class User {
	@IDExpose(() => ID, { idOptions: { allowedComparisons: ["eq", "in"] } })
	@PrimaryGeneratedColumn("uuid")
	id: string;
}
```
