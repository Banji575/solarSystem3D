import * as THREE from 'three'
import { Viewier } from "./viewier.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Entity from "./Entity.js";
import Light from "./Light";

import stars from '../img/starsTexture.jpg'
import sunmap from '../img/sunmap.jpg'
import mercurymap from '../img/mercurymap.jpg'
import saturnmap from '../img/saturnmap.jpg'
import saturnRingmap from '../img/saturnringcolor.png'
import venusmap from '../img/venusmap.jpg'
import earthmap from '../img/earthmap.jpg'
import marsmap from '../img/marsmap.jpg'
import jupitermap from '../img/jupitermap.jpg'
import uranusmap from '../img/uranusmap.jpg'
import neptunemap from '../img/neptunemap.jpg'
import plutomap from '../img/plutomap.jpg'
import SunSystem from './SunSystem.js';



export class Game {
    constructor() {
        this.viewier = new Viewier({
            renderer: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            camera: {
                fov: 75,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 1000
            }
        })
        this.#init()
    }

    setCubeTexture(imgs = []) {
        const cubeTextureLoader = new THREE.CubeTextureLoader()
        this.viewier.scene.background = cubeTextureLoader.load(imgs)
    }

    #init() {
        document.body.append(this.viewier.renderer.domElement)
        const orbitControl = new OrbitControls(this.viewier.camera, this.viewier.renderer.domElement)
        orbitControl.update()
        this.#resize()
    }

    setUpdate(animation) {
        this.viewier.renderer.setAnimationLoop(animation)
    }

    #resize() {
        window.addEventListener('resize', (evt) => {
            this.viewier.camera.aspect = window.innerWidth / window.innerHeight
            this.viewier.camera.updateProjectionMatrix()
            this.viewier.renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }

}

const game = new Game()
const sunSystem = new SunSystem()
const scene = game.viewier.scene
const camera = game.viewier.camera
game.setCubeTexture([stars, stars, stars, stars, stars, stars])


camera.position.set(-10, 30, 30)


const mercury = sunSystem.createPlanet(new THREE.Vector3(3.2, 3.2, 3.2), mercurymap, new THREE.Vector3(28, 0, 28))
const saturn = sunSystem.createPlanet(new THREE.Vector3(10, 10, 10), saturnmap, new THREE.Vector3(138, 0, 138), true, new THREE.Vector3(.5, .5, .5), saturnRingmap, new THREE.Vector3(0, 0, 0))
const venus = sunSystem.createPlanet(new THREE.Vector3(5.8, 5.8, 5.8), venusmap, new THREE.Vector3(48, 0, 48))
const earth = sunSystem.createPlanet(new THREE.Vector3(6, 6, 6), earthmap, new THREE.Vector3(62, 0, 62))
const mars = sunSystem.createPlanet(new THREE.Vector3(7, 7, 7), marsmap, new THREE.Vector3(78, 0, 78))
const jupiter = sunSystem.createPlanet(new THREE.Vector3(12, 12, 12), jupitermap, new THREE.Vector3(100, 0, 100))
const uranus = sunSystem.createPlanet(new THREE.Vector3(7, 7, 7), uranusmap, new THREE.Vector3(176, 0, 176))
const neptune = sunSystem.createPlanet(new THREE.Vector3(7, 7, 7), neptunemap, new THREE.Vector3(200, 0, 200))
const pluto = sunSystem.createPlanet(new THREE.Vector3(2.8, 2.8, 2.8), plutomap, new THREE.Vector3(216, 0, 216))
const sun = sunSystem.createPlanet(new THREE.Vector3(3, 3, 3), sunmap, new THREE.Vector3(1, 1, 1))


sun.planet.setMaterial('basicMaterial')
const ambientLight = new Light({ type: 'ambientLight', color: 0xFFFFFF, intensity: 1 })

const pointLigth = new Light({ type: 'pointLigth', color: 'white', intensity: 3, distance: 300 })

camera.lookAt(sun.planet.position)
scene.add(sun.planet.mesh)

scene.add(mercury.planetObj.mesh)
scene.add(earth.planetObj.mesh)
scene.add(venus.planetObj.mesh)
scene.add(mars.planetObj.mesh)
scene.add(jupiter.planetObj.mesh)
scene.add(neptune.planetObj.mesh)
scene.add(uranus.planetObj.mesh)
scene.add(pluto.planetObj.mesh)
scene.add(saturn.planetObj.mesh)
scene.add(pointLigth.ligth)
sun.planet.mesh.add(pointLigth.ligth)
scene.add(ambientLight.ligth)


const anim = () => {
    game.viewier.renderer.render(scene, camera)
    sun.updateRotation(0.002)
    mercury.updateRotation(0.04, 0.004)
    venus.updateRotation(0.02, 0.015)
    earth.updateRotation(0.02, 0.01)
    mars.updateRotation(0.018, 0.008)
    jupiter.updateRotation(0.04, 0.002)
    uranus.updateRotation(0.03, 0.0004)
    neptune.updateRotation(0.032, 0.0001)
    pluto.updateRotation(0.008, 0.00007)
    saturn.updateRotation(0.038, 0.0009)
}

game.setUpdate(anim.bind(game))

