import './style.css'
import p5 from 'p5'

// p5.jsのスケッチを定義
const sketch = (p: p5) => {
  // 初期設定
  p.setup = () => {
    // キャンバスを作成
    p.createCanvas(800, 600)
    // 背景色を設定
    p.background(240)
  }

  // 描画ループ
  p.draw = () => {
    // 背景をクリア
    p.background(240)

    // 円を描画
    p.fill(255, 204, 0)
    p.noStroke()
    p.ellipse(p.width / 2, p.height / 2, 200, 200)

    // 動く円を描画
    p.fill(255, 0, 100, 150)
    const x = p.width / 2 + Math.sin(p.frameCount * 0.05) * 120
    const y = p.height / 2 + Math.cos(p.frameCount * 0.05) * 120
    p.ellipse(x, y, 80, 80)
  }
}

// p5インスタンスを作成し、#appに追加
new p5(sketch, document.querySelector<HTMLDivElement>('#app')!)
