/**
 * WORLDのapiを提供します。
 *
 */
import loadWorldJS, { MainModule } from "./WorldJS/WorldJS.js";
const DOUBLE_SIZE: number = 8;

export default class World {
  /**wasmモジュール */
  private world: MainModule | null = null;

  constructor() {
  }

  /**
   * wasmモジュールを読み込む
   */
  async Initialize() {
    this.world = await loadWorldJS();
  }

  /**
   * 波形データを渡して基本周波数f0を分析する。
   * @param sample wavデータ。予め絶対値1を最大とするdoubleに変換しておく
   * @param sample_rate default:44100 サンプリング周波数
   * @param frame_period default:5.0 f0の間隔(ms)
   * @returns f0値の解析結果と時間軸。wasmモジュールが読み込めていない場合やsample.lengthが0の場合nullを返す。
   */
  Harvest(
    sample: Float64Array,
    sample_rate: number = 44100,
    frame_period: number = 5.0
  ): HarvestReturn | null {
    if (!this.world) {
      return null;
    }
    if (sample.length === 0) {
      return null;
    }
    /** 波形データのポインタ */
    const pointer = this.world._malloc(DOUBLE_SIZE * sample.length);
    this.world.HEAPF64.set(sample, pointer / DOUBLE_SIZE);
    /** Harvestの結果 */
    const result = this.world.WorldJS.Harvest(
      pointer,
      sample.length,
      sample_rate,
      frame_period
    ) as HarvestReturn;
    // 戻り値をjavascriptのメモリ空間にdeepcopy。やらないとwasm側のタイミングで値が消えることがある
    result.f0=Float64Array.from(Array.from(result.f0))
    result.time_axis=Float64Array.from(Array.from(result.time_axis))
    this.world._free(pointer);
    return result;
  }

  /**
   * 波形とf0列と時間軸を与えて、時間軸に沿ったスペクトル包絡を求める。
   * @param sample wavデータ。予め絶対値1を最大とするdoubleに変換しておく
   * @param f0 基本周波数列
   * @param time_axis 基本周波数列の時間軸。frame_period毎に均等の値(s)
   * @param sample_rate default:44100 サンプリング周波数
   * @returns fft_sizeとスペクトル包絡列。スペクトル包絡は2次元配列で、1次元目の長さはf0.lengthに等しく、2次元目の長さはfft_size/2+1
   */
  CheapTrick(
    sample: Float64Array,
    f0: Float64Array,
    time_axis: Float64Array,
    sample_rate: number = 44100
  ): CheapTrickReturn | null {
    if (!this.world) {
      return null;
    }
    if (sample.length === 0) {
      return null;
    }
    if (f0.length === 0) {
      return null;
    }
    if (f0.length !== time_axis.length) {
      return null;
    }
    /**波形データのポインタ */
    const sample_ptr = this.world._malloc(DOUBLE_SIZE * sample.length);
    this.world.HEAPF64.set(sample, sample_ptr / DOUBLE_SIZE);
    /**基本周波数列のポインタ */
    const f0_ptr = this.world._malloc(DOUBLE_SIZE * f0.length);
    this.world.HEAPF64.set(f0, f0_ptr / DOUBLE_SIZE);
    /**時間軸のポインタ */
    const time_axis_ptr = this.world._malloc(DOUBLE_SIZE * time_axis.length);
    this.world.HEAPF64.set(time_axis, time_axis_ptr / DOUBLE_SIZE);
    /**CheapTrickの結果 */
    const result = this.world.WorldJS.CheapTrick(
      sample_ptr,
      sample.length,
      f0_ptr,
      f0.length,
      time_axis_ptr,
      sample_rate
    ) as CheapTrickReturn;
    // 戻り値をjavascriptのメモリ空間にdeepcopy。やらないとwasm側のタイミングで値が消えることがある
    for(let i=0;i<result.spectral.length;i++){
        result.spectral[i] = Float64Array.from(Array.from(result.spectral[i]))
    }
    this.world._free(sample_ptr);
    this.world._free(f0_ptr);
    this.world._free(time_axis_ptr);
    return result;
  }

