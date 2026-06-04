import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './projectType'
import { serviceType } from './serviceType'
import { settingsType } from './settingsType'

export const schemaTypes: SchemaTypeDefinition[] = [
  settingsType,
  serviceType,
  projectType,
]
