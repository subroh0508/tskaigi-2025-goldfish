// main.tsの既存コードをベースに修正

import p5 from 'p5';

// SVGパスをポリゴンとして描画する関数
const drawSVGPathAsDetailedPolygon = (p: p5, x: number, y: number, size: number, direction: number, tailAngle: number) => {
  p.push();
  p.translate(x, y);

  // 体の動きに合わせて少し揺らす
  const bodyOffsetX = p.sin(tailAngle * 0.5) * 3;
  const bodyOffsetY = p.cos(tailAngle * 0.3) * 2;
  p.translate(bodyOffsetX, bodyOffsetY);

  p.scale((direction * size) / 1000, size / 1000);

  const baseColor = p.color(255, 45, 45);
  p.fill(baseColor);
  p.noStroke();

  // SVGパスの点を多数のポイントに変換して滑らかなポリゴンを作成
  const points = [
    // 開始点
    [890.004, 157.419],

    // 細かく点を追加してカーブを近似
    [870.0, 165.0], [850.0, 172.0], [830.0, 179.0], [810.0, 182.0],
    [790.0, 176.0], [780.0, 170.0], [775.0, 165.0], [770.452, 161.233],

    [772.0, 160.0], [775.0, 158.0], [780.0, 156.0], [785.0, 154.0],
    [790.0, 153.0], [797.552, 152.503],

    [795.0, 150.0], [792.0, 148.0], [788.409, 146.179],

    [789.0, 144.0], [790.0, 142.0], [793.0, 140.0], [792.0, 136.0],
    [790.0, 133.0], [787.894, 130.726],

    [787.0, 129.0], [784.0, 126.0], [780.0, 123.0], [783.0, 120.0],
    [786.0, 118.0], [790.151, 117.351],

    [800.0, 115.0], [810.0, 114.0], [820.0, 116.0], [830.0, 119.0],
    [840.0, 122.0], [853.445, 125.119],

    [850.0, 123.0], [845.0, 120.0], [840.0, 117.0], [830.0, 110.0],
    [820.0, 102.0], [812.122, 95.282],

    [800.0, 90.0], [780.0, 80.0], [760.0, 75.0], [740.0, 80.0],
    [720.0, 90.0], [705.022, 102.241],

    [710.0, 95.0], [720.0, 88.0], [730.0, 82.0], [740.0, 77.0],
    [760.0, 73.0], [780.962, 72.119],

    [770.0, 70.0], [760.0, 68.0], [740.0, 67.0], [720.0, 68.0],
    [710.0, 69.0], [702.517, 69.802],

    [702.5, 69.7], [705.0, 65.0], [710.0, 58.0], [720.0, 50.0],
    [735.0, 43.0], [750.0, 38.0], [762.159, 37.332],

    [765.0, 37.0], [780.0, 36.0], [800.0, 37.0], [820.0, 45.0],
    [835.0, 53.0], [850.541, 61.166],

    [860.0, 68.0], [870.0, 75.0], [880.0, 85.0], [885.0, 95.0],
    [895.0, 105.0], [910.206, 117.274],

    [915.0, 115.0], [925.0, 112.0], [935.0, 110.0], [945.0, 112.0],
    [951.801, 113.922],

    [950.0, 105.0], [949.0, 95.0], [948.199, 89.774],

    [950.0, 88.0], [955.0, 85.0], [960.0, 84.0], [965.0, 86.0],
    [970.0, 89.0], [976.326, 92.47],

    [975.0, 100.0], [972.0, 110.0], [968.0, 118.0], [965.647, 122.736],

    [970.0, 126.0], [975.0, 130.0], [980.0, 135.0], [985.0, 140.0],
    [990.0, 145.0], [995.0, 150.0], [1000.04, 154.882],

    [1000.5, 154.0], [1002.0, 155.0], [1005.0, 157.0], [1008.0, 160.0],
    [1010.82, 162.204],

    [1012.0, 164.0], [1013.5, 167.0], [1015.0, 170.0], [1014.5, 173.0],
    [1013.83, 174.832],

    [1014.5, 177.0], [1016.0, 180.0], [1016.5, 185.0], [1015.0, 190.0],
    [1013.5, 194.0], [1012.83, 197.45],

    [1012.0, 200.0], [1010.0, 203.0], [1006.0, 206.0], [1002.0, 209.0],
    [998.0, 210.0], [994.98, 210.824],

    [994.0, 211.5], [992.0, 212.5], [990.0, 213.5], [987.0, 214.0],
    [985.0, 214.2], [983.103, 214.302],

    [981.0, 214.2], [979.0, 214.0], [976.0, 213.0], [973.0, 211.0],
    [972.0, 210.0], [971.358, 209.838],

    [971.3, 209.8], [971.2, 209.78], [971.0, 209.76], [970.825, 209.718],

    [969.0, 209.5], [965.0, 209.0], [960.0, 208.0], [950.0, 206.0],
    [940.0, 204.0], [930.0, 200.0], [922.452, 197.381],

    [920.0, 200.0], [915.0, 205.0], [910.0, 210.0], [906.0, 216.0],
    [902.603, 222.784],

    [900.0, 222.0], [896.0, 220.0], [892.0, 217.0], [888.0, 212.0],
    [886.0, 205.0], [885.192, 200.531],

    [890.0, 198.0], [895.0, 195.0], [900.0, 193.0], [905.0, 191.0],
    [908.145, 190.272],

    [905.0, 188.0], [902.0, 185.0], [898.0, 180.0], [895.0, 175.0],
    [892.0, 168.0], [890.0, 160.0], [890.004, 157.419]
  ];

  p.beginShape();
  for (const point of points) {
    p.vertex(point[0], point[1]);
  }
  p.endShape(p.CLOSE);

  p.pop();
};

// 金魚を描画するメイン関数
const drawGoldfish = (p: p5, x: number, y: number, size: number, tailAngle: number, direction: number) => {
  // 本体
  drawSVGPathAsDetailedPolygon(p, x, y, size, direction, tailAngle);
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
  targetDirection: number;  // 目標とする向き
  turningSpeed: number;     // 向きの変化速度
  speed: number;
  phaseOffset: number;
  isTurning: boolean;       // 方向転換中かどうか

  constructor(p: p5, x: number, y: number, size: number, direction: number, phaseOffset: number = 0) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.size = size;
    this.direction = direction;
    this.targetDirection = direction;
    this.turningSpeed = 0.1;  // 向きの変化速度（調整可能）
    this.speed = p.random(0.01, 0.03);
    this.phaseOffset = phaseOffset;
    this.isTurning = false;

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
    let tailAngle = this.p.sin(time * 5 + this.phaseOffset) * 0.2;

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
    p.background(240, 250, 255); // 水色の背景

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
