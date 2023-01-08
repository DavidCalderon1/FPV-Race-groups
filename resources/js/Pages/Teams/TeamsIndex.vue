<template>

  <Head title="Teams"/>

  <BreezeAuthenticatedLayout>
      <template #header>
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
          Teams
        </h2>
      </template>

      <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">

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

          <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div class="p-6 bg-white border-b border-gray-200">
              <div class="flex place-content-end mb-4">
                <button @click="createTeamModal()"
                        class="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md cursor-pointer">
                  Create team
                </button>
              </div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">#</th>
                      <th scope="col" class="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" class="px-6 py-3">
                      </th>
                    </tr>
                  </thead>

                  <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                    <template v-for="item in teams" :key="item.id">
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                          {{ item.id }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                          {{ item.name }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                          {{ item.image_url }}
                        </td>
                        <td class="px-6 py-4 text-sm flex place-content-end leading-5 text-gray-900 whitespace-no-wrap">
                          <button @click="editTeamModal(item.id)"
                                  class="mr-2 inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150">
                            Edit
                          </button>
                          <button @click="deleteTeam(item.id)"
                                  class="inline-flex items-center px-4 py-2 text-red-200 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="closeModal">
        <TeamsEdit v-if="edit" :id="teamID" @close-modal="closeModal"></TeamsEdit>
        <TeamsCreate v-if="create" @close-modal="closeModal"></TeamsCreate>
      </BaseModal>
  </BreezeAuthenticatedLayout>
</template>

<script setup>
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import {Head} from "@inertiajs/inertia-vue3";
import useTeams from "@/composables/teams";
import {onMounted, ref} from "vue";
import BaseModal from "@/Components/BaseModal.vue";
import TeamsEdit from "@/Pages/Teams/TeamsEdit.vue";
import TeamsCreate from "@/Pages/Teams/TeamsCreate.vue";

const { teams, team, success, modalActive, getTeams, destroyTeam, closeModal, closeSuccessAlert } = useTeams()
onMounted(getTeams)
const deleteTeam = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroyTeam(id);
    await getTeams();
    success.value = 'Registro eliminado'
}

const teamID = ref(null);
const create = ref(null);
const edit = ref(null);
const createTeamModal = async () => {
    modalActive.value = true
    create.value = true
    edit.value = false
}
const editTeamModal = async (id) => {
    teamID.value = id
    modalActive.value = true
    edit.value = true
    create.value = false
}

</script>
