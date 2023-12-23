/**
 * @file Manages the configuration settings for the widget.
 * @author Abe Davis
 * @description ACameraModel holds all of the data for a camera.
 */
import * as THREE from "three";
import {AObject, ASerializable} from "../../base";
import {Mat4} from "../../math/linalg";
import {ANodeModel3D} from "../nodeModel";
import {ACamera, TransformationInterface} from "../../math";

@ASerializable("ACameraModel")
export class ACameraModel extends ANodeModel3D{
    protected _camera!: ACamera;
    get camera() {
        return this._camera;
    }
    get pose(){return this.camera.pose;}
    get projection(){return this.camera.projection;}
    setPose(pose:TransformationInterface){
        // this.camera.pose=pose.getMat4();
        this.camera.setPose(pose);
    }
    setProjection(m:Mat4){
        this.camera.projection = m;
    }

    constructor(camera?: THREE.Camera | ACamera, ...args: any[]) {
        super();
        if (camera instanceof ACamera) this._camera = camera;
        if (!this.camera) {
            if(camera instanceof THREE.PerspectiveCamera){
                this._camera = new ACamera(camera);
            }
        }
        const self = this;
        this._setCameraListeners();
    }

    get transform() {
        return this.camera.getPose();
    }

    setTransform(t: TransformationInterface) {
        if(this._camera){
            this.camera.setPose(t.getMat4());
        }else{
            super.setTransform(t);
        }
    }


    _setCameraListeners() {
        const self = this;
        const POSE_UPDATE_HANDLE = ACamera.CameraUpdateEvents.POSE_UPDATED + '_'+ this.serializationLabel;
        const PROJECTION_UPDATE_HANDLE = ACamera.CameraUpdateEvents.PROJECTION_UPDATED + '_' + this.serializationLabel;
        this.unsubscribe(POSE_UPDATE_HANDLE, false);
        this.unsubscribe(PROJECTION_UPDATE_HANDLE, false);
        this.subscribe(this.camera.addPoseListener(() => {
                self._transform = this.camera.getPose();
                // self.signalTransformUpdate();
                // self.signalEvent(ACamera.CameraUpdateEvents.POSE_UPDATED);
            }),
            POSE_UPDATE_HANDLE
        )
        this.subscribe(this.camera.addProjectionListener(() => {
                self.signalEvent(ACamera.CameraUpdateEvents.PROJECTION_UPDATED);
            }),
            PROJECTION_UPDATE_HANDLE
        );
    }

    signalCameraProjectionUpdate() {
        this.signalEvent(ACamera.CameraUpdateEvents.PROJECTION_UPDATED);
    }

    addCameraProjectionListener(callback: (self: AObject) => void, handle?: string, synchronous:boolean=true) {
        return this.camera.addProjectionListener(callback, handle, synchronous);
    }


    get forward(){return this.camera.forward;}
    get right(){return this.camera.right;}
    get up(){return this.camera.up;}

    static CreatePerspectiveFOV(fovy: number, aspect: number, near?: number, far?: number) {
        let camera = ACamera.CreatePerspectiveFOV(fovy, aspect, near, far)
        let cameraModel = new ACameraModel(camera);
        return cameraModel;
    }

    static CreatePerspectiveNearPlane(left: number, right: number, bottom: number, top: number, near?: number, far?: number) {
        let camera = ACamera.CreatePerspectiveNearPlane(left, right, bottom, top, near, far)
        let cameraModel = new ACameraModel(camera);
        return cameraModel;
    }

    static CreateOrthographic(left:number, right:number, bottom:number, top:number, near?:number, far?:number) {
        let camera = ACamera.CreateOrthographic(left, right, bottom, top, near, far)
        let cameraModel = new ACameraModel(camera);
        return cameraModel;
    }


}
