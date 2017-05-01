import { sortAssets, getAssetsByType } from '../src/utils'

test('sortAssets', () => {
  const stats = {
    chunks: [{
      id: 0,
      parents: [1],
      files: ['main.js'],
    }, {
      id: 1,
      files: ['vendor.js', 'vendor.js.map'],
    }],
    assetsByChunkName: {
      main: 'main.js',
      vendor: ['vendor.js', 'vendor.js.map'],
    },
  }
  expect(sortAssets(stats)).toEqual([
    'vendor.js',
    'vendor.js.map',
    'main.js',
  ])
})

test('getAssetsByType', () => {
  const assets = ['vendor.js', 'vendor.js.map', 'main.js', 'main.css', 'main.css.map']
  expect(getAssetsByType(assets, 'js')).toEqual([
    'vendor.js',
    'main.js',
  ])
  expect(getAssetsByType(assets, 'css')).toEqual([
    'main.css',
  ])
  expect(getAssetsByType(assets, 'js', 'foo/')).toEqual([
    'foo/vendor.js',
    'foo/main.js',
  ])
})
