precision highp float;
precision highp int;


struct PointLight {
    vec3 color;
    vec3 position; // light position, in camera coordinates
    float distance; // used for attenuation purposes.
    float intensity;
    float decay;
};
uniform PointLight pointLights[NUM_POINT_LIGHTS];

uniform vec4 modelColor;
uniform mat4 modelViewMatrix;
uniform float ambient;
uniform float texCoordScale;

uniform sampler2D diffuseMap;
uniform bool diffuseMapProvided;

uniform sampler2D normalMap;
uniform bool normalMapProvided;

uniform sampler2D heightMap;
uniform bool heightMapProvided;


varying vec4 vPosition;
varying vec4 vColor;
varying vec3 vNormal;
varying vec2 vUv;


void main()	{
    vec3 N = normalize( cross( dFdx( vPosition.xyz ), dFdy( vPosition.xyz ) ) );
    vec3 position = vPosition.xyz/vPosition.w;
    vec3 surface_color = texture(diffuseMap, vUv*texCoordScale).xyz;
    float alpha = 1.0;
    vec3 lightingSum = vec3(0.0,0.0,0.0);
    if(NUM_POINT_LIGHTS>0){
        for (int plight=0;plight<int(NUM_POINT_LIGHTS);++plight){
            vec4 lightPosition = vec4(pointLights[plight].position, 1.0);
            vec3 lightColor = pointLights[plight].color;

            // The distance parameter in ThreeJS point lights is actually their range.
            float lightRange = pointLights[plight].distance;

            // The decay parameter controls how quickly the light decays over the specified range.
            float lightDecay = pointLights[plight].decay;

            // The falloff is computed like so...
            vec3 pToL = lightPosition.xyz-vPosition.xyz;
            float dist = length(pToL);
            float falloff = max(0.0, 1.0-(dist/lightRange));
            falloff = pow(falloff, lightDecay);

            // You will have to add the effects of angle to create diffuse and specular lighting
            // which is also a first step towards implementing toon shading

            lightingSum = lightingSum+falloff*lightColor;
        }
    }
    vec3 lighting = lightingSum + vec3(ambient, ambient,ambient);
    gl_FragColor = vec4(lighting*surface_color.xyz,1.0);
}
