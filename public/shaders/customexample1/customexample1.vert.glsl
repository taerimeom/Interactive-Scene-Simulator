precision highp float;
precision highp int;
varying vec4 vPosition;

varying vec4 vColor;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    #ifdef USE_COLOR
    vColor = vec4(color,1.0);
    #else
    vColor = vec4(1.0,1.0,1.0,1.0);
    #endif

    vPosition = modelViewMatrix * vec4(position.xyz, 1.0);
    vNormal = normalMatrix * normal;
    vUv = vec2(uv.x,1.0-uv.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz , 1.0);
}
