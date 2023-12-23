precision highp float;
precision highp int;

//uniform float exposure;

uniform sampler2D inputMap;
uniform bool inputMapProvided;

varying vec4 vPosition;
varying vec2 vUv;

void main()	{
    vec4 inputColor = texture(inputMap, vUv);
    gl_FragColor = inputColor;
//    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
