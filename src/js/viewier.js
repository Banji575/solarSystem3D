import * as THREE from 'three'


export class Viewier {
    constructor(options){
        this.renderer = this.#createRenderer(options.renderer)
        this.scene = this.#createScene()
        this.camera = this.#creaateCamera(options.camera)
    }

    #createRenderer(params){
        const renderer = new THREE.WebGL1Renderer()
        renderer.setSize(params.width, params.height)
        return renderer
    }

    #createScene(){
        return new THREE.Scene()
    }

    #creaateCamera(params){
        return new THREE.PerspectiveCamera(
            params.fov,
            params.aspect,
            params.near,
            params.far
        )
    }
}