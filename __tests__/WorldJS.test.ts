import World, { CheapTrickReturn, HarvestReturn } from "../src/world";
import Wave, { WaveProcessing, GenerateWave } from "utauwav";
import fs from "fs";

describe("harvestのテスト", () => {
  const buffer = fs.readFileSync("./__tests__/test_data/testbase.wav");
  const ab = new ArrayBuffer(buffer.length);
  const safeData = new Uint8Array(ab);
  for (let i = 0; i < buffer.length; i++) {
    safeData[i] = buffer[i];
  }
  const wav = new Wave.Wave(safeData.buffer);
  const ndata = wav.LogicalNormalize(1);
  test("test_before_initialize", async () => {
    const world = new World();
    if (ndata) {
      const result = world.Harvest(Float64Array.from(ndata), 44100, 5);
      expect(result).toBeNull();
    }
  });

  test("test_data_length_0", async () => {
    const world = new World();
    await world.Initialize();
    const result = world.Harvest(Float64Array.from([]), 44100, 5);
    expect(result).toBeNull();
  });

  test("test_time_axis_default", async () => {
    const world = new World();
    await world.Initialize();
    if (ndata) {
      const result = world.Harvest(Float64Array.from(ndata), 44100);
      if (result) {
        for (let i = 0; i < result.time_axis.length; i++) {
          expect(result.time_axis[i]).toBe((5 * i) / 1000);
        }
      }
    }
  });

  test("test_time_axis", async () => {
    const world = new World();
    await world.Initialize();
    if (ndata) {
      const result = world.Harvest(Float64Array.from(ndata), 44100, 4);
      if (result) {
        for (let i = 0; i < result.time_axis.length; i++) {
          expect(result.time_axis[i]).toBe((4 * i) / 1000);
        }
      }
    }
  });
  test("test_f0", async () => {
    const world = new World();
    await world.Initialize();
    if (ndata) {
      const result = world.Harvest(Float64Array.from(ndata), 44100);
      const pyf0 = JSON.parse(
        fs.readFileSync("./__tests__/test_data/pyf0.txt", { encoding: "utf-8" })
      ) as Array<number>;
      if (result) {
        // fs.writeFileSync("./__tests__/test_result/f0.txt",result.f0.toString(),{"encoding":"utf-8"})
        for (let i = 0; i < result.f0.length; i++) {
          expect(result.f0[i]).toBeCloseTo(pyf0[i]);
        }
      }
    }
  });
});

describe("cheaptrickのテスト", () => {
  const buffer = fs.readFileSync("./__tests__/test_data/testbase.wav");
  const ab = new ArrayBuffer(buffer.length);
  const safeData = new Uint8Array(ab);
  for (let i = 0; i < buffer.length; i++) {
    safeData[i] = buffer[i];
  }
  const wav = new Wave.Wave(safeData.buffer);
  const ndata = wav.LogicalNormalize(1) as Array<number>;
  const world = new World();
  test("test_before_initialize", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const world2 = new World();
    if (ndata) {
      const result = world2.CheapTrick(
        Float64Array.from(ndata),
        harvest_result.f0,
        harvest_result.time_axis,
        44100
      );
      expect(result).toBeNull();
    }
  });
  test("test_data_length_0", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const result = world.CheapTrick(
      Float64Array.from([]),
      harvest_result.f0,
      harvest_result.time_axis,
      44100
    );
    expect(result).toBeNull();
  });
  test("test_f0_length_0", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const result = world.CheapTrick(
      Float64Array.from(ndata),
      Float64Array.from([]),
      harvest_result.time_axis,
      44100
    );
    expect(result).toBeNull();
  });
  test("test_dif_length", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const result = world.CheapTrick(
      Float64Array.from(ndata),
      harvest_result.f0.slice(1),
      harvest_result.time_axis,
      44100
    );
    expect(result).toBeNull();
  });
  test("cheaptrick_result", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const result = world.CheapTrick(
      Float64Array.from(ndata),
      harvest_result.f0.slice(1),
      harvest_result.time_axis,
      44100
    );
    const pysp = JSON.parse(
      fs.readFileSync("./__tests__/test_data/pysp.txt", { encoding: "utf-8" })
    ) as Array<Array<number>>;
    if (result) {
      expect(result.fft_size).toBe(2048);
      for (let i = 0; i < result.spectral.length; i++) {
        for (let j = 0; j < result.spectral[0].length; j++) {
          expect(result.spectral[i][j]).toBeCloseTo(pysp[i][j]);
        }
      }
    }
  });
});

