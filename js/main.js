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
    video.src = "assets/beach_resized.mp4";
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
      cube2.position.y = midHeight * 20
      cube2.scale.y = midHeight * 20
      cube3.position.y = midHeight * 20
      cube3.scale.y = midHeight * 20
      
      cubeLow.position.y = lowHeight * 20
      cubeLow.scale.y = lowHeight * 20
      cubeLow2.position.y = lowHeight * 20
      cubeLow2.scale.y = lowHeight * 20
      cubeLow3.position.y = lowHeight * 20
      cubeLow3.scale.y = lowHeight * 20
      
      cubeHigh.position.y = highHeight * 20
      cubeHigh.scale.y = highHeight * 20
      cubeHigh2.position.y = highHeight * 20
      cubeHigh2.scale.y = highHeight * 20
      cubeHigh3.position.y = highHeight * 20
      cubeHigh3.scale.y = highHeight * 20
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
        /* update the bar heights based on instantaneous values:
        bar1.style.height = o.low.val * 100+"%";
        bar2.style.height = o.mid.val * 100+"%";
        bar3.style.height = o.high.val * 100+"%";
        
        // change the hue on each hit:
        if (o.low.hit) { hue = (hue+100)%360; }
        
        // vary the saturation and lightness based on the avg volume:
        let n = o.all.avg*100;
        
        // update the body background color:
        document.body.style.background = "hsl("+ hue +","+ n*0.6 +"%,"+ (n*0.4+10) +"%)";
        */
      }
    });
  });