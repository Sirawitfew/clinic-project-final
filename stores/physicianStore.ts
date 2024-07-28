
// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import axios from 'axios'

// export const usePhysicianStore = defineStore('physician', () => {
//   const physician = ref<any[]>([])

//   const fetchPhysician = async () => {
//     try {
//       const response = await axios.get('/api/physician')
//       physician.value = response.data
//     } catch (error) {
//       console.error('Error fetching users:', error)
//     }
//   }

//   const addPhysician = async (physician: any) => {
//     try {
//       await axios.post('/api/physician', physician)
//       await fetchPhysician()
//     } catch (error) {
//       console.error('Error adding user:', error)
//     }
//   }

//   const updatePhysician = async (user: any) => {
//     try {
//       await axios.put('/api/physician', user)
//       await fetchPhysician()
//     } catch (error) {
//       console.error('Error updating user:', error)
//     }
//   }

//   const deletePhysician = async (id: number) => {
//     try {
//       await axios.delete('/api/physician', { data: { id } })
//       await fetchPhysician()
//     } catch (error) {
//       console.error('Error deleting user:', error)
//     }
//   }

//   return { physician, fetchPhysician, addPhysician, updatePhysician, deletePhysician }
// })

