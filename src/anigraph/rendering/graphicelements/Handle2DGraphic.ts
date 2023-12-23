import {AGraphicElement} from "../graphicobject";
import {Color} from "../../math";
import {VertexArray2D} from "../../geometry";

export class Handle2DGraphic extends AGraphicElement{
    constructor(color?:Color) {
        let verts = VertexArray2D.CircleVArray(1.0);
        super(verts, color??Color.FromRGBA(0.5,0.5,0.5,1.0));
    }
}
