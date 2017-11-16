var hue = 60;
var midHeight = 0;
var lowHeight = 0;
var highHeight = 0;
$(function() {
    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.append(renderer.domElement);


    /*video
    var video = document.createElement('video');

    video.autoplay = true;
    video.src = "assets/universe.mp4";
    console.log(video.src)
    video.muted = true
    video.load()
    video.play()
    video.loop = true
    var videoTexture = new THREE.Texture( video );
    videoTexture.generateMipmaps = false;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.minFilter = THREE.LinearFilter;
    var videoMaterial   = new THREE.MeshBasicMaterial( { map : videoTexture } );
    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(200, 132, 132),
      videoMaterial
    );
    sphere.scale.x = -1;
    //scene.add(sphere)
    var near = 1, far = 200, resolution = 1000
    const cubeCamera = new THREE.CubeCamera(near, far, resolution);
    scene.add(cubeCamera);
 */

    //parttttiiiccclllleeessssss
    var particleTexture = THREE.ImageUtils.loadTexture( 'assets/gold-bubble.png' );
    var particleTexture2 = THREE.ImageUtils.loadTexture( 'assets/gold-star.png' );
  	particleGroup = new THREE.Object3D();
    particleGroup2 = new THREE.Object3D()
  	particleAttributes = { startSize: [], startPosition: [], randomness: [] };
    particle2Attributes = { startSize: [], startPosition: [], randomness: [] };
  	var totalParticles = 200;
  	var radiusRange = 30;
  	for( var i = 0; i < totalParticles; i++ )
  	{
  	    var spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, useScreenCoordinates: false, color: 0xffffff } );
        var spriteMaterial2 = new THREE.SpriteMaterial( { map: particleTexture2, useScreenCoordinates: false, color: 0xffffff } );
  		var sprite = new THREE.Sprite( spriteMaterial );
      var sprite2 = new THREE.Sprite( spriteMaterial2 );
  		sprite.scale.set( 20, 20, 1.0 ); // imageWidth, imageHeight
  		sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
      sprite2.scale.set( 20, 20, 1.0 ); // imageWidth, imageHeight
  		sprite2.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
  		// for a cube:
  		// sprite.position.multiplyScalar( radiusRange );
  		// for a solid sphere:
  		// sprite.position.setLength( radiusRange * Math.random() );
  		// for a spherical shell:
  		sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );
      sprite2.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );
  		// sprite.color.setRGB( Math.random(),  Math.random(),  Math.random() );
  		sprite.material.color.setHSL( Math.random(), 0.9, 0.7 );
      sprite2.material.color.setHSL( Math.random(), 0.9, 0.7 );
  		// sprite.opacity = 0.80; // translucent particles
  		sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
      sprite2.material.blending = THREE.AdditiveBlending; // "glowing" particles
  		particleGroup.add( sprite );
      particleGroup2.add( sprite2 );
  		// add variable qualities to arrays, if they need to be accessed later
  		particleAttributes.startPosition.push( sprite.position.clone() );
  		particleAttributes.randomness.push( Math.random() );
      particle2Attributes.startPosition.push( sprite2.position.clone() );
  		particle2Attributes.randomness.push( Math.random() );
  	}
  	particleGroup.position.y = 50;
    particleGroup.position.z = -50
    particleGroup.position.y = -10
  	scene.add( particleGroup );
    particleGroup2.position.y = 50;
    particleGroup2.position.z = -50
    particleGroup2.position.y = -10
  	scene.add( particleGroup2 );

    function createParticleSystem() {

        // The number of particles in a particle system is not easily changed.
        var particleCount = 10000;

        // Particles are just individual vertices in a geometry
        // Create the geometry that will hold all of the vertices
        var particles = new THREE.Geometry();

        // Create the vertices and add them to the particles geometry
        for (var p = 0; p < particleCount; p++) {

            // This will create all the vertices in a range of -200 to 200 in all directions
            var x = Math.random() * 1000 - 500;
            var y = Math.random() * 1000 - 500;
            var z = Math.random() * 1000 - 500;

            // Create the vertex
            var particle = new THREE.Vector3(x, y, z);

            // Add the vertex to the geometry
            particles.vertices.push(particle);
        }

        // Create the material that will be used to render each vertex of the geometry
        var particleMaterial = new THREE.PointsMaterial(
                {color: 0xffffff,
                 size: 4,
                 map: THREE.ImageUtils.loadTexture("assets/gold-star.png"),
                 blending: THREE.AdditiveBlending,
                 transparent: true,
                });

        // Create the particle system
        particleSystem = new THREE.Points(particles, particleMaterial);

        return particleSystem;
    }
    particleSystem = createParticleSystem();
    scene.add(particleSystem);
    function createParticleSystem2() {

        // The number of particles in a particle system is not easily changed.
        var particleCount = 1000;

        // Particles are just individual vertices in a geometry
        // Create the geometry that will hold all of the vertices
        var particles = new THREE.Geometry();

        // Create the vertices and add them to the particles geometry
        for (var p = 0; p < particleCount; p++) {

            // This will create all the vertices in a range of -200 to 200 in all directions
            var x = Math.random() * 1000 - 500;
            var y = Math.random() * 1000 - 500;
            var z = Math.random() * 1000 - 500;

            // Create the vertex
            var particle = new THREE.Vector3(x, y, z);

            // Add the vertex to the geometry
            particles.vertices.push(particle);
        }

        // Create the material that will be used to render each vertex of the geometry
        var particleMaterial = new THREE.PointsMaterial(
                {color: 0xffffff,
                 size: 4,
                 map: THREE.ImageUtils.loadTexture("assets/green-spash.png"),
                 blending: THREE.AdditiveBlending,
                 transparent: true,
                });

        // Create the particle system
        particleSystem = new THREE.Points(particles, particleMaterial);

        return particleSystem;
    }
    particleSystem2 = createParticleSystem2();
    scene.add(particleSystem2);
 camera.position.z = 40;
 camera.position.x = 20;
 camera.position.y = 14;













    //CUBE GRID


        var geom = new THREE.CubeGeometry( 5, 5, 5 );
        var pointLight = new THREE.DirectionalLight( 0xffffff );
        pointLight.position.set( 0, 1, 1 ).normalize();
      //  scene.add(pointLight);
        var cubes = new THREE.Object3D();
        scene.add( cubes );

        for (var ix = -10; ix < 10; ix++) {
          for (var iz = -10; iz < 10; iz++) {
            var cubeMaterial1 = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff , specular: 0x555555, shininess: 30 } );
            var grayness = Math.random() * 0.5 + 0.25,
                    mat = new THREE.MeshBasicMaterial(),
                    cubeGrid = new THREE.Mesh( geom, cubeMaterial1 );

            cubeGrid.position.x = iz * 5;
            cubeGrid.position.y = ix * 5;
          //  cube.rotation.set( Math.random(), Math.random(), Math.random() )
            cubeGrid.grayness = grayness; // *** NOTE THIS
            cubes.add( cubeGrid );
          }
        }


        var geom2 = new THREE.CubeGeometry( 5, 5, 5 );
        var pointLight = new THREE.DirectionalLight( 0xffffff );
        pointLight.position.set( 1, 1, 1 ).normalize();
      //  scene.add(pointLight);

        var cubes2 = new THREE.Object3D();
        scene.add( cubes2 );

        for (var ix = -20; ix < 0; ix++) {
          for (var iz = -10; iz < 10; iz++) {
            var cubeMaterial2 = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff , specular: 0x555555, shininess: 30 } );
            var grayness = Math.random() * 0.5 + 0.25,
                    mat = new THREE.MeshBasicMaterial(),
                    cubeGrid2 = new THREE.Mesh( geom2, cubeMaterial2 );

            cubeGrid2.position.x = iz * 5;
            cubeGrid2.position.z = ix * 5;
            cubeGrid2.position.y = -50
          //  cube.rotation.set( Math.random(), Math.random(), Math.random() )
            cubeGrid2.grayness = grayness; // *** NOTE THIS
            cubes2.add( cubeGrid2 );
          }
        }
        var geom3 = new THREE.CubeGeometry( 5, 5, 5 );
        var pointLight = new THREE.DirectionalLight( 0xffffff );
        pointLight.position.set( 1, 1, 100 ).normalize();
        scene.add(pointLight);

        var cubes3 = new THREE.Object3D();
        scene.add( cubes3 );

        for (var ix = -20; ix < 0; ix++) {
          for (var iz = -10; iz < 10; iz++) {
            var cubeMaterial3 = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff , specular: 0x555555, shininess: 30 } );
            var grayness = Math.random() * 0.5 + 0.25,
                    mat = new THREE.MeshBasicMaterial(),
                    cubeGrid3 = new THREE.Mesh( geom3, cubeMaterial3 );

            cubeGrid3.position.x = iz * 5;
            cubeGrid3.position.z = ix * 5;
            cubeGrid3.position.y = 40
          //  cube.rotation.set( Math.random(), Math.random(), Math.random() )
            cubeGrid3.grayness = grayness; // *** NOTE THIS
            cubes3.add( cubeGrid3 );
          }
        }

        var geom4 = new THREE.CubeGeometry( 5, 5, 5 );
        var pointLight = new THREE.DirectionalLight( 0xffffff );
        pointLight.position.set( 0, 1, 1 ).normalize();
    //    scene.add(pointLight);
        var cubes4 = new THREE.Object3D();
        scene.add( cubes4 );

        for (var ix = -10; ix < 10; ix++) {
          for (var iz = -10; iz < 10; iz++) {
            var cubeMaterial4 = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff , specular: 0x555555, shininess: 30 } );
            var grayness = Math.random() * 0.5 + 0.25,
                    mat = new THREE.MeshBasicMaterial(),
                    cubeGrid4 = new THREE.Mesh( geom4, cubeMaterial4 );

            cubeGrid4.position.x = iz * 5;
            cubeGrid4.position.y = ix * 5;
            cubeGrid4.position.z = -100
          //  cube.rotation.set( Math.random(), Math.random(), Math.random() )
            cubeGrid.grayness = grayness; // *** NOTE THIS
            cubes4.add( cubeGrid4 );
          }
        }

        var geom5 = new THREE.CubeGeometry( 5, 5, 5 );
        var pointLight = new THREE.DirectionalLight( 0xffffff );
        pointLight.position.set( 0, 1, 100 ).normalize();
      //  scene.add(pointLight);
        var cubes5 = new THREE.Object3D();
        scene.add( cubes5 );

        for (var ix = -10; ix < 10; ix++) {
          for (var iz = -20; iz < 0; iz++) {
            var cubeMaterial5 = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff , specular: 0x555555, shininess: 30 } );
            var grayness = Math.random() * 0.5 + 0.25,
                    mat = new THREE.MeshBasicMaterial(),
                    cubeGrid5 = new THREE.Mesh( geom5, cubeMaterial5 );

            cubeGrid5.position.x = 45;
            cubeGrid5.position.y = ix * 5;
            cubeGrid5.position.z = iz * 5
          //  cube.rotation.set( Math.random(), Math.random(), Math.random() )
            cubeGrid5.grayness = grayness; // *** NOTE THIS
            cubes5.add( cubeGrid5 );
          }
        }

        var geom6 = new THREE.CubeGeometry( 5, 5, 5 );
        var pointLight = new THREE.DirectionalLight( 0xffffff );
        pointLight.position.set( 0, 1, 1 ).normalize();
    //    scene.add(pointLight);
        var cubes6 = new THREE.Object3D();
        scene.add( cubes6 );

        for (var ix = -10; ix < 10; ix++) {
          for (var iz = -20; iz < 0; iz++) {
            var cubeMaterial6 = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff , specular: 0x555555, shininess: 30 } );
            var grayness = Math.random() * 0.5 + 0.25,
                    mat = new THREE.MeshBasicMaterial(),
                    cubeGrid6 = new THREE.Mesh( geom6, cubeMaterial6 );

            cubeGrid6.position.x = -50;
            cubeGrid6.position.y = ix * 5;
            cubeGrid6.position.z = iz * 5
          //  cube.rotation.set( Math.random(), Math.random(), Math.random() )
            cubeGrid6.grayness = grayness; // *** NOTE THIS
            cubes6.add( cubeGrid6 );
          }
        }






    //ambient light
    var light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add( light );

    var controls = new THREE.OrbitControls( camera );
    controls.update();
    controls.minDistance = 10;
    controls.maxDistance = 800;
    var pulseRate = 0.0
    function animate() {
    	requestAnimationFrame( animate );

      var time = 4 * clock.getElapsedTime();

    	for ( var c = 0; c < particleGroup.children.length; c ++ )
    	{
    		var sprite = particleGroup.children[ c ];

    		// particle wiggle
    		// var wiggleScale = 2;
    		// sprite.position.x += wiggleScale * (Math.random() - 0.5);
    		// sprite.position.y += wiggleScale * (Math.random() - 0.5);
    		// sprite.position.z += wiggleScale * (Math.random() - 0.5);

    		// pulse away/towards center
    		// individual rates of movement
    		var a = particleAttributes.randomness[c] + 1;
    		var pulseFactor = Math.sin(a * time) * 0.1 + pulseRate;
    	//	sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
    	//	sprite.position.y = particleAttributes.startPosition[c].y * pulseFactor;
    	//	sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;
    	}


          	for ( var c = 0; c < particleGroup2.children.length; c ++ )
          	{
          		var sprite2 = particleGroup2.children[ c ];

          		// particle wiggle
          		// var wiggleScale = 2;
          		// sprite.position.x += wiggleScale * (Math.random() - 0.5);
          		// sprite.position.y += wiggleScale * (Math.random() - 0.5);
          		// sprite.position.z += wiggleScale * (Math.random() - 0.5);

          		// pulse away/towards center
          		// individual rates of movement
          		var a = particle2Attributes.randomness[c] + 1;
          		var pulseFactor = Math.sin(a * time) * 0.1 + pulseRate / 2.0;
          		sprite2.position.x = particle2Attributes.startPosition[c].x * pulseFactor;
          		sprite2.position.y = particle2Attributes.startPosition[c].y * pulseFactor;
          		sprite2.position.z = particle2Attributes.startPosition[c].z * pulseFactor;
          	}


    	// rotate the entire group
    	// particleGroup.rotation.x = time * 0.5;
    	particleGroup.rotation.y = time * 0.75;
      particleGroup2.rotation.y = time * -0.75;
    	// particleGroup.rotation.z = time * 1.0;

       TWEEN.update();
       /*
        if( video.readyState === video.HAVE_ENOUGH_DATA ){
          videoTexture.needsUpdate = true;
          cubeCamera.update(renderer, scene);
        }*/
      	renderer.render( scene, camera );
      }

    function render(){
        window.requestAnimationFrame(render);



        renderer.render(scene, camera);
      }
    animate();

    // create a new JAM instance:
    var jam = new JustAddMusic({
       // default audio to load:
      keyControl:true,
      src: "assets/jakwob.mp3",

      // this fires when the track ends:
      onended: function() { console.log("ended"); },



      // the ontick callback, called 60 time per second by default
      // with the latest audio data object as the only parameter
      ontick: function(o) {
        midHeight = o.mid.val;
        lowHeight = o.low.val;
        highHeight = o.high.val;
        pulseRate = (midHeight + lowHeight + highHeight) / 1.8


        function generateHeights() {
          let childrenOfCubes = cubes.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:
                position = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z  };
                target = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: lowHeight * 50 };
                tween = new TWEEN.Tween(position).to(target, 500);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].position.z = position.z;
                });
              //  childrenOfCubes[i].position.z = lowHeight * 30
              //  childrenOfCubes[i].scale.z = lowHeight * 30
                break
              case 2:

                break
              case 3:
              //  childrenOfCubes[i].position.z = highHeight * 30
                //childrenOfCubes[i].scale.z = highHeight * 30
                break
              default:
                break
            }
          }
        }
        function generateHeights2() {
          let childrenOfCubes = cubes2.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:
                position = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z  };
                target = { x : childrenOfCubes[i].position.x, y: (highHeight * -50) - 50, z: childrenOfCubes[i].position.z};
                tween = new TWEEN.Tween(position).to(target, 500);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].position.y = position.y;
                });
              //  childrenOfCubes[i].position.z = lowHeight * 30
              //  childrenOfCubes[i].scale.z = lowHeight * 30
                break
              case 2:

                break
              case 3:
              //  childrenOfCubes[i].position.z = highHeight * 30
                //childrenOfCubes[i].scale.z = highHeight * 30
                break
              default:
                break
            }
          }
        }
        function generateHeights3() {
          let childrenOfCubes = cubes3.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:
                position = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z  };
                target = { x : childrenOfCubes[i].position.x, y: (highHeight * 50) + 50, z: childrenOfCubes[i].position.z};
                tween = new TWEEN.Tween(position).to(target, 500);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].position.y = position.y;
                });
              //  childrenOfCubes[i].position.z = lowHeight * 30
              //  childrenOfCubes[i].scale.z = lowHeight * 30
                break
              case 2:

                break
              case 3:
              //  childrenOfCubes[i].position.z = highHeight * 30
                //childrenOfCubes[i].scale.z = highHeight * 30
                break
              default:
                break
            }
          }
        }
        function generateHeights4() {
          let childrenOfCubes = cubes4.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:
                position = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z  };
                target = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: (lowHeight * -50) -100};
                tween = new TWEEN.Tween(position).to(target, 500);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].position.z = position.z;
                });
              //  childrenOfCubes[i].position.z = lowHeight * 30
              //  childrenOfCubes[i].scale.z = lowHeight * 30
                break
              case 2:

                break
              case 3:
              //  childrenOfCubes[i].position.z = highHeight * 30
                //childrenOfCubes[i].scale.z = highHeight * 30
                break
              default:
                break
            }
          }
        }
        function generateHeights5() {
          let childrenOfCubes = cubes5.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:
                position = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z  };
                target = { x : (midHeight * 50) + 45, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z};
                tween = new TWEEN.Tween(position).to(target, 500);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].position.x = position.x;
                });
              //  childrenOfCubes[i].position.z = lowHeight * 30
              //  childrenOfCubes[i].scale.z = lowHeight * 30
                break
              case 2:

                break
              case 3:
              //  childrenOfCubes[i].position.z = highHeight * 30
                //childrenOfCubes[i].scale.z = highHeight * 30
                break
              default:
                break
            }
          }
        }
        function generateHeights6() {
          let childrenOfCubes = cubes6.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:
                position = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z  };
                target = { x : (midHeight * -50) -50, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z};
                tween = new TWEEN.Tween(position).to(target, 500);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].position.x = position.x;
                });
              //  childrenOfCubes[i].position.z = lowHeight * 30
              //  childrenOfCubes[i].scale.z = lowHeight * 30
                break
              case 2:

                break
              case 3:
              //  childrenOfCubes[i].position.z = highHeight * 30
                //childrenOfCubes[i].scale.z = highHeight * 30
                break
              default:
                break
            }
          }
        }


        generateHeights()
        generateHeights2()
        generateHeights3()
        generateHeights4()
        generateHeights5()
        generateHeights6()

        if (o.low.hit) {

          let childrenOfCubes = cubes.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:

                position = { x : 0, y: 0, z: 0  };
                target = getRandomTarget()

                tween = new TWEEN.Tween(position).to(target, 300);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].rotation.z = position.z;
                  childrenOfCubes[i].rotation.y = position.y;
                  childrenOfCubes[i].rotation.x = position.x;

                });
                break
              default:
                childrenOfCubes[i].material.color.setHex( Math.random() * 0xffffff  );
                break
            }
          }
          let childrenOfCubes4 = cubes4.children
          for (let i = 0, theLength = childrenOfCubes4.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:

                position = { x : 0, y: 0, z: 0  };
                target = getRandomTarget()

                tween = new TWEEN.Tween(position).to(target, 300);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes4[i].rotation.z = position.z;
                  childrenOfCubes4[i].rotation.y = position.y;
                  childrenOfCubes4[i].rotation.x = position.x;

                });
                break
              default:
                childrenOfCubes4[i].material.color.setHex( Math.random() * 0xffffff  );
                break
            }
          }
        }
        if (o.mid.hit) {
          let childrenOfCubes = cubes2.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:

                position = { x : 0, y: 0, z: 0  };
                target = getRandomTarget()

                tween = new TWEEN.Tween(position).to(target, 300);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].rotation.z = position.z;
                  childrenOfCubes[i].rotation.y = position.y;
                  childrenOfCubes[i].rotation.x = position.x;

                });
                break
              default:
                childrenOfCubes[i].material.color.setHex( Math.random() * 0xffffff  );
                break
            }
          }
          let childrenOfCubes4 = cubes6.children
          for (let i = 0, theLength = childrenOfCubes4.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:

                position = { x : 0, y: 0, z: 0  };
                target = getRandomTarget()

                tween = new TWEEN.Tween(position).to(target, 300);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes4[i].rotation.z = position.z;
                  childrenOfCubes4[i].rotation.y = position.y;
                  childrenOfCubes4[i].rotation.x = position.x;

                });
                break
              default:
                childrenOfCubes4[i].material.color.setHex( Math.random() * 0xffffff  );
                break
            }
          }
        }
        if (o.high.hit) {
          let childrenOfCubes = cubes3.children
          for (let i = 0, theLength = childrenOfCubes.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:

                position = { x : 0, y: 0, z: 0  };
                target = getRandomTarget()

                tween = new TWEEN.Tween(position).to(target, 300);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].rotation.z = position.z;
                  childrenOfCubes[i].rotation.y = position.y;
                  childrenOfCubes[i].rotation.x = position.x;

                });
                break
              default:
                childrenOfCubes[i].material.color.setHex( Math.random() * 0xffffff  );
                break
            }
          }
          let childrenOfCubes4 = cubes5.children
          for (let i = 0, theLength = childrenOfCubes4.length; i < theLength; i++) {
            let random = Math.floor(Math.random() * 3) + 1
            let position = {}
            let target = {}
            let tween = new TWEEN.Tween()
            switch (random) {
              case 1:

                position = { x : 0, y: 0, z: 0  };
                target = getRandomTarget()

                tween = new TWEEN.Tween(position).to(target, 300);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes4[i].rotation.z = position.z;
                  childrenOfCubes4[i].rotation.y = position.y;
                  childrenOfCubes4[i].rotation.x = position.x;

                });
                break
              default:
                childrenOfCubes4[i].material.color.setHex( Math.random() * 0xffffff  );
                break
            }
          }
        }

        function getRandomTarget() {
          let randomNumber = Math.floor(Math.random() * 3) + 1
          let target = {}
          let randomDegree = Math.random() < 0.5 ? -1 : 1;
        //  console.log(randomDegree)
          switch (randomNumber) {
            case 1:
                target = { x : 0, y: 0, z: THREE.Math.degToRad( 90 * randomDegree )};
              break
            case 2:
                target = { x : 0, y: THREE.Math.degToRad( 90 * randomDegree ), z: 0};
              break
            case 3:
                target = { x : THREE.Math.degToRad( 90 * randomDegree ), y: 0, z: 0};
              break;
            default:
              break
          }
          return target
        }


        /*
        if (o.mid.hit) {
          cubeGlow.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff )
          cubeGlow2.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff )
          cubeGlow3.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff )
        }
        if (o.high.hit) {
          cubeHighGlow.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff )
          cubeHighGlow2.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff )
          cubeHighGlow3.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff )
        }
        /*
        // vary the saturation and lightness based on the avg volume:
        let n = o.all.avg*100;

        // update the body background color:
        document.body.style.background = "hsl("+ hue +","+ n*0.6 +"%,"+ (n*0.4+10) +"%)";
        */
      }
    });





  });
