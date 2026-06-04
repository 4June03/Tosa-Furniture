import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'tosa-home',
  title: 'Tosa Home',
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
              .title('Trang chủ')
              .id('homePage')
              .child(
                S.document().schemaType('homePage').documentId('homePage')
              ),
            S.listItem()
              .title('Giới thiệu')
              .id('aboutPage')
              .child(
                S.document().schemaType('aboutPage').documentId('aboutPage')
              ),
            S.divider(),
            S.documentTypeListItem('service').title('Dịch vụ'),
            S.documentTypeListItem('project').title('Dự án'),
            S.documentTypeListItem('post').title('Tin tức'),
            S.divider(),
            S.listItem()
              .title('Cài đặt website')
              .id('settings')
              .child(
                S.document().schemaType('settings').documentId('settings')
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
