import * as THREE from 'three'
import Entity from './Entity'
import Planet from './Planet'

export default class SunSystem {
    constructor() {

    }

    createPlanet(size, texture, position , ring = false, ringSize, ringTexture, ringPosition) {
        this.planet = new Entity('sphere')
        this.planet.setMeshMap(texture)
        this.planet.setMaterial({ type: 'standartMaterial' })
        this.planet.setPosition(position)
        this.planet.setScale(size)
        this.planetObj = new Entity()
        this.planetObj.mesh.add(this.planet.mesh)

        if(ring){
            this.ring = new Entity('ring')
            this.ring.setMeshMap(ringTexture)
            this.ring.setMaterial({ type: 'standartMaterial' })
            this.ring.setPosition(ringPosition)
            this.ring.setScale(ringSize)
            this.planet.mesh.add(this.ring.mesh)
            this.ring.rotation('x', -0.5 * Math.PI)
        }

        return new Planet(this.planet, this.planetObj)
    }


}