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
  let speedFactor = 0.01 // 速度係数

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

  // TSKaigi 2025の金魚SVGを忠実に再現する関数
  const drawGoldfish = (x: number, y: number, size: number, tailAngle: number, direction: number) => {
    p.push()
    p.translate(x, y)
    p.scale(direction, 1) // 向きに応じて反転

    // ベースとなる色を定義
    const baseColor = p.color(255, 45, 45); // 鮮やかな赤
    const darkRedColor = p.color(220, 30, 30); // 少し暗めの赤
    const lightRedColor = p.color(255, 85, 85); // 明るめの赤
    
    p.noStroke(); // 線なし

    // 尾びれを描画
    p.push()
    p.translate(-size * 0.4, 0)
    p.rotate(tailAngle * 0.3) // 尾の動きを控えめに

    // 尾びれ本体
    p.fill(baseColor);
    p.beginShape();
    p.vertex(0, 0);
    p.vertex(-size * 0.2, -size * 0.25);
    p.vertex(-size * 0.4, -size * 0.35);
    p.vertex(-size * 0.5, -size * 0.25);
    p.vertex(-size * 0.45, -size * 0.15);
    p.vertex(-size * 0.3, -size * 0.1);
    p.vertex(-size * 0.3, size * 0.1);
    p.vertex(-size * 0.45, size * 0.15);
    p.vertex(-size * 0.5, size * 0.25);
    p.vertex(-size * 0.4, size * 0.35);
    p.vertex(-size * 0.2, size * 0.25);
    p.vertex(0, 0);
    p.endShape();
    
    // 尾びれの内部の模様（より明るい赤）
    p.fill(lightRedColor);
    p.beginShape();
    p.vertex(-size * 0.05, 0);
    p.vertex(-size * 0.15, -size * 0.15);
    p.vertex(-size * 0.25, -size * 0.25);
    p.vertex(-size * 0.3, -size * 0.2);
    p.vertex(-size * 0.25, -size * 0.1);
    p.vertex(-size * 0.15, -size * 0.05);
    p.vertex(-size * 0.15, size * 0.05);
    p.vertex(-size * 0.25, size * 0.1);
    p.vertex(-size * 0.3, size * 0.2);
    p.vertex(-size * 0.25, size * 0.25);
    p.vertex(-size * 0.15, size * 0.15);
    p.vertex(-size * 0.05, 0);
    p.endShape();
    p.pop();

    // 体の部分
    p.fill(baseColor);
    p.ellipse(0, 0, size * 0.8, size * 0.5);
    
    // 頭部分
    p.fill(baseColor);
    p.ellipse(size * 0.35, 0, size * 0.3, size * 0.25);
    
    // 体と頭の境目を滑らかにする接続部分
    p.fill(baseColor);
    p.beginShape();
    p.vertex(size * 0.2, -size * 0.2);
    p.vertex(size * 0.25, -size * 0.15);
    p.vertex(size * 0.3, -size * 0.12);
    p.vertex(size * 0.35, -size * 0.125);
    p.vertex(size * 0.35, size * 0.125);
    p.vertex(size * 0.3, size * 0.12);
    p.vertex(size * 0.25, size * 0.15);
    p.vertex(size * 0.2, size * 0.2);
    p.endShape();

    // 胸びれ（左右）
    // 左胸びれ
    p.fill(lightRedColor);
    p.push();
    p.translate(size * 0.1, -size * 0.22);
    p.rotate(p.sin(p.frameCount * 0.1) * 0.2 - 0.3);
    p.beginShape();
    p.vertex(0, 0);
    p.vertex(-size * 0.1, -size * 0.12);
    p.vertex(-size * 0.05, -size * 0.18);
    p.vertex(size * 0.05, -size * 0.15);
    p.vertex(size * 0.03, -size * 0.05);
    p.vertex(0, 0);
    p.endShape();
    p.pop();

    // 右胸びれ
    p.fill(lightRedColor);
    p.push();
    p.translate(size * 0.1, size * 0.22);
    p.rotate(p.sin(p.frameCount * 0.1) * 0.2 + 0.3);
    p.beginShape();
    p.vertex(0, 0);
    p.vertex(-size * 0.1, size * 0.12);
    p.vertex(-size * 0.05, size * 0.18);
    p.vertex(size * 0.05, size * 0.15);
    p.vertex(size * 0.03, size * 0.05);
    p.vertex(0, 0);
    p.endShape();
    p.pop();

    // 背びれ
    p.fill(lightRedColor);
    p.beginShape();
    p.vertex(-size * 0.1, 0);
    p.vertex(-size * 0.15, -size * 0.18);
    p.vertex(-size * 0.05, -size * 0.25);
    p.vertex(size * 0.05, -size * 0.2);
    p.vertex(size * 0.12, -size * 0.15);
    p.vertex(size * 0.1, -size * 0.05);
    p.vertex(-size * 0.1, 0);
    p.endShape();

    // 体の模様（濃い赤色）
    p.fill(darkRedColor);
    p.beginShape();
    p.vertex(-size * 0.25, -size * 0.05);
    p.vertex(-size * 0.1, -size * 0.15);
    p.vertex(size * 0.05, -size * 0.1);
    p.vertex(size * 0.2, -size * 0.05);
    p.vertex(size * 0.25, 0);
    p.vertex(size * 0.2, size * 0.05);
    p.vertex(size * 0.05, size * 0.1);
    p.vertex(-size * 0.1, size * 0.15);
    p.vertex(-size * 0.25, size * 0.05);
    p.vertex(-size * 0.3, 0);
    p.vertex(-size * 0.25, -size * 0.05);
    p.endShape();

    // 目（両側）
    // 左目
    p.fill(0);
    p.ellipse(size * 0.4, -size * 0.08, size * 0.06, size * 0.06);
    p.fill(255);
    p.ellipse(size * 0.41, -size * 0.09, size * 0.02, size * 0.02);

    // 右目
    p.fill(0);
    p.ellipse(size * 0.4, size * 0.08, size * 0.06, size * 0.06);
    p.fill(255);
    p.ellipse(size * 0.41, size * 0.09, size * 0.02, size * 0.02);

    // 体のハイライト
    p.fill(255, 255, 255, 70);
    p.ellipse(size * 0.05, 0, size * 0.5, size * 0.3);
    p.fill(255, 255, 255, 40);
    p.ellipse(size * 0.1, 0, size * 0.6, size * 0.35);

    // 金魚の特徴的な白い点（らんちゅう風）
    p.fill(255, 255, 255, 130);
    p.ellipse(-size * 0.15, size * 0.05, size * 0.1, size * 0.07);
    p.ellipse(size * 0.1, -size * 0.1, size * 0.12, size * 0.08);
    p.ellipse(size * 0.25, size * 0.07, size * 0.07, size * 0.05);

    p.pop();
}

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