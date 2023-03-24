// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const personSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Person', additionalProperties: false }
)
export type Person = Static<typeof personSchema>
export const personValidator = getValidator(personSchema, dataValidator)
export const personResolver = resolve<Person, HookContext>({})

export const personExternalResolver = resolve<Person, HookContext>({})

// Schema for creating new entries
export const personDataSchema = Type.Pick(personSchema, ['text'], {
  $id: 'PersonData'
})
export type PersonData = Static<typeof personDataSchema>
export const personDataValidator = getValidator(personDataSchema, dataValidator)
export const personDataResolver = resolve<Person, HookContext>({})

// Schema for updating existing entries
export const personPatchSchema = Type.Partial(personSchema, {
  $id: 'PersonPatch'
})
export type PersonPatch = Static<typeof personPatchSchema>
export const personPatchValidator = getValidator(personPatchSchema, dataValidator)
export const personPatchResolver = resolve<Person, HookContext>({})

// Schema for allowed query properties
export const personQueryProperties = Type.Pick(personSchema, ['_id', 'text'])
export const personQuerySchema = Type.Intersect(
  [
    querySyntax(personQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PersonQuery = Static<typeof personQuerySchema>
export const personQueryValidator = getValidator(personQuerySchema, queryValidator)
export const personQueryResolver = resolve<PersonQuery, HookContext>({})
