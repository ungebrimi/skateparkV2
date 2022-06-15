import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

//popup
const popup = document.querySelector(".instructions-container")
const popupBtn  = document.querySelector(".instructions__btn")

popupBtn.addEventListener("click", () => {
    popup.style.display = "none"
})


const gui = new dat.GUI({
    width: 400
}) 

const parameters = {
    color: 0xbc74ec
}

// button color 
const guiBtn = document.querySelector('.gui')
let visible = false
gui.hide()

guiBtn.onclick = () =>
{
    if(!visible)
    {
        gui.show()
        visible = true
    }
    else
    {
        gui.hide()
        visible = false
    }
}

//setup
const loadingBarElement = document.querySelector('.loading-bar')
const loadingCurtain = document.querySelector('.loading-curtain')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        window.setTimeout(() =>
        {
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = 'scaleX(0)'
            loadingCurtain.style.opacity = '0'
            gsap.from('.loading-curtain', {opacity: 1, duration: 1, ease: 'ease-in'})
            gsap.to('.loading-curtain', {opacity: 0, duration: 1, ease: 'ease-in'})
        }, 500)
        window.setTimeout(() =>
        {  
            loadingCurtain.style.display = 'none'
        }, 600)

    },
    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)

// Canvas to add object on
const canvas = document.querySelector('canvas.webgl')

// The scene
const scene = new THREE.Scene()


// Light positions
const light1 = new THREE.PointLight(parameters.color, 10, 30)
light1.position.y = 22.27
light1.position.x = 28.66
scene.add(light1)

const light2 = new THREE.PointLight(parameters.color, 5, 30)
light2.position.x = -4.2
light2.position.y = 11
light2.position.z = 14.97
scene.add(light2)

const light3 = new THREE.PointLight(parameters.color, 5, 30)
light3.position.x = -12.41
light3.position.y = 18
light3.position.z = 36
scene.add(light3)

const light4 = new THREE.PointLight(parameters.color, 10, 30)
light4.position.x = -27.93
light4.position.y = 22.27
light4.position.z = -6.02
scene.add(light4)

const light5 = new THREE.PointLight(parameters.color, 10, 30)
light5.position.x = 4.93
light5.position.y = 22.27
light5.position.z = -15.15
scene.add(light5)

const light6 = new THREE.PointLight(parameters.color, 10, 30)
light6.position.x = 38.7
light6.position.y = 22.27
light6.position.z = -24.28
scene.add(light6)

const light7 = new THREE.PointLight(parameters.color, 10, 30)
light7.position.x = 53.3
light7.position.y = 25.92
light7.position.z = -24.28
scene.add(light7)

const light8 = new THREE.PointLight(parameters.color, 10, 30)
light8.position.x = 55.12
light8.position.y = 24.09
light8.position.z = 1.28
scene.add(light8)


// Button light
const lightswitch = document.querySelector('.lights')
let power = false
lightswitch.addEventListener('click', () =>
{
    if(!power)
    {
        light1.intensity = 10
        light2.intensity = 5
        light3.intensity = 5
        light4.intensity = 10
        light5.intensity = 10
        light6.intensity = 10
        light7.intensity = 10
        light8.intensity = 10
        power = true
    }
    else
    {
        light1.intensity = 2
        light2.intensity = 2
        light3.intensity = 2
        light4.intensity = 2
        light5.intensity = 2
        light6.intensity = 2
        light7.intensity = 2
        light8.intensity = 2
        power = false
    }
})

// lights controls
gui.addColor(parameters, 'color')
.onChange(() =>
{
    light1.color.set(parameters.color)
    light2.color.set(parameters.color)
    light3.color.set(parameters.color)
    light4.color.set(parameters.color)
    light5.color.set(parameters.color)
    light6.color.set(parameters.color)
    light7.color.set(parameters.color)
    light8.color.set(parameters.color)
})
const folder = gui.addFolder('light intensity')
folder.add(light1, 'intensity').min(0).max(20).step(0.001).name("light1 intensity")
folder.add(light2, 'intensity').min(0).max(20).step(0.001).name("light2 intensity")
folder.add(light3, 'intensity').min(0).max(20).step(0.001).name("light3 intensity")
folder.add(light4, 'intensity').min(0).max(20).step(0.001).name("light4 intensity")
folder.add(light5, 'intensity').min(0).max(20).step(0.001).name("light5 intensity")
folder.add(light6, 'intensity').min(0).max(20).step(0.001).name("light6 intensity")
folder.add(light7, 'intensity').min(0).max(20).step(0.001).name("light7 intensity")
folder.add(light8, 'intensity').min(0).max(20).step(0.001).name("light8 intensity")

//Objects group
const group = new THREE.Group()

