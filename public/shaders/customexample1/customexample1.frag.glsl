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

uniform float ambient;
uniform float diffuse;
uniform float specular;
uniform float specularExp;

uniform sampler2D diffuseMap;
uniform sampler2D normalMap;
uniform bool diffuseMapProvided;
uniform bool normalMapProvided;

varying vec4 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
#ifdef USE_COLOR
varying vec4 vColor;
#endif


vec3 evalDiffuse(vec3 position, vec3 N){
    vec3 diffuseLighting = vec3(0.0,0.0,0.0);
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
            vec3 L = normalize(pToL);
            float diffuseStrength = 1.0;
            float dist = length(pToL);
            float falloff = max(0.0, 1.0-(dist/lightRange));

            falloff = pow(falloff, lightDecay);
            diffuseLighting = diffuseLighting+diffuseStrength*falloff*lightColor;
        }
    }
    return diffuseLighting;
}

vec3 evalSpecular(vec3 position, vec3 N){
    vec3 specularLighting = vec3(0.0,0.0,0.0);
    float specularStrength = 0.0;
    if(NUM_POINT_LIGHTS>0){
        for (int plight=0;plight<int(NUM_POINT_LIGHTS);++plight){
            vec4 lightPosition = vec4(pointLights[plight].position, 1.0);
            vec3 lightColor = pointLights[plight].color;
            float lightDistance = pointLights[plight].distance;
            float lightDecay = pointLights[plight].decay;
            vec3 pToL = lightPosition.xyz-vPosition.xyz;

            //you might also want to use the built-in function reflect(A,B) which reflects the vector A relative to vector B
        }
    }
    return specularLighting;
}

void main()	{
    vec4 surface_color;

    // We will set the surface color based on whether vertex colors an a diffuse texture are provided
    #ifdef USE_COLOR
        surface_color = vColor;
        if(diffuseMapProvided){
            surface_color = surface_color*texture(diffuseMap, vUv);
        }else{
            surface_color;
        }
    #else
        surface_color = vec4(1.0,1.0,1.0,1.0);
        if(diffuseMapProvided){
            surface_color = texture(diffuseMap, vUv);
        }else{
            surface_color;
        }
    #endif

    vec3 n = normalize(vNormal);
    vec3 p = vPosition.xyz/vPosition.w;
    vec3 diffuseLighting= evalDiffuse(p, n);
    vec3 specularLighting = evalSpecular(p,n);
    vec3 lighting = diffuseLighting*surface_color.xyz*diffuse+specularLighting*specular + vec3(ambient, ambient,ambient);
    vec4 standardLighting = vec4(lighting,surface_color.w);

    gl_FragColor = vec4(standardLighting.xyz, 1.0);
    //    gl_FragColor = vec4(vNormal, 1.0);
//        gl_FragColor = vec4(vColor);
//    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
