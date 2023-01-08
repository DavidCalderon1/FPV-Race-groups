<script setup>
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import {Head, Link, useForm} from "@inertiajs/inertia-vue3";
import BreezeButton from "@/Components/Button.vue";

const props = defineProps({
  teams: {
    type: Object,
    default: () => ({}),
  },
});
const form = useForm();

function destroy(id) {
  if (confirm("Are you sure you want to Delete")) {
    form.delete(route('teams.destroy', id));
  }
}
</script>

<template>

  <Head title="Teams"/>

  <BreezeAuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        Teams Index
      </h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">

        <div
            v-if="$page.props.flash.success"
            class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
        >
                    <span class="font-medium">
                        {{ $page.props.flash.success }}
                    </span>
        </div>
        <div
            v-if="$page.props.flash.error"
            class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
        >
                    <span class="font-medium">
                        {{ $page.props.flash.error }}
                    </span>
        </div>
        <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="mb-2">
              <Link :href="route('teams.create')">
                <BreezeButton>Add Team</BreezeButton>
              </Link
              >
            </div>
            <div
                class="relative overflow-x-auto shadow-md sm:rounded-lg"
            >
              <table
                  class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                <tr>
                  <th scope="col" class="px-6 py-3">#</th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Delete
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="team in teams"
                    :key="team.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {{ team.id }}
                  </th>
                  <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {{ team.name }}
                  </th>
                  <td class="px-6 py-4">
                    {{ team.image_url }}
                  </td>


                  <td class="px-6 py-4">
                    <Link :href="route('teams.edit',team.id)"
                          class="px-4 py-2 text-white bg-blue-600 rounded-lg">Edit
                    </Link>
                  </td>
                  <td class="px-6 py-4">
                    <BreezeButton
                        class="bg-red-700"
                        @click="destroy(team.id)"
                    >
                      Delete
                    </BreezeButton>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>


  </BreezeAuthenticatedLayout>
</template>