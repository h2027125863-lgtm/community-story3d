// =================================
// 月亮湖社区 15分钟生活圈
// 3D插画地图
// =================================



const scene =
new THREE.Scene();


scene.background =
new THREE.Color(
0xf5efe5
);



// 摄像机

const camera =
new THREE.PerspectiveCamera(

45,

window.innerWidth /
window.innerHeight,

0.1,

1000

);


camera.position.set(

0,

14,

16

);


camera.lookAt(
0,
0,
0
);




// 渲染器

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




// 光照

scene.add(

new THREE.AmbientLight(
0xffffff,
1.2
)

);





// 图片加载

const loader =
new THREE.TextureLoader();




// =================================
// 地图
// =================================


const mapTexture =
loader.load(

"assets/map.png"

);



const map =
new THREE.Mesh(

new THREE.PlaneGeometry(

18,

10

),


new THREE.MeshBasicMaterial({

map:mapTexture,

transparent:true

})

);



map.rotation.x =
-Math.PI/3;


scene.add(map);




// =================================
// 插画加载函数
// =================================


function createSprite(

url,

x,

z,

size

){


const texture =
loader.load(url);



const sprite =
new THREE.Sprite(

new THREE.SpriteMaterial({

map:texture,

transparent:true

})

);



sprite.scale.set(

size,

size,

1

);



sprite.position.set(

x,

2,

z

);



scene.add(sprite);



}




// =================================
// 添加社区设施
// =================================



createSprite(

"assets/home.png",

-5,

3,

3

);



createSprite(

"assets/kindergarten.png",

-3,

1,

2.5

);



createSprite(

"assets/vegetable market.png",

0,

3,

2.5

);



createSprite(

"assets/supermarket.png",

3,

2,

2.5

);



createSprite(

"assets/hospital.png",

5,

-1,

2.5

);



createSprite(

"assets/bank.png",

4,

3,

2

);



createSprite(

"assets/park.png",

0,

-2,

2.5

);



createSprite(

"assets/museum of science and technology.png",

1,

-4,

2.5

);



createSprite(

"assets/neighborhood committee.png",

-4,

-2,

2.5

);





// =================================
// 人物
// =================================


const characterTexture =
loader.load(

"assets/character.png"

);



const character =
new THREE.Sprite(

new THREE.SpriteMaterial({

map:characterTexture,

transparent:true

})

);



character.scale.set(

3,

3,

1

);



character.position.set(

-5,

3,

3

);



scene.add(character);





// =================================
// 动画
// =================================


function animate(){


requestAnimationFrame(
animate
);



renderer.render(

scene,

camera

);


}


animate();





// =================================
// 自适应
// =================================


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
