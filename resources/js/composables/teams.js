import { ref } from 'vue'
import axios from "axios";

export default function useTeams() {
    const teams = ref([])
    const team = ref([])
    const errors = ref('')
    const success = ref('')
    const modalActive = ref(null);

    const getTeams = async () => {
        let response = await axios.get('/api/teams')
        teams.value = response.data.data;
    }

    const getTeam = async (id) => {
        let response = await axios.get('/api/teams/' + id)
        team.value = response.data.data;
    }

    const storeTeam = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/teams/', data)
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateTeam = async (id) => {
        errors.value = ''
        success.value = ''
        try {
            await axios.put('/api/teams/' + id, team.value)
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyTeam = async (id) => {
        await axios.delete('/api/teams/' + id)
    }

    const closeModal = async (successMsg) => {
        modalActive.value = false
        success.value = successMsg
        await getTeams();
    }

    const closeSuccessAlert = async () => {
        success.value = ''
    }

    return {
        teams: teams,
        team: team,
        errors,
        success,
        modalActive,
        getTeams,
        getTeam,
        storeTeam,
        updateTeam,
        destroyTeam,
        closeModal,
        closeSuccessAlert
    }
}
