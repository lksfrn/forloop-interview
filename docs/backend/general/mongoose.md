# Mongoose

[Mongoose](https://mongoosejs.com/) is an ODM (Object Data Mapper) for MongoDB.

## MongoDB

[MongoDB](https://www.mongodb.com/) is a no-SQL database. This means that it is not defined anywhere what its structure should look like, unlike SQL RDBMS databases which require prior knowledge of structure (tables). In Mongo the data is stored in BSON (binary JSON). Mongo features include:

-  native conversion to JavaScript representation of object, array and type
-  it allows to loop objects into themselves
-  the query language is JS
-  no migrations
-  no joins (but can store references)
-  ACID transactions
-  for E2E testing the database can be created only in memory (does not need Docker)
-  simpler structure than SQL
-  no validation rules on the database side (everything is solved by the service code)

### SQL vs Mongo

|  SQL   |   Mongo    |
| :----: | :--------: |
| Table  | Collection |
|  Row   |  Document  |
| Column |   Field    |

## Models

A model is the basic building block of a database. Its schema corresponds to a collection and its instances to individual documents. All validation is done in JS and not on the database side. All models have a default `_id` (_attention_ to the underscore).

```ts
import { Schema, model } from "mongoose"

export interface Cat {
   name: string
   weight?: number
   tags?: string[]
   size?: {
      width: number
      height: number
   }
}

export const catModelSchema = new Schema<Cat>({
   name: { type: String, required: true, unique: true },
   weight: { type: Number, default: 0 },
   tags: { type: [String], required: false, default: undefined }, // enable skipping entire field
   size: {
      // size itself is not required, but if it exists, it must have width and height
      type: {
         width: { type: Number, required: true },
         height: { type: Number, required: true },
      },
      required: false,
   },
})

export const CatModel = model<Cat>("Cat", catModelSchema)
```
