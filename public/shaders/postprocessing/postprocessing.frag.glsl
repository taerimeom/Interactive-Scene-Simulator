precision highp float;
precision highp int;

//uniform float exposure;

uniform sampler2D inputMap;
uniform bool inputMapProvided;

uniform float sliderValue;

varying vec4 vPosition;
varying vec2 vUv;

void main()	{
    vec4 inputColor = texture(inputMap, vUv);
    vec3 outputColor = pow(inputColor.xyz, vec3(sliderValue));
    gl_FragColor = vec4(outputColor, 1.0);
//    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
