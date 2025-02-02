export default class World {
    /**wasmモジュール */
    private world;
    constructor();
    /**
     * wasmモジュールを読み込む
     */
    Initialize(): Promise<void>;
    /**
     * 波形データを渡して基本周波数f0を分析する。
     * @param sample wavデータ。予め絶対値1を最大とするdoubleに変換しておく
     * @param sample_rate default:44100 サンプリング周波数
     * @param frame_period default:5.0 f0の間隔(ms)
     * @returns f0値の解析結果と時間軸。wasmモジュールが読み込めていない場合やsample.lengthが0の場合nullを返す。
     */
    Harvest(sample: Float64Array, sample_rate?: number, frame_period?: number): HarvestReturn | null;
    /**
     * 波形とf0列と時間軸を与えて、時間軸に沿ったスペクトル包絡を求める。
     * @param sample wavデータ。予め絶対値1を最大とするdoubleに変換しておく
     * @param f0 基本周波数列
     * @param time_axis 基本周波数列の時間軸。frame_period毎に均等の値(s)
     * @param sample_rate default:44100 サンプリング周波数
     * @returns fft_sizeとスペクトル包絡列。スペクトル包絡は2次元配列で、1次元目の長さはf0.lengthに等しく、2次元目の長さはfft_size/2+1
     */
    CheapTrick(sample: Float64Array, f0: Float64Array, time_axis: Float64Array, sample_rate?: number): CheapTrickReturn | null;
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
    D4C(sample: Float64Array, f0: Float64Array, time_axis: Float64Array, fft_size?: number, sample_rate?: number, threshold?: number): Array<Float64Array> | null;
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
    Synthesis(f0: Float64Array, sp: Array<Float64Array>, ap: Array<Float64Array>, fft_size?: number, sample_rate?: number, frame_period?: number): Float64Array | null;
    Set2dHeapF64(ptr: number, data: Array<Float64Array>): void;
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
