import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'tosa-furniture',
  title: 'Tosa Furniture',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nội dung')
          .items([
            S.listItem()
              .title('Cài đặt')
              .id('settings')
              .child(
                S.document().schemaType('settings').documentId('settings')
              ),
            S.divider(),
            S.documentTypeListItem('service').title('Dịch vụ'),
            S.documentTypeListItem('project').title('Dự án'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
