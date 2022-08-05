export default class Planet {
    constructor(planet, planetObj) {
        this.planet = planet
        this.planetObj = planetObj
    }

    updateRotation(selfRotation, aroundRotation) {
        this.planet.rotateY(selfRotation)
        this.planetObj.rotateY(aroundRotation)
    }
}