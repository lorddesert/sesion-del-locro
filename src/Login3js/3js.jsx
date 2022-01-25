import React, { useEffect } from 'react'
import * as THREE from 'three';
import backgroundImage from './Lawrencium.jpg'

const Login3js = () => {
    const scene = new THREE.Scene();
    let camera = {}
    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    const zPosition = 20
    let cube

    const backgroundSceneColor = new THREE.Color('black')
    // const fogColor = new THREE.Color( 'mediumspringgreen' )

    // scene.fog = new THREE.Fog(new THREE.Color( 'mediumspringgreen' ), 0.0025, 50);
    // scene.fog = new THREE.Fog(new THREE.Color('yellow'), 0.025, 60);
    // scene.background = backgroundSceneColor

    var loader = new THREE.TextureLoader();
    var backgroundTexture = loader.load( backgroundImage );


    scene.background = backgroundTexture
    
    useEffect(() => {

        document.addEventListener('scroll', moveCamera)
        
        const container = document.querySelector('#container')
        
        console.log(container);
        
        renderer.setSize(container.clientWidth, container.clientHeight)
        camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );
        camera.position.z = zPosition;
        container.appendChild(renderer.domElement);

        cube = addCube()

        addLights()
        // console.log()
        animate();
        // add3DModel()

    }, [])
    return <>
        <div id="container">
        </div>
    </>

function addCube() {
    const geometry = new THREE.TorusKnotGeometry( 8, 3, 300, 20 );
    // const geometry = new THREE.SphereGeometry( 15, 64, 32 );


    const material = new THREE.MeshStandardMaterial( { 
            // map: normalMap, 
            color: 'black',
            metalness: 0.5,
            roughness: 1,
            // aoMap: ambientOcclusion,
            // specularMap,

        });
    const torusKnot = new THREE.Mesh( geometry, material );
    scene.add( torusKnot );
    

    return torusKnot
}

function animate() {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.002;
    // cube.rotation.y += 0.003;
    cube.rotation.z += 0.003;

    renderer.render( scene, camera );
};

function moveCamera(e) {
    e.preventDefault()

    console.log(e.key);

}

function addLights() {
    
    const light = new THREE.PointLight( 0x302b63, 100, 1000 );
    light.position.set( 100, -100, 0 );
    scene.add( light );

    const light2 = new THREE.PointLight( 0x0f0c29, 100, 1000 );
    light2.position.set( -100, 50, 0 );
    scene.add( light2 );
}


}

export default Login3js