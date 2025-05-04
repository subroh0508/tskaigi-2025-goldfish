import './style.css'
import p5 from 'p5'

// p5.jsのスケッチを定義
const sketch = (p: p5) => {
  // 金魚の位置と動きのパラメータ
  let x = 0
  let y = 0
  let angle = 0
  let tailAngle = 0
  let direction = 1 // 金魚の向き（1: 右向き, -1: 左向き）
  let speedFactor = 0.0001 // 速度係数

  // 初期設定
  p.setup = () => {
    // キャンバスを作成
    p.createCanvas(800, 600)
    // 背景色を設定（水色）
    p.background(210, 240, 255)

    // 初期位置を中央に設定
    x = p.width / 2
    y = p.height / 2
  }

  // SVGパスをポリゴンとして描画する関数
const drawSVGPathAsPolygon = (x: number, y: number, size: number, direction: number) => {
  p.push();
  p.translate(x, y);
  p.scale((direction * size) / 1000, size / 1000); // SVGパスを適切なサイズに調整
  
  // 金魚の色
  const baseColor = p.color(255, 45, 45); // 鮮やかな赤色
  
  p.fill(baseColor);
  p.noStroke();
  
  // SVGパスの主要な点をポリゴンとして描画
  p.beginShape();
  
  // パスのポイントを追加（元のパスのキーポイント）
  p.vertex(890.004, 157.419); // 開始点 M
  
  // Cコマンドの主要なポイント
  p.vertex(814.976, 185.631);
  p.vertex(771.909, 161.867);
  p.vertex(770.452, 161.233);
  
  p.vertex(781.503, 157.209);
  p.vertex(781.198, 156.457);
  p.vertex(797.552, 152.503);
  
  p.vertex(788.409, 146.179); // L
  
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
  
  p.vertex(922.338, 109.492);
  p.vertex(937.938, 107.867);
  p.vertex(951.801, 113.922);
  
  p.vertex(948.199, 89.774); // L
  
  p.vertex(958.245, 83.521);
  p.vertex(967.605, 84.579);
  p.vertex(976.326, 92.47);
  
  p.vertex(965.647, 122.736); // L
  
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
  
  p.vertex(902.603, 222.784); // L
  
  p.vertex(891.259, 219.682);
  p.vertex(885.329, 212.363);
  p.vertex(885.192, 200.531);
  
  p.vertex(908.145, 190.272); // L
  
  p.vertex(897.281, 182.4);
  p.vertex(890.873, 170.214);
  // 最後は開始点に戻る
  
  p.endShape(p.CLOSE);
  
  p.pop();
};

// 別のアプローチ：より細かく近似したポリゴンで描画
const drawSVGPathAsDetailedPolygon = (x: number, y: number, size: number, direction: number) => {
  p.push();
  p.translate(x, y);
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

// 金魚を描画する関数（上記のどちらかのポリゴン関数を使用）
const drawGoldfish = (x: number, y: number, size: number, tailAngle: number, direction: number) => {
  // 詳細なポリゴンバージョンを使用（より滑らかな結果）
  drawSVGPathAsDetailedPolygon(x, y, size, direction);
  
  // 目や他のディテールを追加
  p.push();
  p.translate(x, y);
  p.scale(size / 1000 * direction, size / 1000);
  
  // 目を追加
  p.fill(0);
  p.ellipse(950, 110, 15, 15);
  p.fill(255);
  p.ellipse(953, 107, 5, 5);
  
  p.fill(0);
  p.ellipse(950, 135, 15, 15);
  p.fill(255);
  p.ellipse(953, 132, 5, 5);
  
  // ハイライト（光の反射）
  p.fill(255, 255, 255, 70);
  p.ellipse(850, 120, 150, 80);
  
  // 尾びれのアニメーション（必要に応じて）
  if (tailAngle !== 0) {
    // 尾の部分だけを別に描画して動きを付ける
    p.push();
    p.translate(770, 160);
    p.rotate(tailAngle * 0.1);
    
    p.fill(255, 45, 45);
    p.beginShape();
    for (let i = 0; i < 20; i++) {
      const angle = p.map(i, 0, 19, -p.PI * 0.4, p.PI * 0.4);
      const r = 40 + p.sin(angle * 2) * 15;
      p.vertex(-r * p.cos(angle), r * p.sin(angle));
    }
    p.vertex(0, 0);
    p.endShape(p.CLOSE);
    
    p.pop();
  }
  
  p.pop();
};

  // 水の波紋を描画する関数
  const drawWaterRipple = (x: number, y: number, size: number, age: number) => {
    const alpha = p.map(age, 0, 1, 150, 0) // 年齢に応じて透明度を変化
    const rippleSize = size * p.map(age, 0, 1, 1, 3) // 年齢に応じてサイズを変化

    p.noFill()
    p.stroke(255, 255, 255, alpha)
    p.strokeWeight(1)
    p.ellipse(x, y, rippleSize, rippleSize * 0.3)
  }

  // 描画ループ
  p.draw = () => {
    // 背景をクリア（水色）
    p.background(210, 240, 255)

    // 水底の砂を描画
    p.noStroke()
    p.fill(240, 220, 180)
    p.rect(0, p.height - 40, p.width, 40)

    // 水草を描画
    for (let i = 0; i < 5; i++) {
      const plantX = p.width * (i + 0.5) / 5
      const plantHeight = 80 + i * 20

      p.fill(30, 180, 80)
      p.beginShape()
      // 水草の根元
      const baseY = p.height - 40
      p.vertex(plantX, baseY)
      
      // 水草の曲線
      for (let j = 1; j < 4; j++) {
        const waveX = p.sin(p.frameCount * 0.02 + j * 0.5) * 15
        const segmentY = baseY - (j / 3) * plantHeight
        const controlX1 = plantX + waveX
        const controlY1 = segmentY + plantHeight / 6
        const controlX2 = plantX + waveX
        const controlY2 = segmentY - plantHeight / 6
        
        p.bezierVertex(
          controlX1, controlY1,
          controlX2, controlY2,
          plantX + waveX, segmentY
        )
      }
      p.endShape()
    }

    // 金魚の動きを計算
    angle += speedFactor * p.deltaTime * 0.1

    // 新しい位置を計算
    const newX = p.width / 2 + p.sin(angle) * 250
    const newY = p.height / 2 + p.cos(angle * 0.5) * 150

    // 移動方向に基づいて金魚の向きを決定
    if (newX > x) {
      direction = 1 // 右向き
    } else {
      direction = -1 // 左向き
    }

    // 位置を更新
    x = newX
    y = newY

    // 尾びれの動き（速度に応じて振幅を変える）
    const speed = p.dist(x, y, p.pmouseX, p.pmouseY)
    tailAngle = p.sin(p.frameCount * 0.1) * (0.2 + speed * 0.001)

    // 金魚を描画
    drawGoldfish(x, y, 120, tailAngle, direction)

    // 小さな泡を描画
    for (let i = 0; i < 8; i++) {
      const bubbleX = p.width * (i / 8) + p.sin(p.frameCount * 0.01 + i) * 50
      const bubbleY = p.height - 100 - (p.frameCount + i * 100) % p.height
      const bubbleSize = 5 + p.sin(p.frameCount * 0.05 + i) * 3

      p.fill(255, 255, 255, 180)
      p.ellipse(bubbleX, bubbleY, bubbleSize, bubbleSize)
    }

    // 水の波紋を描画
    for (let i = 0; i < 3; i++) {
      const rippleX = p.width / 2 + p.sin(angle + i * 2) * 200
      const rippleY = p.height / 2 + p.cos(angle * 0.7 + i) * 100
      const rippleAge = (p.frameCount * 0.01 + i * 0.3) % 1

      drawWaterRipple(rippleX, rippleY, 30, rippleAge)
    }
  }
}

// p5インスタンスを作成し、#appに追加
new p5(sketch, document.querySelector<HTMLDivElement>('#app')!)