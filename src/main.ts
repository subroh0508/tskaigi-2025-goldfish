import p5 from 'p5';

// 胴体部分を描画する関数
const drawBody = (p: p5, x: number, y: number, size: number, direction: number, tailAngle: number) => {
  p.push();
  p.translate(x, y);
  
  // 体の動きに合わせて少し揺らす
  const bodyOffsetX = p.sin(tailAngle * 0.5) * 3;
  const bodyOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(bodyOffsetX, bodyOffsetY);
  
  p.scale((direction * size) / 1000, size / 1000);
  
  // 胴体のグラデーション
  const bodyGradient = p.drawingContext as CanvasRenderingContext2D;
  const gradient = bodyGradient.createLinearGradient(970, 120, 890, 190);
  gradient.addColorStop(0, p.color(237, 81, 81, 255).toString());
  gradient.addColorStop(0.3, p.color(239, 104, 119, 255).toString());
  gradient.addColorStop(0.64, p.color(246, 168, 221, 255).toString());
  gradient.addColorStop(0.84, p.color(248, 187, 228, 255).toString());
  gradient.addColorStop(1, p.color(255, 255, 255, 255).toString());
  
  bodyGradient.fillStyle = gradient;
  
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
  p.vertex(890.004, 157.419);
  p.endShape(p.CLOSE);
  
  p.pop();
};

// 尾びれを描画する関数
const drawTailFin = (p: p5, x: number, y: number, size: number, direction: number, tailAngle: number) => {
  p.push();
  p.translate(x, y);
  
  // 尾びれの動きを表現
  const tailOffsetX = p.sin(tailAngle) * 10;
  p.translate(tailOffsetX, 0);
  
  p.scale((direction * size) / 1000, size / 1000);
  
  // 尾びれのグラデーション
  const tailGradient = p.drawingContext as CanvasRenderingContext2D;
  const gradient = tailGradient.createLinearGradient(800, 100, 900, 150);
  gradient.addColorStop(0, p.color(237, 81, 81, 255).toString());
  gradient.addColorStop(0.3, p.color(239, 104, 119, 255).toString());
  gradient.addColorStop(0.64, p.color(246, 168, 221, 255).toString());
  gradient.addColorStop(0.84, p.color(248, 187, 228, 255).toString());
  gradient.addColorStop(1, p.color(255, 255, 255, 255).toString());
  
  tailGradient.fillStyle = gradient;
  
  // 尾びれのポイント（SVGから抽出）
  p.beginShape();
  p.vertex(890.004, 157.419);
  p.vertex(814.976, 185.631);
  p.vertex(771.909, 161.867);
  p.vertex(770.452, 161.233);
  p.vertex(781.503, 157.209);
  p.vertex(781.198, 156.457);
  p.vertex(797.552, 152.503);
  p.vertex(788.409, 146.179);
  p.vertex(790.701, 142.914);
  p.vertex(796.435, 141.095);
  p.vertex(787.894, 130.726);
  p.vertex(787.814, 130.629);
  p.vertex(777.753, 123.826);
  p.vertex(790.151, 117.351);
  p.vertex(804.588, 109.812);
  p.vertex(825.205, 116.468);
  p.vertex(853.445, 125.119);
  p.vertex(842.439, 117.101);
  p.vertex(830.823, 106.324);
  p.vertex(812.122, 95.282);
  p.vertex(761.274, 65.258);
  p.vertex(718.828, 94.522);
  p.vertex(705.022, 102.241);
  p.vertex(733.686, 79.71);
  p.vertex(737.701, 77.332);
  p.vertex(780.962, 72.119);
  p.vertex(754.5, 64.541);
  p.vertex(750.854, 64.962);
  p.vertex(702.517, 69.802);
  p.vertex(702.567, 69.741);
  p.vertex(718.829, 40.534);
  p.vertex(762.159, 37.332);
  p.vertex(770.489, 36.716);
  p.vertex(813.308, 34.634);
  p.vertex(850.541, 61.166);
  p.vertex(880.577, 82.57);
  p.vertex(885.404, 94.639);
  p.vertex(910.206, 117.274);
  p.endShape(p.CLOSE);
  
  p.pop();
};

