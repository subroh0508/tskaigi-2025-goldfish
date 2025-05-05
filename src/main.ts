import p5 from 'p5';

// 金魚の色定義インターフェース
interface GoldfishColors {
  stroke: [number, number, number];
  fill: [number, number, number];
  tailGradient: {
    start: [number, number, number];
    stop1: [number, number, number];
    stop2: [number, number, number];
    stop3: [number, number, number];
    end: [number, number, number];
  };
}

// 5色の金魚の色情報 - SVGファイルの正確な色情報
const goldfishColorSchemes: GoldfishColors[] = [
  // 赤い金魚 (red.svg)
  {
    stroke: [237, 81, 81],
    fill: [237, 81, 81],
    tailGradient: {
      start: [237, 81, 81],    // #ED5151
      stop1: [239, 104, 119],  // #EF6877
      stop2: [246, 168, 221],  // #F6A8DD
      stop3: [248, 187, 228],  // #F8BBE4
      end: [255, 255, 255]     // #FFFFFF
    }
  },
  // 緑の金魚 (green.svg)
  {
    stroke: [64, 191, 96],    // #40BF60
    fill: [64, 191, 96],
    tailGradient: {
      start: [64, 191, 96],    // #40BF60
      stop1: [108, 203, 129],  // #6CCB81
      stop2: [167, 224, 178],  // #A7E0B2
      stop3: [197, 235, 204],  // #C5EBCC
      end: [255, 255, 255]     // #FFFFFF
    }
  },
  // 青い金魚 (blue.svg)
  {
    stroke: [64, 111, 191],   // #406FBF
    fill: [64, 111, 191],
    tailGradient: {
      start: [64, 111, 191],   // #406FBF
      stop1: [108, 142, 203],  // #6C8ECB
      stop2: [167, 186, 224],  // #A7BAE0
      stop3: [197, 209, 235],  // #C5D1EB
      end: [255, 255, 255]     // #FFFFFF
    }
  },
  // 黄色の金魚 (yellow.svg)
  {
    stroke: [238, 187, 34],    // #EEBB22
    fill: [238, 187, 34],
    tailGradient: {
      start: [238, 187, 34],    // #EEBB22
      stop1: [241, 199, 77],    // #F1C74D
      stop2: [246, 221, 149],   // #F6DD95
      stop3: [248, 231, 182],   // #F8E7B6
      end: [255, 255, 255]      // #FFFFFF
    }
  },
  // 紫の金魚 (purple.svg)
  {
    stroke: [159, 64, 191],    // #9F40BF
    fill: [159, 64, 191],
    tailGradient: {
      start: [159, 64, 191],    // #9F40BF
      stop1: [180, 108, 203],   // #B46CCB
      stop2: [211, 167, 224],   // #D3A7E0
      stop3: [226, 197, 235],   // #E2C5EB
      end: [255, 255, 255]      // #FFFFFF
    }
  }
];

