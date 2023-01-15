import {createPod, ensureAssets} from "../src/pod-factory";

describe("When ensuring assets", () => {
    it('Should throw an exception if no asset manifest file is found', () => {
        expect(() => ensureAssets(""))
            .toThrow(/No asset-manifest.json found/);
    });

    it("Should return a object if a asset manifest is  found", () => {
        const assets = ensureAssets(__dirname + "/asset-manifest.json")
        expect(assets)
            .toBeDefined()
        expect(assets)
            .toEqual(expect.objectContaining({"entrypoints": expect.any(Array), "files": expect.any(Object)}))

    });
});

describe("When creating a podlet", () => {
    const podlet = createPod("test", __dirname + "/asset-manifest.json");
    it("Should return a object", () => {
        expect(podlet).toBeDefined();
    });
    it("Should return a podlet object with name and data from asset-mainfest.json", () => {
        expect(podlet).toEqual(expect.objectContaining(
                {
                    "name": "test",
                    "cssRoute": expect.any(Array),
                    "jsRoute": expect.any(Array)
                }
            )
        )

    })
});
