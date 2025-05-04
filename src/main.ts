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

  // 金魚を描画する関数
  const drawGoldfish = (x: number, y: number, size: number, tailAngle: number, direction: number) => {
    p.push()
    p.translate(x, y)
    p.scale(direction, 1) // 向きに応じて反転

    // グラデーション効果のための準備
    const baseColor = p.color(255, 30, 30) // 基本の赤色
    const highlightColor = p.color(255, 80, 80) // ハイライト色

    // 体
    p.fill(baseColor)
    p.noStroke()
    p.ellipse(0, 0, size, size * 0.6)

    // 尾びれ - 体の後ろにぴったりくっつくように位置調整
    p.push()
    p.translate(-size * 0.25, 0) // ここを-0.5から-0.25に変更して体に近づける
    p.rotate(tailAngle)

    // 尾びれのグラデーション
    p.fill(255, 60, 60, 230)
    p.beginShape()
    p.vertex(-size * 0.25, 0) // 始点も調整
    p.vertex(-size * 0.55, -size * 0.3)
    p.vertex(-size * 0.95, -size * 0.5)
    p.vertex(-size * 1.35, -size * 0.3)
    p.vertex(-size * 1.15, -size * 0.15)
    p.vertex(-size * 0.55, 0)
    p.vertex(-size * 1.15, size * 0.15)
    p.vertex(-size * 1.35, size * 0.3)
    p.vertex(-size * 0.95, size * 0.5)
    p.vertex(-size * 0.55, size * 0.3)
    p.vertex(-size * 0.25, 0) // 終点も調整
    p.endShape(p.CLOSE)

    // 尾びれの模様 - こちらも位置調整
    p.fill(255, 100, 100, 150)
    p.beginShape()
    p.vertex(-size * 0.35, 0) // 始点を調整
    p.vertex(-size * 0.55, -size * 0.2)
    p.vertex(-size * 0.75, -size * 0.35)
    p.vertex(-size * 1.05, -size * 0.2)
    p.vertex(-size * 0.85, -size * 0.1)
    p.vertex(-size * 0.55, 0)
    p.vertex(-size * 0.85, size * 0.1)
    p.vertex(-size * 1.05, size * 0.2)
    p.vertex(-size * 0.75, size * 0.35)
    p.vertex(-size * 0.55, size * 0.2)
    p.vertex(-size * 0.35, 0) // 終点も調整
    p.endShape(p.CLOSE)
    p.pop()

    // 体のハイライト
    p.fill(highlightColor)
    p.ellipse(size * 0.1, -size * 0.1, size * 0.8, size * 0.4)

    // 頭
    p.fill(baseColor)
    p.ellipse(size * 0.3, 0, size * 0.5, size * 0.4)

    // 目
    p.fill(0)
    p.ellipse(size * 0.45, -size * 0.1, size * 0.08, size * 0.08)
    p.fill(255)
    p.ellipse(size * 0.47, -size * 0.12, size * 0.03, size * 0.03)

    // 口
    p.stroke(150, 30, 30)
    p.strokeWeight(size * 0.02)
    p.noFill()
    p.arc(size * 0.5, size * 0.05, size * 0.1, size * 0.1, 0, p.PI * 0.7)
    p.noStroke()

    // 胸びれ
    p.fill(255, 100, 100, 200)
    p.push()
    p.translate(0, size * 0.2)
    p.rotate(p.sin(p.frameCount * 0.2) * 0.3)
    p.beginShape()
    p.vertex(0, 0)
    p.vertex(size * 0.05, size * 0.1)
    p.vertex(size * 0.1, size * 0.2)
    p.vertex(size * 0.15, size * 0.3)
    p.vertex(size * 0.1, size * 0.35)
    p.vertex(size * 0.05, size * 0.4)
    p.vertex(0, size * 0.38)
    p.vertex(-size * 0.05, size * 0.35)
    p.vertex(-size * 0.08, size * 0.3)
    p.vertex(-size * 0.08, size * 0.2)
    p.vertex(-size * 0.05, size * 0.1)
    p.vertex(0, 0)
    p.endShape(p.CLOSE)
    p.pop()

    // 背びれ
    p.fill(255, 100, 100, 200)
    p.beginShape()
    p.vertex(-size * 0.1, -size * 0.3)
    p.vertex(-size * 0.15, -size * 0.4)
    p.vertex(-size * 0.1, -size * 0.5)
    p.vertex(-size * 0.05, -size * 0.6)
    p.vertex(0, -size * 0.7)
    p.vertex(size * 0.05, -size * 0.6)
    p.vertex(size * 0.1, -size * 0.5)
    p.vertex(size * 0.1, -size * 0.3)
    p.endShape(p.CLOSE)

    // 腹びれ
    p.fill(255, 100, 100, 180)
    p.push()
    p.translate(-size * 0.2, size * 0.25)
    p.rotate(p.sin(p.frameCount * 0.15 + 1) * 0.2)
    p.beginShape()
    p.vertex(0, 0)
    p.vertex(-size * 0.05, size * 0.1)
    p.vertex(-size * 0.1, size * 0.2)
    p.vertex(-size * 0.15, size * 0.3)
    p.vertex(-size * 0.1, size * 0.35)
    p.vertex(-size * 0.05, size * 0.4)
    p.vertex(0, size * 0.38)
    p.vertex(size * 0.05, size * 0.35)
    p.vertex(size * 0.08, size * 0.3)
    p.vertex(size * 0.08, size * 0.2)
    p.vertex(size * 0.05, size * 0.1)
    p.vertex(0, 0)
    p.endShape(p.CLOSE)
    p.pop()

    p.pop()
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