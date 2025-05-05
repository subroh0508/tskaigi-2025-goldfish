import p5 from 'p5';

// 金魚の色定義インターフェース（変更なし）
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

// 5色の金魚の色情報（変更なし）
const goldfishColorSchemes: GoldfishColors[] = [
  // 赤い金魚 (red.svg)
  {
    stroke: [237, 81, 81],
    fill: [237, 81, 81],
    tailGradient: {
      start: [237, 81, 81],
      stop1: [239, 104, 119],
      stop2: [246, 168, 221],
      stop3: [248, 187, 228],
      end: [255, 255, 255]
    }
  },
  // 緑の金魚 (green.svg)
  {
    stroke: [64, 191, 96],
    fill: [64, 191, 96],
    tailGradient: {
      start: [64, 191, 96],
      stop1: [108, 203, 129],
      stop2: [167, 224, 178],
      stop3: [197, 235, 204],
      end: [255, 255, 255]
    }
  },
  // 青い金魚 (blue.svg)
  {
    stroke: [64, 111, 191],
    fill: [64, 111, 191],
    tailGradient: {
      start: [64, 111, 191],
      stop1: [108, 142, 203],
      stop2: [167, 186, 224],
      stop3: [197, 209, 235],
      end: [255, 255, 255]
    }
  },
  // 黄色の金魚 (yellow.svg)
  {
    stroke: [238, 187, 34],
    fill: [238, 187, 34],
    tailGradient: {
      start: [238, 187, 34],
      stop1: [241, 199, 77],
      stop2: [246, 221, 149],
      stop3: [248, 231, 182],
      end: [255, 255, 255]
    }
  },
  // 紫の金魚 (purple.svg)
  {
    stroke: [159, 64, 191],
    fill: [159, 64, 191],
    tailGradient: {
      start: [159, 64, 191],
      stop1: [180, 108, 203],
      stop2: [211, 167, 224],
      stop3: [226, 197, 235],
      end: [255, 255, 255]
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

// 波紋を表すクラス（色を統一）
class Ripple {
  p: p5;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  // 統一された波紋の色を固定値に
  color: [number, number, number];

  constructor(p: p5, x: number, y: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.maxRadius = p.random(100, 180);
    this.speed = p.random(1.2, 2.2);
    this.alpha = 128; // 0.5に相当する透明度
    // 指定された青色（rgb(59, 130, 246)）を使用
    this.color = [59, 130, 246];
  }

  // 波紋を更新
  update() {
    this.radius += this.speed;

    // 徐々に透明になる（初期値は0.5=128から開始）
    this.alpha = this.p.map(this.radius, 0, this.maxRadius, 128, 0);

    return this.radius < this.maxRadius;
  }

  // 波紋を描画
  draw() {
    this.p.push();
    this.p.noFill();

    // 指定された色と透明度を設定
    this.p.stroke(
      this.color[0],
      this.color[1],
      this.color[2],
      this.alpha
    );

    this.p.strokeWeight(2);
    this.p.circle(this.x, this.y, this.radius * 2);
    this.p.pop();
  }
}

// 金魚のクラス（波紋生成を簡素化）
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
  safeMargin: number;
  // 移動開始フラグを追加
  hasStartedMoving: boolean;
  // 前回の目標地点を記録
  lastTargetX: number;
  lastTargetY: number;

  constructor(
    p: p5,
    x: number,
    y: number,
    direction: number,
    colorIndex: number,
    phaseOffset: number = 0
  ) {
    this.p = p;
    this.size = 600;
    this.safeMargin = this.size * 0.6;

    this.x = p.constrain(x, this.safeMargin, p.width - this.safeMargin);
    this.y = p.constrain(y, this.safeMargin, p.height - this.safeMargin);

    this.targetX = this.x;
    this.targetY = this.y;
    this.lastTargetX = this.x;
    this.lastTargetY = this.y;

    this.direction = direction;
    this.targetDirection = direction;
    this.turningSpeed = 0.1;
    this.speed = p.random(0.01, 0.03);
    this.phaseOffset = phaseOffset;
    this.isTurning = false;
    this.tailWaveSpeed = p.random(3, 4.5);

    // 移動開始フラグを初期化
    this.hasStartedMoving = false;

    const validColorIndex = colorIndex >= 0 && colorIndex < goldfishColorSchemes.length
      ? colorIndex
      : 0;
    this.colorScheme = goldfishColorSchemes[validColorIndex];

    // 一定間隔で新しい目標地点を設定
    setInterval(() => {
      this.newTarget();
    }, p.random(3000, 8000));
  }

  // 新しい目標位置を設定（波紋を生成するフラグをリセット）
  newTarget() {
    // 前回の目標地点を記録
    this.lastTargetX = this.targetX;
    this.lastTargetY = this.targetY;

    // 新しい目標地点を設定
    this.targetX = this.p.random(this.safeMargin, this.p.width - this.safeMargin);
    this.targetY = this.p.random(this.safeMargin, this.p.height - this.safeMargin);

    // 目標地点に応じて向きを設定
    if (this.targetX < this.x) {
      this.targetDirection = -1;
    } else {
      this.targetDirection = 1;
    }

    // 方向転換が必要な場合はフラグを立てる
    if (this.targetDirection !== this.direction) {
      this.isTurning = true;
    }

    // 移動開始フラグをリセット
    this.hasStartedMoving = false;
  }

  // 波紋を生成するメソッド（移動開始時のみ）
  createRipple(ripples: Ripple[]) {
    // 新しい目標位置に向かって移動を開始した最初のフレームでのみ波紋を生成
    if (!this.hasStartedMoving) {
      // 目標地点と現在地点の距離が十分あるときのみ波紋を表示
      const distance = this.p.dist(this.x, this.y, this.targetX, this.targetY);
      if (distance > 50) {
        ripples.push(new Ripple(this.p, this.x, this.y));
        this.hasStartedMoving = true;
      }
    }
  }

  // 位置の更新（波紋生成を簡素化）
  update(time: number, ripples: Ripple[]) {
    // 方向の更新
    if (this.direction !== this.targetDirection) {
      this.direction = this.p.lerp(this.direction, this.targetDirection, this.turningSpeed);

      if (Math.abs(this.direction - this.targetDirection) < 0.05) {
        this.direction = this.targetDirection;
        this.isTurning = false;
      }
    }

    // 移動速度の計算
    const currentSpeed = this.isTurning ? this.speed * 0.7 : this.speed;

    // 現在位置を記録（移動前）
    const oldX = this.x;
    const oldY = this.y;

    // 次の位置を計算
    let nextX = this.p.lerp(this.x, this.targetX, currentSpeed);
    let nextY = this.p.lerp(this.y, this.targetY, currentSpeed);

    // 境界判定
    if (nextX < this.safeMargin) {
      nextX = this.safeMargin;
      this.targetX = this.p.random(this.p.width * 0.4, this.p.width * 0.8);
      this.targetDirection = 1;
      this.isTurning = true;
      this.hasStartedMoving = false; // 新しい移動の開始をマーク
    } else if (nextX > this.p.width - this.safeMargin) {
      nextX = this.p.width - this.safeMargin;
      this.targetX = this.p.random(this.p.width * 0.2, this.p.width * 0.6);
      this.targetDirection = -1;
      this.isTurning = true;
      this.hasStartedMoving = false; // 新しい移動の開始をマーク
    }

    if (nextY < this.safeMargin) {
      nextY = this.safeMargin;
      this.targetY = this.p.random(this.p.height * 0.4, this.p.height * 0.8);
      this.hasStartedMoving = false; // 新しい移動の開始をマーク
    } else if (nextY > this.p.height - this.safeMargin) {
      nextY = this.p.height - this.safeMargin;
      this.targetY = this.p.random(this.p.height * 0.2, this.p.height * 0.6);
      this.hasStartedMoving = false; // 新しい移動の開始をマーク
    }

    // 更新された位置を適用
    this.x = nextX;
    this.y = nextY;

    // 波紋を生成（移動開始時のみ）
    this.createRipple(ripples);
  }

  // 描画処理（変更なし）
  draw(time: number) {
    let tailAngle = this.p.sin(time * this.tailWaveSpeed + this.phaseOffset) * 0.7;

    if (this.isTurning) {
      const turningProgress = Math.abs(this.direction - this.targetDirection);
      const turnEffect = (this.targetDirection - this.direction) * 0.8;
      tailAngle += turnEffect * Math.sin(time * 8) * turningProgress;
    }

    const speedFactor = this.p.map(
      this.p.dist(this.x, this.y, this.targetX, this.targetY),
      0, this.p.width * 0.3,
      1, 1.8
    );

    tailAngle *= Math.min(speedFactor, 1.8);

    drawGoldfish(this.p, this.x, this.y, this.size, tailAngle, this.direction, this.colorScheme);
  }
}

// p5.jsスケッチ
const sketch = (p: p5) => {
  let goldfishes: Goldfish[] = [];
  let ripples: Ripple[] = [];
  let time = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // 画面サイズに基づいて安全に配置
    const safeMargin = 600 * 0.6;

    goldfishes = [
      // 中央
      new Goldfish(p, p.width * 0.5, p.height * 0.5, 1, 0, 0),

      // 左上
      new Goldfish(p,
        p.random(safeMargin, p.width * 0.4),
        p.random(safeMargin, p.height * 0.4),
        -1, 1, 2),

      // 右上
      new Goldfish(p,
        p.random(p.width * 0.6, p.width - safeMargin),
        p.random(safeMargin, p.height * 0.4),
        1, 2, 4),

      // 左下
      new Goldfish(p,
        p.random(safeMargin, p.width * 0.4),
        p.random(p.height * 0.6, p.height - safeMargin),
        -1, 3, 1),

      // 右下
      new Goldfish(p,
        p.random(p.width * 0.6, p.width - safeMargin),
        p.random(p.height * 0.6, p.height - safeMargin),
        1, 4, 3)
    ];
  };

  p.draw = () => {
    // 水色の背景
    p.background(240, 250, 255, 240);

    // 時間を更新
    time += 0.01;

    // 波紋を描画（金魚の下に描画）
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].draw();

      // 波紋が寿命を迎えたら削除
      if (!ripples[i].update()) {
        ripples.splice(i, 1);
      }
    }

    // 各金魚を更新・描画
    goldfishes.forEach(fish => {
      fish.update(time, ripples);
      fish.draw(time);
    });
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

    goldfishes.forEach(fish => {
      fish.x = p.constrain(fish.x, fish.safeMargin, p.width - fish.safeMargin);
      fish.y = p.constrain(fish.y, fish.safeMargin, p.height - fish.safeMargin);

      if (fish.targetX < fish.safeMargin ||
        fish.targetX > p.width - fish.safeMargin ||
        fish.targetY < fish.safeMargin ||
        fish.targetY > p.height - fish.safeMargin) {
        fish.newTarget();
      }
    });
  };
};

// p5インスタンスを作成
new p5(sketch, document.querySelector<HTMLDivElement>('#app')!);
