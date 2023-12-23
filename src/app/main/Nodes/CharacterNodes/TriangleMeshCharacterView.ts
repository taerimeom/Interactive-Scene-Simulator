import {CharacterView} from "../../../BaseClasses/CharacterView";
import {ANodeModel, ATriangleMeshGraphic} from "../../../../anigraph";
import {TriangleMeshCharacterModel} from "./TriangleMeshCharacterModel";
import {CharacterModel} from "../../../BaseClasses";

export class TriangleMeshCharacterView extends CharacterView{
    meshGraphic!:ATriangleMeshGraphic;
    get model():TriangleMeshCharacterModel{
        return this._model as TriangleMeshCharacterModel;
    }

    static Create(model:CharacterModel, ...args:any[]){
        let view = new this();
        view.setModel(model);
        return view;
    }

    init(){
        this.meshGraphic = new ATriangleMeshGraphic(this.model.verts, this.model.material.threejs);
        this.addGraphic(this.meshGraphic);
    }

    update(): void {
        // this.meshGraphic.setVerts(this.model.verts);
        this.model.transform.getMat4().assignTo(this.threejs.matrix);
    }
}
