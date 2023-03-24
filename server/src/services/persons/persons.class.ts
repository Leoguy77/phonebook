// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Person, PersonData, PersonPatch, PersonQuery } from './persons.schema'

export type { Person, PersonData, PersonPatch, PersonQuery }

export interface PersonParams extends MongoDBAdapterParams<PersonQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class PersonService<ServiceParams extends Params = PersonParams> extends MongoDBService<
  Person,
  PersonData,
  PersonParams,
  PersonPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('persons'))
  }
}