// 尾びれを描画する関数 - 色を引数で受け取るよう修正
const drawTailFin = (
  p: p5,
  x: number,
  y: number,
  size: number,
  direction: number,
  tailAngle: number,
  colors: GoldfishColors
) => {
  p.push();
  p.translate(x, y);

  // スケーリングを先に適用
  p.scale((direction * size) / 1000, size / 1000);

  // 胴体との接合点を基準に設定
  const pivotX = 890.004; // 胴体との接合点
  const pivotY = 157.419;

  // 輪郭線の色を設定
  p.stroke(colors.stroke[0], colors.stroke[1], colors.stroke[2]);
  p.strokeWeight(1);

  // 尾びれのグラデーション - 接合部から先端に向かって薄くなるように設定
  const tailGradient = p.drawingContext as CanvasRenderingContext2D;

  // グラデーションの方向を接合点から先端方向に設定
  const gradient = tailGradient.createLinearGradient(890, 157, 750, 100);

  // 色の順序: 接合部は濃い色、先端に向かって薄くなる
  gradient.addColorStop(0, p.color(
    colors.tailGradient.start[0],
    colors.tailGradient.start[1],
    colors.tailGradient.start[2],
    255
  ).toString());

  gradient.addColorStop(0.3, p.color(
    colors.tailGradient.stop1[0],
    colors.tailGradient.stop1[1],
    colors.tailGradient.stop1[2],
    255
  ).toString());

  gradient.addColorStop(0.64, p.color(
    colors.tailGradient.stop2[0],
    colors.tailGradient.stop2[1],
    colors.tailGradient.stop2[2],
    255
  ).toString());

  gradient.addColorStop(0.84, p.color(
    colors.tailGradient.stop3[0],
    colors.tailGradient.stop3[1],
    colors.tailGradient.stop3[2],
    255
  ).toString());

  gradient.addColorStop(1, p.color(
    colors.tailGradient.end[0],
    colors.tailGradient.end[1],
    colors.tailGradient.end[2],
    255
  ).toString());
  
  tailGradient.fillStyle = gradient;
  
  // 尾びれのポイント描画（変更なし）
  p.beginShape();
  p.vertex(pivotX, pivotY);
  
  // 尾びれの各ポイント（変更なし）
  const tailPoints = [
    [814.976, 185.631],
    [771.909, 161.867],
    [770.452, 161.233],
    [781.503, 157.209],
    [781.198, 156.457],
    [797.552, 152.503],
    [788.409, 146.179],
    [790.701, 142.914],
    [796.435, 141.095],
    [787.894, 130.726],
    [787.814, 130.629],
    [777.753, 123.826],
    [790.151, 117.351],
    [804.588, 109.812],
    [825.205, 116.468],
    [853.445, 125.119],
    [842.439, 117.101],
    [830.823, 106.324],
    [812.122, 95.282],
    [761.274, 65.258],
    [718.828, 94.522],
    [705.022, 102.241],
    [733.686, 79.71],
    [737.701, 77.332],
    [780.962, 72.119],
    [754.5, 64.541],
    [750.854, 64.962],
    [702.517, 69.802],
    [702.567, 69.741],
    [718.829, 40.534],
    [762.159, 37.332],
    [770.489, 36.716],
    [813.308, 34.634],
    [850.541, 61.166],
    [880.577, 82.57],
    [885.404, 94.639],
    [910.206, 117.274]
  ];
  
  // 各ポイントに変形を適用（変更なし）
  for (const point of tailPoints) {
    // 接合点からの距離を計算
    const dx = point[0] - pivotX;
    const dy = point[1] - pivotY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 左右方向のベクトルを計算（金魚の向きに垂直な方向）
    // direction > 0 なら右向き、< 0 なら左向き
    // 従って左右の振動方向は金魚の向きに対して垂直
    const sideDirectionX = -dy * direction; // 垂直方向ベクトルのX成分
    const sideDirectionY = dx * direction;  // 垂直方向ベクトルのY成分
    
    // 単位ベクトル化
    const sideMagnitude = Math.sqrt(sideDirectionX * sideDirectionX + sideDirectionY * sideDirectionY);
    const unitSideX = sideDirectionX / sideMagnitude;
    const unitSideY = sideDirectionY / sideMagnitude;
    
    // 距離が遠いほど変形が大きくなるようにする
    const maxDistance = 200;
    const normalizedDist = Math.min(distance / maxDistance, 1);
    const influence = normalizedDist * normalizedDist * 1.8; // 二次関数的な影響度、さらに強調
    
    // サイン波による横方向（金魚の体に対して垂直方向）の変位
    const sideOffset = Math.sin(tailAngle) * influence * distance * 0.35;
    
    // 左右方向の変位を計算
    const xOffset = unitSideX * sideOffset;
    const yOffset = unitSideY * sideOffset;
    
    // 変形後の座標を計算
    p.vertex(point[0] + xOffset, point[1] + yOffset);
  }
  
  p.endShape(p.CLOSE);
  p.pop();
};

