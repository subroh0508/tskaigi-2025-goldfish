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

// 尾びれを描画する関数（垂直角度を追加）
const drawTailFin = (
  p: p5,
  x: number,
  y: number,
  size: number,
  direction: number,
  tailAngle: number,
  colors: GoldfishColors,
  verticalAngle: number = 0 // 垂直方向の角度を追加
) => {
  p.push();
  p.translate(x, y);

  // 垂直角度に応じた回転を適用
  p.rotate(verticalAngle * 0.2);

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

  // 尾びれのポイント描画
  p.beginShape();
  p.vertex(pivotX, pivotY);

  // 尾びれの各ポイント
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

  // 各ポイントに変形を適用（垂直方向の変形も追加）
  for (const point of tailPoints) {
    // 接合点からの距離を計算
    const dx = point[0] - pivotX;
    const dy = point[1] - pivotY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 左右方向のベクトルを計算（金魚の向きに垂直な方向）
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

    // 垂直角度による追加の変位（尾びれの先端ほど影響が大きい）
    const verticalOffset = verticalAngle * normalizedDist * distance * 0.1;
    const verticalYOffset = verticalOffset * direction; // 方向に応じて上下の効果を反転

    // 変形後の座標を計算（垂直角度の効果を追加）
    p.vertex(point[0] + xOffset, point[1] + yOffset + verticalYOffset);
  }

  p.endShape(p.CLOSE);
  p.pop();
};

