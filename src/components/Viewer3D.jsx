import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

function Viewer3D() {

    

  const mountRef = useRef(null)

  useEffect(() => {
    const mountElement = mountRef.current
    if (!mountElement) return

    const width = mountElement.clientWidth || 800
    const height = mountElement.clientHeight || 500

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xe5e7eb)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    mountElement.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 0.75, 0)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

    const gridHelper = new THREE.GridHelper(20, 20)
    scene.add(gridHelper)

    const axesHelper = new THREE.AxesHelper(3)
    scene.add(axesHelper)

    const geometry = new THREE.BoxGeometry(2, 1.5, 3)
    const material = new THREE.MeshStandardMaterial({ color: 0x6699cc })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = 0.75
    scene.add(mesh)

    let animationId

    function animate() {
      animationId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      controls.dispose()
      renderer.dispose()

      if (mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
}

export default Viewer3D