// 胴体を描画する関数 - 色を引数で受け取るよう修正
const drawBody = (
  p: p5, 
  x: number, 
  y: number, 
  size: number, 
  direction: number, 
  tailAngle: number, 
  colors: GoldfishColors
) => {
  p.push();
  p.translate(x, y);
  
  // 体の動きに合わせて少し揺らす（変更なし）
  const bodyOffsetX = p.sin(tailAngle * 0.5) * 3;
  const bodyOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(bodyOffsetX, bodyOffsetY);
  
  p.scale((direction * size) / 1000, size / 1000);
  
  // 輪郭線の色を設定
  p.stroke(colors.stroke[0], colors.stroke[1], colors.stroke[2]);
  p.strokeWeight(1);
  
  // 胴体を単色で塗る
  p.fill(colors.fill[0], colors.fill[1], colors.fill[2]);
  
  // 胴体のポイント（SVGから抽出）- 変更なし
  p.beginShape();
  p.vertex(910.206, 117.274);
  p.vertex(922.338, 109.492);
  p.vertex(937.938, 107.867);
  p.vertex(951.801, 113.922);
  p.vertex(956.0, 117.0);
  p.vertex(960.5, 120.0);
  p.vertex(965.647, 122.736);
  p.vertex(978.967, 133.189);
  p.vertex(995.079, 149.501);
  p.vertex(1000.04, 154.882);
  p.vertex(1002.57, 153.858);
  p.vertex(1007.24, 156.978);
  p.vertex(1010.82, 162.204);
  p.vertex(1014.37, 167.372);
  p.vertex(1015.6, 172.789);
  p.vertex(1013.83, 174.832);
  p.vertex(1016.77, 182.106);
  p.vertex(1017.1, 189.661);
  p.vertex(1012.83, 197.45);
  p.vertex(1008.64, 205.096);
  p.vertex(1002.43, 209.189);
  p.vertex(994.98, 210.824);
  p.vertex(993.494, 213.003);
  p.vertex(988.712, 214.485);
  p.vertex(983.103, 214.302);
  p.vertex(977.313, 214.114);
  p.vertex(972.518, 212.212);
  p.vertex(971.358, 209.838);
  p.vertex(971.181, 209.798);
  p.vertex(971.003, 209.758);
  p.vertex(970.825, 209.718);
  p.vertex(964.438, 208.267);
  p.vertex(939.159, 203.353);
  p.vertex(922.452, 197.381);
  p.vertex(917.0, 195.0);
  p.vertex(912.0, 192.5);
  p.vertex(908.145, 190.272);
  p.vertex(897.281, 182.4);
  p.vertex(890.873, 170.214);
  p.vertex(890.004, 157.419); // 尾びれとの接合点
  p.endShape(p.CLOSE);
  
  p.pop();
};

// 右胸びれを描画する関数 - 色を引数で受け取るよう修正
const drawRightFin = (
  p: p5, 
  x: number, 
  y: number, 
  size: number, 
  direction: number, 
  tailAngle: number, 
  colors: GoldfishColors
) => {
  p.push();
  p.translate(x, y);
  
  // びれの動きを尾の動きと連動（変更なし）
  const finOffsetX = p.sin(tailAngle * 0.5) * 3;
  const finOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(finOffsetX, finOffsetY);
  
  p.scale((direction * size) / 1000, size / 1000);
  
  // 輪郭線の色を設定
  p.stroke(colors.stroke[0], colors.stroke[1], colors.stroke[2]);
  p.strokeWeight(1);
  
  // ひれの色を設定
  p.fill(colors.fill[0], colors.fill[1], colors.fill[2]);
  
  // 右胸びれのポイント（SVGから抽出）- 形状は変更しない
  p.beginShape();
  p.vertex(951.801, 113.922);
  p.vertex(948.199, 89.774);
  p.vertex(958.245, 83.521);
  p.vertex(967.605, 84.579);
  p.vertex(976.326, 92.47);
  p.vertex(965.647, 122.736);
  p.endShape(p.CLOSE);
  
  p.pop();
};

