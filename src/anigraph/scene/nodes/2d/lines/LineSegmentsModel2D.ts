import {AObjectState} from "../../../../base";
import {ASerializable} from "../../../../base";
import {Color, Vec2, Vec3, Vec4} from "../../../../math";
import {ANodeModel2D} from "../../../nodeModel";
import {VertexAttributeColor3DArray} from "../../../../geometry";

@ASerializable("LineSegmentsModel2D")
export class LineSegmentsModel2D extends ANodeModel2D{
    @AObjectState lineWidth!:number;
    constructor(){
        super();
        this.verts.color = new VertexAttributeColor3DArray()
        this.lineWidth = 0.01;
    }

    addLine(start:Vec2, end:Vec2, startColor:Color, endColor:Color){
        this.verts.addVertices([start, end], [startColor.Vec4, endColor.Vec4]);
        // this.signalGeometryUpdate();
    }

    setLine(index:number, start:Vec2, end:Vec2, startColor:Color, endColor:Color){
        this.verts.position.setAt(index*2, start);
        this.verts.position.setAt(index*2+1, end);
        this.verts.color.setAt(index*2, startColor);
        this.verts.color.setAt(index*2+1, endColor);

        // this.verts.addVertices([start, end], [startColor.Vec4, endColor.Vec4]);
        // this.signalGeometryUpdate();
    }
}
