// @flow
import { join } from 'path'
import { writeFileSync } from 'fs'
import { sortAssets, getAssetsByType } from './utils'

type Options = {
  path: string
}

const defaultPath = join(process.cwd(), 'assets.json')

/**
 * Save assets by type (js, css)
 */
class AssetsByTypePlugin {
  options: Options;

  constructor({ path = defaultPath }: Options = {}) {
    this.options = { path }
  }

  apply(compiler: any) {
    compiler.plugin('done', (stats) => {
      const { output } = compiler.options
      const assets = sortAssets(stats.toJson({ modules: false }))
      const assetsByType = {
        js: getAssetsByType(assets, 'js', output.publicPath),
        css: getAssetsByType(assets, 'css', output.publicPath),
      }

      writeFileSync(this.options.path, JSON.stringify(assetsByType))
    })
  }
}

module.exports = AssetsByTypePlugin
