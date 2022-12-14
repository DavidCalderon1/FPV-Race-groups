import { ref } from 'vue'
import axios from "axios";

export default function useCompanies() {
    const companies = ref([])
    const company = ref([])
    const errors = ref('')
    const success = ref('')
    const modalActive = ref(null);

    const getCompanies = async () => {
        let response = await axios.get('/api/companies')
        companies.value = response.data.data;
    }

    const getCompany = async (id) => {
        let response = await axios.get('/api/companies/' + id)
        company.value = response.data.data;
    }

    const storeCompany = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/companies/', data)
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateCompany = async (id) => {
        errors.value = ''
        success.value = ''
        try {
            await axios.put('/api/companies/' + id, company.value)
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyCompany = async (id) => {
        await axios.delete('/api/companies/' + id)
    }

    const closeModal = async (successMsg) => {
        modalActive.value = false
        success.value = successMsg
        await getCompanies();
    }

    const closeSuccessAlert = async () => {
        success.value = ''
    }

    return {
        companies,
        company,
        errors,
        success,
        modalActive,
        getCompanies,
        getCompany,
        storeCompany,
        updateCompany,
        destroyCompany,
        closeModal,
        closeSuccessAlert
    }
}
