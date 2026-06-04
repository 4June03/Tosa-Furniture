import { type SchemaTypeDefinition } from 'sanity'

import { aboutPageType } from './aboutPageType'
import { homePageType } from './homePageType'
import { postType } from './postType'
import { projectType } from './projectType'
import { serviceType } from './serviceType'
import { settingsType } from './settingsType'

export const schemaTypes: SchemaTypeDefinition[] = [
  settingsType,
  homePageType,
  aboutPageType,
  serviceType,
  projectType,
  postType,
]
