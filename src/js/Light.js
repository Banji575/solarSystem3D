import * as THREE from 'three'

export default class Light {
    constructor(params) {
        this.ligth = this.#createLight(params)

        return this

    }

    #createLight(params) {
        const { type, color, intensity, distance } = params
        switch (type) {
            case "directionLight":
                return new THREE.DirectionalLight(color ? color : 0xFFFFFF, intensity ? intensity : 0.7)
            case "ambientLight":
                return new THREE.AmbientLight(0x333333)
            case "pointLigth":
                return new THREE.PointLight(color ? color : 'white', intensity ? intensity : 0.7, distance ? distance : 500)
        }
    }

    setPosition(vec3) {
        if (!(vec3 instanceof THREE.Vector3)) {
            console.error("positon paramets is not vec3")
            return
        }
        const { x, y, z } = vec3
        this.ligth.position.set(x, y, z)
    }

    get postition() {
        return this.ligth.position
    }

}