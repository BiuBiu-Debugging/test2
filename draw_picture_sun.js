

const scene = new THREE.Scene();
document.getElementById("backbround_musics").src="/static/cinamon.mp3"

// 1. Background galaxy đẹp hơn (tím đen vũ trụ)
function create_galaxy_texture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Gradient nền tím đen vũ trụ
  const grd = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
  grd.addColorStop(0, "rgba(11, 2, 24, 1)");     // tím đậm giữa
  grd.addColorStop(0.5, "rgba(3, 0, 8, 1)");    // đen tím
  grd.addColorStop(1, "rgb(0, 0, 0)");       // đen hoàn toàn
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1024, 1024);

  return new THREE.CanvasTexture(canvas);
}

scene.background = create_galaxy_texture();
scene.fog = new THREE.FogExp2(0x0a0014, 0.00025); 
function create_stars() {
  const starCount = 10000;
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  const color = new THREE.Color();

  for (let i = 0; i < starCount; i++) {
    positions[i * 3]     = THREE.MathUtils.randFloatSpread(5000);
    positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(5000);
    positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(5000);

    sizes[i] = Math.random() * 3 + 0.5;

    const hue = Math.random() < 0.8 ? 0.6 : Math.random() * 0.1; 
    color.setHSL(hue, Math.random() * 0.3, 0.8 + Math.random() * 0.2);

    colors[i * 3]     = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const textureLoader = new THREE.TextureLoader();
  const starTexture = textureLoader.load('../static/start.png'); 
  const material = new THREE.PointsMaterial({
    size: 30,                    
    sizeAttenuation: true,
    map: starTexture,
    transparent: true,
    opacity: 0.9,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    alphaTest: 0.1
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
  return stars;
}

function createSun() {
  // Tạo geometry cho 1 điểm duy nhất ở tâm (0,0,0)
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array([0, 0, 0]); // Float32Array, 3 phần tử cho 1 vertex
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Load texture
  const textureLoader = new THREE.TextureLoader(); // Đúng cách viết (T hoa)
  const sunTexture = textureLoader.load('../static/sun.png'); // Đường dẫn giữ nguyên

  // Material cho point
  const material = new THREE.PointsMaterial({
    size: 1000,                   
    sizeAttenuation: true,       
    map: sunTexture,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending, 
    depthWrite: false,         
    alphaTest: 0.01               
  });

  const sun = new THREE.Points(geometry, material);
  sun.rotation.z += 0.5;
  scene.add(sun);

  return sun;
}



function createOrbitingPlanet(textureUrl, radius = 100, orbitRadius = 800, orbitSpeed = 0.2, rotationSpeed = 0.005) {
  const planetGroup = new THREE.Group();
  const geometry = new THREE.SphereGeometry(radius, 64, 64);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(textureUrl);

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 50,          
  });
  const planet = new THREE.Mesh(geometry, material);
  planetGroup.add(planet);
  planetGroup.position.x = orbitRadius;
  scene.add(planetGroup);

  function update() {
    const time = Date.now() * 0.001; // thời gian chạy
    planetGroup.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
    planetGroup.position.z = Math.sin(time * orbitSpeed) * orbitRadius;

    planet.rotation.y += rotationSpeed;
  }
  function update1() {
    const time = Date.now() * 0.001; // thời gian chạy
    planetGroup.position.y = Math.cos(time * orbitSpeed) * orbitRadius;
    planetGroup.position.x = Math.sin(time * orbitSpeed) * orbitRadius;

    planet.rotation.z += rotationSpeed;
  }function update2() {
    const time = Date.now() * 0.001; // thời gian chạy
    planetGroup.position.z = Math.cos(time * orbitSpeed) * orbitRadius;
    planetGroup.position.x = Math.sin(time * orbitSpeed) * orbitRadius;

    planet.rotation.y += rotationSpeed;
  }function update3() {
    const time = Date.now() * 0.001; // thời gian chạy
    planetGroup.position.z = Math.cos(time * orbitSpeed) * orbitRadius;
    planetGroup.position.x = Math.sin(time * orbitSpeed) * orbitRadius;
    planetGroup.position.y = Math.sin(time * orbitSpeed) * orbitRadius;
    planet.rotation.y += rotationSpeed;
  }function update4() {
    const time = Date.now() * 0.001; // thời gian chạy
    planetGroup.position.y = Math.cos(time * orbitSpeed) * orbitRadius;
    planetGroup.position.x = Math.sin(time * orbitSpeed) * orbitRadius;
    planetGroup.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
    planet.rotation.z += rotationSpeed;
  }
  function update5() {
    const time = Date.now() * 0.001; // thời gian chạy
    planetGroup.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
    planetGroup.position.y = Math.sin(time * orbitSpeed) * orbitRadius;
    planetGroup.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
    planet.rotation.z += rotationSpeed;
  }
  function update6() {
    const time = Date.now() * 0.001; // thời gian chạy
    planetGroup.position.y = Math.cos(time * orbitSpeed) * orbitRadius;
    planetGroup.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
    planetGroup.position.x = Math.sin(time * orbitSpeed) * orbitRadius;
    planet.rotation.z += rotationSpeed;
  }
  return {
    object: planetGroup,
    update: update,update1,update2,update3,update4,update5,update6
  };
}


const Mercury = createOrbitingPlanet(
  '../static/Mercury.png',
  35,
  390,
  0.3,
  0.008
);

const venus = createOrbitingPlanet(
  '../static/Venus.png',
  87,
  720,
  0.3,
  0.008
);



const earth = createOrbitingPlanet(
  '../static/earth.png',   // đường dẫn texture
  91,                      // bán kính hành tinh
  1000,                     // khoảng cách từ mặt trời (bán kính quỹ đạo)
  0.2,                     // tốc độ quỹ đạo (càng lớn càng nhanh)
  0.01                     // tốc độ tự quay
);

// Nếu muốn thêm Sao Hỏa




const mars = createOrbitingPlanet(
  '../static/aa.png',
  49,
  1200,
  0.3,
  0.008
);


const Jupiter = createOrbitingPlanet(
  '../static/Jupiter.png',
  80,
  1500,
  0.3,
  0.008
);


const satun = createOrbitingPlanet(
  '../static/Saturn.png',
  84,
  1800,
  0.3,
  0.008
);

const uranus = createOrbitingPlanet(
  '../static/Uranus.png',
  110,
  2000,
  0.3,
  0.008
);
const neptun = createOrbitingPlanet(
  '../static/Neptune.png',
  105,
  2400,
  0.3,
  0.008
);









sun=createSun()
const starField = create_stars(); 


const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 50, 200);

