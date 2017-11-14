var hue = 60;
var midHeight = 0;
var lowHeight = 0;
var highHeight = 0;
$(function() {

    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xff0000 );
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.append(renderer.domElement);


    //video
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
      new THREE.SphereGeometry(100, 32, 32),
      videoMaterial
    );
    sphere.scale.x = -1;
    //scene.add(sphere)
    var near = 1, far = 200, resolution = 1000
    const cubeCamera = new THREE.CubeCamera(near, far, resolution);
    scene.add(cubeCamera);


    /*particles
    var materialParticle = new THREE.PointCloudMaterial({
      size: 1,
      vertexColors: THREE.VertexColors
    });
    var geometry = new THREE.Geometry();
    var x, y, z;
    _.times(3000, function(n){
      x = (Math.random() * 500) - 400;
      y = (Math.random() * 500) - 400;
      z = (Math.random() * 500) - 400;

      geometry.vertices.push(new THREE.Vector3(x, y, z));
      geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    });
    var pointCloud = new THREE.PointCloud(geometry, materialParticle);
    //scene.add(pointCloud);

    //cubes

    var geometry = new THREE.BoxGeometry( 8, 1, 8 );
    var material = new THREE.MeshPhongMaterial( {
        color: 0xffffff,

        envMap: cubeCamera.renderTarget.texture,


        reflectivity: 1.0
    } );

    var cube = new THREE.Mesh( geometry, material );
    var cube2 = new THREE.Mesh( geometry, material );
    var cube3 = new THREE.Mesh( geometry, material );
    var cubeLow = new THREE.Mesh( geometry, material );
    var cubeLow2 = new THREE.Mesh( geometry, material );
    var cubeLow3 = new THREE.Mesh( geometry, material );
    var cubeHigh = new THREE.Mesh( geometry, material );
    var cubeHigh2 = new THREE.Mesh( geometry, material );
    var cubeHigh3 = new THREE.Mesh( geometry, material );


    scene.add( cube );
    scene.add( cube2 );
    scene.add( cube3 );
    scene.add( cubeLow );
    scene.add( cubeLow2 );
    scene.add( cubeLow3 );
    scene.add( cubeHigh );
    scene.add( cubeHigh2 );
    scene.add( cubeHigh3 );
    cubeLow.position.x -= 10
    cubeLow2.position.x -= 10
    cubeLow3.position.x -= 10
    cube2.position.z -= 10
    cube3.position.z -= 20
    cubeLow2.position.z -= 10
    cubeLow3.position.z -= 20
    cubeHigh2.position.z -= 10
    cubeHigh3.position.z -= 20
    cubeHigh.position.x += 10
    cubeHigh2.position.x += 10
    cubeHigh3.position.x += 10
    camera.position.z = 40;
    camera.position.x = 20;
    camera.position.y = 14;



 */
 camera.position.z = 40;
 camera.position.x = 20;
 camera.position.y = 14;











    /*
    var customMaterial = new THREE.ShaderMaterial(
    {
        uniforms:
      {
        "c":   { type: "f", value: 1.0 },
        "p":   { type: "f", value: 1.4 },
        glowColor: { type: "c", value: new THREE.Color(0xffff00) },
        viewVector: { type: "v3", value: camera.position }
      },
      vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    }   );

    var customMaterialBlue = customMaterial.clone()
    customMaterialBlue.uniforms.glowColor.value.setHex(0x0080ff)
    var customMaterialGreen = customMaterial.clone()
    customMaterialGreen.uniforms.glowColor.value.setHex(0x00ff00)
    var colors = [0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, ]

    var cubeGlow = new THREE.Mesh( geometry, customMaterial.clone() );

    cubeGlow.scale.multiplyScalar(1.2);
    scene.add( cubeGlow );
    var cubeGlow2 = new THREE.Mesh( geometry, customMaterial.clone() );

    cubeGlow2.position.z -= 10
    cubeGlow2.scale.multiplyScalar(1.2);
    scene.add(cubeGlow2)
    var cubeGlow3 = new THREE.Mesh( geometry, customMaterial.clone() );

    cubeGlow3.position.z -= 20
    cubeGlow3.scale.multiplyScalar(1.2);
    scene.add(cubeGlow3)

    var cubeLowGlow = new THREE.Mesh( geometry, customMaterialBlue.clone() );

    cubeLowGlow.position.x -= 10
    cubeLowGlow.scale.multiplyScalar(1.2);
    scene.add( cubeLowGlow );
    var cubeLowGlow2 = new THREE.Mesh( geometry, customMaterialBlue.clone() );

    cubeLowGlow2.position.z -= 10
    cubeLowGlow2.position.x -= 10
    cubeLowGlow2.scale.multiplyScalar(1.2);
    scene.add(cubeLowGlow2)
    var cubeLowGlow3 = new THREE.Mesh( geometry, customMaterialBlue.clone() );

    cubeLowGlow3.position.z -= 20
    cubeLowGlow3.position.x -= 10
    cubeLowGlow3.scale.multiplyScalar(1.2);
    scene.add(cubeLowGlow3)

    var cubeHighGlow = new THREE.Mesh( geometry, customMaterialGreen.clone() );

    cubeHighGlow.position.x += 10
    cubeHighGlow.scale.multiplyScalar(1.2);
    scene.add( cubeHighGlow );
    var cubeHighGlow2 = new THREE.Mesh( geometry, customMaterialGreen.clone() );

    cubeHighGlow2.position.z -= 10
    cubeHighGlow2.position.x += 10
    cubeHighGlow2.scale.multiplyScalar(1.2);
    scene.add(cubeHighGlow2)
    var cubeHighGlow3 = new THREE.Mesh( geometry, customMaterialGreen.clone() );

    cubeHighGlow3.position.z -= 20
    cubeHighGlow3.position.x += 10
    cubeHighGlow3.scale.multiplyScalar(1.2);
    scene.add(cubeHighGlow3)


    */

    //CUBE GRID

        var geom = new THREE.CubeGeometry( 5, 5, 5 );
        var pointLight = new THREE.DirectionalLight( 0xffffff );
        pointLight.position.set( 0, 1, 1 ).normalize();
        scene.add(pointLight);
        var cubes = new THREE.Object3D();
        scene.add( cubes );

        for (var ix = -20; ix < 20; ix++) {
          for (var iz = -20; iz < 20; iz++) {
            let cubeMaterial = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff , specular: 0x555555, shininess: 30 } );
            var grayness = Math.random() * 0.5 + 0.25,
                    mat = new THREE.MeshBasicMaterial(),
                    cubeGrid = new THREE.Mesh( geom, cubeMaterial );

            cubeGrid.position.x = iz * 5;
            cubeGrid.position.y = ix * 5;
          //  cube.rotation.set( Math.random(), Math.random(), Math.random() )
            cubeGrid.grayness = grayness; // *** NOTE THIS
            cubes.add( cubeGrid );
          }
        }






    //ambient light
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    var controls = new THREE.OrbitControls( camera );
    controls.update();
    controls.minDistance = 10;
    controls.maxDistance = 80;

    function animate() {
    	requestAnimationFrame( animate );
      /*
      cube.position.y = midHeight * 20
      cube.scale.y = midHeight * 20
      cubeGlow.position.y = midHeight * 21
      cubeGlow.scale.y = midHeight * 21

      cube2.position.y = midHeight * 20
      cube2.scale.y = midHeight * 20
      cubeGlow2.position.y = midHeight * 21
      cubeGlow2.scale.y = midHeight * 21

      cube3.position.y = midHeight * 20
      cube3.scale.y = midHeight * 20
      cubeGlow3.position.y = midHeight * 21
      cubeGlow3.scale.y = midHeight * 21

      cubeLow.position.y = lowHeight * 20
      cubeLow.scale.y = lowHeight * 20
      cubeLowGlow.position.y = lowHeight * 21
      cubeLowGlow.scale.y = lowHeight * 21

      cubeLow2.position.y = lowHeight * 20
      cubeLow2.scale.y = lowHeight * 20
      cubeLowGlow2.position.y = lowHeight * 21
      cubeLowGlow2.scale.y = lowHeight * 21

      cubeLow3.position.y = lowHeight * 20
      cubeLow3.scale.y = lowHeight * 20
      cubeLowGlow3.position.y = lowHeight * 21
      cubeLowGlow3.scale.y = lowHeight * 21

      cubeHigh.position.y = highHeight * 20
      cubeHigh.scale.y = highHeight * 20
      cubeHighGlow.position.y = highHeight * 21
      cubeHighGlow.scale.y = highHeight * 21

      cubeHigh2.position.y = highHeight * 20
      cubeHigh2.scale.y = highHeight * 20
      cubeHighGlow2.position.y = highHeight * 21
      cubeHighGlow2.scale.y = highHeight * 21

      cubeHigh3.position.y = highHeight * 20
      cubeHigh3.scale.y = highHeight * 20
      cubeHighGlow3.position.y = highHeight * 21
      cubeHighGlow3.scale.y = highHeight * 21

      pointCloud.position.x = cubeGlow.position.x
      pointCloud.position.y = cubeGlow.position.y
      pointCloud.position.z = cubeGlow.position.z
    //  console.log(pointCloud.position)

     */
     TWEEN.update();
      if( video.readyState === video.HAVE_ENOUGH_DATA ){
        videoTexture.needsUpdate = true;
        cubeCamera.update(renderer, scene);
      }
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
      src: "assets/lifelike.mp3",

      // this fires when the track ends:
      onended: function() { console.log("ended"); },



      // the ontick callback, called 60 time per second by default
      // with the latest audio data object as the only parameter
      ontick: function(o) {
        midHeight = o.mid.val;
        lowHeight = o.low.val;
        highHeight = o.high.val;



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
                target = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: lowHeight * 30 };
                tween = new TWEEN.Tween(position).to(target, 500);
                tween.start();
                tween.onUpdate(function(){

                  childrenOfCubes[i].position.z = position.z;
                });
              //  childrenOfCubes[i].position.z = lowHeight * 30
              //  childrenOfCubes[i].scale.z = lowHeight * 30
                break
              case 2:
                position = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: childrenOfCubes[i].position.z  };
                target = { x : childrenOfCubes[i].position.x, y: childrenOfCubes[i].position.y, z: midHeight * 30 };
                tween = new TWEEN.Tween(position).to(target, 500);
              //  childrenOfCubes[i].position.z = midHeight * 30
              //  childrenOfCubes[i].scale.z = midHeight * 30
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


      //   change the hue on each hit:
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

                tween = new TWEEN.Tween(position).to(target, 500);
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
        }

        function getRandomTarget() {
          let randomNumber = Math.floor(Math.random() * 3) + 1
          let target = {}
          let randomDegree = Math.random() < 0.5 ? -1 : 1;
          console.log(randomDegree)
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
