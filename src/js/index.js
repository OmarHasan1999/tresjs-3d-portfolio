import { reactive, ref } from 'vue'

const modelPosition = reactive({ x : -24, y: 0, z: 2.5 })
const cameraRotateY = ref(0)
const isMoving = ref(false)
const direction = ref('forward')

export function useModelPosition () {
    return {
        modelPosition,
        cameraRotateY,
        isMoving,
        direction,
    }
}