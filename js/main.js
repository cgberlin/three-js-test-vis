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
    scene.add(sphere)
    
    
    //cubes
  
  		
  	
    
    var near = 1, far = 200, resolution = 1000
    const cubeCamera = new THREE.CubeCamera(near, far, resolution); 
    scene.add(cubeCamera);
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
    
    
    //ambient light
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    
    var controls = new THREE.OrbitControls( camera );
    controls.update();
    controls.minDistance = 10;
    controls.maxDistance = 80;
    
    function animate() {
    	requestAnimationFrame( animate );
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
      
      if( video.readyState === video.HAVE_ENOUGH_DATA ){
        videoTexture.needsUpdate = true;
        cubeCamera.update(renderer, scene);
      }
    	renderer.render( scene, camera );
    }
    animate();
  
    // create a new JAM instance:
    var jam = new JustAddMusic({
       // default audio to load:
      src: "assets/brooks.mp3",

      // this fires when the track ends:
      onended: function() { console.log("ended"); },
      
      
      
      // the ontick callback, called 60 time per second by default
      // with the latest audio data object as the only parameter
      ontick: function(o) {
        midHeight = o.mid.val;
        lowHeight = o.low.val;
        highHeight = o.high.val;
        
        console.log('low' + ' ' + o.low.val * 100)
        console.log('mid' + ' ' + o.mid.val * 100)
        console.log('high' + ' ' + o.high.val * 100)
        /* update the bar heights based on instantaneous values:
        bar1.style.height = o.low.val * 100+"%";
        bar2.style.height = o.mid.val * 100+"%";
        bar3.style.height = o.high.val * 100+"%";
        
        */// change the hue on each hit:
        if (o.low.hit) { 
          cubeLowGlow.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff ) 
          cubeLowGlow2.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff ) 
          cubeLowGlow3.material.uniforms.glowColor.value.setHex(Math.random() * 0xffffff ) 
        } 
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