// 4. Renderer
const container = document.getElementById("nofing");
if (!container) {
  console.error("Không tìm thấy element #nofing");
} else {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // 5. Cube ví dụ

  // 6. Ánh sáng
  const ambientLight = new THREE.AmbientLight(0x404060);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(100, 100, 50);
  scene.add(directionalLight);

  // 7. Animation + camera nhẹ nhàng bay
  const clock = new THREE.Clock();

  function animate() {
    const elapsedTime = clock.getElapsedTime();
    // Camera di chuyển nhẹ như đang bay trong vũ trụ
    camera.position.x = Math.sin(elapsedTime * 0.1) * 2500;
    camera.position.z = Math.cos(elapsedTime * 0.1) * 2500 +1000;
    camera.lookAt(0, 0, 0);

    // Twinkle nhẹ cho sao (tùy chọn)
    starField.rotation.y = elapsedTime * 0.01;
    sun.rotation.y = elapsedTime * 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }


function createPlanet(url, count) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = THREE.MathUtils.randFloatSpread(6000);
    positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(6000);
    positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(6000);

    // Kích thước ngẫu nhiên từ 10 đến 300 (tùy chỉnh theo ý bạn)
    sizes[i] = Math.random() * 200 + 100; 
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(url);

  // Shader tùy chỉnh để dùng attribute 'size'
  const material = new THREE.ShaderMaterial({
    uniforms: {
      pointTexture: { value: texture },
      scale: { value: 1.0 } // có thể điều chỉnh nếu cần
    },
    vertexShader: `
      attribute float size;
      varying float vSize;
      
      void main() {
        vSize = size;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z); 
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      varying float vSize;
      
      void main() {
        vec4 textureColor = texture2D(pointTexture, gl_PointCoord);
        if (textureColor.a < 0.1) discard;
        gl_FragColor = textureColor;
        gl_FragColor.a *= 0.8; // opacity
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.userData.id = 'planet';
  scene.add(points);

  return points;
}

const planetTextures = ["../static/pl1.png","../static/pl2.png","../static/pl3.png","../static/pl4.png","../static/pl5.png","../static/pl7.png"];    
const planetCounts = [12,11,12,11,5,7];

function add_planets() {
  for (let i = 0; i < planetTextures.length; i++) {  
    createPlanet(planetTextures[i], planetCounts[i]);
  }
}
add_planets();


  animate();
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate1() {
  requestAnimationFrame(animate1);
  earth.update1();
  mars.update4();
  Mercury.update2();
  venus.update3();
  Jupiter.update();
  satun.update5();
  uranus.update2();
  neptun.update6();
}
animate1();