import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

const Page = () => {
	useEffect(() => {
		const $ = {
			createScene() {
				const canvas = document.getElementById('c')
				const width = (canvas.width = window.innerWidth)
				const height = (canvas.height = window.innerHeight)
				// 创建场景
				const scene = new THREE.Scene()

				this.scene = scene
				this.width = width
				this.height = height
				this.canvas = canvas
			},
			createLights() {
				// 创建全局光源
				const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
				// 创建方向光源
				const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
				this.scene.add(ambientLight, directionalLight)
			},
			createObjects() {
				// 创建立方体
				const geometry = new THREE.BoxGeometry(1, 1, 1)
				// 创建材质 //基础材质，不受光照影响
				// const material = new THREE.MeshBasicMaterial({
				// 	color: 0xff0000,
				// })

				// 创建材质 //网格材质，受光照影响
				// const material = new THREE.MeshLambertMaterial({
				// 	color: 0xff0000,
				// })
				// 给每个面设置不同的颜色
				const materialList = []
				for (let i = 0; i < geometry.groups.length; i++) {
					const material = new THREE.MeshLambertMaterial({
						color: Math.random() * 0xffffff,
					})
					materialList.push(material)
				}
				// 创建网格
				const mesh = new THREE.Mesh(geometry, materialList)
				// 添加到场景
				this.mesh = mesh
				this.scene.add(mesh)
			},
			createCamera() {
				// 创建相机
				const camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
				// 创建正交相机
				// const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 1000)
				// 设置相机位置
				camera.position.set(2, 2, 3)
				// 设置相机看向的位置
				camera.lookAt(this.scene.position)

				// 相机添加到场景
				this.scene.add(camera)

				this.camera = camera
			},
			helper() {
				// 创建坐标轴
				const axesHelper = new THREE.AxesHelper(5)
				// 添加辅助平面
				const gridHelper = new THREE.GridHelper()
				this.scene.add(axesHelper, gridHelper)
			},
			render() {
				// 创建渲染器
				const renderer = new THREE.WebGLRenderer({
					canvas: this.canvas,
					// 抗锯齿
					antialias: true,
				})

				// 设置像素比
				renderer.setPixelRatio(window.devicePixelRatio)

				// 设置渲染器大小
				renderer.setSize(this.width, this.height)

				// 渲染
				renderer.render(this.scene, this.camera)

				this.renderer = renderer
			},
			controls() {
				// 创建轨道控制器
				const orbitControls = new OrbitControls(this.camera, this.canvas)
				// 开启惯性
				orbitControls.enableDamping = true
				this.orbitControls = orbitControls
			},
			createStats() {
				// 创建性能监控
				const stats = new Stats()
				stats.showPanel(0)
				document.body.appendChild(stats.dom)
				this.stats = stats
			},
			animate() {
				// const elapsedTime = clock.getElapsedTime()
				this.mesh.rotation.y += 0.01
				this.orbitControls.update()
				this.renderer.render(this.scene, this.camera)
				requestAnimationFrame(() => this.animate())
				this.stats.update()
			},
			fitView() {
				// 监听窗口变化
				window.addEventListener('resize', () => {
					const width = (this.canvas.width = window.innerWidth)
					const height = (this.canvas.height = window.innerHeight)
					// 设置渲染器大小
					this.renderer.setSize(width, height)
					// 设置相机纵横比
					this.camera.aspect = width / height
					// 更新相机投影矩阵
					this.camera.updateProjectionMatrix()
				})
			},
			init() {
				this.createScene()
				this.createLights()
				this.createObjects()
				this.createCamera()
				this.helper()
				this.render()
				this.controls()
				this.createStats()
				this.animate()
				this.fitView()
			},
		}
		$.init()
	}, [])

	return (
		<>
			<canvas id="c" />;
		</>
	)
}

export default Page
