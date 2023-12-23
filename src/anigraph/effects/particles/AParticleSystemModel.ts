import {AObject, ASerializable} from "../../base";
import {Particle3D} from "../../physics/AParticle3D";
import {ANodeModel3D} from "../../scene";

enum ParticleEvents{
    PARTICLES_UPDATED="PARTICLES_UPDATED"
}

@ASerializable("AParticleSystemModel")
export class AParticleSystemModel<P extends Particle3D> extends ANodeModel3D{
    particles:P[]=[];
    get nParticles(){
        return this.particles.length;
    }

    /**
     *
     * @param callback
     * @param handle
     * @param synchronous
     * @returns {AStateCallbackSwitch}
     */
    addParticlesListener(callback:(self:AObject)=>void, handle?:string, synchronous:boolean=true,){
        return this.addEventListener(ParticleEvents.PARTICLES_UPDATED,callback, handle);
    }

    signalParticlesUpdated(...args:any[]){
        this.signalEvent(ParticleEvents.PARTICLES_UPDATED, ...args);
    }


    addParticle(particle:P){
        this.particles.push(particle);
    }

    // timeUpdate(t: number, ...args:any[]) {
    //     super.timeUpdate(t, ...args);
    //     this.signalParticlesUpdated();
    // }

}
