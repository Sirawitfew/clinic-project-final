// stores/useDiagnosisStore.ts
import { defineStore } from 'pinia'
import { useFetch } from '#app'

export const useDiagnosisStore = defineStore('diagnosis', {
  state: () => ({
    physicians: [] as Array<{ id: number; name: string }>,
    diagnoses: [] as Array<{ id: number; patientId: number; patientHistoryId: number; diagnosis: string; treatmentPlan: string; notes: string; physicianId: number }>,
  }),
  actions: {
    async fetchPhysicians() {
      try {
        const { data } = await useFetch('/api/physicians')
        this.physicians = data.value || []
      } catch (error) {
        console.error('Failed to fetch physicians:', error)
      }
    },
    async createDiagnosis(diagnosisData: { patientId: number; patientHistoryId: number; diagnosis: string; treatmentPlan: string; notes: string; physicianId: number }) {
      try {
        const { data } = await useFetch('/api/diagnosis', {
          method: 'POST',
          body: diagnosisData,
        })
        this.diagnoses.push(data.value)
      } catch (error) {
        console.error('Failed to create diagnosis:', error)
      }
    },
  },
})
