# TSWorld
WORLDをjavascriptから使用するためにemscriptenを用いてwasmに変換し、更にTypescriptから使用しやすいようにラッパー化したものです。

# インストール
```
npm install tsworld
```

# 使用方法
完全な使用例はusage_tsworldを参照(https://github.com/delta-kimigatame/usage_tsworld)

```Typescript
import { World } from "tsworld";

/** 別途何らかの方法でwavのbody部分のデータを用意 */
data:Float64Array

const world = new World();
/** wasmの読込 */
await world.Initialize();

/** 基本周波数f0の解析 */
const harvest_result = world.Harvest(data, 44100, 5);

/** スペクトラムの解析 */
const cheaptrick_result = world.CheapTrick(data,harvest_result.f0,harvest_result.time_axis,44100);

/** 非周期性指標の解析 */
const d4c_result = world.D4C(Float64Array.from(ndata),harvest_result.f0,harvest_result.time_axis,2048,44100,0.85)

/** 解析結果を用いた何らかの処理 */

/** wavに戻す処理*/
const result = world.Synthesis(harvest_result.f0,cheaptrick_result.spectral,d4c_result,cheaptrick_result.fft_size,44100,5.0);
```

# ドキュメント
(https://delta-kimigatame.github.io/TSWorld/index.html)

# リンク
本家 World(https://github.com/mmorise/World)

参考元 World.JS(https://github.com/YuzukiTsuru/World.JS)

c++部分のコード WorldJSModule(https://github.com/delta-kimigatame/WorldJSModule)

使用例 (https://github.com/delta-kimigatame/usage_tsworld)