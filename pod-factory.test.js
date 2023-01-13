const {ensureAssets} = require('./pod-factory');
test('If no asset manifest is found an exception should be thrown', () => {
    expect(() => ensureAssets())
        .toThrow(/No asset-manifest.json found/);
})