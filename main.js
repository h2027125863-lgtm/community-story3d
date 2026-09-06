// ================================
// 月亮湖社区 3D数据新闻
// main.js
// ================================


// 创建场景

const scene = new THREE.Scene();


// 背景颜色

scene.background =
new THREE.Color(0xf3efe6);



// 创建摄像机

const camera =
new THREE.PerspectiveCamera(

45,

window.innerWidth /
window.innerHeight,

0.1,

1000

);


// 摄像机位置

camera.position.set(

0,

12,

15

);


// 创建渲染器

const renderer =
new THREE.WebGLRenderer({

antialias:true,

alpha:true

});


renderer.setSize(

window.innerWidth,

window.innerHeight

);


document
.getElementById("scene")
.appendChild(
renderer.domElement
);



// ================================
// 灯光
// ================================


const light =
new THREE.AmbientLight(

0xffffff,

1

);


scene.add(light);



const sun =
new THREE.DirectionalLight(

0xffffff,

1

);


sun.position.set(

10,

20,

10

);


scene.add(sun);





// ================================
// 加载地图
// ================================


const loader =
new THREE.TextureLoader();



const mapTexture =
loader.load(

"assets/map.png"

);



const map =
new THREE.Mesh(

new THREE.PlaneGeometry(

20,

12

),


new THREE.MeshBasicMaterial({

map:mapTexture

})

);



//
// 地图倾斜
//

map.rotation.x =
- Math.PI / 3;



scene.add(map);





// ================================
// 创建建筑函数
// ================================


function createBuilding(

x,

z,

height,

name

){


const geometry =
new THREE.BoxGeometry(

1.2,

height,

1.2

);



const material =
new THREE.MeshLambertMaterial({

color:0xd8c39a

});



const building =
new THREE.Mesh(

geometry,

material

);



building.position.set(

x,

height/2,

z

);



scene.add(building);



// 添加文字标签


const canvas =
document.createElement(
"canvas"
);


const ctx =
canvas.getContext(
"2d"
);


canvas.width=256;

canvas.height=64;



ctx.fillStyle=
"black";


ctx.font=
"28px Arial";


ctx.fillText(

name,

20,

40

);



const texture =
new THREE.CanvasTexture(
canvas
);



const label =
new THREE.Sprite(

new THREE.SpriteMaterial({

map:texture

})

);



label.scale.set(

2,

0.5,

1

);



label.position.set(

x,

height+1,

z

);



scene.add(label);


}




// ================================
// 添加社区建筑
// ================================


// 幼儿园

createBuilding(

-5,

1,

1.5,

"幼儿园"

);


// 菜市场

createBuilding(

-1,

3,

2,

"菜市场"

);


// 超市

createBuilding(

3,

2,

2.5,

"超市"

);


// 医院

createBuilding(

5,

-2,

3,

"社区医院"

);


// 科技馆

createBuilding(

0,

-3,

2,

"科技馆"

);






// ================================
// 创建人物
// ================================


const womanTexture =
loader.load(

"assets/woman.png"

);



const woman =
new THREE.Sprite(

new THREE.SpriteMaterial({

map:womanTexture

})

);



woman.scale.set(

1.5,

1.5,

1

);



scene.add(woman);




// 人物移动路线

const route=[

{

x:-6,

z:1

},


{

x:-5,

z:1

},


{

x:-1,

z:3

},


{

x:3,

z:2

},


{

x:0,

z:-3

}

];



let index=0;



woman.position.set(

route[0].x,

0.8,

route[0].z

);




// ================================
// 人物移动动画
// ================================


function moveWoman(){


let target =
route[index];



woman.position.x +=
(
target.x -
woman.position.x
)
*0.01;



woman.position.z +=
(
target.z -
woman.position.z
)
*0.01;



if(

Math.abs(
woman.position.x-target.x
)<0.05

&&

Math.abs(
woman.position.z-target.z
)<0.05

){

index++;


if(index>=route.length){

index=0;

}

}


}




// ================================
// 镜头动画
// ================================


function animate(){


requestAnimationFrame(
animate
);



moveWoman();



// 镜头轻微移动

camera.position.x =
Math.sin(
Date.now()*0.0002
)
*3;



camera.lookAt(

0,

0,

0

);



renderer.render(

scene,

camera

);


}



animate();




// ================================
// 自适应窗口
// ================================


window.addEventListener(

"resize",

()=>{


camera.aspect =
window.innerWidth /
window.innerHeight;


camera.updateProjectionMatrix();



renderer.setSize(

window.innerWidth,

window.innerHeight

);



}

);
