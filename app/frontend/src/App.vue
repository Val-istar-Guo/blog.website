<script setup lang="ts">
import { request } from 'keq'
import proxy from 'keq-proxy'

// request.use(mount.module('backend'), proxy('/api'))
request.use(proxy.module('backend', '/api'))
</script>

<template>
  <RouterView />
</template>
