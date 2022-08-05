import * as THREE from 'three'

export default class System {
    constructor() {
        this.createInstance()
        this.init()
    }
    createInstance() {
        if(!System.instance){
            System.instance = this
        }
      
        return System.instance
    }

    init() {
        this.textureLoader = new THREE.TextureLoader()
    }
}