// 左胸びれを描画する関数 - 色を引数で受け取るよう修正
const drawLeftFin = (
  p: p5, 
  x: number, 
  y: number, 
  size: number, 
  direction: number, 
  tailAngle: number, 
  colors: GoldfishColors
) => {
  p.push();
  p.translate(x, y);
  
  // びれの動きを尾の動きと連動（変更なし）
  const finOffsetX = p.sin(tailAngle * 0.5) * 3;
  const finOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(finOffsetX, finOffsetY);
  
  p.scale((direction * size) / 1000, size / 1000);
  
  // 輪郭線の色を設定
  p.stroke(colors.stroke[0], colors.stroke[1], colors.stroke[2]);
  p.strokeWeight(1);
  
  // ひれの色を設定
  p.fill(colors.fill[0], colors.fill[1], colors.fill[2]);
  
  // 左胸びれのポイント（SVGから抽出）- 形状は変更しない
  p.beginShape();
  p.vertex(922.452, 197.381);
  p.vertex(902.603, 222.784);
  p.vertex(891.259, 219.682);
  p.vertex(885.329, 212.363);
  p.vertex(885.192, 200.531);
  p.vertex(908.145, 190.272);
  p.endShape(p.CLOSE);
  
  p.pop();
};

// 金魚を描画するメイン関数 - 色を引数で受け取るよう修正
const drawGoldfish = (
  p: p5, 
  x: number, 
  y: number, 
  size: number, 
  tailAngle: number, 
  direction: number, 
  colors: GoldfishColors
) => {
  // 描画順序: 尾びれ→胴体→胸びれ
  // 尾びれは最も背面のレイヤー
  drawTailFin(p, x, y, size, direction, tailAngle, colors);
  // 次に胴体
  drawBody(p, x, y, size, direction, tailAngle, colors);
  // 胸びれは最前面に
  drawRightFin(p, x, y, size, direction, tailAngle, colors);
  drawLeftFin(p, x, y, size, direction, tailAngle, colors);
};

// 金魚のクラス - 色情報を追加
class Goldfish {
  p: p5;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  direction: number;
  targetDirection: number;
  turningSpeed: number;
  speed: number;
  phaseOffset: number;
  isTurning: boolean;
  tailWaveSpeed: number;
  colorScheme: GoldfishColors;

  constructor(
    p: p5, 
    x: number, 
    y: number, 
    direction: number, 
    colorIndex: number,
    phaseOffset: number = 0
  ) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    // すべての金魚のサイズを統一（元の赤い金魚の1.5倍）
    this.size = 600; // 元のサイズ400の1.5倍
    this.direction = direction;
    this.targetDirection = direction;
    this.turningSpeed = 0.1;
    this.speed = p.random(0.01, 0.03);
    this.phaseOffset = phaseOffset;
    this.isTurning = false;
    this.tailWaveSpeed = p.random(3, 4.5);
    
    const validColorIndex = colorIndex >= 0 && colorIndex < goldfishColorSchemes.length 
      ? colorIndex 
      : 0;
    this.colorScheme = goldfishColorSchemes[validColorIndex];

