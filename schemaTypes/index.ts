import type {SchemaTypeDefinition} from 'sanity'
import {article} from './article'
import {author} from './author'
import {blockContent} from './block-content'
import {product} from './product'

export const schemaTypes: SchemaTypeDefinition[] = [article, product, author, blockContent]
