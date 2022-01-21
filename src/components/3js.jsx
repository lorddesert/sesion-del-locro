import React, { useEffect } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const Login3js = () => {
    const scene = new THREE.Scene();
    let camera = {}
    const renderer = new THREE.WebGLRenderer();
    const zPosition = 27

    const backgroundSceneColor = new THREE.Color( 0x050505 )
    const fogColor = new THREE.Color( 'mediumspringgreen' )

    // scene.fog = new THREE.Fog(new THREE.Color( 'mediumspringgreen' ), 0.0025, 50);
    scene.fog = new THREE.Fog(new THREE.Color('yellow'), 0.025, 60);


    
    useEffect(() => {
        const container = document.querySelector('#container')

        console.log(container);

        camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );

        renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(renderer.domElement);

        const cube = addCube()

        // const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        // scene.add( light );

        scene.background = backgroundSceneColor
        camera.position.z = zPosition;

        function animate() {
            requestAnimationFrame( animate );

            cube.rotation.x += 0.007;
            cube.rotation.y += 0.007;

            renderer.render( scene, camera );
        };

        animate();

    }, [])
    return <>
        <div id="container">
        </div>
    </>

function addCube() {
    const geometry = new THREE.TorusKnotGeometry( 8, 3, 300, 16 );
    const material = new THREE.MeshBasicMaterial( { color: 'mediumspringgreen' } );
    const torusKnot = new THREE.Mesh( geometry, material );
    scene.add( torusKnot );
    

    return torusKnot
}

}

export default Login3js