# Vue

> [Vue](https://v3.vuejs.org/) (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.

Notably, we use Vue with `<script setup>` format ([more info](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)). It is the recommended style for components since version 3.2:

```vue
<script setup lang="ts">
import { ref } from "vue"

const count = ref(0)
</script>

<template>
   <button @click="count++">{{ count }}</button>
</template>
```

Optionally, you may delete the `lang="ts"`, if you wish no to use TypeScript. The rule of thumb is to use TS in libraries and important projects. For normal use, standard JS is enough (like websites).

## Vite

All projects are currently running on Vite for crazy fast HMR.
