import {ATriangleMeshModel, ATriangleMeshView} from "../../../../anigraph/scene/nodes";
import {PlayerModel} from "./PlayerModel";
import {TriangleMeshCharacterView} from "../CharacterNodes/TriangleMeshCharacterView";
import {ATriangleMeshGraphic, V3, VertexArray3D} from "../../../../anigraph";

export class PlayerView extends TriangleMeshCharacterView{
    hatGraphic!:ATriangleMeshGraphic;
    get model():PlayerModel{
        return this._model as PlayerModel;
    }

    init(){
        let body = VertexArray3D.Box3D(
            V3(-0.5,-0.5,0).times(this.model.size),
            V3(0.5,0.5,0.8).times(this.model.size)
        );
        let tinyhat = VertexArray3D.Box3D(
            V3(-0.1,-0.1,0.8).times(this.model.size),
            V3(0.1,0.1,1.0).times(this.model.size)
        )
        this.meshGraphic = new ATriangleMeshGraphic(body, this.model.material.threejs)
        this.hatGraphic = new ATriangleMeshGraphic(tinyhat, this.model.material.threejs);
        this.addGraphic(this.meshGraphic);
        this.addGraphic(this.hatGraphic);
        this.setTransform(this.model.transform);
    }

    update() {
        this.setTransform(this.model.transform);
    }

}