// 胴体を描画する関数（垂直角度を追加）
const drawBody = (
  p: p5,
  x: number,
  y: number,
  size: number,
  direction: number,
  tailAngle: number,
  colors: GoldfishColors,
  verticalAngle: number = 0 // 垂直方向の角度を追加
) => {
  p.push();
  p.translate(x, y);

  // 垂直角度に応じた回転を適用
  p.rotate(verticalAngle * 0.2);

  // 体の動きに合わせて少し揺らす
  const bodyOffsetX = p.sin(tailAngle * 0.5) * 3;
  const bodyOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(bodyOffsetX, bodyOffsetY);

  // 垂直方向の動きに応じてスケーリングを調整
  const verticalScale = 1 - Math.abs(verticalAngle) * 0.1; // 上下に動くと少し縮む
  p.scale((direction * size) / 1000, (size * verticalScale) / 1000);

  // 輪郭線の色を設定
  p.stroke(colors.stroke[0], colors.stroke[1], colors.stroke[2]);
  p.strokeWeight(1);

  // 胴体を単色で塗る
  p.fill(colors.fill[0], colors.fill[1], colors.fill[2]);

  // 胴体のポイント（SVGから抽出）
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

// 右胸びれを描画する関数（垂直角度を追加）
const drawRightFin = (
  p: p5,
  x: number,
  y: number,
  size: number,
  direction: number,
  tailAngle: number,
  colors: GoldfishColors,
  verticalAngle: number = 0 // 垂直方向の角度を追加
) => {
  p.push();
  p.translate(x, y);

  // 垂直角度に応じた回転を適用
  p.rotate(verticalAngle * 0.2);

  // びれの動きを尾の動きと連動
  const finOffsetX = p.sin(tailAngle * 0.5) * 3;
  const finOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(finOffsetX, finOffsetY);

  // 垂直方向の動きに応じて胸びれの角度を変える
  const finRotation = verticalAngle * 0.4; // 上向きでは上に、下向きでは下に
  p.rotate(finRotation);

  p.scale((direction * size) / 1000, size / 1000);

  // 輪郭線の色を設定
  p.stroke(colors.stroke[0], colors.stroke[1], colors.stroke[2]);
  p.strokeWeight(1);

  // ひれの色を設定
  p.fill(colors.fill[0], colors.fill[1], colors.fill[2]);

  // 右胸びれのポイント
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

// 左胸びれを描画する関数（垂直角度を追加）
const drawLeftFin = (
  p: p5,
  x: number,
  y: number,
  size: number,
  direction: number,
  tailAngle: number,
  colors: GoldfishColors,
  verticalAngle: number = 0 // 垂直方向の角度を追加
) => {
  p.push();
  p.translate(x, y);

  // 垂直角度に応じた回転を適用
  p.rotate(verticalAngle * 0.2);

  // びれの動きを尾の動きと連動
  const finOffsetX = p.sin(tailAngle * 0.5) * 3;
  const finOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(finOffsetX, finOffsetY);

  // 垂直方向の動きに応じて胸びれの角度を変える
  const finRotation = -verticalAngle * 0.4; // 左胸びれは右胸びれと逆方向に動く
  p.rotate(finRotation);

  p.scale((direction * size) / 1000, size / 1000);

  // 輪郭線の色を設定
  p.stroke(colors.stroke[0], colors.stroke[1], colors.stroke[2]);
  p.strokeWeight(1);

  // ひれの色を設定
  p.fill(colors.fill[0], colors.fill[1], colors.fill[2]);

  // 左胸びれのポイント
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

// 波紋を表すクラス（変更なし）
class Ripple {
  p: p5;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  color: [number, number, number];

  constructor(p: p5, x: number, y: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.maxRadius = p.random(100, 180);
    this.speed = p.random(1.2, 2.2);
    this.alpha = 128; // 0.5に相当する透明度
    this.color = [59, 130, 246];
  }

  update() {
    this.radius += this.speed;
    this.alpha = this.p.map(this.radius, 0, this.maxRadius, 128, 0);
    return this.radius < this.maxRadius;
  }

  draw() {
    this.p.push();
    this.p.noFill();
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

// 金魚のクラス（上下方向の動きを追加、胸びれの問題を修正）
class Goldfish {
  p: p5;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  direction: number;
  targetDirection: number;
  verticalAngle: number; // 上下の角度
  targetVerticalAngle: number; // 上下の目標角度
  turningSpeed: number;
  verticalTurningSpeed: number; // 上下の回転速度
  speed: number;
  phaseOffset: number;
  isTurning: boolean;
  isVerticalTurning: boolean; // 上下方向の回転フラグ
  tailWaveSpeed: number;
  colorScheme: GoldfishColors;
  safeMargin: number;
  hasStartedMoving: boolean;
  lastTargetX: number;
  lastTargetY: number;
  movementType: string; // 動きのタイプ
  movementTimer: number; // 特殊な動きのタイマー
  verticalMovementProbability: number; // 上下の動きの発生確率
  verticalFlipTimer: number; // 垂直方向の90度回転のタイマー
  isFlipping: boolean; // 90度回転中フラグ
  flipDuration: number; // 回転完了までの時間
  flipDirection: number; // 回転方向（上or下）

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
    this.verticalAngle = 0; // 初期は水平
    this.targetVerticalAngle = 0;

    this.turningSpeed = 0.1;
    this.verticalTurningSpeed = 0.05; // 垂直方向の回転はゆっくり
    this.speed = p.random(0.01, 0.03);
    this.phaseOffset = phaseOffset;
    this.isTurning = false;
    this.isVerticalTurning = false;
    this.tailWaveSpeed = p.random(3, 4.5);
    this.hasStartedMoving = false;
    this.movementType = 'normal';
    this.movementTimer = 0;
    this.verticalMovementProbability = 0.6; // 60%の確率で上下の動きを発生させる

    // 90度回転関連のプロパティ
    this.verticalFlipTimer = 0;
    this.isFlipping = false;
    this.flipDuration = 0;
    this.flipDirection = 0;

    const validColorIndex = colorIndex >= 0 && colorIndex < goldfishColorSchemes.length
      ? colorIndex
      : 0;
    this.colorScheme = goldfishColorSchemes[validColorIndex];

    // 一定間隔で新しい目標地点を設定
    setInterval(() => {
      if (!this.isFlipping) { // 回転中でなければ新しい目標を設定
        this.newTarget();
      }
    }, p.random(3000, 8000));

    // 不定期に特殊な動きを発生させる
    setInterval(() => {
      if (!this.isFlipping) { // 回転中でなければ特殊な動きを開始
        this.selectRandomMovement();
      }
    }, p.random(8000, 15000));

    // 不定期に90度回転を発生させる
    setInterval(() => {
      // 10%の確率で90度回転を開始（低確率にして自然に）
      if (!this.isFlipping && p.random() < 0.1) {
        this.startVerticalFlip();
      }
    }, p.random(10000, 20000)); // 10〜20秒間隔でチェック
  }

  // 90度垂直回転を開始
  startVerticalFlip() {
    // 既に回転中または他の特殊動作中は開始しない
    if (this.isFlipping || this.movementType !== 'normal') {
      return;
    }

    this.isFlipping = true;

    // 上か下か、ランダムに方向を決定
    this.flipDirection = this.p.random() < 0.5 ? 1 : -1; // 1: 上向き、-1: 下向き

    // 目標角度を設定（π/2 = 90度）
    this.targetVerticalAngle = this.flipDirection * (Math.PI / 2);

    // 回転の所要時間を設定（60〜120フレーム = 1〜2秒）
    this.flipDuration = this.p.random(60, 120);
    this.verticalFlipTimer = this.flipDuration;

    // 速度を少し遅くする（回転中）
    this.speed *= 0.5;

    // 回転中は垂直方向の回転速度を速める
    this.verticalTurningSpeed = 0.02;

    // 回転に合わせて新しい目標位置も設定
    const safeWidth = this.p.width - this.safeMargin * 2;
    const safeHeight = this.p.height - this.safeMargin * 2;

    // 回転方向に合わせて移動方向を設定
    if (this.flipDirection > 0) { // 上向き
      this.targetY = this.p.max(this.y - safeHeight * 0.3, this.safeMargin);
    } else { // 下向き
      this.targetY = this.p.min(this.y + safeHeight * 0.3, this.p.height - this.safeMargin);
    }

    // 左右方向はわずかに移動
    this.targetX = this.p.constrain(
      this.x + this.direction * safeWidth * 0.1,
      this.safeMargin,
      this.p.width - this.safeMargin
    );

    this.isVerticalTurning = true;
    this.hasStartedMoving = false;
  }

  // 垂直回転の完了処理
  completeVerticalFlip() {
    this.isFlipping = false;

    // 回転後は元の速度に戻す
    this.speed *= 2;

    // 回転速度を通常に戻す
    this.verticalTurningSpeed = 0.05;

    // 水平に戻る準備をする
    this.targetVerticalAngle = 0;

    // 新しい目標地点を設定
    this.newTarget();
  }

  // ランダムな動きタイプを選択
  selectRandomMovement() {
    // 回転中は新しい動きを開始しない
    if (this.isFlipping) return;

    // 動きのバリエーションを設定（上下の動きの比率を高くする）
    const movements = ['normal', 'up', 'down', 'up', 'down', 'zigzag', 'quick_turn', 'circle', 'vertical_flip'];
    const randomIndex = Math.floor(this.p.random(movements.length));
    const selectedMovement = movements[randomIndex];

    // vertical_flipが選ばれた場合は90度回転を開始
    if (selectedMovement === 'vertical_flip') {
      this.startVerticalFlip();
      return;
    }

    this.movementType = selectedMovement;

    // 特殊な動きの持続時間を設定
    if (this.movementType === 'normal') {
      this.movementTimer = 0;
    } else {
      this.movementTimer = this.p.random(3, 8) * 60; // 3〜8秒間（60フレーム/秒と仮定）

      // 新しい目標を設定して特殊な動きを開始
      this.newSpecialTarget();
    }
  }

  // 特殊な動きに合わせた目標を設定
  newSpecialTarget() {
    const safeWidth = this.p.width - this.safeMargin * 2;
    const safeHeight = this.p.height - this.safeMargin * 2;

    switch (this.movementType) {
      case 'up':
        // 上向きの動き（Y座標を減らす＝上に移動）
        this.targetX = this.p.constrain(
          this.x + this.p.random(-safeWidth * 0.2, safeWidth * 0.2),
          this.safeMargin,
          this.p.width - this.safeMargin
        );
        this.targetY = this.p.max(
          this.y - this.p.random(safeHeight * 0.3, safeHeight * 0.5),
          this.safeMargin
        );
        this.targetVerticalAngle = 0.5; // 上を向く
        // 左右方向も設定
        this.targetDirection = this.targetX < this.x ? -1 : 1;
        break;

      case 'down':
        // 下向きの動き（Y座標を増やす＝下に移動）
        this.targetX = this.p.constrain(
          this.x + this.p.random(-safeWidth * 0.2, safeWidth * 0.2),
          this.safeMargin,
          this.p.width - this.safeMargin
        );
        this.targetY = this.p.min(
          this.y + this.p.random(safeHeight * 0.3, safeHeight * 0.5),
          this.p.height - this.safeMargin
        );
        this.targetVerticalAngle = -0.5; // 下を向く
        // 左右方向も設定
        this.targetDirection = this.targetX < this.x ? -1 : 1;
        break;

      case 'zigzag':
        // 左右にジグザグする動き（上下にもランダムな変化を追加）
        this.targetDirection = -this.direction;
        this.targetX = this.p.constrain(
          this.x + (this.targetDirection * safeWidth * 0.4),
          this.safeMargin,
          this.p.width - this.safeMargin
        );
        // 上下方向にもランダムな移動
        const verticalOffset = this.p.random(-safeHeight * 0.2, safeHeight * 0.2);
        this.targetY = this.p.constrain(
          this.y + verticalOffset,
          this.safeMargin,
          this.p.height - this.safeMargin
        );
        // 上下移動の方向に応じて角度を設定
        this.targetVerticalAngle = verticalOffset < 0 ? 0.3 : (verticalOffset > 0 ? -0.3 : 0);
        break;

      case 'quick_turn':
        // 素早い方向転換（その場で方向転換する）
        this.targetDirection = -this.direction;
        this.turningSpeed = 0.2; // 通常より速く回転
        this.targetX = this.x + (this.targetDirection * 20); // わずかに前進
        this.targetY = this.y;
        // ランダムに上下の角度も変える
        this.targetVerticalAngle = this.p.random(-0.3, 0.3);
        break;

      case 'circle':
        // 円を描くような動き（上下方向も含む3D的な円運動）
        const circleRadius = Math.min(safeWidth, safeHeight) * 0.2;
        const angle = this.p.random(this.p.TWO_PI);

        // X,Yともに円運動を適用
        this.targetX = this.p.constrain(
          this.x + circleRadius * Math.cos(angle),
          this.safeMargin,
          this.p.width - this.safeMargin
        );
        this.targetY = this.p.constrain(
          this.y + circleRadius * Math.sin(angle),
          this.safeMargin,
          this.p.height - this.safeMargin
        );

        // 円を描く方向に応じて方向を決定
        this.targetDirection = Math.cos(angle) > 0 ? 1 : -1;
        // 上下方向の角度は移動方向に基づいて設定
        this.targetVerticalAngle = Math.sin(angle) * 0.5;
        break;

      default:
        // 通常の動き
        this.newTarget();
        break;
    }

    // 移動開始フラグをリセット
    this.hasStartedMoving = false;

    // 通常の速度に戻す（quick_turnは除く）
    if (this.movementType !== 'quick_turn') {
      this.turningSpeed = 0.1;
    }

    // 方向転換フラグを設定
    this.isTurning = this.direction !== this.targetDirection;
    this.isVerticalTurning = Math.abs(this.verticalAngle - this.targetVerticalAngle) > 0.1;
  }

  // 新しい目標位置を設定（通常の動き用、上下移動を強化）
  newTarget() {
    // 回転中は新しい目標を設定しない
    if (this.isFlipping) return;

    // 通常の動作に戻す
    this.movementType = 'normal';
    this.movementTimer = 0;
    this.turningSpeed = 0.1;

    // 前回の目標地点を記録
    this.lastTargetX = this.targetX;
    this.lastTargetY = this.targetY;

    // 新しい目標のX座標を設定
    this.targetX = this.p.random(this.safeMargin, this.p.width - this.safeMargin);

    // 一定確率で上下方向への移動も行う
    if (this.p.random() < this.verticalMovementProbability) {
      // 現在位置から上下どちらかにランダムに移動
      const verticalDirection = this.p.random() < 0.5 ? -1 : 1; // 上か下かランダム
      const verticalDistance = this.p.random(this.p.height * 0.2, this.p.height * 0.4);

      // 新しいY座標を設定（画面内に収まるよう制約）
      this.targetY = this.p.constrain(
        this.y + (verticalDirection * verticalDistance),
        this.safeMargin,
        this.p.height - this.safeMargin
      );

      // 上下の角度を移動方向に応じて設定
      this.targetVerticalAngle = (verticalDirection > 0) ? -0.4 : 0.4; // 下に行くときは下向き、上に行くときは上向き
    } else {
      // 左右方向のみ移動の場合は、Y座標をわずかにばらつかせる
      this.targetY = this.p.constrain(
        this.y + this.p.random(-this.p.height * 0.1, this.p.height * 0.1),
        this.safeMargin,
        this.p.height - this.safeMargin
      );

      // 水平に近い角度
      this.targetVerticalAngle = this.p.random(-0.2, 0.2);
    }

    // 目標地点に応じて左右の向きを設定
    if (this.targetX < this.x) {
      this.targetDirection = -1;
    } else {
      this.targetDirection = 1;
    }

    // 方向転換フラグを設定
    this.isTurning = this.targetDirection !== this.direction;
    this.isVerticalTurning = Math.abs(this.verticalAngle - this.targetVerticalAngle) > 0.1;

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

  // 位置の更新（上下の動きと特殊な動きを追加）
  update(time: number, ripples: Ripple[]) {
    // 90度回転の処理
    if (this.isFlipping) {
      this.verticalFlipTimer--;

      // 角度の更新（90度回転中は通常より速い回転速度）
      const targetAngle = this.flipDirection * (Math.PI / 2);
      this.verticalAngle = this.p.lerp(
        this.verticalAngle,
        targetAngle,
        0.02
      );

      // 回転が完了に近づいたら
      if (Math.abs(this.verticalAngle - targetAngle) < 0.1) {
        // 回転タイマーが終了したら、回転を完了
        if (this.verticalFlipTimer <= 0) {
          this.completeVerticalFlip();
        }
      }

      // 回転中も位置の更新は続ける（ただし通常より遅く）
      let nextX = this.p.lerp(this.x, this.targetX, this.speed * 0.5);
      let nextY = this.p.lerp(this.y, this.targetY, this.speed * 0.5);

      // 境界チェック
      nextX = this.p.constrain(nextX, this.safeMargin, this.p.width - this.safeMargin);
      nextY = this.p.constrain(nextY, this.safeMargin, this.p.height - this.safeMargin);

      this.x = nextX;
      this.y = nextY;

      return; // 回転中は他の動きの更新をスキップ
    }

    // 特殊な動きのタイマーを減らす
    if (this.movementTimer > 0) {
      this.movementTimer--;

      // タイマーが切れたら次の通常の動きへ
      if (this.movementTimer <= 0) {
        this.newTarget();
      }
      // zigzagの場合は途中で方向転換
      else if (this.movementType === 'zigzag' && this.movementTimer % 60 === 0) {
        this.targetDirection = -this.targetDirection;

        // X方向の移動
        this.targetX = this.p.constrain(
          this.x + (this.targetDirection * this.p.width * 0.3),
          this.safeMargin,
          this.p.width - this.safeMargin
        );

        // Y方向もランダムに変化させる
        const verticalOffset = this.p.random(-this.p.height * 0.15, this.p.height * 0.15);
        this.targetY = this.p.constrain(
          this.y + verticalOffset,
          this.safeMargin,
          this.p.height - this.safeMargin
        );

        // 上下の角度も変更
        this.targetVerticalAngle = verticalOffset < 0 ? 0.3 : (verticalOffset > 0 ? -0.3 : 0);

        this.isTurning = true;
        this.isVerticalTurning = true;
        this.hasStartedMoving = false;
      }
      // circleの場合は連続的に目標を更新
      else if (this.movementType === 'circle' && this.movementTimer % 30 === 0) {
        const safeWidth = this.p.width - this.safeMargin * 2;
        const safeHeight = this.p.height - this.safeMargin * 2;
        const circleRadius = Math.min(safeWidth, safeHeight) * 0.2;

        // 現在地からの角度を計算
        const currentAngle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        // 次の角度を計算（時計回りまたは反時計回り）
        const nextAngle = currentAngle + (this.direction > 0 ? 0.5 : -0.5);

        // 円周上の次の点を目標に設定（X,Y両方に適用）
        this.targetX = this.p.constrain(
          this.x + circleRadius * Math.cos(nextAngle),
          this.safeMargin,
          this.p.width - this.safeMargin
        );
        this.targetY = this.p.constrain(
          this.y + circleRadius * Math.sin(nextAngle),
          this.safeMargin,
          this.p.height - this.safeMargin
        );

        // 円を描く方向に応じて方向を決定
        this.targetDirection = Math.cos(nextAngle) > 0 ? 1 : -1;
        // 上下方向の角度も連動させる
        this.targetVerticalAngle = Math.sin(nextAngle) * 0.5;

        this.isTurning = this.direction !== this.targetDirection;
        this.isVerticalTurning = Math.abs(this.verticalAngle - this.targetVerticalAngle) > 0.1;
      }
    }

    // 左右の向きの更新
    if (this.direction !== this.targetDirection) {
      this.direction = this.p.lerp(this.direction, this.targetDirection, this.turningSpeed);

      if (Math.abs(this.direction - this.targetDirection) < 0.05) {
        this.direction = this.targetDirection;
        this.isTurning = false;
      }
    }

    // 上下の角度の更新
    if (this.verticalAngle !== this.targetVerticalAngle) {
      this.verticalAngle = this.p.lerp(
        this.verticalAngle,
        this.targetVerticalAngle,
        this.verticalTurningSpeed
      );

      if (Math.abs(this.verticalAngle - this.targetVerticalAngle) < 0.05) {
        this.verticalAngle = this.targetVerticalAngle;
        this.isVerticalTurning = false;
      }
    }

    // 移動速度（特殊な動きでは通常より速く）
    let currentSpeed = this.isTurning ? this.speed * 0.7 : this.speed;

    // 特殊な動きでは速度を調整
    if (this.movementType === 'quick_turn') {
      currentSpeed *= 1.5;
    } else if (this.movementType === 'zigzag') {
      currentSpeed *= 1.3;
    } else if (this.movementType === 'circle') {
      currentSpeed *= 1.2;
    } else if (this.movementType === 'up' || this.movementType === 'down') {
      currentSpeed *= 1.2; // 上下の動きも少し速く
    }

    // 次の位置を計算（X,Y両方）
    let nextX = this.p.lerp(this.x, this.targetX, currentSpeed);
    let nextY = this.p.lerp(this.y, this.targetY, currentSpeed);

    // 境界判定（画面外に出ないよう制約）
    if (nextX < this.safeMargin) {
      nextX = this.safeMargin;
      this.targetX = this.p.random(this.p.width * 0.4, this.p.width * 0.8);
      this.targetDirection = 1;
      this.isTurning = true;
      this.hasStartedMoving = false;
    } else if (nextX > this.p.width - this.safeMargin) {
      nextX = this.p.width - this.safeMargin;
      this.targetX = this.p.random(this.p.width * 0.2, this.p.width * 0.6);
      this.targetDirection = -1;
      this.isTurning = true;
      this.hasStartedMoving = false;
    }

    if (nextY < this.safeMargin) {
      nextY = this.safeMargin;
      this.targetY = this.p.random(this.p.height * 0.4, this.p.height * 0.8);
      this.targetVerticalAngle = -0.4; // 下向きに変更
      this.isVerticalTurning = true;
      this.hasStartedMoving = false;
    } else if (nextY > this.p.height - this.safeMargin) {
      nextY = this.p.height - this.safeMargin;
      this.targetY = this.p.random(this.p.height * 0.2, this.p.height * 0.6);
      this.targetVerticalAngle = 0.4; // 上向きに変更
      this.isVerticalTurning = true;
      this.hasStartedMoving = false;
    }

    // 更新された位置を適用
    this.x = nextX;
    this.y = nextY;

    // 波紋を生成（移動開始時のみ）
    this.createRipple(ripples);
  }

  // 描画処理（上下方向の角度と90度回転を考慮）
  draw(time: number) {
    // 尾びれの動きを計算
    let tailAngle = this.p.sin(time * this.tailWaveSpeed + this.phaseOffset) * 0.7;

    // 方向転換中は尾びれの動きを強調
    if (this.isTurning) {
      const turningProgress = Math.abs(this.direction - this.targetDirection);
      const turnEffect = (this.targetDirection - this.direction) * 0.8;
      tailAngle += turnEffect * Math.sin(time * 8) * turningProgress;
    }

    // 上下の動きでも尾びれを強調
    if (this.isVerticalTurning || this.isFlipping) {
      // 90度回転中は特に強い尾びれの動き
      if (this.isFlipping) {
        tailAngle += this.flipDirection * Math.sin(time * 10) * 0.8;
      } else {
        const verticalTurningProgress = Math.abs(this.verticalAngle - this.targetVerticalAngle);
        tailAngle += this.verticalAngle * Math.sin(time * 6) * verticalTurningProgress * 0.5;
      }
    }

    // 速度に応じて尾びれの動きを調整
    const speedFactor = this.p.map(
      this.p.dist(this.x, this.y, this.targetX, this.targetY),
      0, this.p.width * 0.3,
      1, 1.8
    );

    tailAngle *= Math.min(speedFactor, 1.8);

    // 全体を一つのpush/popで囲む（胸びれが離れないようにするため）
    this.p.push();
    this.p.translate(this.x, this.y);

    // まず左右の向きを適用
    this.p.scale(this.direction, 1);

    // 次に上下の角度を適用（90度回転も含めて）
    this.p.rotate(this.verticalAngle);

    // ここで全ての部品を描画
    drawTailFin(this.p, 0, 0, this.size, 1, tailAngle, this.colorScheme);
    drawBody(this.p, 0, 0, this.size, 1, tailAngle, this.colorScheme);

    // 90度回転中は胸びれの動きを強調
    if (this.isFlipping) {
      // 回転方向に応じて胸びれの動きを強調
      const finWaveMultiplier = Math.sin(time * 8) * 0.3;

      // 左右の胸びれを個別に回転させて動きを強調
      this.p.push();
      this.p.rotate(this.flipDirection * finWaveMultiplier);
      drawRightFin(this.p, 0, 0, this.size, 1, tailAngle, this.colorScheme);
      this.p.pop();

      this.p.push();
      this.p.rotate(-this.flipDirection * finWaveMultiplier);
      drawLeftFin(this.p, 0, 0, this.size, 1, tailAngle, this.colorScheme);
      this.p.pop();
    } else {
      // 通常時は通常通り描画
      drawRightFin(this.p, 0, 0, this.size, 1, tailAngle, this.colorScheme);
      drawLeftFin(this.p, 0, 0, this.size, 1, tailAngle, this.colorScheme);
    }

    this.p.pop();
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

    // 波紋を描画
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].draw();

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