// 右胸びれを描画する関数
const drawRightFin = (p: p5, x: number, y: number, size: number, direction: number, tailAngle: number) => {
  p.push();
  p.translate(x, y);
  
  // びれの動きを尾の動きと連動
  const finOffsetX = p.sin(tailAngle * 0.5) * 3;
  const finOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(finOffsetX, finOffsetY);
  
  p.scale((direction * size) / 1000, size / 1000);
  
  // 右胸びれのグラデーション
  const rightFinGradient = p.drawingContext as CanvasRenderingContext2D;
  const gradient = rightFinGradient.createLinearGradient(950, 90, 970, 120);
  gradient.addColorStop(0, p.color(237, 81, 81, 255).toString());
  gradient.addColorStop(0.3, p.color(239, 104, 119, 255).toString());
  gradient.addColorStop(0.64, p.color(246, 168, 221, 255).toString());
  gradient.addColorStop(0.84, p.color(248, 187, 228, 255).toString());
  gradient.addColorStop(1, p.color(255, 255, 255, 255).toString());
  
  rightFinGradient.fillStyle = gradient;
  
  // 右胸びれのポイント（SVGから抽出）
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

// 左胸びれを描画する関数
const drawLeftFin = (p: p5, x: number, y: number, size: number, direction: number, tailAngle: number) => {
  p.push();
  p.translate(x, y);
  
  // びれの動きを尾の動きと連動
  const finOffsetX = p.sin(tailAngle * 0.5) * 3;
  const finOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(finOffsetX, finOffsetY);
  
  p.scale((direction * size) / 1000, size / 1000);
  
  // 左胸びれのグラデーション
  const leftFinGradient = p.drawingContext as CanvasRenderingContext2D;
  const gradient = leftFinGradient.createLinearGradient(900, 190, 890, 220);
  gradient.addColorStop(0, p.color(237, 81, 81, 255).toString());
  gradient.addColorStop(0.3, p.color(239, 104, 119, 255).toString());
  gradient.addColorStop(0.64, p.color(246, 168, 221, 255).toString());
  gradient.addColorStop(0.84, p.color(248, 187, 228, 255).toString());
  gradient.addColorStop(1, p.color(255, 255, 255, 255).toString());
  
  leftFinGradient.fillStyle = gradient;
  
  // 左胸びれのポイント（SVGから抽出）
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

// 金魚を描画するメイン関数
const drawGoldfish = (p: p5, x: number, y: number, size: number, tailAngle: number, direction: number) => {
  // 描画順序: 尾びれ→胴体→胸びれ
  // 尾びれは最も背面のレイヤー
  drawTailFin(p, x, y, size, direction, tailAngle);
  // 次に胴体
  drawBody(p, x, y, size, direction, tailAngle);
  // 胸びれは最前面に
  drawRightFin(p, x, y, size, direction, tailAngle);
  drawLeftFin(p, x, y, size, direction, tailAngle);
};

// 金魚のクラス
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

  constructor(p: p5, x: number, y: number, size: number, direction: number, phaseOffset: number = 0) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.size = size;
    this.direction = direction;
    this.targetDirection = direction;
    this.turningSpeed = 0.1;
    this.speed = p.random(0.01, 0.03);
    this.phaseOffset = phaseOffset;
    this.isTurning = false;
    this.tailWaveSpeed = p.random(4, 6); // 尾びれの揺れの速さをランダムに

    // 時々新しい目標地点を設定
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
    // 基本の尾びれの動き（サインカーブで揺れるように）
    let tailAngle = this.p.sin(time * this.tailWaveSpeed + this.phaseOffset) * 0.2;

    // 方向転換中は尾びれの動きを強調
    if (this.isTurning) {
      // 方向転換の進行度合い（0～1）
      const turningProgress = Math.abs(this.direction - this.targetDirection);

      // 方向転換中は尾びれをより大きく振る（ターンの方向と逆に）
      const turnEffect = (this.targetDirection - this.direction) * 0.3;

      // 通常の尾びれの動きに方向転換の効果を加える
      tailAngle += turnEffect * Math.sin(time * 10) * turningProgress;
    }

    // 金魚を描画
    drawGoldfish(this.p, this.x, this.y, this.size, tailAngle, this.direction);
  }
}

// p5.jsスケッチの設定
const sketch = (p: p5) => {
  let goldfishes: Goldfish[] = [];
  let time = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // 金魚を初期化（大きさや位置を変えた複数の金魚）
    goldfishes = [
      new Goldfish(p, p.width/2, p.height/2, 400, 1, 0),
      new Goldfish(p, p.width*0.3, p.height*0.7, 250, -1, 2),
      new Goldfish(p, p.width*0.7, p.height*0.3, 200, 1, 4)
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