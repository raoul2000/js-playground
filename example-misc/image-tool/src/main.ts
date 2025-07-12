import './style.css'
import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'app',
  width: window.innerWidth,
  height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);
const tr = new Konva.Transformer();


const init = (kittyImage: Konva.Image) => {
  layer.add(kittyImage);
  layer.add(tr);

  let selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
    draggable: true,
  });
  layer.add(selectionRectangle);


  let x1: number, y1: number, x2: number, y2: number;
  stage.on('mousedown touchstart', (e) => {

    console.log(e.target);
    if (e.target !== kittyImage) {
      return;
    }
    x1 = stage.getPointerPosition()!.x;
    y1 = stage.getPointerPosition()!.y;
    x2 = stage.getPointerPosition()!.x;
    y2 = stage.getPointerPosition()!.y;

    selectionRectangle.setAttrs({
      x: x1,
      y: y1,
      width: 0,
      height: 0,
      visible: true,
    });
  });


  stage.on('mousemove touchmove', () => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    x2 = stage.getPointerPosition()!.x;
    y2 = stage.getPointerPosition()!.y;

    selectionRectangle.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
  });


  stage.on('mouseup touchend', () => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    const workingRect = selectionRectangle.clone();
    workingRect.on('click', () => {
      tr.nodes([workingRect])
    })
    layer.add(workingRect);
    tr.nodes([workingRect])
    selectionRectangle.visible(false);
  });

}


// alternative API:
Konva.Image.fromURL('kitty.jpg', function (kittyImage) {
  kittyImage.setAttrs({
    x: 0,
    y: 0
  });

  init(kittyImage);

});

