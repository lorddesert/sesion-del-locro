import React, { useEffect } from 'react'
import * as THREE from 'three';


const Login3js = () => {
    const scene = new THREE.Scene();
    let camera = {}
    const renderer = new THREE.WebGLRenderer();
    const zPosition = 20
    let cube

    const backgroundSceneColor = new THREE.Color('black')
    // const fogColor = new THREE.Color( 'mediumspringgreen' )

    // scene.fog = new THREE.Fog(new THREE.Color( 'mediumspringgreen' ), 0.0025, 50);
    scene.fog = new THREE.Fog(new THREE.Color('yellow'), 0.025, 60);
    scene.background = backgroundSceneColor

    
    useEffect(() => {

        document.addEventListener('scroll', moveCamera)
        
        const container = document.querySelector('#container')
        
        console.log(container);
        
        renderer.setSize(container.clientWidth, container.clientHeight)
        camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );
        camera.position.z = zPosition;
        container.appendChild(renderer.domElement);

        cube = addCube()
        // console.log()
        animate();
        // add3DModel()

    }, [])
    return <>
        <div id="container">
        </div>
    </>

function addCube() {
    const geometry = new THREE.TorusKnotGeometry( 8, 3, 300, 20, 4, 7 );
    // const geometry = new THREE.SphereGeometry( 15, 64, 32 );


    const material = new THREE.MeshStandardMaterial( { 
            // map: normalMap, 
            color: 'mediumspringgreen',
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


}

export default Login3js