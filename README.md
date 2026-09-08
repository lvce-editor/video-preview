# Video Preview

## Contributing

```sh
git clone git@github.com:lvce-editor/video-preview.git &&
cd video-preview &&
npm ci &&
npm test
```

E2E test options live in [`packages/e2e/e2e.config.js`](packages/e2e/e2e.config.js). Run `npm run e2e` to build the extension and run its tests. Extra CLI arguments override the config, for example:

```sh
npm run e2e -- --headless
```