// add model to group 
gltfLoader.load(
    'colorV24.glb',
    (gltf) => 
    {
        group.add(gltf.scene)
    }
)

// Transparant box around obstacels
const communityBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(8, 2, 8),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
            
        }
    )
)
group.add(communityBox)
communityBox.position.x = 48.1
communityBox.position.y = 1.18
communityBox.position.z = 10


const RailBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(20, 2, 2),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(RailBox)
RailBox.position.x = 38.1
RailBox.position.y = 1.18
RailBox.position.z = -15.7

const halfPipeBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(12, 3.6, 12),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(halfPipeBox)
halfPipeBox.position.x = 65.24
halfPipeBox.position.y = 1.9
halfPipeBox.position.z = -14.47

const ledgeBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(15, 2, 4),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(ledgeBox)
ledgeBox.position.x = 37.85
ledgeBox.position.y = 1.18
ledgeBox.position.z = -25.38

const pyramidBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 2, 10),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(pyramidBox)
pyramidBox.position.x = -5.35
pyramidBox.position.y = 1.18
pyramidBox.position.z = -4.04

const stairRailBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 3, 10),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(stairRailBox)
stairRailBox.position.x = 31.16
stairRailBox.position.y = 2.2
stairRailBox.position.z = 14.21

const stairBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 3, 10),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(stairBox)
stairBox.position.x = 23.34
stairBox.position.y = 1.4
stairBox.position.z = -5.35


const quarterpipeBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(17, 5, 70),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(quarterpipeBox)
quarterpipeBox.position.x = -34
quarterpipeBox.position.y = 2.1
quarterpipeBox.position.z = 11.6

const funboxBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(15, 3, 7),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(funboxBox)
funboxBox.position.x = 16.3
funboxBox.position.y = 1.7
funboxBox.position.z = -23.6

const ledgeupBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(15, 3, 15),
    new THREE.MeshBasicMaterial(
        {
            color: "#404040",
            transparent: true,
            opacity: 0,
        }
    )
)
group.add(ledgeupBox)
ledgeupBox.position.x = -11.86
ledgeupBox.position.y = 1.8
ledgeupBox.position.z = 25.95

// add all objects to the Scene
scene.add(group)
group.rotation.y = 0.21


// set raycaster
const raycaster = new THREE.Raycaster()
let currentIntersect = null



// mouse position
let mouse = new THREE.Vector2()
mouse.x = 0
mouse.y = 0

// location mouse
window.addEventListener('mousemove', (event) =>
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
})

// add all the object in array
const objectsToIntersect = 
[
    communityBox,
    RailBox,
    halfPipeBox,
    ledgeBox,
    pyramidBox,
    stairRailBox,
    stairBox,
    quarterpipeBox,
    funboxBox,
    ledgeupBox
]

// event listener pages
window.addEventListener('mousedown', () => 
{
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case communityBox: 
            window.location.href="pages/community.html"
            break
            case RailBox: 
            window.location.href="pages/rail.html"
            break
            case halfPipeBox: 
            window.location.href="pages/halfpipe.html"
            break
            case ledgeBox: 
            window.location.href="pages/ledge.html"
            break
            case pyramidBox: 
            window.location.href="pages/pyramid.html"
            break
            case stairRailBox: 
            window.location.href="pages/stairrail.html"
            break
            case stairBox: 
            window.location.href="pages/stairs.html"
            break
            case quarterpipeBox: 
            window.location.href="pages/quarterpipe.html"
            break
            case funboxBox: 
            window.location.href="pages/funbox.html"
            break
            case ledgeupBox: 
            window.location.href="pages/ledgeup.html"
            break
        }
    }
})

window.addEventListener('hover', () => 
{
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case communityBox: 
            document.body.classList.add("pointer")
            break
            case RailBox: 
            document.body.classList.add("pointer")
            break
            case halfPipeBox: 
            document.body.classList.add("pointer")
            break
            case ledgeBox: 
            document.body.classList.add("pointer")
            break
            case pyramidBox: 
            document.body.classList.add("pointer")
            break
            case stairRailBox: 
            document.body.classList.add("pointer")
            break
            case stairBox: 
            document.body.classList.add("pointer")
            break
            case quarterpipeBox: 
            document.body.classList.add("pointer")
            break
            case funboxBox: 
            document.body.classList.add("pointer")
            break
            case ledgeupBox: 
            document.body.classList.add("pointer")
            break
        }
    }
})




// size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 4
camera.position.y = 100
camera.position.z = 100
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#000000", 0)

//animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // raycaster logic
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objectsToIntersect)

    if(intersects.length)
    {
        if(!currentIntersect)
        {
        }

        currentIntersect = intersects[0]
    }
    else
    {
        if(currentIntersect)
        {
        }
        currentIntersect = null
    }     
}

tick()

