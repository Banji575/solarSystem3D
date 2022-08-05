import * as THREE from 'three'
import System from './System'



export default class Entity {

    constructor(type, params = {}) {
        this._sys = new System()
        this.mesh = this.#createObj(type, params = {})
        return this
    }

    get position() {
        return this.mesh.position
    }

    /**
     * @param {(arg0: number) => any} vec3
     */
    setPosition(vec3) {
        if (!(vec3 instanceof THREE.Vector3)) {
            console.error("positon paramets is not vec3")
            return
        }
        const { x, y, z } = vec3
        this.mesh.position.set(x, y, z)
    }

    #createObj(type, params = {}) {
        if (!type) {
            return new THREE.Object3D()
        }

        const mesh = this.#changeGeometryMesh(type, params = {})
        return new THREE.Mesh(
            mesh,
            new THREE.MeshBasicMaterial({ color: 'white' })
        )
    }


    #changeGeometryMesh(type, params = {}) {
        switch (type) {
            case "sphere":
                return new THREE.SphereGeometry(1, 16, 16)
            case "box":
                return new THREE.BoxGeometry()
            case "ring":
                return new THREE.RingGeometry(3, 5, 24, )
        }
    }

    setMaterialParams(params) {
        const { side } = params
        this.mesh.material.side = side
        this.mesh.material.needsUpdate = true
    }

    setMeshMap(map) {
        this.mesh.material.map = this._sys.textureLoader.load(map)
    }

    setMaterial(params = {}) {
        if (params.type === 'standartMaterial') {
            this.mesh.material = new THREE.MeshStandardMaterial({ color: params.color ? params.color : 'white', map: this.mesh.material.map, side: THREE.DoubleSide })
        }
        if (params.type === 'basicMaterial') {
            this.mesh.material = new THREE.MeshBasicMaterial({ color: params.color ? params.color : 'white', map: this.mesh.material.map, side: THREE.DoubleSide })
        }
    }
    add(entity) {
        this.mesh.add(entity.mesh)
    }

    rotateY(angle) {
        this.mesh.rotateY(angle)
    }

    rotation(axis, radian){
        this.mesh.rotation[axis] = radian
    }

    get scale() {
        return this.mesh.scale
    }

    setScale(vec3) {
        if (!(vec3 instanceof THREE.Vector3)) {
            console.error("positon paramets is not vec3")
            return
        }
        const { x, y, z } = vec3
        this.mesh.scale.set(x, y, z)
    }

}