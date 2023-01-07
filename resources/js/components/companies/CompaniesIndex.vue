<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">

        <div v-if="success">
            <div class="bg-green-600 flex justify-between text-green-200 rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                <p class="text-sm pr-4">
                  {{ success }}
                </p>
                <strong class="text-l float-right align-center cursor-pointer alert-del px-4"
                        @click="closeSuccessAlert()"
                >&times;</strong>
            </div>
        </div>
        <div class="flex place-content-end mb-4">
            <button @click="createCompanyModal()"
                class="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer">
<!--                <router-link :to="{ name: 'companies.create' }" class="text-sm font-medium">Create company</router-link>-->
                Create company
            </button>
        </div>

        <table class="min-w-full border divide-y divide-gray-200">
            <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Name</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Email</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Address</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Website</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50">
                    </th>
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-for="item in companies" :key="item.id">
                    <tr class="bg-white">
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ item.name }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ item.email }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ item.address }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ item.website }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
<!--                            <router-link :to="{ name: 'companies.edit', params: { id: item.id } }"-->
<!--                                         class="mr-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">-->
<!--                                Edit-->
<!--                            </router-link>-->
                            <button @click="editCompanyModal(item.id)"
                                    class="mr-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                                Edit
                            </button>
                            <button @click="deleteCompany(item.id)"
                                    class="inline-flex items-center px-4 py-2 text-red-200 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
                                Delete
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="closeModal">
      <CompaniesEdit v-if="edit" :id="companyID" @close-modal="closeModal"></CompaniesEdit>
      <CompaniesCreate v-if="create" @close-modal="closeModal"></CompaniesCreate>
    </BaseModal>
</template>

<script setup>
import useCompanies from "@/composables/companies";
import {onMounted, ref} from "vue";
import BaseModal from "@/components/BaseModal.vue";
import CompaniesEdit from "@/components/companies/CompaniesEdit.vue";
import CompaniesCreate from "@/components/companies/CompaniesCreate.vue";

const { companies, company, success, modalActive, getCompanies, destroyCompany, closeModal, closeSuccessAlert } = useCompanies()
onMounted(getCompanies)
const deleteCompany = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroyCompany(id);
    await getCompanies();
    success.value = 'Registro eliminado'
}

const companyID = ref(null);
const create = ref(null);
const edit = ref(null);
const createCompanyModal = async () => {
    modalActive.value = true
    create.value = true
    edit.value = false
}
const editCompanyModal = async (id) => {
    companyID.value = id
    modalActive.value = true
    edit.value = true
    create.value = false
}

</script>
