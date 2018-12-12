import stemmer from 'memex-stemmer'

import UrlField from './storage/url-field'
import schemaPatcher from './storage/dexie-schema'
import collections from './old-schema'
import initStorex from './storex'
import { StorageManager } from './types'

const indexedDB: IDBFactory = require('fake-indexeddb')
const iDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')

export default () =>
    initStorex<StorageManager>({
        stemmer,
        collections,
        schemaPatcher,
        dbName: 'test',
        customFields: [{ key: 'url', field: UrlField }],
        idbImplementation: {
            factory: indexedDB,
            range: iDBKeyRange,
        },
        modifyInstance(storex: StorageManager) {
            storex.deleteDB = indexedDB.deleteDatabase
            return storex
        },
    })
