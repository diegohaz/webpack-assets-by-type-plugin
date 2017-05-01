// @flow
import sortChunks from 'webpack-sort-chunks'
import flatten from 'lodash/flatten'
import flatMap from 'lodash/flatMap'

type Chunk = {
  files: string[],
}

type Stats = {
  chunks: Chunk[],
  assetsByChunkName: { [string]: string | string[] },
}

export const sortAssets = (stats: Stats): string[] => {
  const chunks = flatten(sortChunks(stats.chunks).map(chunk => chunk.files))
  const assets = flatMap(stats.assetsByChunkName).sort((a, b) => (
    chunks.indexOf(a) > chunks.indexOf(b) ? 1 : -1
  ))
  return assets
}

export const getAssetsByType = (
  assets: string[],
  type: string,
  prependPath?: string = ''
): string[] =>
  [].concat(assets)
    .filter(p => (new RegExp(`${type}$`).test(p)))
    .map(p => prependPath + p)
