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
    // add a new working rect ---------------------------------------------

    const workingRect = selectionRectangle.clone();
    workingRect.on('click', () => {
      tr.nodes([workingRect])
    })
    /*     const clonedImg: Konva.Image = kittyImage.clone();
        clonedImg.cache();
        clonedImg.setAttrs({
          name: "cloned"
        });
        clonedImg.filters([Konva.Filters.Blur]); */


    layer.add(workingRect);
    tr.nodes([workingRect])
    selectionRectangle.visible(false);
  });
}


const init2 = (kittyImage: Konva.Image) => {

  let selectionRectangle = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: 'rgba(206, 206, 206, 0.5)',
    visible: true,
    draggable: true,
  });
  tr.nodes([selectionRectangle]);
  const group = new Konva.Group({
    clipFunc: (ctx) => {
      ctx.save();
      ctx.translate(selectionRectangle.x(), selectionRectangle.y())
      ctx.rotate(Konva.getAngle(selectionRectangle.rotation()))
      ctx.rect(0, 0, selectionRectangle.width() * selectionRectangle.scaleX(), selectionRectangle.height() * selectionRectangle.scaleY());
      ctx.restore()
    }
  })
  const clonedImage: Konva.Image = kittyImage.clone();
  clonedImage.cache();
  clonedImage.filters([Konva.Filters.Blur]);
  clonedImage.blurRadius(10);
  group.add(clonedImage);
  group.add(selectionRectangle);
  layer.add(group);

}


const init3 = (kittyImage: Konva.Image) => {

  let selectionRectangle = new Konva.Rect({
    fill: 'rgba(216, 216, 216, 0.5)',
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
    selectionRectangle.moveToTop();
    selectionRectangle.visible(true);
    x1 = stage.getPointerPosition()!.x;
    y1 = stage.getPointerPosition()!.y;
    x2 = stage.getPointerPosition()!.x;
    y2 = stage.getPointerPosition()!.y;

    if(Math.abs(x1-x2) < 10 || Math.abs(y1-y2) < 10) {
      return;
    } 

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
    // add a new working rect ---------------------------------------------

    const workingRect = selectionRectangle.clone();
    selectionRectangle.visible(false);
    workingRect.draggable = true;
    workingRect.on('click', () => {
      console.log('cloned');
      tr.nodes([workingRect])
    });

    workingRect.listening(true);
    const group = new Konva.Group({
      clipFunc: (ctx) => {
        ctx.save();
        ctx.translate(workingRect.x(), workingRect.y())
        ctx.rotate(Konva.getAngle(workingRect.rotation()))
        ctx.rect(0, 0, workingRect.width() * workingRect.scaleX(), workingRect.height() * workingRect.scaleY());
        ctx.restore()
      }
    })
    const clonedImage: Konva.Image = kittyImage.clone();
    clonedImage.name("cloned");
    clonedImage.cache();
    clonedImage.filters([Konva.Filters.Blur]);
    clonedImage.blurRadius(10);
    group.add(clonedImage);
    group.add(workingRect);
    layer.add(group);


    
    tr.nodes([workingRect]);
    
  });
}
// alternative API:
Konva.Image.fromURL('kitty.jpg', function (kittyImage) {
  kittyImage.setAttrs({
    x: 0,
    y: 0
  });
  layer.add(kittyImage);
  layer.add(tr);
  init3(kittyImage);
});

