import { useEffect } from 'react'
import * as THREE from 'three'

const Page = () => {
	useEffect(() => {
		console.log(THREE)
		const canvas = document.getElementById('c')
		const width = (canvas.width = window.innerWidth)
		const height = (canvas.height = window.innerHeight)

		// 创建场景
		const scene = new THREE.Scene()
		// 创建立方体
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		// 创建材质 //基础材质，不受光照影响
		// const material = new THREE.MeshBasicMaterial({
		// 	color: 0xff0000,
		// })

		// 创建材质 //网格材质，受光照影响
		const material = new THREE.MeshLambertMaterial({
			color: 0xff0000,
		})

		// 创建网格
		const mesh = new THREE.Mesh(geometry, material)
		// 添加到场景
		scene.add(mesh)

		// 创建坐标轴
		const axesHelper = new THREE.AxesHelper(5)
		scene.add(axesHelper)

    // 创建全局光源
    const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
    // 创建方向光源
    const directionalLight = new THREE.DirectionalLight(0xffffff,0.5)
    
    scene.add(ambientLight, directionalLight)

		// 创建相机
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
		// 设置相机位置
		camera.position.set(2, 2, 3)
		// 设置相机看向的位置
		camera.lookAt(scene.position)

		// 相机添加到场景
		scene.add(camera)

		// 创建渲染器
		const renderer = new THREE.WebGLRenderer({
			canvas,
			// 抗锯齿
			antialias: true,
		})

		// 设置像素比
		renderer.setPixelRatio(window.devicePixelRatio)

		// 设置渲染器大小
		renderer.setSize(width, height)

		// 渲染
		renderer.render(scene, camera)
	}, [])

	return (
		<>
			start your project
			<canvas id="c" />;
		</>
	)
}

export default Page