    setInterval(() => {
      this.newTarget();
    }, p.random(3000, 8000));
  }

  newTarget() {
    // 画面内の新しいランダムな目標位置を設定
    this.targetX = this.p.random(this.size, this.p.width - this.size);
    this.targetY = this.p.random(this.size, this.p.height - this.size);

    // 目標地点が現在の位置の左側なら向きを左に、右側なら向きを右に
    if (this.targetX < this.x) {
      this.targetDirection = -1;
    } else {
      this.targetDirection = 1;
    }

    // 方向転換が必要な場合は、方向転換中フラグを立てる
    if (this.targetDirection !== this.direction) {
      this.isTurning = true;
    }
  }

  update(time: number) {
    // 方向の更新（滑らかに目標の向きに変化）
    if (this.direction !== this.targetDirection) {
      // 現在の向きから目標の向きへ徐々に変化
      this.direction = this.p.lerp(this.direction, this.targetDirection, this.turningSpeed);

      // 十分に近づいたら完全に目標の向きにする
      if (Math.abs(this.direction - this.targetDirection) < 0.05) {
        this.direction = this.targetDirection;
        this.isTurning = false;
      }
    }

    // 移動速度（方向転換中は少し遅くする）
    const currentSpeed = this.isTurning ? this.speed * 0.7 : this.speed;

    // 目標位置に向かって徐々に移動
    this.x = this.p.lerp(this.x, this.targetX, currentSpeed);
    this.y = this.p.lerp(this.y, this.targetY, currentSpeed);

    // 画面端に達した場合は滑らかに跳ね返る
    if (this.x < this.size * 0.5) {
      this.x = this.size * 0.5;
      if (this.targetDirection < 0) {
        // 目標が画面外の場合、目標を画面内に設定し直す
        this.targetX = this.p.random(this.p.width * 0.2, this.p.width * 0.8);
        this.targetY = this.p.random(this.p.height * 0.2, this.p.height * 0.8);
        this.targetDirection = 1;
        this.isTurning = true;
      }
    } else if (this.x > this.p.width - this.size * 0.5) {
      this.x = this.p.width - this.size * 0.5;
      if (this.targetDirection > 0) {
        // 目標が画面外の場合、目標を画面内に設定し直す
        this.targetX = this.p.random(this.p.width * 0.2, this.p.width * 0.8);
        this.targetY = this.p.random(this.p.height * 0.2, this.p.height * 0.8);
        this.targetDirection = -1;
        this.isTurning = true;
      }
    }

    if (this.y < this.size * 0.5) {
      this.y = this.size * 0.5;
      // Y方向の目標も調整
      this.targetY = this.p.random(this.p.height * 0.2, this.p.height * 0.8);
    } else if (this.y > this.p.height - this.size * 0.5) {
      this.y = this.p.height - this.size * 0.5;
      // Y方向の目標も調整
      this.targetY = this.p.random(this.p.height * 0.2, this.p.height * 0.8);
    }
  }

  draw(time: number) {
    // より滑らかな尾びれの動き
    let tailAngle = this.p.sin(time * this.tailWaveSpeed + this.phaseOffset) * 0.7;

    // 方向転換中は尾びれの動きを強調
    if (this.isTurning) {
      // 方向転換の進行度合い（0～1）
      const turningProgress = Math.abs(this.direction - this.targetDirection);

      // 方向転換中は尾びれをより大きく振る（ターンの方向と逆に）
      const turnEffect = (this.targetDirection - this.direction) * 0.8;

      // 通常の尾びれの動きに方向転換の効果を加える
      tailAngle += turnEffect * Math.sin(time * 8) * turningProgress;
    }

    // 速度に応じて尾びれの動きを調整（速く泳ぐほど大きく振る）
    const speedFactor = this.p.map(
      this.p.dist(this.x, this.y, this.targetX, this.targetY),
      0, this.p.width * 0.3,
      1, 1.8
    );

    tailAngle *= Math.min(speedFactor, 1.8); // 最大値を制限

    // 金魚を描画（色情報を渡す）
    drawGoldfish(this.p, this.x, this.y, this.size, tailAngle, this.direction, this.colorScheme);
  }
}

// p5.jsスケッチ
const sketch = (p: p5) => {
  let goldfishes: Goldfish[] = [];
  let time = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // 5匹の金魚を初期化（同じサイズ、異なる色と位置）
    goldfishes = [
      new Goldfish(p, p.width * 0.5, p.height * 0.5, 1, 0, 0),      // 赤い金魚
      new Goldfish(p, p.width * 0.3, p.height * 0.7, -1, 1, 2),     // 緑の金魚
      new Goldfish(p, p.width * 0.7, p.height * 0.3, 1, 2, 4),      // 青い金魚
      new Goldfish(p, p.width * 0.2, p.height * 0.4, -1, 3, 1),     // 黄色の金魚
      new Goldfish(p, p.width * 0.8, p.height * 0.6, 1, 4, 3)       // 紫の金魚
    ];
  };

  p.draw = () => {
    // 水色の背景（少し透明度を加えて滑らかな動きに）
    p.background(240, 250, 255, 240);

    // 時間を更新
    time += 0.01;

    // 各金魚を更新・描画
    goldfishes.forEach(fish => {
      fish.update(time);
      fish.draw(time);
    });
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

    // ウィンドウリサイズ時に金魚の位置を調整
    goldfishes.forEach(fish => {
      if (fish.x > p.width) fish.x = p.width * 0.8;
      if (fish.y > p.height) fish.y = p.height * 0.8;

      // 新しい目標地点も設定
      fish.newTarget();
    });
  };
};

// p5インスタンスを作成し、#appに追加
new p5(sketch, document.querySelector<HTMLDivElement>('#app')!);