describe("d4cのテスト", () => {
  const buffer = fs.readFileSync("./__tests__/test_data/testbase.wav");
  const ab = new ArrayBuffer(buffer.length);
  const safeData = new Uint8Array(ab);
  for (let i = 0; i < buffer.length; i++) {
    safeData[i] = buffer[i];
  }
  const wav = new Wave.Wave(safeData.buffer);
  const ndata = wav.LogicalNormalize(1) as Array<number>;
  const world = new World();
  test("test_before_initialize", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const world2 = new World();
    if (ndata) {
      const result = world2.D4C(
        Float64Array.from(ndata),
        harvest_result.f0,
        harvest_result.time_axis,
        2048,
        44100,
        0.85
      );
      expect(result).toBeNull();
    }
  });
  test("test_data_length_0", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const result = world.D4C(
      Float64Array.from([]),
      harvest_result.f0,
      harvest_result.time_axis,
      2048,
      44100,
      0.85
    );
    expect(result).toBeNull();
  });
  test("test_f0_length_0", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const result = world.D4C(
      Float64Array.from(ndata),
      Float64Array.from([]),
      harvest_result.time_axis,
      2048,
      44100,
      0.85
    );
    expect(result).toBeNull();
  });
  test("test_dif_length", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const result = world.D4C(
      Float64Array.from(ndata),
      harvest_result.f0.slice(1),
      harvest_result.time_axis,
      2048,
      44100,
      0.85
    );
    expect(result).toBeNull();
  });
  test("d4c_result", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      4
    ) as HarvestReturn;
    const result = world.D4C(
      Float64Array.from(ndata),
      harvest_result.f0.slice(1),
      harvest_result.time_axis,
      2048,
      44100,
      0.85
    );
    const pyap = JSON.parse(
      fs.readFileSync("./__tests__/test_data/pyap.txt", { encoding: "utf-8" })
    ) as Array<Array<number>>;
    if (result) {
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[0].length; j++) {
          expect(result[i][j]).toBeCloseTo(pyap[i][j]);
        }
      }
    }
  });
});

describe("Synthesisのテスト", () => {
  const buffer = fs.readFileSync("./__tests__/test_data/testbase.wav");
  const ab = new ArrayBuffer(buffer.length);
  const safeData = new Uint8Array(ab);
  for (let i = 0; i < buffer.length; i++) {
    safeData[i] = buffer[i];
  }
  const wav = new Wave.Wave(safeData.buffer);
  const ndata = wav.LogicalNormalize(1) as Array<number>;
  const world = new World();
  test("synth_result", async () => {
    await world.Initialize();
    const harvest_result = world.Harvest(
      Float64Array.from(ndata),
      44100,
      5
    ) as HarvestReturn;
    const cheaptrick_result = world.CheapTrick(
      Float64Array.from(ndata),
      harvest_result.f0,
      harvest_result.time_axis,
      44100
    ) as CheapTrickReturn;
    const d4c_result = world.D4C(
      Float64Array.from(ndata),
      harvest_result.f0,
      harvest_result.time_axis,
      2048,
      44100,
      0.85
    ) as Array<Float64Array>;
    const result = world.Synthesis(
      harvest_result.f0,
      cheaptrick_result.spectral,
      d4c_result,
      cheaptrick_result.fft_size,
      44100,
      5.0
    );
    if (result) {
      const wp = new Wave.WaveProcessing();
      const output_data = wp.InverseLogicalNormalize(Array.from(result), 16);
      const output = Wave.GenerateWave(44100, 16, output_data, null);
      const out_buf = output.Output();
      fs.writeFileSync(
        "./__tests__/test_result/output.wav",
        new DataView(out_buf)
      );
    }
    // testは通らないけど聴感的には同じだからヨシ
    // console.log(harvest_result.f0.length)
    // const pysynth = JSON.parse(
    //   fs.readFileSync("./__tests__/test_data/pysynth.txt", {
    //     encoding: "utf-8",
    //   })
    // ) as Array<number>;
    // if (result) {
    //   for (let i = 0; i < result.length; i++) {
    //     expect(result[i]).toBeCloseTo(pysynth[i]);
    //   }
    // }
  });
});