  /**
   * 波形と時間軸を与えて非周期性指標列を取得する
   * @param sample wavデータ。予め絶対値1を最大とするdoubleに変換しておく
   * @param f0 基本周波数列
   * @param time_axis 基本周波数列の時間軸。frame_period毎に均等の値(s)
   * @param fft_size default:2048、2のべき乗の数
   * @param sample_rate default:44100 サンプリング周波数
   * @param threshold 無声・有声を判断する閾値。0だとすべて有声、1だとすべてを無声と判定
   * @returns 非周期性指標列
   */
  D4C(
    sample: Float64Array,
    f0: Float64Array,
    time_axis: Float64Array,
    fft_size: number = 2048,
    sample_rate: number = 44100,
    threshold:number=0.85
  ): Array<Float64Array> | null {
    if (!this.world) {
      return null;
    }
    if (sample.length === 0) {
      return null;
    }
    if (f0.length === 0) {
      return null;
    }
    if (f0.length !== time_axis.length) {
      return null;
    }
    /**波形データのポインタ */
    const sample_ptr = this.world._malloc(DOUBLE_SIZE * sample.length);
    this.world.HEAPF64.set(sample, sample_ptr / DOUBLE_SIZE);
    /**基本周波数列のポインタ */
    const f0_ptr = this.world._malloc(DOUBLE_SIZE * f0.length);
    this.world.HEAPF64.set(f0, f0_ptr / DOUBLE_SIZE);
    /**時間軸のポインタ */
    const time_axis_ptr = this.world._malloc(DOUBLE_SIZE * time_axis.length);
    this.world.HEAPF64.set(time_axis, time_axis_ptr / DOUBLE_SIZE);
    /**D4Cの結果 */
    const result = this.world.WorldJS.D4C(
      sample_ptr,
      sample.length,
      f0_ptr,
      f0.length,
      time_axis_ptr,
      fft_size,
      sample_rate,
      threshold
    ) as D4CResult;
    // 戻り値をjavascriptのメモリ空間にdeepcopy。やらないとwasm側のタイミングで値が消えることがある
    for(let i=0;i<result.aperiodicity.length;i++){
        result.aperiodicity[i] = Float64Array.from(Array.from(result.aperiodicity[i]))
    }
    this.world._free(sample_ptr);
    this.world._free(f0_ptr);
    this.world._free(time_axis_ptr);
    return result.aperiodicity;
  }

  /**
   * 基本周波数、スペクトル包絡、非周期性指標を与えて波形データを返す。
   * @param f0 基本周波数列
   * @param sp スペクトル包絡、1次元目の長さはf0と同じ、2時限目の長さはfft_size/2+1と同じである必要がある。
   * @param ap 非周期性指標、1次元目の長さはf0と同じ、2時限目の長さはfft_size/2+1と同じである必要がある。
   * @param fft_size default:2048、2のべき乗の数
   * @param sample_rate default:44100 サンプリング周波数
   * @param frame_period default:5.0 f0の間隔(ms)
   * @returns 浮動小数点で与えられるwav波形データ
   */
  Synthesis(
    f0: Float64Array,
    sp: Array<Float64Array>,
    ap: Array<Float64Array>,
    fft_size: number = 2048,
    sample_rate: number = 44100,
    frame_period: number = 5.0
  ): Float64Array | null {
    if (!this.world) {
      return null;
    }
    if (f0.length === 0 || f0.length !== sp.length || f0.length !== ap.length) {
      return null;
    }
    if (sp[0].length !== fft_size / 2 + 1 || sp[0].length !== ap[0].length) {
      return null;
    }
    const f0_ptr = this.world._malloc(DOUBLE_SIZE * f0.length);
    this.world.HEAPF64.set(f0, f0_ptr / DOUBLE_SIZE);
    const shape=sp.length * sp[0].length
    const sp_ptr = this.world._malloc(DOUBLE_SIZE * shape);
    const ap_ptr = this.world._malloc(DOUBLE_SIZE * shape);
    this.Set2dHeapF64(sp_ptr, sp);
    this.Set2dHeapF64(ap_ptr, ap);
    const result = this.world.WorldJS.Synthesis(f0_ptr,f0.length,sp_ptr,ap_ptr,fft_size,sample_rate,frame_period) as Float64Array
    this.world._free(f0_ptr);
    this.world._free(sp_ptr);
    this.world._free(ap_ptr);
    return Float64Array.from(Array.from(result))
  }

  Set2dHeapF64(ptr: number, data: Array<Float64Array>) {
    if (!this.world) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        this.world.HEAPF64[ptr / DOUBLE_SIZE + i * data[0].length + j] =
          data[i][j];
      }
    }
  }
}

export interface HarvestReturn {
  /** 基本周波数列 */
  f0: Float64Array;
  /** 基本周波数列の時間軸。frame_period毎に均等の値(s) */
  time_axis: Float64Array;
}

export interface CheapTrickReturn {
  fft_size: number;
  spectral: Array<Float64Array>;
}

export interface D4CResult {
  aperiodicity: Array<Float64Array>;
}
