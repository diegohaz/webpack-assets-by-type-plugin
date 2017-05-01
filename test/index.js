import path from 'path'
import webpack from 'webpack'
import AssetsByTypePlugin from '../src'

// eslint-disable-next-line global-require, import/no-unresolved
const requireAssets = () => require('./webpack/assets.json')

test('AssetsByTypePlugin', (done) => {
  expect.assertions(3)

  const config = {
    entry: '/',
    output: {
      path: path.join(__dirname, './webpack'),
      publicPath: '/',
    },
    plugins: [
      new AssetsByTypePlugin({
        path: path.join(__dirname, './webpack/assets.json'),
      }),
    ],
  }

  webpack(config, (err, stats) => {
    expect(err).toBeFalsy()
    expect(requireAssets).not.toThrow()
    const assets = requireAssets()
    expect(assets).toEqual({
      js: ['/main.js'],
      css: [],
    })
    done()
  })
})
